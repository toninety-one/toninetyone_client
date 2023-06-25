import {PropsWithChildren} from "react";
import styles from "./detailsContainer.module.scss";

const DetailsContainer = ({children, title}: PropsWithChildren<{ title: string }>) => {

    return (
        <div className={styles.details__container}>
            <div className={styles.details__title}>{title}</div>
            <table>
                {children}
            </table>
        </div>
    )
};

export default DetailsContainer;
