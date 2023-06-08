import {IDiscipline} from "../Discipline/discipline.interface.ts";
import {IUser} from "../auth/auth.interface.ts";

export interface IGroupLookup {
    id: string;
    title: string;
}

export interface IGroup extends IGroupLookup {
    classRoom: string;
    creationDate: string;
    editDate: string;
}

export interface IGroupDetails extends IGroup {
    users: IUser[];
    disciplines: IDiscipline[];
}
