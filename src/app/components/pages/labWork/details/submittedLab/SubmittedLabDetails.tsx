import Loader from "../../../../ui/loader/Loader.tsx";
import {FC} from "react";
import {useParams} from "react-router-dom";
import useHeader from "../../../../../hooks/useHeader.ts";
import DetailsContainer from "../../../../ui/detailsContainer/DetailsContainer.tsx";
import DetailsProperty from "../../../../ui/detailsContainer/property/DetailsProperty.tsx";
import List from "../../../../ui/list/List.tsx";
import ListItem from "../../../../ui/list/item/ListItem.tsx";
import {
    useGetSubmittedLabByIdQuery,
    useMarkSubmittedLabMutation,
} from "../../../../../types/submittedLab/submittedLab.api.slice.ts";
import useAuth from "../../../../../hooks/useAuth.ts";
import {Role} from "../../../../../types/auth/role.enum.ts";
import {useForm} from "react-hook-form";
import {IMarkSubmittedLab} from "../../../../../types/submittedLab/submittedLab.interface.ts";
import Button from "../../../../ui/button/button.tsx";


const SubmittedLabDetails: FC = () => {
    const {labId, subId} = useParams();
    const {data, isLoading} = useGetSubmittedLabByIdQuery({labId: labId ?? "", subId: subId ?? ""});
    const {user} = useAuth();

    const [markSubmittedLab, {isLoading: isMarkLoading}] = useMarkSubmittedLabMutation();

    let title = data?.title ? data.title : "";

    const {register, handleSubmit} = useForm<IMarkSubmittedLab>({
        defaultValues: {
            subId,
            labId,
            mark: data?.mark
        }
    });
    const onSubmit = async (markData: IMarkSubmittedLab) => {
        console.log(markData)

        await markSubmittedLab(markData)
    };
    if (isLoading) {
        title = "Сданная лабораторная работа";
    }

    useHeader(title)

    return (!isLoading ?
            <>
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

                <List title={"Файлы лабораторной работы"} collapsable={true} notEnoughMessage={"Файлов нет"}>
                    {data?.files.map(f =>
                        <ListItem key={f.id} title={f.fileName}
                                  filePath={import.meta.env.VITE_API_URL + "/" + f.path}/>)}
                </List>

                {!isMarkLoading ? user?.userRole != Role.User &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <select {...register("mark", {required: true})}>
                            <option value="Ожидает проверки">Ожидает проверки</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="зачтено">зачтено</option>
                            <option value="сделано неверно">сделано неверно</option>
                        </select>

                        <Button button_type="submit" button_text={"Выставить отметку"}/>
                    </form>
                    : <Loader/>}


            </> : <Loader/>
    )
}


export default SubmittedLabDetails;
