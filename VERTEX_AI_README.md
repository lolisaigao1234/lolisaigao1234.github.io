# Vertex AI Integration Guide

This guide explains how to use Google Vertex AI with Gemini models in your project.

## 🚨 Important Security Notice

**IMMEDIATELY REVOKE YOUR API KEY** that was shared in the conversation and generate a new one:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services → Credentials**
3. Find and delete the exposed API key
4. Create a new API key
5. Restrict it to **Vertex AI API** only

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install @google-cloud/vertexai dotenv
```

### 2. Configure Environment Variables

Edit the `.env` file with your actual credentials:

```env
GOOGLE_CLOUD_PROJECT=your-actual-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_API_KEY=your-new-api-key-here
GEMINI_MODEL=gemini-1.5-pro
```

> **Note**: The `.env` file is already gitignored to protect your credentials.

### 3. Available Gemini Models

| Model Name | Description | Best For |
|------------|-------------|----------|
| `gemini-1.5-pro` | Most capable model | Complex reasoning, long context |
| `gemini-1.5-flash` | Faster, cost-effective | Quick responses, high volume |
| `gemini-2.0-flash-exp` | Latest experimental | Testing new features |
| `gemini-1.0-pro` | Legacy model | Backward compatibility |

> **Note**: "Gemini 3.0 Pro" and "Nano Banana Pro" are not actual model names. Use the models listed above.

## 🚀 Usage Examples

### Basic Text Generation

```javascript
const vertexAI = require('./src/services/vertexai.service');

async function example() {
  const response = await vertexAI.generateContent('Explain AI in simple terms');
  console.log(response);
}
```

### Streaming Response

```javascript
await vertexAI.generateContentStream(
  'Tell me a story',
  (chunk) => {
    process.stdout.write(chunk); // Print each chunk as it arrives
  }
);
```

### Multi-turn Conversation

```javascript
const chat = vertexAI.startChat();

let response = await vertexAI.sendChatMessage(chat, 'Hello!');
console.log(response);

response = await vertexAI.sendChatMessage(chat, 'What is JavaScript?');
console.log(response); // Context from previous message is maintained
```

### Custom Configuration

```javascript
const config = {
  temperature: 0.9,        // 0-1, higher = more creative
  topP: 0.95,             // Nucleus sampling
  maxOutputTokens: 1024,  // Max response length
  systemInstruction: 'You are a helpful coding assistant.'
};

const response = await vertexAI.generateContent('Write a function', config);
```

### Switching Models

```javascript
// Switch to faster model
vertexAI.switchModel('gemini-1.5-flash');

// Get current model info
const info = vertexAI.getModelInfo();
console.log(info);
```

## 📚 Running Examples

Run all examples:

```bash
node src/examples/vertex-ai-examples.js
```

Or import and run specific examples:

```javascript
const examples = require('./src/examples/vertex-ai-examples');

// Run individual examples
await examples.simpleGeneration();
await examples.streamingGeneration();
await examples.conversationExample();
```

## 📁 Project Structure

```
├── .env                              # Your API credentials (gitignored)
├── .env.example                      # Template for environment variables
├── src/
│   ├── services/
│   │   └── vertexai.service.js      # Main Vertex AI service class
│   └── examples/
│       └── vertex-ai-examples.js    # Usage examples
└── VERTEX_AI_README.md              # This file
```

## 🔧 API Reference

### VertexAIService Methods

#### `initializeModel(config)`
Initialize the model with custom configuration.

#### `generateContent(prompt, options)`
Generate content from a text prompt.
- **Returns**: `Promise<string>`

#### `generateContentStream(prompt, onChunk, options)`
Generate content with streaming response.
- **onChunk**: Callback function called for each chunk

#### `startChat(history, options)`
Start a multi-turn conversation.
- **Returns**: Chat session object

#### `sendChatMessage(chat, message)`
Send a message in an existing chat.
- **Returns**: `Promise<string>`

#### `switchModel(modelName)`
Switch to a different Gemini model.

#### `getModelInfo()`
Get current model configuration.
- **Returns**: Object with model details

## 🛡️ Security Best Practices

1. ✅ **Never commit `.env` files** - Already in `.gitignore`
2. ✅ **Restrict API keys** in Google Cloud Console
3. ✅ **Use environment variables** for all credentials
4. ✅ **Rotate keys regularly** - Especially after exposure
5. ✅ **Monitor usage** in Google Cloud Console to detect unauthorized use

## 🐛 Troubleshooting

### "Invalid API Key" Error
- Verify your API key in `.env` is correct
- Ensure the key has Vertex AI API permissions
- Check if the key is restricted to the correct API

### "Model not found" Error
- Use only valid model names (see table above)
- Ensure your project has access to the model

### "Quota exceeded" Error
- Check your Google Cloud quotas
- Consider using `gemini-1.5-flash` for higher volume

## 📖 Additional Resources

- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Gemini API Reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini)
- [Google Cloud Console](https://console.cloud.google.com/)

## 💡 Tips

- Use **lower temperature** (0.1-0.3) for factual/code generation
- Use **higher temperature** (0.7-0.9) for creative writing
- Use **gemini-1.5-flash** for faster, cheaper responses
- Use **gemini-1.5-pro** for complex reasoning tasks
- Implement **rate limiting** to avoid quota issues
