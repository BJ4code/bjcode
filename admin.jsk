import React, { useEffect, useState } from "react";

const STORAGE_KEY = "prompthub_admin_prompts_v1";
const PASSWORD = "1234";

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image: "",
    prompt: "",
    status: "Published"
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const login = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setLoggedIn(true);
    } else {
      alert("كلمة المرور غلط");
    }
  };

  const addItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      creator: "@bassam",
      likes: 0,
      ...form
    };
    setItems([newItem, ...items]);
    setForm({
      title: "",
      image: "",
      prompt: "",
      status: "Published"
    });
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  if (!loggedIn) {
    return (
      <div className="page">
        <h1>Admin Login</h1>
        <form onSubmit={login}>
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">دخول</button>
        </form>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>لوحة الإدارة</h1>

      <form onSubmit={addItem} className="admin-form">
        <input
          placeholder="عنوان"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="رابط الصورة"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <textarea
          placeholder="النص"
          value={form.prompt}
          onChange={(e) => setForm({ ...form, prompt: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
        <button type="submit">حفظ</button>
      </form>

      <hr />

      {items.map((item) => (
        <div key={item.id} className="card" style={{ marginBottom: "20px" }}>
          <img src={item.image} alt={item.title} />
          <div className="card-body">
            <h3>{item.title}</h3>
            <p>{item.prompt}</p>
            <p>{item.status}</p>
            <button onClick={() => removeItem(item.id)}>حذف</button>
          </div>
        </div>
      ))}
    </div>
  );
}
