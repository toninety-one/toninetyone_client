export interface IFile {
    id: string;
    fileName: string;
    userId: string | null;
    path: string;
    fileType: FileType | null
    selfId: string;
}

export enum FileType {
    LabWork = "User",
    SubmittedLab = " Teacher",
}