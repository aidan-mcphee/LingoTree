import React, { useEffect } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import Graph from "graphology";

const calculateDepths = (nodes) => {
    const depthMap = new Map();

    // Initialize depths
    nodes.forEach(node => {
        if (node.parent_id === null) {
            depthMap.set(node.id, 0);
        }
    });

    // Iteratively determine depths
    let changed;
    do {
        changed = false;
        nodes.forEach(node => {
            if (!depthMap.has(node.id) && node.parent_id !== null) {
                const parentDepth = depthMap.get(node.parent_id);
                if (parentDepth !== undefined) {
                    depthMap.set(node.id, parentDepth + 1);
                    changed = true;
                }
            }
        });
    } while (changed);

    return depthMap;
};

const circularCoordsToCartesian = (radius, angle, center) => {
    return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
    };
}

const calculatePositions = (nodes, depthMap) => {
    const positionMap = new Map();
    const childrenMap = new Map();
    const angleRanges = new Map(); // Stores { startAngle, angleSpan } for each node

    // 1. Build hierarchy and find root
    let rootNode = null;
    nodes.forEach(node => {
        if (node.parent_id === null) {
            rootNode = node;
            angleRanges.set(node.id, { 
                startAngle: 0, 
                angleSpan: 360 
            });
        } else {
            childrenMap.set(node.parent_id, [
                ...(childrenMap.get(node.parent_id) || []),
                node
            ]);
        }
    });

    // 2. Process nodes in BFS order to ensure parents are processed first
    const queue = [rootNode];
    positionMap.set(rootNode.id, { x: 0, y: 0 });

    while (queue.length > 0) {
        const parentNode = queue.shift();
        const children = childrenMap.get(parentNode.id) || [];
        const numChildren = children.length;
        
        if (numChildren === 0) continue;

        // 3. Get parent's angle allocation
        const { startAngle: parentStart, angleSpan: parentSpan } = angleRanges.get(parentNode.id);
        const childAngleSpan = parentSpan / numChildren;
        const radius = depthMap.get(parentNode.id) + 1; // Depth-based radius

        children.forEach((child, index) => {
            // 4. Calculate child's angle range
            const childStart = parentStart + (index * childAngleSpan);
            const childCenterAngle = childStart + (childAngleSpan / 2);
            
            // 5. Store angle range for children's children
            angleRanges.set(child.id, {
                startAngle: childStart,
                angleSpan: childAngleSpan
            });

            // 6. Convert to Cartesian coordinates
            const pos = circularCoordsToCartesian(
                radius,
                childCenterAngle * (Math.PI / 180), // Convert to radians
                { x: 0, y: 0 } // Center point
            );

            positionMap.set(child.id, pos);
            queue.push(child);
        });
    }

    return positionMap;
};


export const LoadGraph = ({ data }) => {
    const loadGraph = useLoadGraph();
    const depthMap = calculateDepths(data);
    const positionMap = calculatePositions(data, depthMap);

    useEffect(() => {
        const graph = new Graph();

        // Add nodes from JSON data
        data.forEach(node => {
            graph.addNode(node.id.toString(), {
                x: positionMap.get(node.id)?.x || 0,
                y: positionMap.get(node.id)?.y || 0,
                size: 15,  // Base size
                label: node.name,  // Label with depth
                color: "#FA4F40",
                // Add custom properties from your JSON
                meta: {
                    is_universal: node.is_universal,
                    parent_id: node.parent_id
                }
            });
        });

        // Create hierarchy edges based on parent_id
        data.forEach(node => {
            if (node.parent_id !== null) {
                graph.addEdge(
                    node.parent_id.toString(),
                    node.id.toString(),
                    { type: "arrow", size: 3 }  // Custom edge properties
                );
            }
        });

        loadGraph(graph);
    }, [data, loadGraph]);

    return null;
};

export default function SquareGraph({ data }) {
    return (
        <div className="w-full h-full">
            <SigmaContainer className="w-full h-full">
                <LoadGraph data={data} />
            </SigmaContainer>
        </div>
    );
}