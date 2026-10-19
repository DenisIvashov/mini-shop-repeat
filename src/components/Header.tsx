import { Link } from "react-router-dom";
import './Header.css'

function Header() {
    return (
        <header>
        <Link to="/" className="logo">🛒 Мини-Магазин</Link>
        <nav>
          <Link to="/">Каталог</Link>
          <Link to="/cart">Корзина</Link>
        </nav>
      </header>
    )
}

export default Header;