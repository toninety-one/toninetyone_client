import {PropsWithChildren} from "react";
import styles from "./list.module.scss"

const List = ({children, title, collapsable}: PropsWithChildren<{ title: string, collapsable?: boolean }>) => {
    return (
        <div className={styles.list__container}>

            <div className={styles.list__title}>
                {title}
            </div>

            <div className={collapsable ? styles.list__children_collapsable : ""}>
                {children}
            </div>
        </div>
    );
};
export default List;
