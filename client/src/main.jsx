import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductContextProvider } from "./context/productContextProvider";
import { UserContextProvider } from "./context/userContextProvider";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <ProductContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductContextProvider>
    </UserContextProvider>
  </StrictMode>
);
