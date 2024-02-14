import { Provider } from "react-redux";
import { persistor, store } from "../redux/configureStore";
import "styles/globals.css";
// import "../styles/TermsAndConditionsPageSection.module.css"
// import "sections/WebsitePageSections/LegalPageSections/WebsitePageSectionsstyles/TermsAndConditionsPageSection.css"
import Script from "next/script";
import "styles/legal-page-styles.css";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

import { CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import theme from "theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { useRef, useEffect } from "react";
import ErrorBoundary from "components/ErrorBoundary";
import { DefaultSeo } from "next-seo";
import { CookiesProvider } from "react-cookie";
import { MdClose } from "react-icons/md";
import InventorySuccessSnackbar from "sections/InventoryPageSection/components/InventorySuccessSnackbar";
import CustomSuccessSnackbar from "components/Common/Snackbar/CustomSuccessSnackbar";
import CustomErrorSnackbar from "components/Common/Snackbar/CustomErrorSnackbar";
import { Open_Sans as OpenSans } from "next/font/google";
import SyncingInventorySnackbar from "sections/InventoryPageSection/components/SyncingInventorySnackbar";
import { PersistGate } from "redux-persist/integration/react";
const queryClient = new QueryClient();

const APP_DATA = {
  WEBSITE_URL: "https://bluecom.ai",
};
// If loading a variable font, you don't need to specify the font weight
// const inter = Inter({ subsets: ['latin'] })
const openSans = OpenSans({
  subsets: ["latin"],
  weights: [400, 500, 600, 700, 800],
  display: "swap",
  style: "normal",
});
function MyApp({ Component, pageProps }) {
  const snackbarRef = useRef();
  const title = "Bluecom.ai - Sync all your ecommerce stores in one place";
  const description = "Login or create new account on bluecom.ai  Try now.";
  const pageImage = "/icon.svg";
  const website = APP_DATA.WEBSITE_URL;
  const sitename = "bluecom.ai";

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_KEY);
      // plugins should also only be initialized when in the browser
      setupLogRocketReact(LogRocket);
    }
  }, []);
  return (
    <ErrorBoundary>
      <Script
        async
        defer
        strategy="lazyOnload"
        id="hs-script-loader"
        src="//js-na1.hs-scripts.com/40194709.js"
      />
      <Script
        strategy="lazyOnload"
        id="google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />

      <Script strategy="lazyOnload" id="google-analytics-2">
        {`
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', "${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}");
	`}
      </Script>
      <Script strategy="lazyOnload" id="hotjar-tracking">
        {`
					(function(h,o,t,j,a,r){
						h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
						h._hjSettings={hjid:3553415,hjsv:6};
						a=o.getElementsByTagName('head')[0];
						r=o.createElement('script');r.async=1;
						r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
						a.appendChild(r);
					})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
				`}
      </Script>
      <Provider store={store}>
        <DefaultSeo
          defaultTitle="Bluecom.ai - Sync all your ecommerce stores in one place"
          title={title}
          titleTemplate="%s - Bluecom.ai"
          description={description}
          additionalLinkTags={[
            {
              rel: "apple-touch-icon",
              sizes: "180x180",
              href: "/apple-touch-icon.png",
            },
            {
              rel: "icon",
              type: "image/png",
              sizes: "32x32",
              href: "/favicon-32x32.png",
            },
            {
              rel: "icon",
              type: "image/png",
              sizes: "16x16",
              href: "/favicon-16x16.png",
            },
            {
              rel: "manifest",
              href: "/site.webmanifest",
            },
          ]}
          openGraph={{
            title: title,
            description: description,
            type: "website",
            locale: "en_US",
            url: website,
            site_name: sitename,
            images: [
              {
                url: `${APP_DATA.WEBSITE_URL}/assets/website/web-link.png`,
                width: 400,
                height: 300,
                alt: "bluecom.ai",
              },
            ],
          }}
          twitter={{
            handle: "@bluecom",
            site: "@bluecom",
            cardType: "summary_large_image",
          }}
          canonical={`${website}`}
        />

        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CookiesProvider>
                <SnackbarProvider
                  ref={snackbarRef}
                  autoHideDuration={3000}
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  preventDuplicate
                  action={(snackbarId) => (
                    <IconButton
                      onClick={() => closeSnackbar(snackbarId)}
                      sx={{
                        color: "white",
                      }}
                    >
                      <MdClose />
                    </IconButton>
                  )}
                  variant="success"
                  Components={{
                    success: CustomSuccessSnackbar,
                    error: CustomErrorSnackbar,
                    inventorySuccess: InventorySuccessSnackbar,
                    syncInventory: SyncingInventorySnackbar,
                  }}
                  // Components={{
                  // 	publishProduct: PublishProductsSnackbar,
                  // }}
                >
                  {/* <NextNProgress color="white" /> */}
                  <CssBaseline />
                  <main className={openSans.className}>
                    <Component {...pageProps} />
                  </main>
                </SnackbarProvider>
              </CookiesProvider>
              {/* <ReactQueryDevtools initialIsOpen /> */}
            </QueryClientProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
