"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "redux/configureStore";
import theme from "theme";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import NextNProgress from "nextjs-progressbar";
import ErrorBoundary from "../components/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
export default function AppProvider({ children = <></> }) {
  const queryClient = new QueryClient();
  const snackbarRef = React.useRef(null);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <SnackbarProvider
                ref={snackbarRef}
                autoHideDuration={3000}
                maxSnack={3}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                preventDuplicate
                variant="success"
                // Components={{
                // 	publishProduct: PublishProductsSnackbar,
                // }}
              >
                <NextNProgress color="white" />
                <CssBaseline />

                {children}
              </SnackbarProvider>
              {/* <ReactQueryDevtools initialIsOpen /> */}
            </QueryClientProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
