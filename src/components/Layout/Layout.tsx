import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NavBar from '../molecules/Navbar/index';


interface ILayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  classNames?: string;
  topBar?: boolean;
}

export const Layout: FC<ILayoutProps> = ({
  title,
  description = '',
  children,
  classNames= '',
  topBar
}): JSX.Element => {
  const { asPath: currentRoute = '' } = useRouter();

  return (
    <main className="page-main">
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes"
        />
        <meta name="description" content={description} key="description" />
      </Head>

      <NavBar/>
      <div className={`page-content container mx-auto p-4 ${classNames}`}>
        {children}
      </div>
    </main>
  );
};
