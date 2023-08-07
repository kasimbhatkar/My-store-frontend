import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDom from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
