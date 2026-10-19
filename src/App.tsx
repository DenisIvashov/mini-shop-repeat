import { useState, useEffect } from 'react'
import './App.css'
import CatalogPage from './pages/CatalogPage'
import type { Product, CartItem } from './types'
import CartPage from './pages/CartPage'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import ProductPage from './pages/ProductPage'

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

  function addToCart(product: Product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      const updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    console.log('Корзина:', cart);
  }

  function removeFromCart(id: number) {
    const updated = cart.filter(item => item.id !== id)
    setCart(updated)
  }

  function changeQuantity(id: number, delta: number) {
    const updated = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return item; 
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updated)
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<CatalogPage addToCart={addToCart} />} />
        <Route path='cart' element={<CartPage cart={cart} removeFromCart={removeFromCart} changeQuantity={changeQuantity}/>} />
        <Route path="product/:id" element={<ProductPage cart={cart} addToCart={addToCart} />} />
      </Routes>
    </>
  );
}

export default App
