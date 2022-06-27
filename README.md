### Cài đặt

Để cài đặt thì trước hết phải cài đặt các thư viện phục vụ cho việc build editor:

```
npm install
```

Để chạy được bắt buộc phải cài `node` và `npm` trước đó, Nếu chưa cài đặt có thể xem hướng dẫn tại đây [Node.js Tài liệu tham khảo](https://nodejs.org/en/).

### Thêm hoặc xóa plugin

Có thể thêm mới Plugin theo docx [Xem hướng dẫn thêm plugins](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installing-plugins.html#adding-a-plugin-to-an-editor)

### Build lại editor

Build lại template [Cài đặt](#installation) and [Thêm hoặc xóa Plugins](#adding-or-removing-plugins) , để build lại chạy lệnh sau:

```
npm run build
```

### Hướng dẫn cho việc thêm mới Plugins

Hiện tại các website của Sudo đang dùng Jquery - Javascript thuần nên việc Xây dựng 1 plugins viết hoàn toàn bằng React là khó sửa dụng nếu plugin đấy có tính năng tương tác dữ liệu với FE.

Tuy nhiên React có Props vì vậy ta có thể truyển các function custom được viết bằng Jquery hoặc Javascript ở FE để truyển qua config từ đấy có thể kết hợp React và JQ 1 cách linh hoạt hơn và phù hợp với mô hình hiện tại mà ta làm

Tham khảo việc xây dựng các plugin và cách sử dụng chúng từ FE laravel qua CKeditor [Tại commit này](#https://bitbucket.org/taitt/chanhtuoi-topz/commits/0121a03fe8228455fd01547fe0ee15cec288c6af)

### Lưu ý với Ckeditor 5

Ckeditor 5 sẽ k có phương thức insertHTML vì thế khi inser HTMl có định dạng div, section hay attribute của thẻ sẽ bị remove và các thẻ sẽ được đưa về thẻ paragraph (p) vì vậy cần custom 1 plugin cho phép chèn định dạng HTML div Tham khảo plugin src/customInsertHtml

### Ví dụ

chạy file [Sample](/sample/index.html) để xem kết quả build