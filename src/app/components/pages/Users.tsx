import {useGetAllUsersQuery} from "../../types/auth/auth.api.slice.ts";
import UserItem from "../ui/user/UserItem.tsx";
import Loader from "../ui/loader/Loader.tsx";

const Users = () => {

    const {data, isLoading} = useGetAllUsersQuery(null);

    return isLoading ? (<Loader/>) : (
        <div>
            {data?.users?.map(u => <UserItem key={u.id} item={u}></UserItem>)}
        </div>
    );
};
export default Users;
