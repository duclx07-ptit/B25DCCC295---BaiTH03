import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LocationState {
  from?: { pathname: string; search?: string; hash?: string };
}

function isLocationState(value: unknown): value is LocationState {
  return typeof value === "object" && value !== null;
}

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // State cục bộ của form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const state: unknown = location.state;
  const from = isLocationState(state) ? state.from : undefined;
  const redirectTo = from
    ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
    : "/";

  // Đã đăng nhập rồi thì không cần ở trang login
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate(redirectTo, { replace: true });
    } else {
      setError("Tên đăng nhập không được trống và mật khẩu phải đúng (123456).");
    }
  };

  return (
    <section className="auth">
      <h1>Đăng nhập</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__field">
          Tên đăng nhập
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label className="form__field">
          Mật khẩu
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && (
          <p className="form__error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn--primary btn--block">
          Đăng nhập
        </button>
        <p className="form__hint">Gợi ý: mật khẩu giả lập là 123456.</p>
      </form>
    </section>
  );
}
