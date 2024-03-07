import React, { useState } from "react";
import { getCookie } from "cookies-next";

// import MUI
import { Container } from "@mui/material";

// import components
import Login from "@/components/Login";

export default function Home() {
  const [token, _] = useState<string | undefined>(getCookie('email'));

  return (
    <div>
      {
        token === undefined ?
          <Login />
          :
          <></>
      }
    </div>
  );
}
