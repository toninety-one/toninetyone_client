import useAuth from "../../../../../hooks/useAuth.ts";
import {useNavigate, useParams} from "react-router-dom";
import {
    useDeleteDisciplineMutation,
    useGetDisciplineByIdQuery,
    useUpdateDisciplineMutation
} from "../../../../../types/discipline/discipline.api.slice.ts";
import {useForm} from "react-hook-form";
import {IDisciplineUpdate} from "../../../../../types/discipline/discipline.interface.ts";
import {useEffect} from "react";
import Loader from "../../../../ui/loader/Loader.tsx";
import {Role} from "../../../../../types/auth/role.enum.ts";
import useHeader from "../../../../../hooks/useHeader.ts";

const DisciplineDetailsManager = () => {
    const auth = useAuth();

    const {disciplineId} = useParams();

    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isFetching,
        refetch
    } = useGetDisciplineByIdQuery(disciplineId ? disciplineId : "", {refetchOnMountOrArgChange: true});
    const [deleteDiscipline, {isLoading: deleteLoading}] = useDeleteDisciplineMutation();
    const [updateDiscipline] = useUpdateDisciplineMutation();

    useHeader(data?.title ? data.title : "Дисциплина - управление")

    const {register, handleSubmit} = useForm<IDisciplineUpdate>({
        defaultValues: {
            id: disciplineId,
            userId: data?.userId,
            title: data?.title
        }
    });

    useEffect(() => {
        if (isFetching) {
            refetch()
        }
    })

    if (isLoading) {
        return <Loader/>
    }

    const onSubmit = async () => {
        deleteDiscipline(disciplineId ? disciplineId : "").unwrap().then(() => {
            refetch();
        })
    }
    const onSubmitForm = (formBody: IDisciplineUpdate) => {
        formBody.title = formBody.title ? formBody.title : ""
        formBody.userId = formBody.userId ? formBody.userId : ""
        updateDiscipline(formBody)
        refetch()
    };

    if (deleteLoading) {
        navigate("/discipline")
    }

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <div>
                {auth.user?.userRole === Role.Admin || auth.user?.id === data?.userId ?
                    <div>
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
                            {deleteLoading ? <Loader/> : <div>
                                <h3>Удалить дисциплину</h3>
                                <button onClick={onSubmit}>Удалить</button>
                            </div>}
                        </div>
                    </div> : <></>}
            </div>
        </div>
    );
};
export default DisciplineDetailsManager;
