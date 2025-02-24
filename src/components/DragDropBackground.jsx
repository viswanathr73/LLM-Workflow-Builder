import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
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
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Handle connections between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Allow dropping new nodes onto the canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow");

      if (!nodeType) return;

      const position = {
        x: event.clientX - 250, // Adjust position slightly to center it
        y: event.clientY - 60,
      };

      const newNode = {
        id: `${nodes.length + 1}`,
        type: nodeType,
        position,
        data: {},
        draggable: true, // Ensure new nodes are draggable
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, setNodes]
  );

  // Prevent default behavior when dragging over the canvas
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="relative w-full h-[calc(100vh-63px)] bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
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

export default DragDropBackground;
