/**
 * Vertex AI Usage Examples
 * Demonstrates how to use the VertexAI service in your application
 */

const vertexAI = require('../services/vertexai.service');

/**
 * Example 1: Simple text generation
 */
async function simpleGeneration() {
    console.log('=== Example 1: Simple Text Generation ===\n');

    try {
        const prompt = 'Explain quantum computing in simple terms';
        const response = await vertexAI.generateContent(prompt);

        console.log('Prompt:', prompt);
        console.log('Response:', response);
        console.log('\n');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

/**
 * Example 2: Generation with custom configuration
 */
async function generationWithConfig() {
    console.log('=== Example 2: Generation with Custom Config ===\n');

    try {
        const prompt = 'Write a creative short story about a robot learning to paint';

        // Configure model for more creative responses
        const config = {
            temperature: 0.9,  // Higher temperature = more creative
            topP: 0.95,
            maxOutputTokens: 1024,
            systemInstruction: 'You are a creative storyteller who writes engaging narratives.'
        };

        const response = await vertexAI.generateContent(prompt, config);

        console.log('Prompt:', prompt);
        console.log('Response:', response);
        console.log('\n');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

/**
 * Example 3: Streaming response
 */
async function streamingGeneration() {
    console.log('=== Example 3: Streaming Response ===\n');

    try {
        const prompt = 'List 10 interesting facts about space exploration';

        console.log('Prompt:', prompt);
        console.log('Streaming response:\n');

        // Stream the response chunk by chunk
        await vertexAI.generateContentStream(
            prompt,
            (chunk) => {
                process.stdout.write(chunk); // Print each chunk as it arrives
            }
        );

        console.log('\n\n');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

/**
 * Example 4: Multi-turn conversation
 */
async function conversationExample() {
    console.log('=== Example 4: Multi-turn Conversation ===\n');

    try {
        // Start a new chat session
        const chat = vertexAI.startChat();

        // First message
        console.log('User: Hello! Can you help me with JavaScript?');
        let response = await vertexAI.sendChatMessage(chat, 'Hello! Can you help me with JavaScript?');
        console.log('AI:', response);
        console.log('\n');

        // Second message (context is maintained)
        console.log('User: What are closures?');
        response = await vertexAI.sendChatMessage(chat, 'What are closures?');
        console.log('AI:', response);
        console.log('\n');

        // Third message
        console.log('User: Can you show me an example?');
        response = await vertexAI.sendChatMessage(chat, 'Can you show me an example?');
        console.log('AI:', response);
        console.log('\n');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

/**
 * Example 5: Switching between models
 */
async function modelSwitchingExample() {
    console.log('=== Example 5: Switching Models ===\n');

    try {
        const prompt = 'What is the capital of France?';

        // Use Gemini 1.5 Pro
        console.log('Using gemini-1.5-pro:');
        vertexAI.switchModel('gemini-1.5-pro');
        let response = await vertexAI.generateContent(prompt);
        console.log('Response:', response);
        console.log('\n');

        // Switch to Gemini 1.5 Flash (faster)
        console.log('Using gemini-1.5-flash:');
        vertexAI.switchModel('gemini-1.5-flash');
        response = await vertexAI.generateContent(prompt);
        console.log('Response:', response);
        console.log('\n');

        // Check current model info
        const modelInfo = vertexAI.getModelInfo();
        console.log('Current Model Info:', modelInfo);
        console.log('\n');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

/**
 * Example 6: Code generation
 */
async function codeGenerationExample() {
    console.log('=== Example 6: Code Generation ===\n');

    try {
        const prompt = `Write a JavaScript function that:
1. Takes an array of numbers
2. Filters out negative numbers
3. Squares each remaining number
4. Returns the sum of the squared numbers

Include comments and example usage.`;

        const config = {
            temperature: 0.2, // Lower temperature for more deterministic code
            systemInstruction: 'You are an expert JavaScript developer. Write clean, well-documented code.'
        };

        const response = await vertexAI.generateContent(prompt, config);

        console.log('Prompt:', prompt);
        console.log('\nGenerated Code:\n');
        console.log(response);
        console.log('\n');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

/**
 * Run all examples
 */
async function runAllExamples() {
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║   Vertex AI Gemini Integration Examples       ║');
    console.log('╚════════════════════════════════════════════════╝\n');

    await simpleGeneration();
    await generationWithConfig();
    await streamingGeneration();
    await conversationExample();
    await modelSwitchingExample();
    await codeGenerationExample();

    console.log('All examples completed!');
}

// Export examples for individual use
module.exports = {
    simpleGeneration,
    generationWithConfig,
    streamingGeneration,
    conversationExample,
    modelSwitchingExample,
    codeGenerationExample,
    runAllExamples
};

// Run all examples if this file is executed directly
if (require.main === module) {
    runAllExamples().catch(console.error);
}
