import {Link, useParams} from "react-router-dom";
import {useGetDisciplineByIdQuery,} from "../../../../types/discipline/discipline.api.slice.ts";
import Loader from "../../../ui/loader/Loader.tsx";
import {useEffect} from "react";

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

    return (
        <div>
            <Link to={"manager"}>manage</Link>
            <br/>
            <Link to={"createLab"}>create lab</Link>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};
export default DisciplineDetails;
