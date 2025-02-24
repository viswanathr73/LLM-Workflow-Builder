// import { createContext, useState } from "react";

// export const WorkflowContext = createContext();

// export const WorkflowProvider = ({ children }) => {
//   const initialNodes = [
//     { id: "1", type: "inputNode", position: { x: 100, y: 100 }, data: { label: "Input" } },
//     { id: "2", type: "llmNode", position: { x: 300, y: 100 }, data: { label: "LLM" } },
//     { id: "3", type: "outputNode", position: { x: 500, y: 100 }, data: { label: "Output" } },
//   ];

//   const initialEdges = [];

//   return (
//     <WorkflowContext.Provider value={{ initialNodes, initialEdges }}>
//       {children}
//     </WorkflowContext.Provider>
//   );
// };

