import {Link} from "react-router-dom";
import {IDisciplineLookup} from "../../../types/Discipline/discipline.interface.ts";

const GroupItem = ({item}: { item: IDisciplineLookup }) => {
    return (<div>
        <Link to={`/discipline/${item.id}`}>{item.id} - {item.title}</Link>
    </div>);
};
export default GroupItem;
