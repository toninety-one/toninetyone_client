import {IUserLookupDto} from "./auth.interface.ts";

export const getUserTitle = (user: IUserLookupDto | null) => {
    if (user) {
        const lastName = user.lastName + " ";
        const firstName = user.firstName + " ";
        const middleName = user.middleName ? user.middleName + " " : "";
        const group = user.userGroup ? " - " + user.userGroup : "";
        const role = user.userRole ? " - " + user.userRole : "";
        return lastName + firstName + middleName + group + role
    }
    return "";
}