## AI-powered Chat with local Models

This document outlines a basic framework for integrating a large language model (like ChatGPT) into your application to enable interactive conversations.

**Getting Started**

1. **Install Dependencies**

   ```bash
   $ yarn
   ```

2. **Obtain Local model**
   - Install Ollama: https://ollama.com
   - After installing, open your terminal and run ollama pull <name of the model\>

**Code Overview**

- `ollama`: Connects to your local ollama via an API
- `promptSync`: Enables user input through the terminal prompt.
- `boxen` & `chalk` (Optional): Customize the conversation UI with colored boxes.
- `main` Function:
  - Processes user input and conversation history.
  - Sends prompts to the OpenAI model and retrieves responses.

**Running the Code**

1. Ensure you have the required dependencies installed (see Getting Started).
2. Run the script:

   ```bash
   yarn start
   ```

3. The program will initiate a chat session. Type your prompts and the AI will respond.
4. Type "exit" to terminate the conversation.

**Customization**

This is a basic example. You can extend it to integrate with your specific application logic and tailor the conversation flow for your needs.
