import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

// https://manage.auth0.com/dashboard/us/dev-cf2021-301/applications/iAXLO1ce5r45N1h4Ibcp8F6fjI6mSoIk/settings

ReactDOM.render(
  <Auth0Provider
    domain="dev-cf2021-301.us.auth0.com"
    clientId="iAXLO1ce5r45N1h4Ibcp8F6fjI6mSoIk"
    // redirectUri="https://relaxed-booth-08253f.netlify.app/"
    redirectUri="http://localhost:3000/"
    // redirectUri={window.location.origin} // redirectUri this all is a source for incorrect state upon login attempt. 
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
