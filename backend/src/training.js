/**
 * VincAI Training System - Continuous Learning and Improvement
 * Real neural network training with parameter updates
 */

const fs = require('fs').promises;

class VincAITraining {
    constructor(neuralNetwork, vocabulary) {
        this.neuralNetwork = neuralNetwork;
        this.vocabulary = vocabulary;
        
        this.trainingData = [];
        this.validationData = [];
        this.interactionHistory = [];
        
        this.trainingMetrics = {
            totalInteractions: 0,
            trainingCycles: 0,
            averageLoss: 0,
            improvementRate: 0,
            lastTraining: null
        };
        
        this.isTraining = false;
        this.initialized = false;
        
        console.log('🎓 VincAI Training System initialized');
    }
    
    /**
     * Initialize training system
     */
    async initialize() {
        console.log('📚 Initializing training system...');
        
        try {
            // Load existing training data if available
            await this.loadTrainingData();
            
            // Initialize training metrics
            this.initializeMetrics();
            
            // Set up continuous learning
            this.setupContinuousLearning();
            
            this.initialized = true;
            console.log('✅ Training system ready for continuous improvement');
            
        } catch (error) {
            console.error('❌ Training system initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Record interaction for learning
     */
    recordInteraction(input, output, metadata = {}) {
        const interaction = {
            id: `interaction_${Date.now()}`,
            timestamp: Date.now(),
            input: input,
            output: output,
            metadata: {
                quality: metadata.quality || 'unknown',
                processingTime: metadata.processingTime || 0,
                reasoningSteps: metadata.reasoningSteps || 0,
                userFeedback: metadata.userFeedback || null,
                ...metadata
            }
        };
        
        this.interactionHistory.push(interaction);
        this.trainingMetrics.totalInteractions++;
        
        // Convert to training sample if quality is good
        if (metadata.quality === 'good' || metadata.quality === 'excellent') {
            this.addTrainingSample(input, output, metadata);
        }
        
        // Trigger learning if we have enough new data
        if (this.interactionHistory.length % 10 === 0) {
            this.triggerIncrementalLearning();
        }
        
        console.log(`📝 Recorded interaction: ${input.substring(0, 50)}... -> ${output.substring(0, 50)}...`);
    }
    
    /**
     * Add training sample
     */
    addTrainingSample(input, output, metadata) {
        const sample = {
            input: this.vocabulary.encode(input),
            output: this.vocabulary.encode(output),
            metadata: metadata,
            timestamp: Date.now()
        };
        
        this.trainingData.push(sample);
        
        // Keep training data size manageable
        if (this.trainingData.length > 10000) {
            // Remove oldest samples, keeping the most recent and highest quality
            this.trainingData = this.trainingData
                .sort((a, b) => {
                    // Sort by quality first, then by recency
                    const qualityScore = { excellent: 3, good: 2, average: 1, poor: 0 };
                    const aScore = (qualityScore[a.metadata.quality] || 0) + (a.timestamp / 1000000);
                    const bScore = (qualityScore[b.metadata.quality] || 0) + (b.timestamp / 1000000);
                    return bScore - aScore;
                })
                .slice(0, 8000);
        }
    }
    
    /**
     * Main training method
     */
    async train(trainingData = null, options = {}) {
        if (this.isTraining) {
            console.log('⏳ Training already in progress...');
            return { status: 'already_training' };
        }
        
        this.isTraining = true;
        console.log('🚀 Starting neural network training...');
        
        const config = {
            epochs: options.epochs || 5,
            batchSize: options.batchSize || 16,
            learningRate: options.learningRate || 0.0001,
            validationSplit: options.validationSplit || 0.15,
            ...options
        };
        
        try {
            // Use provided data or internal training data
            const data = trainingData || this.prepareTrainingData();
            
            if (data.inputs.length === 0) {
                console.log('📭 No training data available');
                this.isTraining = false;
                return { status: 'no_data' };
            }
            
            console.log(`📊 Training on ${data.inputs.length} samples with config:`, config);
            
            // Prepare data tensors
            const inputTensor = tf.tensor2d(data.inputs);
            const outputTensor = tf.tensor2d(data.outputs);
            
            // Create training callbacks
            const callbacks = this.createTrainingCallbacks();
            
            // Train the model
            const history = await this.neuralNetwork.model.fit(inputTensor, outputTensor, {
                epochs: config.epochs,
                batchSize: config.batchSize,
                validationSplit: config.validationSplit,
                callbacks: callbacks,
                verbose: 1
            });
            
            // Update training metrics
            this.updateTrainingMetrics(history);
            
            // Clean up tensors
            inputTensor.dispose();
            outputTensor.dispose();
            
            console.log('✅ Training completed successfully');
            this.isTraining = false;
            
            return {
                status: 'success',
                finalLoss: history.history.loss[history.history.loss.length - 1],
                finalAccuracy: history.history.accuracy ? history.history.accuracy[history.history.accuracy.length - 1] : null,
                epochs: history.epoch.length,
                history: history.history
            };
            
        } catch (error) {
            console.error('❌ Training failed:', error);
            this.isTraining = false;
            throw error;
        }
    }
    
    /**
     * Prepare training data from interactions
     */
    prepareTrainingData() {
        console.log('🔄 Preparing training data from interactions...');
        
        const inputs = [];
        const outputs = [];
        
        // Use high-quality interactions for training
        const qualityData = this.trainingData.filter(sample => 
            sample.metadata.quality === 'good' || sample.metadata.quality === 'excellent'
        );
        
        // Ensure consistent sequence length
        const maxLength = 512; // Reasonable sequence length
        
        qualityData.forEach(sample => {
            // Pad or truncate input sequences
            let inputSeq = sample.input.slice(0, maxLength);
            while (inputSeq.length < maxLength) {
                inputSeq.push(this.vocabulary.specialTokens.PAD);
            }
            
            // Pad or truncate output sequences  
            let outputSeq = sample.output.slice(0, maxLength);
            while (outputSeq.length < maxLength) {
                outputSeq.push(this.vocabulary.specialTokens.PAD);
            }
            
            inputs.push(inputSeq);
            outputs.push(outputSeq);
        });
        
        console.log(`✅ Prepared ${inputs.length} training samples`);
        
        return { inputs, outputs };
    }
    
    /**
     * Create training callbacks
     */
    createTrainingCallbacks() {
        const callbacks = [];
        
        // Learning rate scheduler
        const lrScheduler = tf.callbacks.reduceLROnPlateau({
            monitor: 'loss',
            factor: 0.5,
            patience: 2,
            minLR: 1e-7
        });
        callbacks.push(lrScheduler);
        
        // Early stopping
        const earlyStopping = tf.callbacks.earlyStopping({
            monitor: 'val_loss',
            patience: 3,
            restoreBestWeights: true
        });
        callbacks.push(earlyStopping);
        
        // Custom progress callback
        const progressCallback = {
            onEpochEnd: async (epoch, logs) => {
                console.log(`🎯 Epoch ${epoch + 1}: loss=${logs.loss.toFixed(4)}, val_loss=${logs.val_loss?.toFixed(4) || 'N/A'}`);
                
                // Save checkpoint every 5 epochs
                if ((epoch + 1) % 5 === 0) {
                    await this.saveCheckpoint(epoch + 1, logs);
                }
            }
        };
        callbacks.push(progressCallback);
        
        return callbacks;
    }
    
    /**
     * Update training metrics
     */
    updateTrainingMetrics(history) {
        const losses = history.history.loss;
        const finalLoss = losses[losses.length - 1];
        const initialLoss = losses[0];
        
        this.trainingMetrics.trainingCycles++;
        this.trainingMetrics.averageLoss = finalLoss;
        this.trainingMetrics.improvementRate = (initialLoss - finalLoss) / initialLoss;
        this.trainingMetrics.lastTraining = Date.now();
        
        console.log(`📈 Training metrics updated: cycles=${this.trainingMetrics.trainingCycles}, loss=${finalLoss.toFixed(4)}, improvement=${(this.trainingMetrics.improvementRate * 100).toFixed(1)}%`);
    }
    
    /**
     * Incremental learning from recent interactions
     */
    async triggerIncrementalLearning() {
        if (this.isTraining) return;
        
        console.log('🔄 Triggering incremental learning...');
        
        // Get recent high-quality interactions
        const recentInteractions = this.interactionHistory
            .slice(-50) // Last 50 interactions
            .filter(interaction => 
                interaction.metadata.quality === 'good' || 
                interaction.metadata.quality === 'excellent'
            );
        
        if (recentInteractions.length < 5) {
            console.log('📭 Not enough quality data for incremental learning');
            return;
        }
        
        // Convert to training format
        const trainingData = {
            inputs: recentInteractions.map(i => this.vocabulary.encode(i.input)),
            outputs: recentInteractions.map(i => this.vocabulary.encode(i.output))
        };
        
        // Quick training session with low learning rate
        await this.train(trainingData, {
            epochs: 2,
            batchSize: 4,
            learningRate: 0.00001, // Very low for incremental updates
            validationSplit: 0
        });
    }
    
    /**
     * Evaluate model performance
     */
    async evaluateModel() {
        console.log('📊 Evaluating model performance...');
        
        if (this.validationData.length === 0) {
            console.log('📭 No validation data available');
            return null;
        }
        
        try {
            const validationInputs = tf.tensor2d(this.validationData.map(sample => sample.input));
            const validationOutputs = tf.tensor2d(this.validationData.map(sample => sample.output));
            
            const evaluation = this.neuralNetwork.model.evaluate(validationInputs, validationOutputs);
            
            const loss = await evaluation[0].data();
            const accuracy = evaluation.length > 1 ? await evaluation[1].data() : null;
            
            validationInputs.dispose();
            validationOutputs.dispose();
            evaluation.forEach(tensor => tensor.dispose());
            
            const results = {
                loss: loss[0],
                accuracy: accuracy ? accuracy[0] : null,
                timestamp: Date.now()
            };
            
            console.log(`📈 Model evaluation: loss=${results.loss.toFixed(4)}, accuracy=${results.accuracy?.toFixed(4) || 'N/A'}`);
            
            return results;
            
        } catch (error) {
            console.error('❌ Model evaluation failed:', error);
            return null;
        }
    }
    
    /**
     * Save model checkpoint
     */
    async saveCheckpoint(epoch, logs) {
        try {
            const checkpointPath = `./checkpoints/epoch_${epoch}`;
            await this.neuralNetwork.saveModel(checkpointPath);
            
            // Save training state
            const state = {
                epoch,
                logs,
                trainingMetrics: this.trainingMetrics,
                timestamp: Date.now()
            };
            
            await fs.writeFile(
                `${checkpointPath}/training_state.json`, 
                JSON.stringify(state, null, 2)
            );
            
            console.log(`💾 Checkpoint saved at epoch ${epoch}`);
            
        } catch (error) {
            console.error('❌ Failed to save checkpoint:', error);
        }
    }
    
    /**
     * Load training data from file
     */
    async loadTrainingData() {
        try {
            const trainingPath = './data/training_data.json';
            const data = await fs.readFile(trainingPath, 'utf8');
            const loadedData = JSON.parse(data);
            
            this.trainingData = loadedData.trainingData || [];
            this.validationData = loadedData.validationData || [];
            this.trainingMetrics = { ...this.trainingMetrics, ...loadedData.metrics };
            
            console.log(`📂 Loaded ${this.trainingData.length} training samples`);
            
        } catch (error) {
            console.log('📭 No existing training data found, starting fresh');
        }
    }
    
    /**
     * Save training data to file
     */
    async saveTrainingData() {
        try {
            const dataPath = './data/training_data.json';
            
            // Ensure directory exists
            await fs.mkdir('./data', { recursive: true });
            
            const data = {
                trainingData: this.trainingData,
                validationData: this.validationData,
                metrics: this.trainingMetrics,
                timestamp: Date.now()
            };
            
            await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
            console.log(`💾 Training data saved: ${this.trainingData.length} samples`);
            
        } catch (error) {
            console.error('❌ Failed to save training data:', error);
        }
    }
    
    /**
     * Initialize training metrics
     */
    initializeMetrics() {
        this.trainingMetrics = {
            totalInteractions: 0,
            trainingCycles: 0,
            averageLoss: 0,
            improvementRate: 0,
            lastTraining: null,
            startTime: Date.now()
        };
    }
    
    /**
     * Setup continuous learning
     */
    setupContinuousLearning() {
        // Auto-save training data every 5 minutes
        setInterval(async () => {
            if (this.trainingData.length > 0) {
                await this.saveTrainingData();
            }
        }, 5 * 60 * 1000);
        
        // Auto-training every hour if we have enough data
        setInterval(async () => {
            if (this.trainingData.length > 50 && !this.isTraining) {
                console.log('⏰ Scheduled training session starting...');
                await this.train(null, { epochs: 3, batchSize: 8 });
            }
        }, 60 * 60 * 1000);
        
        console.log('⚙️ Continuous learning scheduled');
    }
    
    /**
     * Generate training report
     */
    generateReport() {
        const report = {
            overview: {
                totalInteractions: this.trainingMetrics.totalInteractions,
                trainingCycles: this.trainingMetrics.trainingCycles,
                currentLoss: this.trainingMetrics.averageLoss,
                improvementRate: this.trainingMetrics.improvementRate
            },
            data: {
                trainingSamples: this.trainingData.length,
                validationSamples: this.validationData.length,
                qualityDistribution: this.getQualityDistribution()
            },
            performance: {
                averageProcessingTime: this.getAverageProcessingTime(),
                successRate: this.getSuccessRate(),
                reasoningComplexity: this.getAverageReasoningSteps()
            },
            status: {
                isTraining: this.isTraining,
                lastTraining: this.trainingMetrics.lastTraining,
                nextScheduledTraining: this.getNextTrainingTime()
            }
        };
        
        return report;
    }
    
    /**
     * Helper methods for metrics
     */
    
    getQualityDistribution() {
        const distribution = { excellent: 0, good: 0, average: 0, poor: 0, unknown: 0 };
        
        this.trainingData.forEach(sample => {
            const quality = sample.metadata.quality || 'unknown';
            distribution[quality] = (distribution[quality] || 0) + 1;
        });
        
        return distribution;
    }
    
    getAverageProcessingTime() {
        if (this.interactionHistory.length === 0) return 0;
        
        const totalTime = this.interactionHistory.reduce((sum, interaction) => 
            sum + (interaction.metadata.processingTime || 0), 0
        );
        
        return totalTime / this.interactionHistory.length;
    }
    
    getSuccessRate() {
        if (this.interactionHistory.length === 0) return 1;
        
        const successful = this.interactionHistory.filter(interaction =>
            interaction.metadata.quality === 'good' || interaction.metadata.quality === 'excellent'
        ).length;
        
        return successful / this.interactionHistory.length;
    }
    
    getAverageReasoningSteps() {
        if (this.interactionHistory.length === 0) return 0;
        
        const totalSteps = this.interactionHistory.reduce((sum, interaction) =>
            sum + (interaction.metadata.reasoningSteps || 0), 0
        );
        
        return totalSteps / this.interactionHistory.length;
    }
    
    getNextTrainingTime() {
        if (!this.trainingMetrics.lastTraining) {
            return Date.now() + (60 * 60 * 1000); // 1 hour from now
        }
        
        return this.trainingMetrics.lastTraining + (60 * 60 * 1000); // 1 hour after last training
    }
    
    // Status methods
    isTraining() {
        return this.isTraining;
    }
    
    getInteractionCount() {
        return this.trainingMetrics.totalInteractions;
    }
    
    getImprovementCount() {
        return this.trainingMetrics.trainingCycles;
    }
    
    getCurrentLoss() {
        return this.trainingMetrics.averageLoss;
    }
}

module.exports = VincAITraining;
