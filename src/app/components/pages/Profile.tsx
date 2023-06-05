import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useGetUserDataQuery } from "../../types/auth/auth.api.slice";
import { refresh } from "../../types/auth/auth.slice";

const Profile = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const { data } = useGetUserDataQuery(null);
  
  dispatch(refresh({ user: data, token: auth.token }));

  return (
    <section>
      <h1>{auth.user ? `Welcome ${auth.user.id}!` : "Welcome!"}</h1>
      <div>
        <h3>Token access:</h3>
        <p>{auth.token?.accessToken}</p>
      </div>
      <div>
        <h3>Token refresh:</h3>
        <p>{auth.token?.refreshToken}</p>
      </div>
      <div>
        <h3>Auth</h3>
        <pre>{JSON.stringify(auth, null, 2)}</pre>
      </div>
    </section>
  );
};
export default Profile;
