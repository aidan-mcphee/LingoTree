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
                minWidth: 100,
                color: "#222",
                // Add dark mode support
                backgroundColor: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#23272f' : 'white',
                color: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#222',
                border: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? '1px solid #444' : '1px solid #ccc',
            }}
        >
            {items.length > 0 ? (
                items.map((item, idx) => (
                    <li
                        key={idx}
                        style={{
                            padding: "8px 16px",
                            cursor: "pointer",
                            color: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#222',
                        }}
                        onClick={() => {
                            item.onClick && item.onClick();
                            onClose && onClose();
                        }}
                    >
                        {item.label}
                    </li>
                ))
            ) : (
                <li style={{ padding: "8px 16px", color: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#aaa' : '#999' }}>No options available</li>
            )}
        </ul>
    );
}
