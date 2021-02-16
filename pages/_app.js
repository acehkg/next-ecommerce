import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
