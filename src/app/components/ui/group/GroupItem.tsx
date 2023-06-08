import {IGroupLookup} from "../../../types/group/group.interface.ts";
import {Link} from "react-router-dom";

const GroupItem = ({item}: { item: IGroupLookup }) => {
    return (<div>
        <Link to={`/group/${item.id}`}>{item.id} - {item.title}</Link>
    </div>);
};
export default GroupItem;
