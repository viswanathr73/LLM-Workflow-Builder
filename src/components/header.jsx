import { HiOutlinePlay } from "react-icons/hi";
import { useCallback, useState } from "react";
import { useNodes } from "../context/NodesContext";

export default function Header({ nodes, edges, setNodes }) {
  const { inputText } = useNodes();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Run workflow validation and execution
  const runWorkflow = useCallback(() => {
    // Check if input is provided
    if (!inputText || inputText.trim() === "") {
      setErrorMessage("Please enter the input text before running the flow");
      setShowError(true);
      // Highlight input node with red border
      setNodes(nds => 
        nds.map(node => {
          if (node.type === 'input') {
            return {
              ...node,
              data: {
                ...node.data,
                hasError: true,
              }
            };
          }
          return node;
        })
      );
      return;
    }
    
    // Check if the flow is complete (input → llm → output)
    const hasInputToLLM = edges.some(e => 
      nodes.find(n => n.id === e.source)?.type === 'input' && 
      nodes.find(n => n.id === e.target)?.type === 'llm'
    );
    
    const hasLLMToOutput = edges.some(e => 
      nodes.find(n => n.id === e.source)?.type === 'llm' && 
      nodes.find(n => n.id === e.target)?.type === 'output'
    );
    
    if (!hasInputToLLM || !hasLLMToOutput) {
      setErrorMessage("Please connect all nodes in the correct order: Input → LLM → Output");
      setShowError(true);
      return;
    }
    
    // If all checks pass, run the workflow
    setShowError(false);
    // Process workflow logic would go here
    console.log("Running workflow with valid configuration");
  }, [inputText, nodes, edges, setNodes]);

  return (
    <>
      {showError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-3 rounded-md flex items-center max-w-md">
          <span className="mr-2">⚠️</span>
          <p>{errorMessage}</p>
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
          <button className="w-[78px] h-[31px] px-[15px] py-[7px] rounded-[8px] bg-gray-400 text-white text-[14px] font-semibold leading-[16.94px] border hover:bg-gray-500 cursor-pointer text-right font-inter">
            Deploy
          </button>

          <button 
            className="w-[78px] h-[31px] px-[15px] py-[7px] rounded-[8px] bg-green-600 text-white text-sm flex items-center gap-[5px] hover:bg-green-700"
            onClick={runWorkflow}
          >
            <HiOutlinePlay className="text-xl" />
            Run
          </button>
        </div>
      </header>
    </>
  );
}