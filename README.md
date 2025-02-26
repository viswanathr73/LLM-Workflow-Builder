# LLM Workflow Builder

## 📌 Overview
The **LLM Workflow Builder** is a web-based application that allows users to visually create and deploy workflows involving **Large Language Models (LLMs)** such as **OpenAI (GPT-3.5/4)** and **LLaMA (via Together AI)**. Users can drag and drop nodes onto a canvas, connect them in a structured manner, execute workflows, and deploy a chat interface with stored chat history.

## 🚀 Features
### 🖱️ **Workflow UI**
- **Drag-and-Drop Functionality**: Users can visually add Input, LLM, and Output nodes onto a canvas.
- **Node Connections**: Ensures valid connections where:
  - The **Input Node** can only connect to the **LLM Node**.
  - The **LLM Node** can only connect to the **Output Node**.

### 🔗 **Node Functionalities**
- **Input Node**:
  - Accepts user queries or prompts.
  - Validates input before sending it to the LLM.
- **LLM Node**:
  - Allows users to configure **OpenAI** or **Together AI (LLaMA)** models.
  - Supports model parameters like **max tokens, temperature, top_p, frequency_penalty, presence_penalty**.
- **Output Node**:
  - Displays the generated response from the LLM.

### ▶️ **Workflow Execution**
- **Run Button**: Executes the workflow and fetches a response from the selected LLM.
- **Error Handling**: Detects and informs users about missing inputs, incorrect connections, or API errors.

### 📤 **Deployment & Chat Interface**
- **Deploy Button**: Deploys the workflow and opens a chat interface.
- **Chat UI**:
  - Users can interact with the deployed workflow like a chatbot.
  - Supports both OpenAI and Together AI models.
- **Chat History**:
  - Stores previous chat conversations locally.
  - Displays old chats on the left side (similar to ChatGPT).
- **Undeployment**: Allows users to return from the chat interface to the workflow canvas.

## 🛠️ **Tech Stack**
- **React** - Frontend framework for UI.
- **React Flow** - Interactive workflow builder.
- **OpenAI API** - For GPT-based LLM execution.
- **Together AI API** - For LLaMA-based LLM execution.
- **React Context API** - State management.
- **LocalStorage** - Storing chat history.
- **Tailwind CSS** - UI styling.

## 📦 **Installation & Setup**
### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/viswanathr73/LLM-Workflow-UI.git
cd llm-workflow-builder
```

### 2️⃣ **Install Dependencies**
```bash
npm install
```

### 3️⃣ **Set Up API Keys**
Create a `.env` file in the root directory and add:
```env
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_TOGETHER_API_KEY=your_together_ai_key
```

### 4️⃣ **Run the Application**
```bash
npm run dev
```

## 📖 **Usage Guide**
1️⃣ **Create a Workflow**: Drag Input, LLM, and Output nodes onto the canvas and connect them.  
2️⃣ **Configure LLM**: Select the model and set parameters in the LLM Node.  
3️⃣ **Run the Workflow**: Click the "Run" button to process the query.  
4️⃣ **Deploy the Workflow**: Click "Deploy" to enter the chat UI.  
5️⃣ **Interact in Chat**: Ask questions and retrieve responses from the deployed LLM.  
6️⃣ **View Chat History**: Previous conversations are saved and listed in the sidebar.  
7️⃣ **Undeploy**: Click "Undeploy & Return" to switch back to workflow editing.  

## 📌 **Future Enhancements**
- Implement backend storage for chat history.
- Support exporting/importing workflows.
- Improve UI with more drag-and-drop features.

## 📜 **License**
This project is licensed under the MIT License. Feel free to use and modify it as needed.

---
🎯 **Built for AI workflow automation with React & LLMs!** 🚀

