import AppHeader from "components/AppHeader";
import Head from "next/head";
import React from "react";

const BaseLayout = ({ pageTitle, children }) => {
  return (
    <div>
      <Head>
        <title>{pageTitle || "Ecommerce Dashboard App"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader showLogo />
      <div style={{ marginTop: "64px" }}>{children}</div>
    </div>
  );
};

export default BaseLayout;
