import ListItem from "../../ui/list/item/ListItem.tsx";
import {useGetGroupsQuery} from "../../../types/group/group.api.slice.ts";
import List from "../../ui/list/List.tsx";
import useHeader from "../../../hooks/useHeader.ts";
import Loader from "../../ui/loader/Loader.tsx";
import ControlsContainer from "../../ui/controls/ControlsContainer.tsx";
import ControlsItem from "../../ui/controls/controlsItem/ControlsItem.tsx";

const Group = () => {

    useHeader("Группы")

    const {data, isLoading} = useGetGroupsQuery(null);

    return isLoading ? (<Loader/>) : (
        <List title={"Все группы"} notEnoughMessage={"Список групп пуст"}>
            <ControlsContainer>
                <ControlsItem title={"Создать"} path={'create'}/>
            </ControlsContainer>

            {data?.groups && data?.groups?.map(g =>
                <ListItem key={g.id} title={g.title} path={`/group/${g.id}`}></ListItem>)}
        </List>
    );
};
export default Group;

