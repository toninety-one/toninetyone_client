import {useNavigate, useParams} from "react-router-dom";
import {useDeleteGroupMutation, useGetGroupByIdQuery} from "../../types/group/group.api.slice.ts";

const GroupDetails = () => {
    const {groupId} = useParams();
    const navigate = useNavigate();
    const {data, isLoading} = useGetGroupByIdQuery(groupId ? groupId : "");
    const [deleteGroup, {isLoading: deleteLoading}] = useDeleteGroupMutation();

    const onSubmit = async () => {
        deleteGroup(groupId ? groupId : "")
    }
    if (deleteLoading) {
        navigate("/group")
    }
    return isLoading ? (<div>loading</div>) : (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <div>
                {deleteLoading ? <div>loading</div> : <div>
                    <button onClick={onSubmit}>delete</button>
                </div>}
            </div>
        </div>
    );
};
export default GroupDetails;
