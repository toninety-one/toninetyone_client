import ListItem from "../ui/list/listItem/ListItem.tsx";
import {useGetGroupsQuery} from "../../types/group/group.api.slice.ts";
import List from "../ui/list/List.tsx";

const Group = () => {

    const {data, isLoading} = useGetGroupsQuery(null);

    return isLoading ? (<div>loading</div>) : (
        <List title={"Все группы"}>
            {data?.groups?.map(g => <ListItem key={g.id} title={g.title} path={`/group/${g.id}`}></ListItem>)}
        </List>
    );
};
export default Group;
