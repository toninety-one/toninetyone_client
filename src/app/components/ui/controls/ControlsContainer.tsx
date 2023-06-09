import "./controlsContainer.scss"
import {PropsWithChildren} from "react";

const ControlsContainer = ({children}: PropsWithChildren) => {
    return (
        <div className={"controls__container"}>
            {children}
        </div>
    )
}

export default ControlsContainer;