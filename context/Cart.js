import { createContext, useState, useEffect } from 'react';

export const Context = createContext();

const Cart = ({ children }) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem('cart'));

  const [cart, setCart] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const initialCart = getInitialCart();
    if (initialCart) {
      setCart(initialCart);
    }
  }, []);

  useEffect(() => {
    //wrtie to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    //cart total
    let currentTotal = 0;
    cart.forEach((item) => (currentTotal += item.qty * item.price));
    setTotal(currentTotal);
  }, [cart]);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };
  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };
  const addItemToCart = (product, qty = 1) => {
    const item = cart.find((i) => i.id === product.id);
    if (item) {
      item.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeItemFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const exposed = {
    cart,
    addItemToCart,
    removeItemFromCart,
    openCart,
    closeCart,
    clearCart,
    isOpen,
    total,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export default Cart;
