import {useGetDisciplinesQuery} from "../../../types/discipline/discipline.api.slice.ts";
import DisciplineItem from "../../ui/discipline/DisciplineItem.tsx";
import "./discipline.scss"
import Loader from "../../ui/loader/Loader.tsx";
import {useEffect} from "react";

const Discipline = () => {

    const {data, isLoading, isFetching, refetch} = useGetDisciplinesQuery(null, {refetchOnMountOrArgChange: true, refetchOnFocus: true,});

    useEffect(()=>{
        if (isFetching){
            refetch()
        }
    })

    return isLoading ? (<Loader/>) : (
        <div className={"discipline__container"}>
            <div className={"discipline__title"}>Все дисциплины</div>
            {data?.disciplines && data.disciplines.length > 0 ? data?.disciplines?.map(d => <DisciplineItem key={d.id}
                                                                                                            item={d}></DisciplineItem>) :
                <div>дисциплин нет </div>}
        </div>
    );
};
export default Discipline;
