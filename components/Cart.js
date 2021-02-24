import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import useCart from '../hooks/useCart';
import { useRouter } from 'next/router';

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 20rem;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition: 200ms ease-in;
`;

const X = styled(FiX)`
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Content = styled.div`
  padding: 1rem 2rem;
  h1 {
    font-size: 2.5rem;
    font-weight: 400;
    border-bottom: 1px solid #efefef;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
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

const Cart = () => {
  const { cart, isOpen, openCart, closeCart, total } = useCart();

  const router = useRouter();

  const handleClick = () => {
    closeCart();
  };

  const navigateToCheckout = () => {
    closeCart();
    router.push('/checkout');
  };
  return (
    <Container isOpen={isOpen}>
      <XContainer>
        <X onClick={handleClick} />
      </XContainer>
      <Content>
        <h1>Cart</h1>
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
            <Button onClick={navigateToCheckout}>Checkout</Button>
          </>
        ) : (
          <h2>Cart is Empty!</h2>
        )}
      </Content>
    </Container>
  );
};

export default Cart;
