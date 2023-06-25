import Loader from "../../../ui/loader/Loader.tsx";
import {useCreateGroupMutation} from "../../../../types/group/group.api.slice.ts";
import {useForm} from "react-hook-form";
import {IGroupCreate} from "../../../../types/group/group.interface.ts";
import {useState} from "react";

const CreateGroup = () => {
    const [createGroup, {isLoading}] = useCreateGroupMutation()
    const {register, handleSubmit} = useForm<IGroupCreate>()
    const [successText, setSuccessText] = useState("")

    const onSubmit = async (data: IGroupCreate) => {
        await createGroup(data)
        setSuccessText("Группа успешно создана")
    }

    return (!isLoading ?
            <>
                <div>{successText}</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Название группы" {...register("title", {})} />

                    <input type="submit"/>
                </form>
            </>
            : <Loader/>
    )
}

export default CreateGroup;