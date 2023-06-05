import { useSelector } from "react-redux";
import { selectCurrentAuth } from "../types/auth/auth.slice";
import { IAuth } from "../types/user/user.interface";

const useAuth = () => {
  const auth: IAuth = useSelector(selectCurrentAuth);
  return auth;
};

export default useAuth;
