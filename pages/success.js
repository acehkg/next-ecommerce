import { useEffect } from 'react';
import { Container } from '../components/styled/Page';
import useCart from '../hooks/useCart';

const Success = () => {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Container>
      <h2>Successfully Charged!</h2>
      <p>Thanks For Your Purchase</p>
    </Container>
  );
};

export default Success;
