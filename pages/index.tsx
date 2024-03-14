import React, { useState, Fragment, useEffect } from "react";
import { getCookie } from "cookies-next";

// import MUI
import { Container } from "@mui/material";

// import components
import Login from "@/components/LoginProcess/Login";
import Layout from "@/components/Layout";

export default function Home() {
  const [token, setToken] = useState<boolean>();

  useEffect(() => {
    getCookie('token') === undefined ? setToken(false) : setToken(true);
  }, [])

  return (
    <Fragment>
      {
        !token ? (
          <Login />
        )
          : (
            <Layout title="Home">
              Hello
            </Layout>
          )
      }
    </Fragment>
  );
}
