import GroupItem from "../ui/group/GroupItem.tsx";
import {useGetGroupsQuery} from "../../types/group/group.api.slice.ts";

const Group = () => {

    const {data, isLoading} = useGetGroupsQuery(null);

    return isLoading ? (<div>loading</div>) : (
        <div>
            {data?.groups?.map(g => <GroupItem key={g.id} item={g}></GroupItem>)}
        </div>
    );
};
export default Group;
