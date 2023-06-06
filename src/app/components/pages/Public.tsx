import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { logOut } from "../../types/auth/auth.slice";

const Public = () => {
  const auth = useAuth();
  console.log(auth);
  document.title = "home";

  const onClick = () => {
    logOut();
  };

  return (
    <section className="public">
      <header>
        <h1>Welcome!</h1>
      </header>
      <main>Янка брыль</main>
      <footer>
        <Link to="/login">Login</Link>
        <button onClick={onClick}>логоут</button>
      </footer>
    </section>
  );
};
export default Public;
