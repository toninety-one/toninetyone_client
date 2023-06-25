import {useGetDisciplinesQuery} from "../../../types/discipline/discipline.api.slice.ts";
import "./discipline.scss"
import Loader from "../../ui/loader/Loader.tsx";
import {useEffect} from "react";
import ListItem from "../../ui/list/item/ListItem.tsx";
import List from "../../ui/list/List.tsx";
import ControlsContainer from "../../ui/controls/ControlsContainer.tsx";
import ControlsItem from "../../ui/controls/controlsItem/ControlsItem.tsx";
import {Role} from "../../../types/auth/role.enum.ts";
import useAuth from "../../../hooks/useAuth.ts";
import useHeader from "../../../hooks/useHeader.ts";

const Discipline = () => {
    useHeader("Дисциплины")

    const {data, isLoading, isFetching, refetch} = useGetDisciplinesQuery(null, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    const auth = useAuth()
    useEffect(() => {
        if (isFetching) {
            refetch()
        }
    })

    return isLoading ? (<Loader/>) : (
        <List title={"Все дисциплины"} notEnoughMessage={"Дисциплин нет"}>
            {auth.user?.userRole != Role.User ?
                <ControlsContainer>
                    <ControlsItem title={"Создать"} path={"create"}/>
                </ControlsContainer> : <></>}

            {data?.disciplines && data?.disciplines?.map(d =>
                <ListItem key={d.id} title={d.title} path={`/discipline/${d.id}`}></ListItem>)}
        </List>

    );
};
export default Discipline;
