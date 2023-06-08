import {useNavigate, useParams} from "react-router-dom";
import {
    useAddDisciplineToGroupMutation,
    useDeleteGroupMutation,
    useGetGroupByIdQuery
} from "../../types/group/group.api.slice.ts";
import {useForm} from "react-hook-form";
import {IGroupDiscipline} from "../../types/group/group.interface.ts";

const GroupDetails = () => {
    const {groupId} = useParams();
    const navigate = useNavigate();
    const {data, isLoading} = useGetGroupByIdQuery(groupId ? groupId : "");
    const [deleteGroup, {isLoading: deleteLoading}] = useDeleteGroupMutation();
    const [addDiscipline] = useAddDisciplineToGroupMutation();

    const {register, handleSubmit, formState: {errors}} = useForm<IGroupDiscipline>();

    const onSubmit = async () => {
        deleteGroup(groupId ? groupId : "")
    }

    if (deleteLoading) {
        navigate("/group")
    }
    const onSubmitForm = (data: IGroupDiscipline) => {

        data.groupId = groupId ? groupId : "";
        addDiscipline(data)
        console.log(data)
    };

    console.log(errors);

    return isLoading ? (<div>loading</div>) : (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <div>
                {deleteLoading ? <div>loading</div> : <div>
                    <button onClick={onSubmit}>delete</button>
                </div>}
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <input type="text" placeholder="Номер дисциплины" {...register("disciplineId", {})} />

                    <input type="submit"/>
                </form>
            </div>
        </div>
    );
};
export default GroupDetails;
