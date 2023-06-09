import {IGroup} from "../group/group.interface.ts";
import {ILabWork} from "../labWork/labWork.interface.ts";

export interface IDisciplineCreate {
    userId: string;
    title: string;
}

export interface IDisciplineUpdate extends IDisciplineCreate {
    id: string;
}

export type IDisciplineLookup = Omit<IDisciplineUpdate, "userId">

export interface IDiscipline extends IDisciplineLookup {
    userId: string;
    creationDate: string;
    editDate: string;
    groups: IGroup[] | null;
    labWorks: ILabWork[] | null;
}
