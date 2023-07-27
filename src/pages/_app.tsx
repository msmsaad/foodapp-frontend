import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/globals.css';
import { wrapper } from '@redux/store';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
