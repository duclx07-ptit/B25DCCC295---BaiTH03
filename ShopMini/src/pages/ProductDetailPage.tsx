import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/format";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);

  // Vào thẳng /products/:id (F5) thì store chưa có dữ liệu -> tải lại
  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = items.find((p) => String(p.id) === id);

  if (status === "idle" || status === "loading") {
    return <p className="state-msg">Đang tải sản phẩm...</p>;
  }

  if (status === "failed") {
    return (
      <div className="state-msg state-msg--error">
        <p>Không tải được dữ liệu sản phẩm.</p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => void dispatch(fetchProducts())}
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="state-msg">
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/" className="btn btn--primary">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <section className="detail">
      <Link to="/" className="back-link">
        ← Quay lại danh sách
      </Link>
      <div className="detail__grid">
        <div className="detail__image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail__info">
          <span className="card__category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="detail__price">{formatPrice(product.price)}</p>
          <p className="detail__desc">{product.description}</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => dispatch(addToCart(product))}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </section>
  );
}
