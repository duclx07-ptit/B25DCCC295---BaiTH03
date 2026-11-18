# ShopMini – Bài thực hành 03 

Ứng dụng cửa hàng mini xây dựng bằng **React + TypeScript (Vite)**, quản lý state toàn cục bằng **Context API** và **Redux Toolkit**.

- Họ tên / Mã sinh viên: Lê Xuân Đức/B25DCCC295
- Dữ liệu sản phẩm: <https://fakestoreapi.com/products>

## Chạy dự án

```bash
npm install
npm run dev      # chạy môi trường phát triển
npm run build    # kiểm tra kiểu TypeScript + build production
```

Tài khoản đăng nhập giả lập: **tên đăng nhập bất kỳ (không rỗng)**, mật khẩu **`123456`**.

## Các trang

| Đường dẫn        | Trang                | Ghi chú                                              |
| ---------------- | -------------------- | ---------------------------------------------------- |
| `/`              | Trang chủ            | Lưới 1/2/4 cột, ô tìm kiếm theo tên                  |
| `/products/:id`  | Chi tiết sản phẩm    | Vào thẳng bằng URL vẫn tự tải dữ liệu                |
| `/cart`          | Giỏ hàng             | Tăng/giảm số lượng, xoá, xoá cả giỏ, tổng tiền       |
| `/login`         | Đăng nhập            | Sau khi đăng nhập quay lại trang trước đó            |
| `/checkout`      | Thanh toán           | **Protected route**, nút "Đặt hàng" xoá giỏ + báo OK |
| `*`              | 404                  |                                                      |

## Phân chia state: useState / Context / Redux

| Dữ liệu | Nơi lưu | Lý do |
| --- | --- | --- |
| Từ khoá tìm kiếm (`keyword`) ở trang chủ | `useState` (HomePage) | Chỉ một component dùng, mất đi khi rời trang cũng không sao. Đưa lên store toàn cục là thừa. |
| Giá trị ô username/password, thông báo lỗi ở form đăng nhập | `useState` (LoginPage) | Dữ liệu tạm của form, không component nào khác cần. |
| Cờ `ordered` (đã đặt hàng) ở trang thanh toán | `useState` (CheckoutPage) | Chỉ để hiển thị thông báo thành công của riêng trang này. |
| **Theme** sáng/tối (`theme`, `toggleTheme`) | **Context** (`ThemeContext`) | Nhiều component cần đọc (Header, toàn bộ giao diện), nhưng ít khi thay đổi và logic đơn giản. Context đủ dùng, không cần Redux. |
| **Người dùng đăng nhập** (`user`, `login`, `logout`) | **Context** (`AuthContext`) | Cần ở Header, ProtectedRoute, LoginPage, CheckoutPage. Là trạng thái "môi trường" ít đổi, hợp với Context. |
| **Danh sách sản phẩm** + `loading / succeeded / failed` | **Redux** (`productsSlice`) | Dữ liệu từ API bất đồng bộ, được dùng ở trang chủ và trang chi tiết. `createAsyncThunk` quản lý vòng đời gọi API rõ ràng và dữ liệu được dùng lại, không phải gọi API mỗi lần đổi trang. |
| **Giỏ hàng** (`items`) và selector tổng số lượng/tổng tiền | **Redux** (`cartSlice`) | Nhiều nơi đọc và ghi (Header, ProductCard, trang chi tiết, giỏ hàng, thanh toán), có nhiều thao tác cập nhật (thêm, xoá, đổi số lượng, xoá hết). Reducer tập trung dễ kiểm soát; selector tính giá trị dẫn xuất tránh lưu trùng dữ liệu. |


> Theme và thông tin đăng nhập được lưu thêm vào `localStorage` để giữ nguyên khi tải lại trang.

## Cấu trúc thư mục

```
src/
├── app/            store.ts, hooks.ts (useAppDispatch, useAppSelector)
├── features/       products/productsSlice.ts, cart/cartSlice.ts
├── contexts/       ThemeContext.tsx, AuthContext.tsx
├── components/     Header, ProductCard, ProtectedRoute
├── layouts/        MainLayout.tsx
├── pages/          HomePage, ProductDetailPage, CartPage, LoginPage, CheckoutPage, NotFoundPage
├── types/          index.ts (Product, CartItem, User, ...)
├── utils/          format.ts (định dạng giá)
├── App.tsx         khai báo Routes
└── main.tsx        bọc Provider, BrowserRouter, ThemeProvider, AuthProvider
```
