import React from "react";

export default function ContextMenu({ visible, x, y, items = [], onClose }) {
    if (!visible) return null;
    return (
        <ul
            style={{
                position: "fixed",
                top: y,
                left: x,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: 4,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                zIndex: 1000,
                padding: 0,
                margin: 0,
                listStyle: "none",
                minWidth: 100
            }}
        >
            {items.length > 0 ? (
                items.map((item, idx) => (
                    <li
                        key={idx}
                        style={{ padding: "8px 16px", cursor: "pointer" }}
                        onClick={() => {
                            item.onClick && item.onClick();
                            onClose && onClose();
                        }}
                    >
                        {item.label}
                    </li>
                ))
            ) : (
                <li style={{ padding: "8px 16px", color: "#999" }}>No options available</li>
            )}
        </ul>
    );
}
