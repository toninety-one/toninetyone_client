import {useNavigate, useParams} from "react-router-dom";
import {
    useAddDisciplineToGroupMutation,
    useDeleteGroupMutation,
    useGetGroupByIdQuery,
    useUpdateGroupMutation
} from "../../../../types/group/group.api.slice.ts";
import {useForm} from "react-hook-form";
import {IGroup, IGroupDiscipline} from "../../../../types/group/group.interface.ts";
import useHeader from "../../../../hooks/useHeader.ts";
import Loader from "../../../ui/loader/Loader.tsx";
import List from "../../../ui/list/List.tsx";
import ListItem from "../../../ui/list/item/ListItem.tsx";
import DetailsContainer from "../../../ui/detailsContainer/DetailsContainer.tsx";
import DetailsProperty from "../../../ui/detailsContainer/property/DetailsProperty.tsx";

const GroupDetails = () => {
    const {groupId} = useParams();
    const navigate = useNavigate();
    const {data, isLoading, refetch} = useGetGroupByIdQuery(groupId ? groupId : "");
    const [deleteGroup, {isLoading: deleteLoading}] = useDeleteGroupMutation();
    const [addDiscipline, {isLoading: addDisciplineLoading}] = useAddDisciplineToGroupMutation();
    const [updateGroup, {isLoading: updateLoading}] = useUpdateGroupMutation();

    const {register: registerDisciplineAdd, handleSubmit: handleSubmitDisciplineAdd} = useForm<IGroupDiscipline>({
        defaultValues: {
            groupId: groupId,
        }
    });

    const {register: registerUpdate, handleSubmit: handleSubmitUpdate} = useForm<IGroup>({
        defaultValues: {
            id: groupId,
            title: data?.title
        }
    });

    const onSubmit = async () => {
        deleteGroup(groupId ? groupId : "")
    }

    if (deleteLoading) {
        navigate("/group")
    }
    const onSubmitDisciplineAdd = async (data: IGroupDiscipline) => {
        await addDiscipline(data)
        refetch()
    };
    const onSubmitUpdate = async (data: IGroup) => {
        await updateGroup(data)
        refetch()
    };

    useHeader(data?.title ? data.title : "Дисциплина")

    return isLoading ? (<Loader/>) : (
        <div>
            <DetailsContainer title={"Группа"}>
                <DetailsProperty text={"Наименование"} data={data?.title ?? ""}/>
                <DetailsProperty text={"Аудитория"} data={data?.classRoom ? data.classRoom : "Отсутствует"}/>
                <DetailsProperty text={"Дата создания"} data={data?.creationDate ? data.creationDate : "Отсутствует"}/>
                <DetailsProperty text={"Дата изменения"} data={data?.editDate ? data.editDate : "Отсутствует"}/>
            </DetailsContainer>

            <List title={"Учащиеся"} notEnoughMessage={"Список учащихся пуст"}>
                {data?.users && data.users.map(u =>
                    <ListItem title={u.lastName + " " + u.firstName + " " + u.middleName} path={"/users/" + u.id}/>)}
            </List>

            <List title={"Дисциплины"} notEnoughMessage={"Список дисциплин пуст"}>
                {data?.disciplines && data.disciplines.map(d =>
                    <ListItem title={d.title} path={"/discipline/" + d.id}/>)}
            </List>

            {!updateLoading ?
                <form onSubmit={handleSubmitDisciplineAdd(onSubmitDisciplineAdd)}>
                    <input type="text"
                           placeholder="Номер дисциплины" {...registerDisciplineAdd("disciplineId", {})} />

                    <input type="submit"/>
                </form>
                : <Loader/>}

            {!addDisciplineLoading ? <form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
                    <input type="text" placeholder="Название группы" {...registerUpdate("title", {})} />

                    <input type="submit"/>
                </form>
                : <Loader/>}

            {!deleteLoading ? <div>
                    <button onClick={onSubmit}>delete</button>
                </div>
                : <Loader/>}
        </div>
    );
};
export default GroupDetails;
