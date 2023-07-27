import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/globals.css';
import { wrapper } from '@redux/store';
import { ModalProvider } from '@components/molecules/Modal/ModalContext';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ToastContainer />
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </>
  );
};

export default wrapper.withRedux(App);
