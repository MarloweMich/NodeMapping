import React, {useEffect, useState} from "react";
import "./Wrapper.css";
import RenderCircle from "./Circle.js"
import RenderDiamond from "./Diamond.js"
import RenderSquare from "./Square.js";


function RenderWrapper() {
    return(
    <div className="Wrapper">
        <div className="col-1">
            <div>Tool Bar</div>
            <div className="ShapeContainer"><RenderCircle/></div>
            <div className="ShapeContainer"><RenderDiamond/></div>
            <div className="ShapeContainer"><RenderSquare/></div>
        </div>
        <div className="col-2"></div>
    </div>
    )
}

export default RenderWrapper