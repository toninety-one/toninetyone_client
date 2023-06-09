import {useParams} from "react-router-dom";
import Loader from "../../../../ui/loader/Loader.tsx";
import {useForm} from "react-hook-form";
import {ILabWorkCreate} from "../../../../../types/labWork/labWork.interface.ts";
import {useCreateLabWorkMutation} from "../../../../../types/labWork/labWork.api.slice.ts";

const DisciplineCreateLab = () => {

    const {disciplineId} = useParams();
    console.log(disciplineId)
    // const navigate = useNavigate();

    const [createLabWork, {isLoading}] = useCreateLabWorkMutation();

    const {register, handleSubmit} = useForm<ILabWorkCreate>();

    if (isLoading) {
        return <Loader/>
    }

    const onSubmit = async (data: ILabWorkCreate) => {
        data.disciplineId = disciplineId ? disciplineId : ""

        console.log(data)

        await createLabWork(data).unwrap().then(() => {
            // TODO navigate
        })
    }

    return (
        <div>
            <h3>Создать лабораторную работу</h3>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <input type="text" placeholder="title" {...register("title", {})} />
                <br/>
                <input type="text" placeholder="details" {...register("details", {})} />
                <br/> <input type="file" multiple placeholder="files" {...register("files", {})} />
                <br/>

                <input type="submit"/>
            </form>
        </div>
    );
};
export default DisciplineCreateLab;
