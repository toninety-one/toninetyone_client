import {Link, useParams} from "react-router-dom";
import {useGetDisciplineByIdQuery,} from "../../../../types/discipline/discipline.api.slice.ts";
import Loader from "../../../ui/loader/Loader.tsx";
import {useEffect} from "react";
import "./disciplineDetails.scss"
import LabWorkItem from "../../../ui/labWork/LabworkItem.tsx";

const DisciplineDetails = () => {

    const {disciplineId} = useParams();

    const {
        data,
        isLoading,
        isFetching,
        refetch
    } = useGetDisciplineByIdQuery(disciplineId ? disciplineId : "", {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    });

    useEffect(() => {
        if (isFetching) {
            refetch()
        }
    })

    if (isLoading) {
        return <Loader/>
    }

    return isLoading ? (<Loader/>) : (
        <div className={"disciplineDetails__container"}>

            <div className={"disciplineDetails__title"}>
                Лабораторные работы
            </div>
            <div className={"disciplineDetails__controls"}>
                <Link to={"manager"}>manage</Link>
                <Link to={"createLab"}>create lab</Link>
            </div>

            {data?.labWorks && data.labWorks.length > 0 ? data?.labWorks?.map(l => <LabWorkItem key={l.id}
                                                                                                item={l}></LabWorkItem>) :
                <div>дисциплин нет </div>}
        </div>
    );
};
export default DisciplineDetails;
