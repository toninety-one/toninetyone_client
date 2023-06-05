import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Public = () => {
  const auth = useAuth();
  console.log(auth)
  return (
    <section className="public">
      <header>
        <h1>Welcome!</h1>
      </header>
      <main>Янка брыль</main>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </section>
  );
};
export default Public;
