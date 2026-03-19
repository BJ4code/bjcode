import { useState } from "react";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");

  return (
    <div className="admin-page">
      <div className="admin-box">
        <h1>لوحة الإدارة</h1>
        <p>من هنا تقدر تضيف عنوان وصورة وبرومبت</p>

        <input
          type="text"
          placeholder="عنوان البرومبت"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="رابط الصورة"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          placeholder="اكتب البرومبت"
          rows="6"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button>حفظ</button>

        <div className="preview-card">
          <h2>{title || "عنوان تجريبي"}</h2>
          {image && <img src={image} alt="preview" />}
          <p>{prompt || "هنا يظهر نص البرومبت"}</p>
        </div>

        <a className="back-link" href="/">
          الرجوع للموقع
        </a>
      </div>
    </div>
  );
}
