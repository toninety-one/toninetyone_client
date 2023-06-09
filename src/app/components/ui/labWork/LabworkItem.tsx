import {useNavigate} from "react-router-dom";
import "./labWorkItem.scss"
import {ILabWork} from "../../../types/labWork/labWork.interface.ts";

const LabWorkItem = ({item}: { item: ILabWork }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className={"labWork__item"} onClick={() => {
                navigate(`/labWork/${item.id}`)
            }}>
                {item.title}
            </div>
            <div className={"labWork__line"}/>
        </>
    );
};

export default LabWorkItem;
