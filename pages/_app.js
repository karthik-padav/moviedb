import { Provider } from "react-redux";
import { store } from "redux/store";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useEffect } from "react";
import { getTheme } from "theme/theme";
import "../styles/globals.css";
import { Router } from "next/dist/client/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { loadCSS } from "fg-loadcss";
import constants from "js/Constants";
import Script from "next/script";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  console.log(process.env.GOOGLE_ANALYTICS, "process.env.GOOGLE_ANALYTICS");
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <Provider store={store}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.GOOGLE_ANALYTICS}');
      `}
      </Script>
      <ThemeProvider theme={getTheme()}>
        {getLayout(
          <>
            <CssBaseline />
            <Component {...pageProps} />
          </>
        )}
      </ThemeProvider>
    </Provider>
  );
}
