import { useMemo, useState } from "react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [items, setItems] = useState([
    {
      id: 1,
      title: "Urban Reflection in Dramatic Light",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
      prompt:
        "Ultra-realistic cinematic portrait, dramatic side lighting, monochrome mood, intense facial detail, editorial photography, shallow depth of field.",
      status: "Published",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    image: "",
    prompt: "",
    status: "Draft",
  });

  const totalPublished = useMemo(
    () => items.filter((x) => x.status === "Published").length,
    [items]
  );

  const handleSave = () => {
    if (!form.title || !form.image || !form.prompt) return;

    const newItem = {
      id: Date.now(),
      title: form.title,
      image: form.image,
      prompt: form.prompt,
      status: form.status,
    };

    setItems([newItem, ...items]);

    setForm({
      title: "",
      image: "",
      prompt: "",
      status: "Draft",
    });

    setActiveTab("prompts");
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>

        <button onClick={() => setActiveTab("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setActiveTab("new")}>
          Add Prompt
        </button>

        <button onClick={() => setActiveTab("prompts")}>
          My Prompts
        </button>

        <button onClick={() => setActiveTab("settings")}>
          Settings
        </button>

        <a href="/" className="back-home">
          الرجوع للموقع
        </a>
      </aside>

      <main className="admin-main">
        {activeTab === "dashboard" && (
          <div>
            <h1>لوحة الإدارة</h1>

            <div className="stats-grid">
              <div className="stat-card">
                <h3>{items.length}</h3>
                <p>إجمالي البرومبتات</p>
              </div>

              <div className="stat-card">
                <h3>{totalPublished}</h3>
                <p>المنشور</p>
              </div>

              <div className="stat-card">
                <h3>{items.length - totalPublished}</h3>
                <p>المسودات</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "new" && (
          <div>
            <h1>إضافة برومبت جديد</h1>

            <div className="admin-form">
              <input
                type="text"
                placeholder="عنوان البرومبت"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="رابط الصورة"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
              />

              <textarea
                rows="6"
                placeholder="اكتب البرومبت"
                value={form.prompt}
                onChange={(e) =>
                  setForm({ ...form, prompt: e.target.value })
                }
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>

              <button onClick={handleSave}>حفظ</button>
            </div>

            <div className="preview-card">
              <h2>{form.title || "عنوان تجريبي"}</h2>

              {form.image && (
                <img src={form.image} alt="preview" />
              )}

              <p>
                {form.prompt || "هنا يظهر نص البرومبت"}
              </p>

              <span className="status-badge">
                {form.status}
              </span>
            </div>
          </div>
        )}

        {activeTab === "prompts" && (
          <div>
            <h1>البرومبتات</h1>

            <div className="prompt-list">
              {items.map((item) => (
                <div className="prompt-item" key={item.id}>
                  <img src={item.image} alt={item.title} />

                  <div className="prompt-item-content">
                    <h3>{item.title}</h3>
                    <p>{item.prompt}</p>

                    <span className="status-badge">
                      {item.status}
                    </span>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h1>الإعدادات</h1>

            <div className="settings-box">
              <p>هذه لوحة إدارة بسيطة كبداية.</p>
              <p>
                لاحقاً نربطها بقاعدة بيانات ويصير الموقع
                احترافي كامل.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
