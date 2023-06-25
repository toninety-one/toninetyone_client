import Loader from "../../../../ui/loader/Loader.tsx";
import {FC} from "react";
import {useParams} from "react-router-dom";
import useHeader from "../../../../../hooks/useHeader.ts";
import DetailsContainer from "../../../../ui/detailsContainer/DetailsContainer.tsx";
import DetailsProperty from "../../../../ui/detailsContainer/property/DetailsProperty.tsx";
import List from "../../../../ui/list/List.tsx";
import ListItem from "../../../../ui/list/listItem/ListItem.tsx";
import {useGetSubmittedLabByIdQuery} from "../../../../../types/submittedLab/submittedLab.api.slice.ts";


const SubmittedLabDetails: FC = () => {
    const {labId, subId} = useParams();
    const {data, isLoading} = useGetSubmittedLabByIdQuery({labId: labId ?? "", subId: subId ?? ""});

    let title = data?.title ? data.title : "";

    if (isLoading) {
        title = "Сданная лабораторная работа";
    }

    useHeader(title)

    return (!isLoading ?
            <div>
                <DetailsContainer title={"Сданная лабораторная работа"}>
                    <DetailsProperty text={"Фамилия"} data={data?.selfUser.lastName ?? ""}/>
                    <DetailsProperty text={"Имя"} data={data?.selfUser.firstName ?? ""}/>
                    <DetailsProperty text={"Отчество"} data={data?.selfUser.middleName ?? ""}/>
                    <DetailsProperty text={"Номер группы"} data={data?.selfUser.groupId ?? ""}/>
                    <DetailsProperty text={"Оценка"} data={data?.mark ?? ""}/>
                    <DetailsProperty text={"Время создания"} data={data?.creationDate ?? ""}/>
                    <DetailsProperty text={"Время редактирования"} data={data?.editDate ?? ""}/>
                    <DetailsProperty text={"Номер лабораторной работы"} data={data?.selfLabWork.id ?? ""}/>
                    <DetailsProperty text={"Детали"} data={data?.details ?? ""}/>
                </DetailsContainer>

                <div>
                    <List title={"Файлы лабораторной работы"} collapsable={true}>

                        {data?.files.map(f =>
                            <ListItem key={f.id} title={f.fileName}
                                      filePath={import.meta.env.VITE_API_URL + "/" + f.path}/>)}
                    </List>

                </div>

            </div> : <Loader/>
    )
}


export default SubmittedLabDetails;
