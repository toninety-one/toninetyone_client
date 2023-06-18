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
            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>

            <div>
                {!updateLoading ?
                    <form onSubmit={handleSubmitDisciplineAdd(onSubmitDisciplineAdd)}>
                        <input type="text"
                               placeholder="Номер дисциплины" {...registerDisciplineAdd("disciplineId", {})} />

                        <input type="submit"/>
                    </form>
                    : <Loader/>}
            </div>

            <div>
                {!addDisciplineLoading ? <form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
                        <input type="text" placeholder="Название группы" {...registerUpdate("title", {})} />

                        <input type="submit"/>
                    </form>
                    : <Loader/>}
            </div>

            <div>
                {!deleteLoading ? <div>
                        <button onClick={onSubmit}>delete</button>
                    </div>
                    : <Loader/>}
            </div>
        </div>
    );
};
export default GroupDetails;
