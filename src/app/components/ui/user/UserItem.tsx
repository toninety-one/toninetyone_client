import {IUser} from "../../../types/auth/auth.interface.ts";

const UserItem = ({item}: { item: IUser }) => {
    return (
        <div>
            {item.id} - {item.firstName} - {item.lastName} - {item.middleName} - {item.groupId}
        </div>
    );
};
export default UserItem;
