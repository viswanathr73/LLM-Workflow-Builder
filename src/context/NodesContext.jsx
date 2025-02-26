import { createContext, useContext, useState } from "react";

const NodesContext = createContext();

export const NodesProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [inputText, setInputText] = useState("");

  // API configuration
  const [apiProvider, setApiProvider] = useState("together"); // "openai" or "together"
  const [apiKey, setApiKey] = useState(
    import.meta.env.VITE_TOGETHER_API_KEY || ""
  );

  const [model, setModel] = useState(
    "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"
  );
  const [maxTokens, setMaxTokens] = useState(100);
  const [temperature, setTemperature] = useState(0.5);

  const [outputResponse, setOutputResponse] = useState("");

  // Execution states
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionError, setExecutionError] = useState(null);

  // Deployment states
  const [flowExecutedSuccessfully, setFlowExecutedSuccessfully] =
    useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  return (
    <NodesContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        inputText,
        setInputText,
        apiProvider,
        setApiProvider,
        apiKey,
        setApiKey,
        model,
        setModel,
        maxTokens,
        setMaxTokens,
        temperature,
        setTemperature,
        outputResponse,
        setOutputResponse,
        isExecuting,
        setIsExecuting,
        executionError,
        setExecutionError,
        flowExecutedSuccessfully,
        setFlowExecutedSuccessfully,
        isDeployed,
        setIsDeployed,
      }}
    >
      {children}
    </NodesContext.Provider>
  );
};

export const useNodes = () => useContext(NodesContext);
