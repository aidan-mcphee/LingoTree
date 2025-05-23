import React, { useEffect } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import Graph from "graphology";
import { calculateDepths, calculatePositions } from "../utils/graphUtils";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";

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
                size: 15,
                label: node.title, 
                color: "#FA4F40",
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