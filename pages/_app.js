import "../styles/globals.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  const [jwt, setJwt] = React.useState("");

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  return <Component {...pageProps} setJwt={setJwt} jwt={jwt} />;
}

export default MyApp;
