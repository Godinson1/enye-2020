import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/index";

//Initialize state and middleware
const initialState = {};
const middleware = [thunk];
const composeCheck =
  process.env.NODE_ENV === "production"
    ? compose(
        applyMiddleware(...middleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      )
    : compose(applyMiddleware(...middleware));

//Configure store
const store = createStore(rootReducer, initialState, composeCheck);

export default store;
