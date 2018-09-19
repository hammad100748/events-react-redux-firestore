import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { configureStore } from "./app/store/configureStore";
import App from "./app/layout/App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./app/common/util/ScrollToTop";
import { loadEvents } from './features/event/eventActions'

const rootEl = document.getElementById("root");
const store = configureStore();
store.dispatch(loadEvents());
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(render);
  });
}
render();

registerServiceWorker();
