import React, { useEffect, useState } from "react";
import { SigmaContainer, useLoadGraph, useSigma, useRegisterEvents } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import Graph from "graphology";
import NodePopup from "./NodePopup";
import ContextMenu from "./ContextMenu";
import { calculateDepths, calculatePositions } from "../utils/graphUtils";
import { OnClickNode } from "../utils/graphInputHandler";
import { GenerateChildrenNodes } from "../utils/ContextMenuFunctions";

const NODESIZE = 15;
const EDGESIZE = 3;
const NODE_DISTANCE = 1000;

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

export const LoadGraph = ({ data, onGraphLoaded }) => {
    const loadGraph = useLoadGraph();
    const depthMap = calculateDepths(data);
    const positionMap = calculatePositions(data, depthMap, NODE_DISTANCE);

    useEffect(() => {
        const graph = new Graph();

        // Add nodes from JSON data
        data.forEach(node => {
            graph.addNode(node.id.toString(), {
                x: positionMap.get(node.id)?.x || 0,
                y: positionMap.get(node.id)?.y || 0,
                size: NODESIZE,
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
                    { type: "arrow", size: EDGESIZE }  // Custom edge properties
                );
            }
        });

        loadGraph(graph);

        if (onGraphLoaded) {
            onGraphLoaded(graph);
        }
    }, [data, loadGraph, onGraphLoaded]);

    return null;
};

function DynamicCameraBoundaries({ graph }) {
  const sigma = useSigma();
  useEffect(() => {
    const nodes = graph.nodes();
    const xs = nodes.map(id => graph.getNodeAttribute(id, "x"));
    const ys = nodes.map(id => graph.getNodeAttribute(id, "y"));
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const tolerance = Math.max(maxX - minX, maxY - minY) / 2;
    sigma.setSettings({ cameraPanBoundaries: { tolerance } });
  }, [graph]);
  return null;
}

export default function SquareGraph({ data }) {
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState({ markdown: "", translations: [] });
    const [popupTitle, setPopupTitle] = useState("");
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, node: null });
    const [graph, setGraph] = useState(null);

    // Hide context menu on click elsewhere
    useEffect(() => {
        const handleClick = () => setContextMenu({ ...contextMenu, visible: false });
        if (contextMenu.visible) {
            window.addEventListener("click", handleClick);
        }
        return () => window.removeEventListener("click", handleClick);
    }, [contextMenu.visible]);

    const settings = {
        minCameraRatio : 0.01,
        maxCameraRatio : 1,
        cameraPanBoundaries: { tolerance: 100 }
    }

    return (
        <div className="w-full h-full" onContextMenu={e => e.preventDefault()} style={{ position: "relative" }} >
            <SigmaContainer className="w-full h-full" settings={settings} zoomToSizeRatioFunction={() => 1}>
                <LoadGraph data={data} onGraphLoaded={setGraph} />
                {graph && <DynamicCameraBoundaries graph={graph} />}
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
                            GenerateChildrenNodes(contextMenu.node);
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