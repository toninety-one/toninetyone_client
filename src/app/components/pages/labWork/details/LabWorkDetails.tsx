import useHeader from "../../../../hooks/useHeader.ts";
import {FC} from "react";
import {useParams} from "react-router-dom";
import {useGetLabWorkByIdQuery} from "../../../../types/labWork/labwork.api.slice.ts";
import List from "../../../ui/list/List.tsx";
import ListItem from "../../../ui/list/listItem/ListItem.tsx";
import ControlsContainer from "../../../ui/controls/ControlsContainer.tsx";
import ControlsItem from "../../../ui/controls/controlsItem/ControlsItem.tsx";
import useAuth from "../../../../hooks/useAuth.ts";
import {Role} from "../../../../types/auth/role.enum.ts";
import Loader from "../../../ui/loader/Loader.tsx";
import DetailsContainer from "../../../ui/detailsContainer/DetailsContainer.tsx";
import DetailsProperty from "../../../ui/detailsContainer/property/DetailsProperty.tsx";

const LabWorkDetails: FC = () => {
    const {labId} = useParams();
    const {user} = useAuth();
    const {data, isLoading} = useGetLabWorkByIdQuery(labId ?? "");

    let title = data?.title ? data.title : "";

    if (isLoading) {
        title = "Лабораторная работа";
    }

    useHeader(title)

    return (!isLoading ?
            <div>
                <DetailsContainer title={"Лабораторная работа"}>
                    <DetailsProperty text={"Наименование"} data={data?.title ?? ""}/>
                    <DetailsProperty text={"Детали"} data={data?.details ?? ""}/>
                </DetailsContainer>

                <div>
                    {user?.userRole == Role.User && !data?.submittedLabs ? (

                        <ControlsContainer>
                            <ControlsItem title={"Загрузить готовую лабораторную работу"} path={"submit"}/>
                        </ControlsContainer>) : ""}

                    <List title={"Сданные лабораторные работы"}>
                        {data?.submittedLabs?.map(s =>
                            <ListItem key={s.id} title={s.lastName + " " + s.firstName + " " + s.middleName}
                                      optionalText={s.mark} path={s.id}/>)}
                    </List>

                    <List title={"Файлы лабораторной работы"} collapsable={true}>

                        {data?.files.map(f =>
                            <ListItem key={f.id} title={f.fileName}
                                      filePath={import.meta.env.VITE_API_URL + "/" + f.path}/>)}
                    </List>

                </div>

            </div> : <Loader/>
    )
}


export default LabWorkDetails;
