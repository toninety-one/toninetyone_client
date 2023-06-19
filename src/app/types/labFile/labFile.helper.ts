export interface FileData {
    id: number;
    file: File;
}

export const getLastIndex = (fileList: FileData[]): number => {
    if (fileList.length > 0) {
        return fileList[fileList.length - 1].id
    }
    return 0;
}