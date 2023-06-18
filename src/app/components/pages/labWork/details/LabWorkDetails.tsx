import useHeader from "../../../../hooks/useHeader.ts";
import {FC} from "react";
import {useParams} from "react-router-dom";
import {useGetLabWorkByIdQuery} from "../../../../types/labWork/labwork.api.slice.ts";
import Loader from "../../../ui/loader/Loader.tsx";
import List from "../../../ui/list/List.tsx";
import ListItem from "../../../ui/list/listItem/ListItem.tsx";
import ControlsContainer from "../../../ui/controls/ControlsContainer.tsx";
import ControlsItem from "../../../ui/controls/controlsItem/ControlsItem.tsx";
import useAuth from "../../../../hooks/useAuth.ts";
import {Role} from "../../../../types/auth/role.enum.ts";

const LabWorkDetails: FC = () => {
    useHeader("Лабораторная работа")
    const {labId} = useParams();
    const {user} = useAuth();
    const {data, isLoading} = useGetLabWorkByIdQuery(labId ?? "");

    return (
        <div>
            {!isLoading ?
                <div>
                    <div>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                    <div>
                        {user?.userRole == Role.User ? (
                            <ControlsContainer>
                                <ControlsItem title={"Загрузить готовую лабораторную работу"} path={"submit"}/>
                            </ControlsContainer>) : ""}

                        <List title={"Файлы лабораторной работы"}>

                            {data?.files.map(f => <ListItem key={f.id} title={f.fileName}
                                                            filePath={import.meta.env.VITE_API_URL + "/" + f.path}/>)}
                        </List>
                    </div>


                </div> : <Loader/>}


        </div>
    )
}


export default LabWorkDetails;
