import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from "next/app";

// import Context
import { CheckProvider } from "@/context/Exceptional";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CheckProvider>
      <Component {...pageProps} />
    </CheckProvider>
  )
}
