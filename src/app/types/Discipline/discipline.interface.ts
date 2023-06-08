import {IGroup} from "../group/group.interface.ts";
import {ILabWork} from "../labWork.interface.ts";

export interface IDisciplineLookup {
    id: string;
    title: string;
}

export interface IDiscipline extends IDisciplineLookup {
    userId: string;
    creationDate: string;
    editDate: string;
    groups: IGroup[] | null;
    labWorks: ILabWork[] | null;
}
