import {useNavigate, useParams} from "react-router-dom";
import {
    useDeleteDisciplineMutation,
    useGetDisciplineByIdQuery,
    useUpdateDisciplineMutation
} from "../../types/Discipline/discipline.api.slice.ts";
import useAuth from "../../hooks/useAuth.ts";
import {Role} from "../../types/role.enum.ts";
import Loader from "../ui/loader/Loader.tsx";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {IDisciplineUpdate} from "../../types/Discipline/discipline.interface.ts";

const DisciplineDetails = () => {
    const auth = useAuth();

    const {disciplineId} = useParams();
    console.log(disciplineId)
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isFetching,
        refetch
    } = useGetDisciplineByIdQuery(disciplineId ? disciplineId : "", {refetchOnMountOrArgChange: true});
    const [deleteDiscipline, {isLoading: deleteLoading}] = useDeleteDisciplineMutation();
    const [updateDiscipline] = useUpdateDisciplineMutation();

    const {register, handleSubmit} = useForm<IDisciplineUpdate>();

    console.log(isFetching)

    useEffect(() => {
        if (isFetching) {
            refetch()
        }
    })

    if (isLoading) {
        return <Loader/>
    }


    console.log(data)

    const onSubmit = async () => {
        deleteDiscipline(disciplineId ? disciplineId : "").unwrap().then(() => {
            refetch();
        })
    }
    const onSubmitForm = (formBody: IDisciplineUpdate) => {
        formBody.id = disciplineId ? disciplineId : "";
        formBody.title = formBody.title ? formBody.title : data?.title ? data.title : formBody.title
        formBody.userId = formBody.userId ? formBody.userId : data?.userId ? data.userId : formBody.userId
        updateDiscipline(formBody)
        refetch()
        console.log(formBody)
    };

    if (deleteLoading) {
        navigate("/discipline")
    }

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <div>
                <h3>Изменить дисциплину</h3>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <input type="text" placeholder="Название" {...register("title", {})}/>
                    <br/>
                    <input type="text" placeholder="Номер пользователя" {...register("userId", {})}/>
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
            <div>
                {auth.user?.userRole === Role.Admin || auth.user?.id === data?.userId ? <div>
                    {deleteLoading ? <div>loading</div> : <div>
                        <h3>Удалить дисциплину</h3>
                        <button onClick={onSubmit}>Удалить</button>
                    </div>}
                </div> : <></>}
            </div>
        </div>
    );
};
export default DisciplineDetails;
