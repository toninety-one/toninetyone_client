import {IDiscipline} from "../discipline/discipline.interface.ts";
import {IUser} from "../auth/auth.interface.ts";

export interface IGroupCreate {
    title: string;
}

export interface IGroupLookup extends IGroupCreate {
    id: string;
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

export interface IGroupDiscipline {
    groupId: string,
    disciplineId: string
}