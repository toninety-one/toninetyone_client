import {useParams} from "react-router-dom";
import {useGetDisciplineByIdQuery,} from "../../../../types/discipline/discipline.api.slice.ts";
import Loader from "../../../ui/loader/Loader.tsx";
import {useEffect} from "react";
import "./disciplineDetails.scss"
import ListItem from "../../../ui/list/listItem/ListItem.tsx";
import List from "../../../ui/list/List.tsx";
import ControlsContainer from "../../../ui/controls/ControlsContainer.tsx";
import ControlsItem from "../../../ui/controls/controlsItem/ControlsItem.tsx";
import useAuth from "../../../../hooks/useAuth.ts";
import {Role} from "../../../../types/role.enum.ts";

const DisciplineDetails = () => {

    const {disciplineId} = useParams();
    const auth = useAuth()

    const {
        data,
        isLoading,
        isFetching,
        refetch
    } = useGetDisciplineByIdQuery(disciplineId ? disciplineId : "", {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    });

    useEffect(() => {
        if (isFetching) {
            refetch()
        }
    })

    if (isLoading) {
        return <Loader/>
    }

    return isLoading ? (<Loader/>) : (
        <List title={"Лабораторные работы"}>
            {auth.user?.userRole != Role.User ? <ControlsContainer>
                    <ControlsItem title={"Управление"} path={"manager"}/>
                    <ControlsItem title={"Создать лабораторную работу"} path={"createLab"}/>
                </ControlsContainer>
                : <></>}

            {data?.labWorks && data.labWorks.length > 0 ? data?.labWorks?.map(l => <ListItem key={l.id} title={l.title}
                                                                                             path={`/labwork/${l.id}`}></ListItem>) :
                <div>дисциплин нет </div>}
        </List>
    );
};
export default DisciplineDetails;
