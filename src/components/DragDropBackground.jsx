import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
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

// Define valid connections map
const validConnections = {
  input: ["llm"],
  llm: ["output"],
  output: [],
};

const DragDropBackground = () => {
  const { inputText } = useNodes();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check if a connection is valid based on node types
  const isValidConnection = (source, target) => {
    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);
    
    if (!sourceNode || !targetNode) return false;
    
    const allowedTargets = validConnections[sourceNode.type] || [];
    return allowedTargets.includes(targetNode.type);
  };

  // Handle connections between nodes with validation
  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;
      
      // Only add the edge if the connection is valid
      if (isValidConnection(source, target)) {
        const newEdge = {
          ...params,
          animated: true,
          style: { strokeDasharray: '5 5' },
          markerEnd: { type: MarkerType.ArrowClosed },
        };
        setEdges((eds) => addEdge(newEdge, eds));
        
        // Update connection status in nodes
        updateNodeConnectionStatus();
      }
    },
    [setEdges, nodes]
  );

  // Update nodes to reflect connection status
  const updateNodeConnectionStatus = useCallback(() => {
    setNodes(nds => 
      nds.map(node => {
        // Check if this node has any connections
        const hasIncomingEdge = edges.some(e => e.target === node.id);
        const hasOutgoingEdge = edges.some(e => e.source === node.id);
        
        return {
          ...node,
          data: {
            ...node.data,
            isConnected: hasIncomingEdge || hasOutgoingEdge,
          }
        };
      })
    );
  }, [edges, setNodes]);

  // Update connection status when edges change
  useEffect(() => {
    updateNodeConnectionStatus();
  }, [edges, updateNodeConnectionStatus]);

  // Allow dropping new nodes onto the canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow");

      if (!nodeType) return;

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 60,
      };

      const newNode = {
        id: `${nodeType}-${nodes.length + 1}`,
        type: nodeType,
        position,
        data: {
          isConnected: false,
        },
        draggable: true,
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

  // Remove error from input node when input text changes
  useEffect(() => {
    if (inputText && inputText.trim() !== "") {
      setNodes(nds => 
        nds.map(node => {
          if (node.type === 'input') {
            return {
              ...node,
              data: {
                ...node.data,
                hasError: false,
              }
            };
          }
          return node;
        })
      );
      
      if (showError && errorMessage.includes("input text")) {
        setShowError(false);
      }
    }
  }, [inputText, setNodes, showError, errorMessage]);

  return (
    <div className="relative w-full h-[calc(100vh-63px)] bg-gray-50">
      {showError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-3 rounded-md flex items-center max-w-md">
          <span className="mr-2">⚠️</span>
          <p>{errorMessage}</p>
        </div>
      )}
      
     
      
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