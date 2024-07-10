import React, {useEffect, useState} from "react";
import "./Wrapper.css";
import RenderCircle from "./Circle.js"


function RenderWrapper() {
    return(
    <div className="Wrapper">
        <div className="col-1">
            <div>Tool Bar</div>
            <div><RenderCircle/></div>
        </div>
        <div className="col-2">View Window</div>
    </div>
    )
}

export default RenderWrapper