import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from "../features/cart/cartSlice";
import { formatPrice } from "../utils/format";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="state-msg">
        <h1>Giỏ hàng</h1>
        <p>Giỏ hàng của bạn đang trống.</p>
        <Link to="/" className="btn btn--primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1>Giỏ hàng</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item__img" />
            <div className="cart-item__info">
              <Link to={`/products/${item.id}`}>{item.title}</Link>
              <span>{formatPrice(item.price)}</span>
            </div>
            <div className="qty">
              <button
                type="button"
                className="btn btn--outline"
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity - 1 }),
                  )
                }
                aria-label="Giảm số lượng"
              >
                −
              </button>
              <span className="qty__value">{item.quantity}</span>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity + 1 }),
                  )
                }
                aria-label="Tăng số lượng"
              >
                +
              </button>
            </div>
            <strong className="cart-item__subtotal">
              {formatPrice(item.price * item.quantity)}
            </strong>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Xoá
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p>
          Tổng tiền: <strong>{formatPrice(total)}</strong>
        </p>
        <div className="cart-summary__actions">
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => dispatch(clearCart())}
          >
            Xoá giỏ hàng
          </button>
          <Link to="/checkout" className="btn btn--primary">
            Thanh toán
          </Link>
        </div>
      </div>
    </section>
  );
}
