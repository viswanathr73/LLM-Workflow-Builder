import { createContext, useContext, useState } from "react";

const NodesContext = createContext();

export const NodesProvider = ({ children }) => {
  const [inputText, setInputText] = useState(""); // Stores user input
  const [apiKey, setApiKey] = useState(""); // API Key for LLM
  const [maxTokens, setMaxTokens] = useState(100); // Max token setting
  const [temperature, setTemperature] = useState(0.5); // Temperature setting
  const [model, setModel] = useState("gpt-3.5"); // Default model
  const [outputResponse, setOutputResponse] = useState(""); // LLM Response

  return (
    <NodesContext.Provider
      value={{
        inputText, setInputText,
        apiKey, setApiKey,
        maxTokens, setMaxTokens,
        temperature, setTemperature,
        model, setModel,
        outputResponse, setOutputResponse
      }}
    >
      {children}
    </NodesContext.Provider>
  );
};

// Custom hook for using context
export const useNodes = () => useContext(NodesContext);
