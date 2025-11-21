/**
 * Vertex AI Service
 * Handles all interactions with Google Vertex AI Gemini models
 */

const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config();

class VertexAIService {
    constructor() {
        // Initialize Vertex AI with credentials from environment
        this.vertexAI = new VertexAI({
            project: process.env.GOOGLE_CLOUD_PROJECT,
            location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
            apiKey: process.env.GOOGLE_API_KEY
        });

        this.modelName = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
        this.model = null;
    }

    /**
     * Initialize the Gemini model with optional configuration
     * @param {Object} config - Model configuration
     * @param {string} config.systemInstruction - System instruction for the model
     * @param {number} config.temperature - Temperature for response generation (0-1)
     * @param {number} config.topP - Top P for nucleus sampling
     * @param {number} config.topK - Top K for sampling
     * @param {number} config.maxOutputTokens - Maximum tokens in response
     */
    initializeModel(config = {}) {
        const modelConfig = {
            model: this.modelName,
            ...config
        };

        // Add generation config if provided
        if (config.temperature !== undefined ||
            config.topP !== undefined ||
            config.topK !== undefined ||
            config.maxOutputTokens !== undefined) {
            modelConfig.generationConfig = {
                temperature: config.temperature,
                topP: config.topP,
                topK: config.topK,
                maxOutputTokens: config.maxOutputTokens
            };
        }

        this.model = this.vertexAI.getGenerativeModel(modelConfig);
        return this.model;
    }

    /**
     * Generate content from a text prompt
     * @param {string} prompt - The prompt to send to the model
     * @param {Object} options - Additional options
     * @returns {Promise<string>} - Generated text response
     */
    async generateContent(prompt, options = {}) {
        try {
            if (!this.model) {
                this.initializeModel(options);
            }

            const result = await this.model.generateContent(prompt);
            const response = result.response;
            return response.text();
        } catch (error) {
            console.error('Error generating content:', error);
            throw new Error(`Vertex AI Error: ${error.message}`);
        }
    }

    /**
     * Generate content with streaming response
     * @param {string} prompt - The prompt to send to the model
     * @param {Function} onChunk - Callback function for each chunk
     * @param {Object} options - Additional options
     */
    async generateContentStream(prompt, onChunk, options = {}) {
        try {
            if (!this.model) {
                this.initializeModel(options);
            }

            const result = await this.model.generateContentStream(prompt);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                if (onChunk && typeof onChunk === 'function') {
                    onChunk(chunkText);
                }
            }

            // Return the aggregated response
            const aggregatedResponse = await result.response;
            return aggregatedResponse.text();
        } catch (error) {
            console.error('Error streaming content:', error);
            throw new Error(`Vertex AI Streaming Error: ${error.message}`);
        }
    }

    /**
     * Start a multi-turn conversation
     * @param {Array} history - Previous conversation history
     * @param {Object} options - Additional options
     * @returns {Object} - Chat session object
     */
    startChat(history = [], options = {}) {
        if (!this.model) {
            this.initializeModel(options);
        }

        return this.model.startChat({
            history: history
        });
    }

    /**
     * Send a message in an existing chat session
     * @param {Object} chat - Chat session object
     * @param {string} message - Message to send
     * @returns {Promise<string>} - Response text
     */
    async sendChatMessage(chat, message) {
        try {
            const result = await chat.sendMessage(message);
            return result.response.text();
        } catch (error) {
            console.error('Error sending chat message:', error);
            throw new Error(`Chat Error: ${error.message}`);
        }
    }

    /**
     * Switch to a different Gemini model
     * @param {string} modelName - Name of the model to switch to
     */
    switchModel(modelName) {
        const validModels = [
            'gemini-1.5-pro',
            'gemini-1.5-flash',
            'gemini-2.0-flash-exp',
            'gemini-1.0-pro'
        ];

        if (!validModels.includes(modelName)) {
            throw new Error(`Invalid model name. Valid options: ${validModels.join(', ')}`);
        }

        this.modelName = modelName;
        this.model = null; // Reset model to reinitialize with new name
    }

    /**
     * Get current model information
     * @returns {Object} - Current model details
     */
    getModelInfo() {
        return {
            modelName: this.modelName,
            project: process.env.GOOGLE_CLOUD_PROJECT,
            location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1'
        };
    }
}

// Export singleton instance
module.exports = new VertexAIService();
