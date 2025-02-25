import { HiOutlinePlay } from "react-icons/hi";
import { useCallback, useState } from "react";
import { useNodes } from "../context/NodesContext";
import { callOpenAI } from "../services/llmService";
import { callTogetherAI } from "../services/togetherAIService";

export default function Header() {
  const { 
    nodes, edges, inputText, 
    apiProvider, apiKey, model, maxTokens, temperature, 
    setOutputResponse, isExecuting, setIsExecuting, setExecutionError 
  } = useNodes();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
 
  const runWorkflow = useCallback(async () => {
    console.log("Running workflow...");
    console.log("Nodes:", nodes);
    console.log("Edges:", edges);
  
    if (!edges || !nodes || nodes.length === 0 || edges.length === 0) {
      setErrorMessage("Error: Workflow data is missing. Please check connections.");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
  
    // Check if input is provided
    if (!inputText || inputText.trim() === "") {
      setErrorMessage("Please enter the input text before running the flow");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    // Check if API key is provided
    if (!apiKey) {
      setErrorMessage(`Please provide an API key for ${apiProvider}`);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    // Check if nodes are connected in correct order
    const hasInputToLLM = edges.length > 0 && edges.some(e => 
      nodes.find(n => n.id === e.source)?.type === 'input' &&
      nodes.find(n => n.id === e.target)?.type === 'llm'
    );
    const hasLLMToOutput = edges.length > 0 && edges.some(e => 
      nodes.find(n => n.id === e.source)?.type === 'llm' &&
      nodes.find(n => n.id === e.target)?.type === 'output'
    );
  
    if (!hasInputToLLM || !hasLLMToOutput) {
      setErrorMessage("Please connect all nodes in the correct order: Input → LLM → Output");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
  
    // Call the appropriate LLM service based on provider
    setIsExecuting(true);
    try {
      let response;
      
      if (apiProvider === "openai") {
        response = await callOpenAI(inputText, apiKey, model, maxTokens, temperature);
      } else {
        response = await callTogetherAI(inputText, apiKey, model, maxTokens, temperature);
      }
      
      setOutputResponse(response);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setExecutionError(error.message);
      setErrorMessage(`Error: ${error.message}`);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsExecuting(false);
    }
  }, [inputText, apiProvider, apiKey, model, maxTokens, temperature, nodes, edges, setOutputResponse]);
  
  return (
    <>
      {showError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-3 rounded-md flex items-center max-w-md">
          <span className="mr-2">⚠️</span>
          <p>{errorMessage}</p>
        </div>
      )}
      
      {showSuccess && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-md w-full max-w-md">
          <button className="absolute top-2 right-2 text-white" onClick={() => setShowSuccess(false)}>
            ✕
          </button>
          <div className="flex items-center">
            <span className="mr-3 text-xl">✓</span>
            <div>
              <p className="font-medium">Flow ran successfully</p>
              <p className="text-sm mt-1">Your workflow is ready to be deployed</p>
            </div>
          </div>
        </div>
      )}
      
      <header className="flex h-[63px] items-center justify-between border-b border-gray-200 shadow-sm bg-white px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold">O</span>
          </div>
          <span className="font-semibold">OpenAGI</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-[78px] h-[31px] px-[15px] py-[7px] rounded-[8px] bg-gray-400 text-white text-[14px] font-semibold leading-[16.94px] border hover:bg-gray-500 cursor-pointer">
            Deploy
          </button>

          <button 
            className={`w-[78px] h-[31px] px-[15px] py-[7px] rounded-[8px] bg-green-600 text-white text-sm flex items-center gap-[5px] hover:bg-green-700 ${isExecuting ? 'opacity-75 cursor-not-allowed' : ''}`}
            onClick={runWorkflow}
            disabled={isExecuting}
          >
            <HiOutlinePlay className="text-xl" />
            {isExecuting ? "Running..." : "Run"}
          </button>
        </div>
      </header>
    </>
  );
}