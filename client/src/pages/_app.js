import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";

// Import Css
import "@/styles/globals.css";
import "@/styles/components/Navbar.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Provider store={store}>
      <Toaster />
      <Component {...pageProps} />
    </Provider>
  );
}
