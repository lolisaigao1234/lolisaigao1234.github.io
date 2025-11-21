/**
 * Quick Test Script for Vertex AI Setup
 * Run this to verify your Vertex AI integration is working
 */

const vertexAI = require('./src/services/vertexai.service');

async function testSetup() {
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║     Vertex AI Setup Verification Test         ║');
    console.log('╚════════════════════════════════════════════════╝\n');

    try {
        // Check configuration
        console.log('📋 Checking configuration...');
        const modelInfo = vertexAI.getModelInfo();
        console.log('✅ Model:', modelInfo.modelName);
        console.log('✅ Project:', modelInfo.project);
        console.log('✅ Location:', modelInfo.location);
        console.log('');

        // Test simple generation
        console.log('🧪 Testing API connection...');
        console.log('Sending test prompt: "Say hello in 5 words or less"\n');

        const response = await vertexAI.generateContent('Say hello in 5 words or less');

        console.log('✅ Response received:');
        console.log('   ', response);
        console.log('');

        console.log('╔════════════════════════════════════════════════╗');
        console.log('║  ✅ SUCCESS! Vertex AI is configured correctly ║');
        console.log('╚════════════════════════════════════════════════╝');
        console.log('\nYou can now use Vertex AI in your project!');
        console.log('See VERTEX_AI_README.md for usage examples.\n');

    } catch (error) {
        console.log('╔════════════════════════════════════════════════╗');
        console.log('║  ❌ ERROR: Setup verification failed           ║');
        console.log('╚════════════════════════════════════════════════╝\n');

        console.error('Error details:', error.message);
        console.log('\n🔧 Troubleshooting steps:');
        console.log('1. Check your .env file has correct values');
        console.log('2. Verify GOOGLE_CLOUD_PROJECT is set');
        console.log('3. Verify GOOGLE_API_KEY is valid');
        console.log('4. Ensure Vertex AI API is enabled in Google Cloud');
        console.log('5. Check API key permissions in Google Cloud Console\n');
    }
}

// Run the test
testSetup();
