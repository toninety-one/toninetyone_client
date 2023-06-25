import React, {FC, PropsWithChildren, useState} from "react";
import styles from "./list.module.scss"
import NotEnoughItems from "./notEnough/NotEnoughItems.tsx";

type Props = {
    title: string;
    notEnoughMessage?: string
    collapsable?: boolean;
}

const List: FC<PropsWithChildren<Props>> = ({children, title, collapsable, notEnoughMessage}) => {

    const [collapsed, setCollapsed] = useState(false);

    const emptyMessage: string = notEnoughMessage ?? "Список пуст";

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
                {!collapsed && (React.Children.count(children) ? children : <NotEnoughItems title={emptyMessage}/>)}
            </div>
        </div>
    );
};
export default List;
