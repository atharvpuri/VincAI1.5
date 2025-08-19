/**
 * VincAI Training Data and Response Patterns
 * Part 3 of the 10k parameter AI model - Training patterns and response templates
 */

class VincAITrainingData {
    constructor() {
        this.responsePatterns = new Map();
        this.conversationContexts = new Map();
        this.userFeedback = [];
        
        this.initializeTrainingPatterns();
        console.log('📚 VincAI Training Data initialized');
    }
    
    /**
     * Initialize response patterns and templates
     */
    initializeTrainingPatterns() {
        // Question-answer patterns
        this.responsePatterns.set('greeting', {
            patterns: [/^(hi|hello|hey|greetings)/i, /good (morning|afternoon|evening)/i],
            responses: [
                "Hello! I'm VincAI, your intelligent assistant. I'm here to help you with any questions or tasks you have. What can I assist you with today?",
                "Hi there! Welcome to VincAI. I'm powered by a 10,000 parameter neural network and ready to help you explore any topic. How can I help?",
                "Greetings! I'm VincAI, your AI companion. I'm equipped with advanced language understanding capabilities. What would you like to discuss?",
                "Hello! Great to meet you. I'm VincAI, and I'm here to provide intelligent assistance and engaging conversations. What's on your mind?"
            ],
            weight: 1.0
        });
        
        this.responsePatterns.set('technical_question', {
            patterns: [
                /how (to|do i|can i)/i,
                /(code|programming|javascript|python|react|css|html|api|database|algorithm)/i,
                /(build|create|develop|design)/i
            ],
            responses: [
                "I'd be happy to help you with this technical challenge! Based on your question, I can provide step-by-step guidance, code examples, and best practices.",
                "That's a great technical question! I can walk you through the solution with detailed explanations and practical examples that you can implement right away.",
                "Excellent question about development! Let me break this down into manageable steps and provide you with both the theory and practical implementation details.",
                "I love technical questions like this! I can provide you with multiple approaches, explain the trade-offs, and give you working examples to get started."
            ],
            followUp: [
                "Would you like me to explain any specific part in more detail?",
                "Are you working on a particular project where this would be useful?",
                "Do you need help with implementation or are you looking for conceptual understanding?"
            ],
            weight: 1.2
        });
        
        this.responsePatterns.set('explanation_request', {
            patterns: [
                /what is|what are/i,
                /explain|describe|tell me about/i,
                /how does|how do/i,
                /why/i
            ],
            responses: [
                "Great question! Let me provide you with a comprehensive explanation that covers the key concepts, real-world applications, and important details you should know.",
                "I'd be happy to explain this topic thoroughly! I'll break it down into digestible parts and provide examples to make it clear and practical.",
                "That's an interesting topic to explore! I can give you both a high-level overview and dive into the specifics that matter most.",
                "Excellent question! I'll provide you with a detailed explanation that covers the fundamentals, current developments, and practical implications."
            ],
            structure: [
                "**Core Concepts:**",
                "**Key Points:**",
                "**Real-World Applications:**",
                "**Important Considerations:**"
            ],
            weight: 1.1
        });
        
        this.responsePatterns.set('creative_request', {
            patterns: [
                /(write|create|generate|compose|draft|design)/i,
                /(story|poem|essay|article|script|content)/i,
                /(brainstorm|ideate|suggest)/i
            ],
            responses: [
                "I'd love to help you create something amazing! I'll use my understanding of structure, style, and creativity to deliver exactly what you're looking for.",
                "Creative projects are exciting! I can help you develop ideas, structure your content, and refine it until it meets your vision perfectly.",
                "That sounds like a fantastic creative challenge! I'll combine creativity with strategic thinking to produce something both original and effective.",
                "I'm excited to work on this creative project with you! I'll bring together different perspectives and techniques to create something unique and valuable."
            ],
            process: [
                "**Creative Approach:**",
                "**Structure & Flow:**",
                "**Key Elements:**",
                "**Final Touches:**"
            ],
            weight: 1.0
        });
        
        this.responsePatterns.set('analysis_request', {
            patterns: [
                /(analyze|compare|evaluate|assess|review)/i,
                /(pros and cons|advantages|disadvantages)/i,
                /(research|study|investigate)/i,
                /(opinion|thoughts|perspective)/i
            ],
            responses: [
                "Excellent analytical question! I'll provide you with a thorough examination that considers multiple perspectives, weighs evidence, and offers insights you can act on.",
                "I love analytical challenges like this! I'll break down the components, examine the relationships, and provide you with a comprehensive assessment.",
                "That's a complex topic worth analyzing carefully! I'll examine it from different angles and provide you with balanced insights and actionable conclusions.",
                "Great question for analysis! I'll evaluate the available information, consider various viewpoints, and synthesize it into clear, useful insights."
            ],
            framework: [
                "**Analysis Framework:**",
                "**Key Findings:**",
                "**Comparative Assessment:**",
                "**Recommendations:**"
            ],
            weight: 1.3
        });
        
        this.responsePatterns.set('problem_solving', {
            patterns: [
                /(help|solve|fix|troubleshoot|debug)/i,
                /(problem|issue|error|bug|challenge)/i,
                /(stuck|confused|struggling)/i
            ],
            responses: [
                "I'm here to help you solve this problem! Let me break it down systematically and provide you with practical solutions you can implement step by step.",
                "Problem-solving is one of my strengths! I'll analyze the issue, identify the root cause, and guide you through effective solutions.",
                "Don't worry, we can figure this out together! I'll help you approach this methodically and find the best solution for your specific situation.",
                "I understand this challenge can be frustrating! Let me help you work through it with a clear, systematic approach that gets you to a solution."
            ],
            methodology: [
                "**Problem Analysis:**",
                "**Potential Solutions:**",
                "**Step-by-Step Approach:**",
                "**Prevention Tips:**"
            ],
            weight: 1.4
        });
        
        // Context-aware response modifiers
        this.contextModifiers = {
            follow_up: [
                "Building on our previous discussion,",
                "Following up on what we talked about,",
                "Continuing from where we left off,",
                "As a next step from our conversation,"
            ],
            clarification: [
                "To clarify and expand on this,",
                "Let me provide more detail on this point,",
                "To make this clearer,",
                "Breaking this down further,"
            ],
            enthusiasm: [
                "This is a fascinating topic!",
                "I'm excited to explore this with you!",
                "What an interesting question!",
                "This is exactly the kind of challenge I enjoy!"
            ]
        };
        
        // Response quality enhancers
        this.qualityEnhancers = {
            structure_markers: [
                "Here's how I'd approach this:",
                "Let me break this down:",
                "The key aspects to consider are:",
                "I'll organize this into clear sections:"
            ],
            transition_phrases: [
                "Additionally,", "Furthermore,", "On the other hand,", 
                "It's also worth noting,", "Another important aspect is,",
                "Building on this point,"
            ],
            conclusion_starters: [
                "In summary,", "To wrap this up,", "The key takeaway is,",
                "Putting it all together,", "The bottom line is,"
            ]
        };
    }
    
    /**
     * Analyze user input and determine response pattern
     */
    analyzeInput(inputText) {
        const analysis = {
            patterns: [],
            confidence: 0,
            context: null,
            intent: 'general',
            topics: []
        };
        
        const text = inputText.toLowerCase();
        let maxWeight = 0;
        let bestMatch = null;
        
        // Check each pattern
        for (const [patternName, patternData] of this.responsePatterns) {
            let matchScore = 0;
            
            for (const pattern of patternData.patterns) {
                if (pattern.test(text)) {
                    matchScore += patternData.weight;
                }
            }
            
            if (matchScore > maxWeight) {
                maxWeight = matchScore;
                bestMatch = patternName;
            }
            
            if (matchScore > 0) {
                analysis.patterns.push({
                    name: patternName,
                    score: matchScore,
                    weight: patternData.weight
                });
            }
        }
        
        analysis.intent = bestMatch || 'general';
        analysis.confidence = Math.min(maxWeight / 2.0, 1.0); // Normalize confidence
        
        // Extract topics (simple keyword extraction)
        const keywords = text.match(/\b\w{4,}\b/g) || [];
        analysis.topics = [...new Set(keywords)].slice(0, 5); // Top 5 unique keywords
        
        return analysis;
    }
    
    /**
     * Generate enhanced response based on analysis
     */
    generateEnhancedResponse(analysis, originalInput) {
        const patternData = this.responsePatterns.get(analysis.intent);
        
        if (!patternData) {
            return this.generateGenericResponse(originalInput);
        }
        
        // Select base response
        const baseResponse = patternData.responses[
            Math.floor(Math.random() * patternData.responses.length)
        ];
        
        // Add structure if available
        let structuredResponse = baseResponse;
        
        if (patternData.structure) {
            structuredResponse += "\n\n" + patternData.structure.join('\n• ') + "\n• ";
        }
        
        if (patternData.framework) {
            structuredResponse += "\n\n" + patternData.framework.join('\n• ') + "\n• ";
        }
        
        if (patternData.process) {
            structuredResponse += "\n\n" + patternData.process.join('\n• ') + "\n• ";
        }
        
        if (patternData.methodology) {
            structuredResponse += "\n\n" + patternData.methodology.join('\n• ') + "\n• ";
        }
        
        // Add follow-up questions if available
        if (patternData.followUp && Math.random() > 0.5) {
            const followUp = patternData.followUp[
                Math.floor(Math.random() * patternData.followUp.length)
            ];
            structuredResponse += `\n\n${followUp}`;
        }
        
        return structuredResponse;
    }
    
    /**
     * Generate generic response for unmatched patterns
     */
    generateGenericResponse(input) {
        const genericResponses = [
            "That's an interesting point you've raised! Let me share some thoughts on this topic and provide you with useful insights.",
            "I appreciate you bringing this up. Based on what you've shared, I can offer some perspectives that might be helpful.",
            "Thanks for that question! This is definitely worth exploring, and I'd be happy to help you understand it better.",
            "Great topic to discuss! I can provide some analysis and insights that should give you a clearer picture.",
            "That's a thoughtful question. Let me break this down and share some relevant information and perspectives."
        ];
        
        return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
    
    /**
     * Record user feedback for training improvement
     */
    recordFeedback(input, response, feedback) {
        this.userFeedback.push({
            timestamp: Date.now(),
            input: input,
            response: response,
            feedback: feedback, // 'positive', 'negative', 'neutral'
            sessionId: Date.now().toString(36)
        });
        
        // Keep only last 1000 feedback entries
        if (this.userFeedback.length > 1000) {
            this.userFeedback = this.userFeedback.slice(-1000);
        }
        
        console.log('📝 Feedback recorded:', feedback);
    }
    
    /**
     * Get training statistics
     */
    getTrainingStats() {
        return {
            patterns: this.responsePatterns.size,
            feedbackEntries: this.userFeedback.length,
            positiveFeedback: this.userFeedback.filter(f => f.feedback === 'positive').length,
            negativeFeedback: this.userFeedback.filter(f => f.feedback === 'negative').length,
            contexts: this.conversationContexts.size
        };
    }
}

// Export for use in main application
window.VincAITrainingData = VincAITrainingData;
