export interface ISubmittedLab {
    id: string;
    title: string;
    details: string;
    creationDate: string;
    editDate: string;
    mark?: string;
}

export interface ISubmittedLabDetailsLookupDto extends ISubmittedLab {
    firstName: string
    lastName: string
    middleName: string
}