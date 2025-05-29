import React, { useEffect, useState } from "react";
import { SigmaContainer, useLoadGraph, useSigma, useRegisterEvents } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import Graph from "graphology";
import NodePopup from "./NodePopup";
import ContextMenu from "./ContextMenu";
import { calculateDepths, calculatePositions } from "../utils/graphUtils";
import { OnClickNode } from "../utils/graphInputHandler";

function GraphEvents({ setPopupOpen, setPopupContent, setPopupTitle, setContextMenu }) {
    const sigma = useSigma();
    const registerEvents = useRegisterEvents();

    useEffect(() => {
        registerEvents({
            clickNode: (event) => OnClickNode(event.node, sigma, setPopupOpen, setPopupContent, setPopupTitle),
            rightClickNode: (event) => {
                const nodeAttributes = sigma.getGraph().getNodeAttributes(event.node);
                const {x, y} = nodeAttributes;

                const screenCoords = sigma.graphToViewport({ x, y });
                console.log("Screen coordinates:", screenCoords);

                setContextMenu({
                    visible: true,
                    x: screenCoords.x,
                    y: screenCoords.y,
                    node: event.node
                });
            }
        });
    }, [registerEvents]);
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
                size: 15,
                label: node.title, 
                color: "#FA4F40",
                metadata: {
                    markdown: node.lesson_md || "",
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
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState({ markdown: "", translations: [] });
    const [popupTitle, setPopupTitle] = useState("");
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, node: null });

    // Hide context menu on click elsewhere
    useEffect(() => {
        const handleClick = () => setContextMenu({ ...contextMenu, visible: false });
        if (contextMenu.visible) {
            window.addEventListener("click", handleClick);
        }
        return () => window.removeEventListener("click", handleClick);
    }, [contextMenu.visible]);

    return (
        <div className="w-full h-full" onContextMenu={e => e.preventDefault()} style={{ position: "relative" }} >
            <SigmaContainer className="w-full h-full">
                <LoadGraph data={data} />
                <GraphEvents setPopupOpen={setPopupOpen} setPopupContent={setPopupContent} setPopupTitle={setPopupTitle} setContextMenu={setContextMenu} />
            </SigmaContainer>
            <NodePopup open={popupOpen} onClose={() => setPopupOpen(false)} markdown={popupContent.markdown} translations={popupContent.translations} title={popupTitle} />
            <ContextMenu
                visible={contextMenu.visible}
                x={contextMenu.x}
                y={contextMenu.y}
                items={[
                    {
                        label: "Generate children",
                        onClick: () => {
                            console.log("Generate children for node:", contextMenu.node);
                        }
                    },
                    {
                        label : "Remove node",
                        onClick: () => {
                            console.log("Remove node:", contextMenu.node);
                        }
                    }
                ]}
                onClose={() => setContextMenu({ ...contextMenu, visible: false })}
            />
        </div>
    );
}