import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-cf2021-301.us.auth0.com"
    clientId="iAXLO1ce5r45N1h4Ibcp8F6fjI6mSoIk"
    redirectUri="https://606334f5ae4fe000a4fcc1e8--relaxed-booth-08253f.netlify.app/"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
