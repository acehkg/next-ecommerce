import { Container } from '../components/styled/Page';
import useCart from '../hooks/useCart';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Button = styled.button`
  background: #7303c0;
  color: #fdeff9;
  font-size: 1.5rem;
  outline: none;
  border: none;
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  border: 1px solid #ec38bc;
  border-radius: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const Checkout = () => {
  const { cart, total } = useCart();

  const processPayment = () => {
    console.log('process payment');
  };

  return (
    <Container>
      <h2>Checkout</h2>
      {cart.length > 0 ? (
        <>
          <List>
            {cart.map((item) => {
              return (
                <li key={item.id}>
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span>${(item.price / 100) * item.qty}</span>
                </li>
              );
            })}
          </List>
          <Total>
            <span>Total</span>
            <span>${total / 100}</span>
          </Total>
          <Button onClick={processPayment}>Process Payment</Button>
        </>
      ) : (
        <p>You don't appear to have any items in your cart!</p>
      )}
    </Container>
  );
};

export default Checkout;
