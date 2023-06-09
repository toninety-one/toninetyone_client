import {PropsWithChildren} from "react";
import "./list.scss"

const List = ({children, title}: PropsWithChildren<{ title: string }>) => {
    return (
        <div className={"list__container"}>

            <div className={"list__title"}>
                {title}
            </div>

            {children}
        </div>
    );
};
export default List;
