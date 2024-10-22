import React, { useCallback } from 'react';
import type { NodeProps } from '@xyflow/react';
import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	BaseEdge,
	getStraightPath,
	Handle,
	Position,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css'; // Make sure to import the styles

function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
	const [edgePath] = getStraightPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	return <BaseEdge id={id} path={edgePath} />;
}

// Styles for the card and handle
const styles = {
	card: {
		padding: '20px',
		border: '2px solid #007bff',
		borderRadius: '8px',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
		backgroundColor: '#fff',
		position: 'relative',
		width: '200px',
	},
	handle: {
		backgroundColor: '#007bff',
		color: 'white',
		textAlign: 'center',
		padding: '10px',
		borderRadius: '5px',
		cursor: 'grab',
		marginBottom: '10px',
		fontWeight: 'bold',
		position: 'absolute',
		top: '-20px', // Position above the card
		left: '50%',
		transform: 'translateX(-50%)',
		width: '150px', // Width of the handle
	},
	content: {
		textAlign: 'left',
	},
};

const CustomCardNode = ({ data }: NodeProps) => {
	return (
		<div style={styles.card}>
			<div style={styles.handle} className="drag-handle">
				Drag Me
			</div>
			<div style={styles.content}>
				<h3>{data.title}</h3>
				<p>{data.description}</p>
			</div>
			<Handle type="source" position={Position.Right} />
			<Handle type="target" position={Position.Left} />
		</div>
	);
};

// Initial nodes configuration
const initialNodes = [
	{
		id: '1',
		type: 'customCard',
		data: { title: 'Card 1', description: 'This is a description of card 1.' },
		position: { x: 100, y: 100 },
		dragHandle: '.drag-handle', // Specify drag handle
	},
	{
		id: '2',
		type: 'customCard',
		data: { title: 'Card 2', description: 'This is a description of card 2.' },
		position: { x: 400, y: 100 },
		dragHandle: '.drag-handle',
	},
];

const initialEdges = [
	{ id: 'a->b', type: 'custom-edge', source: '1', target: '2' },
];

const edgeTypes = {
	'custom-edge': CustomEdge,
};

// Main Flow Component
const FlowComponent = () => {
	const [nodes, setNodes] = useNodesState(initialNodes);
	const [edges, setEdges] = useEdgesState(initialEdges);
	const onConnect = useCallback(
		(connection) => {
			const edge = { ...connection, type: 'custom-edge' };
			setEdges((eds) => addEdge(edge, eds));
		},
		[setEdges],
	);
	const onNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[setNodes],
	);
	const onEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges],
	);

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				edgeTypes={edgeTypes}
				nodeTypes={{ customCard: CustomCardNode }} // Register the custom node type
			/>
		</div>
	);
};

export default FlowComponent;
