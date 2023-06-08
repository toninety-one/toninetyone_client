import {IDiscipline} from "./Discipline/discipline.interface.ts";
import {ISubmittedLab} from "./submittedLab.interface";

export interface ILabWork {
    id: string;
    title: string;
    details: string;
    creationDate: string;
    editDate: string;
    selfDiscipline: IDiscipline;
    submittedLabs: ISubmittedLab[] | null;
}