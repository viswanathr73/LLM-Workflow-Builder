import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  MarkerType,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { useNodes } from "../context/NodesContext";
import InputNode from "./nodes/input-node";
import LLMNode from "./nodes/llm-node";
import OutputNode from "./nodes/output-node";

const nodeTypes = {
  input: InputNode,
  llm: LLMNode,
  output: OutputNode,
};

const DragDropBackground = () => {
  const { setNodes: setGlobalNodes, setEdges: setGlobalEdges } = useNodes(); // Get global state functions

  // ✅ Manage nodes & edges with React Flow's built-in state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // ✅ Ensure only valid node connections (Input → LLM → Output)
  const isValidConnection = (source, target) => {
    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);

    if (!sourceNode || !targetNode) return false;

    const validConnections = {
      input: ["llm"],
      llm: ["output"],
      output: [],
    };
    return validConnections[sourceNode.type]?.includes(targetNode.type);
  };

  // ✅ Handle node connections with validation
  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;

      if (isValidConnection(source, target)) {
        const newEdge = {
          ...params,
          animated: true,
          style: { strokeDasharray: "5 5" },
          markerEnd: { type: MarkerType.ArrowClosed },
        };
        setEdges((eds) => addEdge(newEdge, eds)); // ✅ Update React Flow state
        setGlobalEdges((eds) => addEdge(newEdge, eds)); // ✅ Sync with global context
      }
    },
    [setEdges, setGlobalEdges, nodes]
  );

  // ✅ Handle dropping new nodes onto the canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow");

      if (!nodeType) return;

      const position = { x: event.clientX, y: event.clientY }; // ✅ Simple position (No project needed)

      const newNode = {
        id: `${nodeType}-${nodes.length + 1}`,
        type: nodeType,
        position,
        data: { isConnected: false },
      };

      setNodes((nds) => [...nds, newNode]); // ✅ Update local React Flow state
      setGlobalNodes((nds) => [...nds, newNode]); // ✅ Sync with global context
    },
    [nodes, setNodes, setGlobalNodes]
  );

  // ✅ Prevent default behavior when dragging over the canvas
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="relative w-full h-[calc(100vh-63px)] bg-gray-50">
      <ReactFlow
        nodes={nodes} // ✅ Uses React Flow state for smooth dragging
        edges={edges} // ✅ Uses React Flow state for edges
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

// ✅ Wrap the entire app with ReactFlowProvider at a higher level (App.jsx)
const DragDropWrapper = () => (
  <ReactFlowProvider>
    <DragDropBackground />
  </ReactFlowProvider>
);

export default DragDropWrapper;
