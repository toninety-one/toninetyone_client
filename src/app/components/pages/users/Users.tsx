import {useGetAllUsersQuery} from "../../../types/auth/auth.api.slice.ts";
import UserItem from "../../ui/user/UserItem.tsx";
import Loader from "../../ui/loader/Loader.tsx";
import useHeader from "../../../hooks/useHeader.ts";

const Users = () => {
    useHeader("Пользователи")
    const {data, isLoading} = useGetAllUsersQuery(null);

    return isLoading ? (<Loader/>) : (
        <div>
            {data?.users?.map(u => <UserItem key={u.id} item={u}></UserItem>)}
        </div>
    );
};

Users.header = "";

export default Users;
