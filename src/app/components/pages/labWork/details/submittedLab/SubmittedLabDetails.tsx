import {useParams} from "react-router-dom";

const SubmittedLabDetails = () => {

    const {labId, subId} = useParams()

    return (
        <div>
            <div>{labId}</div>
            <div>{subId}</div>
        </div>
    )
}

export default SubmittedLabDetails;