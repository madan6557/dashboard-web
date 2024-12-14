import React, { useState, useRef } from "react";
import "./DevTools.css";

const DevTools = ({ children }) => {
    const [position, setPosition] = useState({ x: 100, y: 100 }); // Posisi awal
    const [isDragging, setIsDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 }); // Offset posisi mouse

    const handleMouseDown = (e) => {
        setIsDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="devTools"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: "absolute",
                zIndex: 100,
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
                className="handle"
                onMouseDown={handleMouseDown}
            ></div>
            <div className="devTools-content">{children}</div>
        </div>
    );
};

export default DevTools;
