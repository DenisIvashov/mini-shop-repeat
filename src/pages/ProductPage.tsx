import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types";
import type { ProductPageProps } from "../types";
import './CatalogPage.css';

function ProductPage({ addToCart }: ProductPageProps) {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    
    useEffect(() => {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error(error));
    }, [id]);

    if (!product) {
      return <h2>Загрузка...</h2>;
    }

    return (
      <>
        <div className="product-card">
            <div className="product-image-wrapper">
                <img src={product.image} alt={product.title} />
            </div>
           <h1 className="product-title">{product.title}</h1>
           <p className="product-price">{product.price}</p>
           <p>{product.description}</p>
        </div>
        <Link to="/">
          <button>Назад</button>
        </Link>
        <button className="btn-cart" onClick={() => addToCart(product)}>В корзину</button>
      </>
    );
}

export default ProductPage;