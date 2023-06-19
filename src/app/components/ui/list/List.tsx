import {FC, PropsWithChildren, useState} from "react";
import styles from "./list.module.scss"

type Props = {
    title: string;
    collapsable?: boolean;
}

const List: FC<PropsWithChildren<Props>> = ({children, title, collapsable}) => {

    const [collapsed, setCollapsed] = useState(collapsable ?? false);

    const handleCollapse = () => {
        if (collapsable) {
            setCollapsed(!collapsed);
        }
    };

    return (
        <div className={styles.list__container}>

            <div
                className={styles.list__title + (collapsable ? " " + styles.list__title_collapsable : "") + (collapsed ? " " + styles.list__title_collapsed : "")}
                onClick={handleCollapse}>
                {title}
            </div>

            <div>
                {!collapsed && children}
            </div>
        </div>
    );
};
export default List;
