import {useGetDisciplinesQuery} from "../../types/Discipline/discipline.api.slice.ts";
import DisciplineItem from "../ui/discipline/DisciplineItem.tsx";

const Discipline = () => {

    const {data, isLoading} = useGetDisciplinesQuery(null, {refetchOnMountOrArgChange: true});

    return isLoading ? (<div>loading</div>) : (
        <div>
            {data?.disciplines?.map(d => <DisciplineItem key={d.id} item={d}></DisciplineItem>)}
        </div>
    );
};
export default Discipline;
