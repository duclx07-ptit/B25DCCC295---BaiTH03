import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/format";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card__image-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="card__body">
        <span className="card__category">{product.category}</span>
        <h3 className="card__title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="card__price">{formatPrice(product.price)}</p>
        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={() => dispatch(addToCart(product))}
        >
          Thêm vào giỏ
        </button>
      </div>
    </article>
  );
}
