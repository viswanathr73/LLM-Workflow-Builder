// import React, { useCallback } from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   addEdge,
//   useNodesState,
//   useEdgesState,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import { useWorkflow } from "../hooks/useWorkflow";
// import InputNode from "./nodes/InputNode"; // ✅ Import InputNode

// // ✅ Register Custom Nodes
// const nodeTypes = {
//   inputNode: InputNode,
// };

// const Workflow = () => {
//   const { initialNodes, initialEdges } = useWorkflow();

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback(
//     (connection) => setEdges((eds) => addEdge(connection, eds)),
//     [setEdges]
//   );

//   return (
//     <div className="relative h-screen w-full bg-gray-50">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes} // ✅ Register Custom Nodes
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background color="#aaa" gap={16} />
//       </ReactFlow>
//     </div>
//   );
// };

// export default Workflow;
