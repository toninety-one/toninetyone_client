import {PropsWithChildren} from "react";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "../../store";

const Providers = ({children}: PropsWithChildren) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>{children}</PersistGate>
        </Provider>
    );
};

export default Providers;
