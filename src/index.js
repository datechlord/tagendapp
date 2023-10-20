import React from "react";
import { createRoot } from "react-dom/client";
import Root from "./routes/root";
import ErrorPage from "./error-page";

// Pages
import Home from "./pages/Home";



import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NFT from "./pages/NFT";
import Buyandsell from "./pages/Buyandsell";
import Stakeandearn from "./pages/Stakeandearn";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/nft-membership",
        element: <NFT />,
      },
      {
        path: "/buy-blcg",
        element: <Buyandsell />,
      },
      {
        path: "/stake-and-earn",
        element: <Stakeandearn />,
      },
    ],
  },

]);

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance-testnet";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
  <ThirdwebProvider 
  activeChain={activeChain} 
  clientId="b417364e6bb5ca6da6084e50f432d747">
  <RouterProvider router={router} />
  </ThirdwebProvider>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
