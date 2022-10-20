import "../styles/globals.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import AppContext from "../components/AppContext";

function MyApp({ Component, pageProps }) {
  const [jwt, setJwt] = React.useState("");

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    const json = sessionStorage.getItem("jwt");
    setJwt(json);
  }, []);

  return (
    <AppContext.Provider value={{ state: { jwt: jwt } }}>
      <Component {...pageProps} setJwt={setJwt} />
    </AppContext.Provider>
  );
}

export default MyApp;
