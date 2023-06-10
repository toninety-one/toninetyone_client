import {PropsWithChildren} from "react";

const DetailsContainer = ({children, title}: PropsWithChildren<{ title: string }>) => {

    return (
        <div>
            {title}
            {children}
        </div>
    )
};

export default DetailsContainer;
