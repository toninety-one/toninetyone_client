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

    let isHaveControls = false;
    let isElementEmpty = false;

    // find controls and detect empty element
    (React.Children.toArray(children) as { type: { name: string } }[]).map(c => {
        if (c != null && c.type && c.type.name != null && c.type.name == "ControlsContainer"
        ) {
            isHaveControls = true;
        } else if (c == null || c.type == null) {
            isElementEmpty = true
        }
    })

    let itemsCount = React.Children.count(children);

    if (isHaveControls) {
        itemsCount--;
    }

    let child: React.ReactNode | "" = children;

    if (itemsCount == 0 || isElementEmpty && itemsCount == 1) {
        child = <>{child}<NotEnoughItems title={emptyMessage}/></>
    }

    if (collapsed) {
        child = ""
    }

    return (
        <div className={styles.list__container}>
            <div
                className={styles.list__title + (collapsable ? " " + styles.list__title_collapsable : "") + (collapsed ? " " + styles.list__title_collapsed : "")}
                onClick={handleCollapse}>
                {title}
            </div>
            <div>
                {child}
            </div>
        </div>
    );
};
export default List;
