import {Link} from "react-router-dom";

const Public = () => {
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
