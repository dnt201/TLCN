import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "@util/prototype";
import { Toaster } from "react-hot-toast";
import store from "@app/store";
import DeclareRouter from "./router";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SkeletonTheme baseColor="#262D34" highlightColor="#444">
        <Toaster position="bottom-right" containerStyle={{ zIndex: 10100 }} />
        <DeclareRouter />
      </SkeletonTheme>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
