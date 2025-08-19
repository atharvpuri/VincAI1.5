/**
 * VincAI Backend Server - TRUE Neural Network Processing
 * Handles millions of parameters, vocabulary, reasoning, and training
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const natural = require('natural');

const VincAINeuralNetwork = require('./src/neural-network');
const VincAIVocabulary = require('./src/vocabulary');
const VincAIReasoning = require('./src/reasoning-engine');
const VincAITraining = require('./src/training');

const app = express();
let vincAI = null;
let aiInitializing = false;

// Middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(cors({
    origin: ['http://localhost:3000', 'file://', /^file:\/\/\/.*$/],
    credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));



/**
 * Initialize VincAI System with TRUE neural networks

/**
 * Initialize VincAI System with TRUE neural networks (Vercel compatible)
 */
async function initializeVincAI() {
    if (vincAI || aiInitializing) return;
    aiInitializing = true;
    try {
        console.log('🚀 Initializing VincAI TRUE Neural Network System...');
        const vocabulary = new VincAIVocabulary();
        await vocabulary.initialize();
        console.log(`✅ Vocabulary loaded: ${vocabulary.getSize().toLocaleString()} tokens`);
        // Step 2: Initialize neural network (5M+ parameters)
        console.log('🧠 Building neural network with millions of parameters...');
        const neuralNetwork = new VincAINeuralNetwork({
            vocabularySize: vocabulary.getSize(),
            embeddingDim: 1024,
            hiddenLayers: [2048, 1536, 1024, 512],
            attentionHeads: 32,
            transformerLayers: 12,
            maxSequenceLength: 2048
        });
        await neuralNetwork.build();
        console.log(`✅ Neural network built: ${neuralNetwork.getParameterCount().toLocaleString()} parameters`);
        // Step 3: Initialize reasoning engine
        console.log('🤔 Initializing advanced reasoning engine...');
        const reasoningEngine = new VincAIReasoning(neuralNetwork, vocabulary);
        await reasoningEngine.initialize();
        console.log('✅ Reasoning engine ready with multi-step logic');
        // Step 4: Initialize training system
        console.log('🎓 Setting up continuous learning system...');
        const trainingSystem = new VincAITraining(neuralNetwork, vocabulary);
        await trainingSystem.initialize();
        console.log('✅ Training system ready for continuous improvement');
        // Combine all systems
        vincAI = {
            vocabulary,
            neuralNetwork,
            reasoningEngine,
            trainingSystem
        };
        console.log(`🎉 VincAI TRUE System Ready!`);
        console.log(`   Parameters: ${neuralNetwork.getParameterCount().toLocaleString()}`);
        console.log(`   Vocabulary: ${vocabulary.getSize().toLocaleString()} tokens`);
        console.log(`   Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}MB`);
        return true;
    } catch (error) {
        console.error('❌ VincAI initialization failed:', error);
        return false;
    } finally {
        aiInitializing = false;
    }
}

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
    const status = vincAI ? 'ready' : 'initializing';
    const memory = process.memoryUsage();
    
    res.json({
        status: status,
        timestamp: new Date().toISOString(),
        memory: {
            heapUsed: `${(memory.heapUsed / 1024 / 1024).toFixed(1)}MB`,
            heapTotal: `${(memory.heapTotal / 1024 / 1024).toFixed(1)}MB`,
            rss: `${(memory.rss / 1024 / 1024).toFixed(1)}MB`
        },
        system: vincAI ? {
            parameters: vincAI.neuralNetwork.getParameterCount(),
            vocabulary: vincAI.vocabulary.getSize(),
            reasoningCapable: vincAI.reasoningEngine.isReady(),
            trainingActive: vincAI.trainingSystem.isTraining()
        } : null
    });
});

/**
 * AI System Information endpoint
 */
app.get('/ai/info', (req, res) => {
    if (!vincAI) {
        return res.status(503).json({
            error: 'VincAI system not initialized',
            status: 'not_ready'
        });
    }
    
    res.json({
        parameters: vincAI.neuralNetwork.getParameterCount(),
        vocabulary: vincAI.vocabulary.getSize(),
        architecture: vincAI.neuralNetwork.getArchitecture(),
        memory: vincAI.neuralNetwork.getMemoryUsage(),
        status: 'operational'
    });
});

/**
 * Main inference endpoint - TRUE AI reasoning
 */
app.post('/api/generate', async (req, res) => {
    try {
        if (!vincAI) {
            return res.status(503).json({
                error: 'VincAI system still initializing',
                status: 'not_ready'
            });
        }
        
        const { message, context = [], temperature = 0.7, maxTokens = 512 } = req.body;
        
        if (!message) {
            return res.status(400).json({
                error: 'Message is required'
            });
        }
        
        console.log(`🧠 Processing message: "${message.substring(0, 100)}..."`);
        
        // TRUE reasoning and inference
        const startTime = Date.now();
        const result = await vincAI.reasoningEngine.processMessage(message, {
            context,
            temperature,
            maxTokens,
            useDeepReasoning: true,
            enableLearning: true
        });
        const processingTime = Date.now() - startTime;
        
        // Log successful inference
        console.log(`✅ Response generated in ${processingTime}ms: ${result.response.substring(0, 100)}...`);
        
        // Learn from interaction for continuous improvement
        vincAI.trainingSystem.recordInteraction(message, result.response, {
            quality: 'good',
            processingTime,
            reasoningSteps: result.reasoningSteps?.length || 0
        });
        
        res.json({
            response: result.response,
            confidence: result.confidence,
            reasoningSteps: result.reasoningSteps,
            processingTime,
            metadata: {
                tokensUsed: result.tokensUsed,
                parametersActivated: result.parametersActivated,
                vocabularyMatches: result.vocabularyMatches
            }
        });
        
    } catch (error) {
        console.error('❌ Inference error:', error);
        res.status(500).json({
            error: 'Failed to generate response',
            details: error.message
        });
    }
});

/**
 * Training endpoint - Continuous learning
 */
app.post('/api/train', async (req, res) => {
    try {
        if (!vincAI) {
            return res.status(503).json({
                error: 'VincAI system not ready'
            });
        }
        
        const { trainingData, epochs = 1, learningRate = 0.001 } = req.body;
        
        console.log(`🎓 Starting training with ${trainingData.length} samples...`);
        
        const trainingResults = await vincAI.trainingSystem.train(trainingData, {
            epochs,
            learningRate,
            batchSize: 32,
            validationSplit: 0.1
        });
        
        console.log(`✅ Training completed - Loss: ${trainingResults.finalLoss.toFixed(4)}`);
        
        res.json({
            success: true,
            results: trainingResults
        });
        
    } catch (error) {
        console.error('❌ Training error:', error);
        res.status(500).json({
            error: 'Training failed',
            details: error.message
        });
    }
});

/**
 * Model stats endpoint
 */
app.get('/api/stats', (req, res) => {
    if (!vincAI) {
        return res.status(503).json({
            error: 'System not ready'
        });
    }
    
    res.json({
        model: {
            parameters: vincAI.neuralNetwork.getParameterCount(),
            vocabulary: vincAI.vocabulary.getSize(),
            architecture: vincAI.neuralNetwork.getArchitecture(),
            memory: vincAI.neuralNetwork.getMemoryUsage()
        },
        training: {
            interactions: vincAI.trainingSystem.getInteractionCount(),
            improvements: vincAI.trainingSystem.getImprovementCount(),
            currentLoss: vincAI.trainingSystem.getCurrentLoss()
        },
        reasoning: {
            capability: vincAI.reasoningEngine.getCapabilityScore(),
            averageSteps: vincAI.reasoningEngine.getAverageReasoningSteps(),
            successRate: vincAI.reasoningEngine.getSuccessRate()
        }
    });
});

/**
 * Vocabulary expansion endpoint
 */
app.post('/api/vocabulary/expand', async (req, res) => {
    try {
        const { newWords, domain } = req.body;
        
        const added = await vincAI.vocabulary.expandVocabulary(newWords, domain);
        
        res.json({
            success: true,
            added: added,
            newSize: vincAI.vocabulary.getSize()
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'Failed to expand vocabulary',
            details: error.message
        });
    }
});

// Error handling
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: error.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});


// Vercel: ensure AI is initialized on first request
app.use(async (req, res, next) => {
    if (!vincAI && !aiInitializing) {
        await initializeVincAI();
    }
    next();
});

// Export the app for Vercel
module.exports = app;
module.exports = app;
