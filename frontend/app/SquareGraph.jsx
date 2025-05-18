import React, { useEffect } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import Graph from "graphology";

export const LoadGraph = ({ data }) => {
    const loadGraph = useLoadGraph();

    useEffect(() => {
        const graph = new Graph();
        
        // Add nodes from JSON data
        data.forEach(node => {
            graph.addNode(node.id.toString(), {
                x: Math.random() * 10 - 5,  // Initial random position
                y: Math.random() * 10 - 5,
                size: 15,  // Base size
                label: node.name,
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