import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCartCount } from "../features/cart/cartSlice";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const cartCount = useAppSelector(selectCartCount);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          🛍️ ShopMini
        </Link>

        <nav className="header__nav">
          <NavLink to="/" end>
            Trang chủ
          </NavLink>
          <NavLink to="/cart">
            Giỏ hàng
            <span className="badge" aria-label={`${cartCount} sản phẩm trong giỏ`}>
              {cartCount}
            </span>
          </NavLink>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={toggleTheme}
            aria-label="Đổi giao diện sáng/tối"
          >
            {theme === "light" ? "🌙 Tối" : "☀️ Sáng"}
          </button>

          {user ? (
            <>
              <span className="header__user">Xin chào, {user.username}</span>
              <button type="button" className="btn btn--outline" onClick={logout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn--primary">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
