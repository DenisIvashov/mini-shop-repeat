import type { Product } from "../types";
import type { CatalogPageProps } from "../types";
import { useEffect, useState } from "react";
import './CatalogPage.css';
import { Link } from "react-router-dom";

function CatalogPage({ addToCart }: CatalogPageProps) {
  const [search, setSearch] = useState("");
  const [api, setApi] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState('asc')
  const [selectedCategory, setSelectedCategory] = useState('all'); 

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setApi(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  },[]);

  const filtered = api
    .filter((product) => selectedCategory === 'all' || product.category === selectedCategory)
    .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );

  const categories = ['all', ...new Set(api.map(p => p.category))];

  return (
    <>
      <input
        type="text"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск товаров..."
      />

      {search && <p className="catalog-count">Найдено: {sorted.length}</p>}
      
      <div className="custom-select-wrapper">
        <select className="filter-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>

      <div className="custom-select-wrapper">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "Все категории" : category}
            </option>
          ))}
        </select>
      </div>

      <div className="catalog">
        {sorted.map((product: Product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.title} />
              </div>
            </Link>
            <h3 className="product-title">{product.title}</h3>
            <div className="product-info">
              <p className="product-price">{product.price}</p>
              <button className="btn-cart" onClick={() => addToCart(product)}>
                В корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CatalogPage;