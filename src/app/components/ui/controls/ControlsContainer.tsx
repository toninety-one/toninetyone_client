import styles from "./controlsContainer.module.scss"
import {PropsWithChildren} from "react";

const ControlsContainer = ({children}: PropsWithChildren) => {
    return (
        <div className={styles.controls__container}>
            {children}
        </div>
    )
}

export default ControlsContainer;