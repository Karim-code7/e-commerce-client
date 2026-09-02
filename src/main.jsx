import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { ProductProvider } from "./context/ProductContext.jsx";
import { Toaster } from "./components/ui/sonner";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";

axios.interceptors.response.use((response) => response);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <ProductProvider>
          <App />
          <Toaster />
        </ProductProvider>
      </ThemeProvider>
    </Provider>
    ,
  </BrowserRouter>,
);
