import {IDiscipline} from "../discipline/discipline.interface.ts";
import {ISubmittedLab, ISubmittedLabDetailsLookupDto} from "../submittedLab/submittedLab.interface.ts";
import {IFile} from "../labFile/labFile.interface.ts";

export interface ILabWorkLookupDto {
    id: string;
    title: string;
    disciplineTitle: string;
    mark: string | null;
}

export interface ILabWorkCreate {
    title: string;
    details: string;
    disciplineId: string;
    files: IFile[];
}

export interface ILabWork extends Omit<ILabWorkCreate, "disciplineId"> {
    id: string;
    creationDate: string;
    editDate: string;
    selfDiscipline: IDiscipline;
    submittedLabs: ISubmittedLab[] | null;
}

export interface ILabWorkDetails extends Omit<ILabWork, "submittedLabs"> {
    submittedLabs: ISubmittedLabDetailsLookupDto[] | null
}

export type ILabWorkPreview = Omit<ILabWork, "files" | "selfDiscipline" | "submittedLabs">;
