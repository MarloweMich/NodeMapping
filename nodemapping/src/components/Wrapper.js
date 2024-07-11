import React, { useState } from "react";
import RenderLined from "./Lined.js";
import RenderSquare from "./Square.js";
import RenderDiamond from "./Diamond.js";
import RenderCircle from "./Circle.js";
import "./Wrapper.css";

function RenderWrapper() {
    const [selectedElement, setSelectedElement] = useState(null);
    const [shapes, setShapes] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [draggedShape, setDraggedShape] = useState(null);
    const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
    const [draggedShapeId, setDraggedShapeId] = useState(null); // Track which shape is being dragged

    // Function to handle shape selection from toolbar
    const selectElement = (id) => {
        setSelectedElement(id);
    };

    // Function to handle mouse down event
    const onMouseDown = (e, shapeType) => {
        // Prevent default browser behavior for drag and drop
        e.preventDefault();

        // Calculate offset relative to the shape's top-left corner
        const offsetX = e.clientX - e.target.getBoundingClientRect().left;
        const offsetY = e.clientY - e.target.getBoundingClientRect().top;

        // Store initial offset and shape type for new shape creation
        setDragStartOffset({ x: offsetX, y: offsetY });
        setDraggedShape({ type: shapeType });
        setDragging(true);
    };

    // Function to handle mouse move event
    const onMouseMove = (e) => {
        if (dragging && draggedShape) {
            // Update dragged shape position for new shape creation
            setDraggedShape((prev) => ({
                ...prev,
                x: e.clientX - dragStartOffset.x,
                y: e.clientY - dragStartOffset.y
            }));
        } else if (draggedShapeId !== null) {
            // Update existing shape position if dragging an existing shape
            const updatedShapes = shapes.map((shape) =>
                shape.id === draggedShapeId
                    ? {
                        ...shape,
                        x: e.clientX - dragStartOffset.x,
                        y: e.clientY - dragStartOffset.y
                    }
                    : shape
            );
            setShapes(updatedShapes);
        }
    };

    // Function to handle mouse up event
    const onMouseUp = (e) => {
        if (dragging && draggedShape) {
            // Get the viewWindow element and its bounding rectangle
            const viewWindow = document.getElementById("viewWindow");
            const viewRect = viewWindow.getBoundingClientRect();

            // Calculate drop position relative to viewWindow for new shape creation
            const dropX = e.clientX - viewRect.left - dragStartOffset.x;
            const dropY = e.clientY - viewRect.top - dragStartOffset.y;

            // Check if drop position is within viewWindow bounds for new shape
            if (dropX >= 0 && dropX <= viewRect.width && dropY >= 0 && dropY <= viewRect.height) {
                // Add the dragged shape to the shapes array at the drop position
                setShapes((prevShapes) => [
                    ...prevShapes,
                    {
                        type: draggedShape.type,
                        x: dropX,
                        y: dropY,
                        id: Date.now() // Unique ID for each shape
                    }
                ]);
            }

            // Reset dragging state and draggedShape state
            setDragging(false);
            setDraggedShape(null);
        }

        // Reset draggedShapeId after mouse up
        setDraggedShapeId(null);
    };

    // // Function to delete a shape by its ID
    // const deleteShape = (id) => {
    //     const updatedShapes = shapes.filter((shape) => shape.id !== id);
    //     setShapes(updatedShapes);
    // };

    // Function to start dragging an existing shape
    const startDragShape = (e, id) => {
        setDraggedShapeId(id);
        setDragging(true); // Start dragging immediately
        const shape = shapes.find((shape) => shape.id === id);
        setDragStartOffset({
            x: e.clientX - shape.x,
            y: e.clientY - shape.y
        });
    };


    // Function to render shape component based on type
    const renderShapeComponent = (type) => {
        switch (type) {
            case "circle":
                return <RenderCircle />;
            case "diamond":
                return <RenderDiamond />;
            case "square":
                return <RenderSquare />;
            case "lined":
                return <RenderLined />;
            default:
                return null;
        }
    };

    return (
        <div className="Wrapper">
            {/* Column 1: Tool bar */}
            <div className="col-1">
                <div>Tool Bar</div>
                {/* Shape containers in toolbar */}
                <div
                    className="ShapeContainer"
                    onMouseDown={(e) => onMouseDown(e, "circle")}
                >
                    <RenderCircle />
                </div>
                <div
                    className="ShapeContainer"
                    onMouseDown={(e) => onMouseDown(e, "diamond")}
                >
                    <RenderDiamond />
                </div>
                <div
                    className="ShapeContainer"
                    onMouseDown={(e) => onMouseDown(e, "square")}
                >
                    <RenderSquare />
                </div>
                <div
                    className="ShapeContainer"
                    onMouseDown={(e) => onMouseDown(e, "lined")}
                >
                    <RenderLined />
                </div>
            </div>
            {/* Column 2: View window for shapes */}
            <div
                className="col-2"
                id="viewWindow"
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            >
                {/* // Render existing shapes */}
                {shapes.map((shape) => (
                    <div
                        key={shape.id}
                        className="dragging-element"
                        style={{ left: shape.x, top: shape.y, position: "absolute" }}
                        onMouseDown={(e) => startDragShape(e, shape.id)}
                    >
                        {renderShapeComponent(shape.type)}
                        {/* <button
                            className="delete-button"
                            onClick={() => deleteShape(shape.id)}
                        >
                            X
                        </button> */}
                    </div>
                ))}

                {/* Render the currently dragged shape for new shape creation */}
                {dragging && draggedShape && (
                    <div
                        className="dragging-element"
                        style={{
                            left: draggedShape.x,
                            top: draggedShape.y,
                            position: "absolute"
                        }}
                    >
                        {renderShapeComponent(draggedShape.type)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RenderWrapper;
