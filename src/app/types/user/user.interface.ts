import { IGroup } from "../group.interface";
import { Role } from "../role.enum";
import { ISubmittedLab } from "../submittedLab.interface";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  groupId?: string;
}

export interface IUserDetails extends Omit<IUser, "groupID"> {
  userRole: Role;
  userGroup: IGroup;
  lastSubmittedLabs: ISubmittedLab[];
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IAuth {
  user: IUserDetails | null;
  token: IToken | null;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IAuthResponce extends IToken {
  user: IUserDetails;
}
