import Loader from "../../../ui/loader/Loader.tsx";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useCreateDisciplineMutation} from "../../../../types/discipline/discipline.api.slice.ts";
import {IDisciplineCreate} from "../../../../types/discipline/discipline.interface.ts";

const CreateDiscipline = () => {
    const [createDiscipline, {isLoading}] = useCreateDisciplineMutation()
    const {register, handleSubmit} = useForm<IDisciplineCreate>()
    const [successText, setSuccessText] = useState("")

    const onSubmit = async (data: IDisciplineCreate) => {
        await createDiscipline(data)
        setSuccessText("Группа успешно создана")
    }

    return (
        <div>
            {!isLoading ?
                <>
                    <div>{successText}</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Название дисциплины" {...register("title", {})} />
                        <input type="text" placeholder="Номер пользователя" {...register("userId", {})} />

                        <input type="submit"/>
                    </form>
                </>
                : <Loader/>}
        </div>

    )
}

export default CreateDiscipline;