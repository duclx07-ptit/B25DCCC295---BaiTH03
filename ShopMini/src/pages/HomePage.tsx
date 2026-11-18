import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  // State cục bộ: chỉ trang này dùng
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.title.toLowerCase().includes(q));
  }, [items, keyword]);

  return (
    <section>
      <div className="toolbar">
        <h1>Sản phẩm</h1>
        <input
          type="search"
          className="input"
          placeholder="Tìm sản phẩm theo tên..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label="Tìm kiếm sản phẩm theo tên"
        />
      </div>

      {(status === "idle" || status === "loading") && (
        <p className="state-msg">Đang tải sản phẩm...</p>
      )}

      {status === "failed" && (
        <div className="state-msg state-msg--error">
          <p>Không tải được sản phẩm: {error}</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => void dispatch(fetchProducts())}
          >
            Thử lại
          </button>
        </div>
      )}

      {status === "succeeded" &&
        (filtered.length === 0 ? (
          <p className="state-msg">Không tìm thấy sản phẩm phù hợp.</p>
        ) : (
          <div className="grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}
    </section>
  );
}
