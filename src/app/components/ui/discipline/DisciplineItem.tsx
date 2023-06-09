import {IDisciplineLookup} from "../../../types/discipline/discipline.interface.ts";
import {useNavigate} from "react-router-dom";
import "./disciplineItem.scss"

const DisciplineItem = ({item}: { item: IDisciplineLookup }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className={"discipline__item"} onClick={() => {
                navigate(`/discipline/${item.id}`)
            }}>
                {item.title}
            </div>
            <div className={"discipline__line"}/>
        </>
    );
};

export default DisciplineItem;
