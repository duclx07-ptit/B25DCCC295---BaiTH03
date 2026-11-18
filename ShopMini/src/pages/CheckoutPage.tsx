import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../features/cart/cartSlice";
import { useAuth } from "../contexts/AuthContext";
import { formatPrice } from "../utils/format";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const { user } = useAuth();
  // State cục bộ: trạng thái đã đặt hàng chỉ phục vụ riêng trang này
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="state-msg state-msg--success" role="status">
        <h1>✅ Đặt hàng thành công!</h1>
        <p>Cảm ơn {user?.username}, đơn hàng của bạn đã được ghi nhận.</p>
        <Link to="/" className="btn btn--primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="state-msg">
        <h1>Thanh toán</h1>
        <p>Giỏ hàng trống, hãy thêm sản phẩm trước khi thanh toán.</p>
        <Link to="/" className="btn btn--primary">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1>Thanh toán</h1>
      <p>
        Người đặt: <strong>{user?.username}</strong>
      </p>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item cart-item--compact">
            <img src={item.image} alt={item.title} className="cart-item__img" />
            <div className="cart-item__info">
              <span>{item.title}</span>
              <span>
                {formatPrice(item.price)} × {item.quantity}
              </span>
            </div>
            <strong className="cart-item__subtotal">
              {formatPrice(item.price * item.quantity)}
            </strong>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>
          Tổng thanh toán: <strong>{formatPrice(total)}</strong>
        </p>
        <button type="button" className="btn btn--primary" onClick={handleOrder}>
          Đặt hàng
        </button>
      </div>
    </section>
  );
}
