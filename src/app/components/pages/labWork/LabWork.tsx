import Loader from "../../ui/loader/Loader.tsx";
import {useEffect} from "react";
import ListItem from "../../ui/list/item/ListItem.tsx";
import List from "../../ui/list/List.tsx";
import useHeader from "../../../hooks/useHeader.ts";
import {useGetLabWorksQuery} from "../../../types/labWork/labwork.api.slice.ts";

const LabWork = () => {
    useHeader("Дисциплины")

    const {data, isLoading, isFetching, refetch} = useGetLabWorksQuery(null, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    useEffect(() => {
        if (isFetching) {
            refetch()
        }
    })

    return isLoading ? (<Loader/>) : (
        <List title={"Лабораторные работы"} notEnoughMessage={"Лабораторных работ нет"}>
            {data?.labWorks && data.labWorks?.map(l =>
                <ListItem key={l.id} title={l.title} path={`/labWork/${l.id}`}
                          optionalText={(l.mark ? l.mark + " - " : "") + l.disciplineTitle}></ListItem>)}
        </List>
    );
};
export default LabWork;
