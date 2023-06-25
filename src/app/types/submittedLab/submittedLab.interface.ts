import {IFile} from "../labFile/labFile.interface.ts";
import {ILabWorkPreview} from "../labWork/labWork.interface.ts";
import {IUser} from "../auth/auth.interface.ts";

export interface ISubmittedLab {
    id: string;
    title: string;
    details: string;
    creationDate: string;
    editDate: string;
    mark?: string;
}

export interface ISubmittedLabLookupDto extends ISubmittedLab {
    disciplineId: string;
}

export interface ISubmittedLabDetailsLookupDto extends ISubmittedLab {
    firstName: string
    lastName: string
    middleName: string
}

export interface ISubmittedLabDetails extends ISubmittedLab {
    selfUser: IUser
    selfLabWork: ILabWorkPreview
    files: IFile[]
}