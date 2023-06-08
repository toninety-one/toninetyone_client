import {useNavigate, useParams} from "react-router-dom";
import {useDeleteDisciplineMutation, useGetDisciplineByIdQuery} from "../../types/Discipline/discipline.api.slice.ts";
import useAuth from "../../hooks/useAuth.ts";
import {Role} from "../../types/role.enum.ts";

const DisciplineDetails = () => {
    const auth = useAuth();

    const {disciplineId} = useParams();
    const navigate = useNavigate();
    const {data, isLoading} = useGetDisciplineByIdQuery(disciplineId ? disciplineId : "");
    const [deleteDiscipline, {isLoading: deleteLoading}] = useDeleteDisciplineMutation();

    const onSubmit = async () => {
        deleteDiscipline(disciplineId ? disciplineId : "")
    }

    if (deleteLoading) {
        navigate("/discipline")
    }

    return isLoading ? (<div>loading</div>) : (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            {auth.user?.userRole === Role.Admin || auth.user?.id === data?.userId ? <div>
                {deleteLoading ? <div>loading</div> : <div>
                    <button onClick={onSubmit}>delete</button>
                </div>}
            </div> : <></>}
        </div>
    );
};
export default DisciplineDetails;
