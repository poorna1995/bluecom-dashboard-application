import React from "react";
import AppProvider from "./provider";

export default function RootLayout({ children = <></> }) {
  return (
    <html>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
