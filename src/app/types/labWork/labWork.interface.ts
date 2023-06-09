import {IDiscipline} from "../discipline/discipline.interface.ts";
import {ISubmittedLab} from "../submittedLab.interface.ts";

export interface ILabWorkCreate {
    title: string;
    details: string;
    disciplineId: string;
    files: File[];
}

export interface ILabWork extends Omit<ILabWorkCreate, "disciplineId"> {
    id: string;
    creationDate: string;
    editDate: string;
    selfDiscipline: IDiscipline;
    submittedLabs: ISubmittedLab[] | null;
}