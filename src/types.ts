export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface CatalogPageProps {
    addToCart: (product: Product) => void;
}

export interface ProductPageProps {
    cart: CartItem[];
    addToCart: (product: Product) => void;
}