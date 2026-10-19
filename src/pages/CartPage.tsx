import type { CartItem } from "../types";
import './CartPage.css'

interface CartPageProps {
    cart: CartItem[];
    removeFromCart: (id: number) => void;
    changeQuantity: (id: number, delta: number) => void;
}

function CartPage({cart, removeFromCart, changeQuantity} : CartPageProps) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalFixed = total.toFixed(2);
    
    return (
      <>
        {cart.length === 0 ? (
          <h2>Корзина пуста</h2>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.price}</p>
              <p>Количество: {item.quantity}</p>
              <button onClick={() => changeQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => changeQuantity(item.id, +1)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>Удалить</button>
            </div>
          ))
        )}
        <p>Итого: {totalFixed}</p>
      </>
    );
}

export default CartPage;