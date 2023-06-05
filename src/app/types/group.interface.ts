import { IDiscipline } from "./discipline.interface";
import { IUser } from "./user/user.interface";

export interface IGroup {
  id: string;
  title: string;
  classRoom: string;
  creationDate: string;
  editDate: string;
}

export interface IGroupLookup
  extends Omit<IGroup, "classRoom" | "creationDate" | "editDate"> {}

export interface IGroupDetails extends IGroup {
  users: IUser[];
  disciplines: IDiscipline[];
}
