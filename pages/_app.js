import styled from 'styled-components';
import { Normalize } from 'styled-normalize';
import Navbar from '../components/Navbar';
import CartProvider from '../context/Cart';
import Cart from '../components/Cart';

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap');

  background: linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9);
  font-family: 'Padauk', sans-serif;
  min-height: 100vh;
`;

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  height: auto;
`;

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Container>
        <Normalize />
        <Navbar />
        <Page>
          <Component {...pageProps} />
        </Page>
        <Cart />
      </Container>
    </CartProvider>
  );
}

export default MyApp;
