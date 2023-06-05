import { IGroup } from "./group.interface";
import { ILabWork } from "./labWork.interface";

export interface IDiscipline {
    id: string;
    userId: string;
    title: string;
    creationDate: string;
    editDate: string;
    groups: IGroup[] | null;
    labWorks: ILabWork[] | null;
}