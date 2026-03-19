import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Image as ImageIcon,
  PlusCircle,
  Settings,
  Search,
  Heart,
  Trash2,
  Pencil,
  Eye,
  Upload,
  BarChart3,
  Users,
  Copy,
  Menu,
  X,
  Lock,
  LogOut,
  Shield,
  Save,
} from "lucide-react";

const ADMIN_PASSWORD = "1234";
const STORAGE_KEY = "prompthub_admin_prompts_v1";
const SETTINGS_KEY = "prompthub_admin_settings_v1";

const initialPrompts = [
  {
    id: 1,
    title: "Urban Reflection in Dramatic Light",
    creator: "@bassam",
    category: "Image",
    likes: 1500,
    views: 6200,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    prompt:
      "Ultra-realistic cinematic portrait, dramatic side lighting, monochrome mood, intense facial detail, editorial photography, shallow depth of field.",
  },
  {
    id: 2,
    title: "Honey & Fire",
    creator: "@bassam",
    category: "Image",
    likes: 916,
    views: 4100,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    prompt:
      "Golden-hour portrait with fiery bokeh, glowing skin, luxury beauty editorial style, sharp focus, premium studio retouching.",
  },
];

const initialSiteSettings = {
  siteName: "PromptHub",
  heroTitle: "Share the prompts behind the art",
  heroSubtitle: "Manage your website content, images, and prompts from one protected admin page.",
  showCreator: true,
  enableCopy: true,
};

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/55">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-white/45">{sub}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function PromptHubAdminOnly() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [prompts, setPrompts] = useState(initialPrompts);
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "Image",
    image: "",
    prompt: "",
    status: "Draft",
  });

  useEffect(() => {
    const savedPrompts = localStorage.getItem(STORAGE_KEY);
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    const savedAuth = localStorage.getItem("prompthub_admin_login");

    if (savedPrompts) {
      try {
        setPrompts(JSON.parse(savedPrompts));
      } catch {}
    }

    if (savedSettings) {
      try {
        setSiteSettings(JSON.parse(savedSettings));
      } catch {}
    }

    if (savedAuth === "true") setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  }, [prompts]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(siteSettings));
  }, [siteSettings]);

  const filteredPrompts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return prompts.filter((item) => {
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.prompt.toLowerCase().includes(q)
      );
    });
  }, [prompts, search]);

  const totalLikes = prompts.reduce((sum, item) => sum + item.likes, 0);
  const totalViews = prompts.reduce((sum, item) => sum + item.views, 0);
  const publishedCount = prompts.filter((item) => item.status === "Published").length;

  const resetForm = () => {
    setForm({
      title: "",
      category: "Image",
      image: "",
      prompt: "",
      status: "Draft",
    });
    setEditingId(null);
  };

  const addOrUpdatePrompt = (e) => {
    e.preventDefault();
    if (!form.title || !form.prompt || !form.image) return;

    if (editingId) {
      setPrompts(
        prompts.map((item) =>
          item.id === editingId
            ? { ...item, ...form }
            : item
        )
      );
    } else {
      const newPrompt = {
        id: Date.now(),
        creator: "@bassam",
        likes: 0,
        views: 0,
        ...form,
      };
      setPrompts([newPrompt, ...prompts]);
    }

    resetForm();
    setActiveTab("prompts");
  };

  const deletePrompt = (id) => {
    setPrompts(prompts.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  };

  const toggleStatus = (id) => {
    setPrompts(
      prompts.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Published" ? "Draft" : "Published",
            }
          : item
      )
    );
  };

  const editPrompt = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      image: item.image,
      prompt: item.prompt,
      status: item.status,
    });
    setActiveTab("new");
  };

  const copyPromptText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("prompthub_admin_login", "true");
      setLoginError("");
    } else {
      setLoginError("كلمة المرور غير صحيحة");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("prompthub_admin_login");
    setPassword("");
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "prompts", label: "My Prompts", icon: ImageIcon },
    { key: "new", label: editingId ? "Edit Prompt" : "Add Prompt", icon: PlusCircle },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-white">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Admin Login</h1>
              <p className="text-sm text-white/55">صفحة الإدارة فقط للتحكم بالموقع وإضافة الصور</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/60">Password</label>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <Lock className="h-4 w-4 text-white/45" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-transparent outline-none placeholder:text-white/30"
                />
              </div>
            </div>

            {loginError && <p className="text-sm text-red-300">{loginError}</p>}

            <button className="w-full rounded-2xl bg-white px-5 py-3 font-medium text-black">
              دخول الإدارة
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-white/10 bg-black/30 p-5 lg:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black font-bold">
              P
            </div>
            <div>
              <p className="text-lg font-semibold">{siteSettings.siteName}</p>
              <p className="text-xs text-white/50">Protected Admin Panel</p>
            </div>
          </div>

          <div className="space-y-2">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                  activeTab === key ? "bg-white text-black" : "bg-transparent text-white/75 hover:bg-white/10"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={logout}
            className="mt-8 flex w-full items-center gap-3 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-left text-red-200"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/85 px-4 py-4 backdrop-blur md:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenu(!mobileMenu)}
                  className="rounded-xl border border-white/10 p-2 lg:hidden"
                >
                  {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {activeTab === "dashboard" && "Dashboard"}
                    {activeTab === "prompts" && "My Prompts"}
                    {activeTab === "new" && (editingId ? "Edit Prompt" : "Add New Prompt")}
                    {activeTab === "analytics" && "Analytics"}
                    {activeTab === "settings" && "Settings"}
                  </h1>
                  <p className="text-sm text-white/50">Admin-only page to control website content and images</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <Search className="h-4 w-4 text-white/45" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search prompts..."
                  className="bg-transparent text-sm outline-none placeholder:text-white/35"
                />
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <StatCard icon={ImageIcon} label="Total Prompts" value={prompts.length} sub="All content in your library" />
                  <StatCard icon={Heart} label="Total Likes" value={totalLikes.toLocaleString()} sub="Combined likes on prompts" />
                  <StatCard icon={Eye} label="Total Views" value={totalViews.toLocaleString()} sub="Prompt page views" />
                  <StatCard icon={Users} label="Published" value={publishedCount} sub="Visible to visitors" />
                </div>
              </div>
            )}

            {activeTab === "prompts" && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">All Prompts</h2>
                    <p className="text-sm text-white/50">Edit, publish, or delete website content</p>
                  </div>
                  <button
                    onClick={() => {
                      resetForm();
                      setActiveTab("new");
                    }}
                    className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black"
                  >
                    Add Prompt
                  </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10">
                  {filteredPrompts.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-3 border-b border-white/10 px-4 py-4 text-sm last:border-0">
                      <div className="col-span-12 flex items-center gap-3 md:col-span-5">
                        <img src={item.image} alt={item.title} className="h-14 w-14 rounded-xl object-cover" />
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-white/50">{item.creator}</p>
                        </div>
                      </div>
                      <div className="col-span-4 md:col-span-2 text-white/70">{item.category}</div>
                      <div className="col-span-4 md:col-span-2">
                        <button
                          onClick={() => toggleStatus(item.id)}
                          className={`rounded-full px-3 py-1 text-xs ${
                            item.status === "Published" ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"
                          }`}
                        >
                          {item.status}
                        </button>
                      </div>
                      <div className="col-span-2 md:col-span-1 text-white/70">{item.likes}</div>
                      <div className="col-span-12 flex gap-2 md:col-span-2">
                        <button onClick={() => editPrompt(item)} className="rounded-xl bg-white/5 p-2 hover:bg-white/10"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => copyPromptText(item.prompt)} className="rounded-xl bg-white/5 p-2 hover:bg-white/10"><Copy className="h-4 w-4" /></button>
                        <button onClick={() => deletePrompt(item.id)} className="rounded-xl bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "new" && (
              <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
                  <h2 className="text-lg font-semibold">{editingId ? "Edit Prompt" : "Create Prompt"}</h2>

                  <form onSubmit={addOrUpdatePrompt} className="mt-5 space-y-4">
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                      placeholder="Write prompt title"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                      >
                        <option className="text-black">Image</option>
                        <option className="text-black">Video</option>
                      </select>

                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                      >
                        <option className="text-black">Draft</option>
                        <option className="text-black">Published</option>
                      </select>
                    </div>

                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-black/20 px-4 py-4 hover:bg-black/30">
                      <Upload className="h-5 w-5 text-white/60" />
                      <span className="text-sm text-white/65">Choose image from your device</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>

                    <input
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                      placeholder="Paste image URL here"
                    />

                    <textarea
                      rows={6}
                      value={form.prompt}
                      onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                      placeholder="Write the full prompt"
                    />

                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-black">
                        <Save className="h-4 w-4" /> {editingId ? "Update Prompt" : "Save Prompt"}
                      </button>
                      <button type="button" onClick={resetForm} className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-white">
                        Reset
                      </button>
                    </div>
                  </form>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
                  <h2 className="text-lg font-semibold">Live Preview</h2>

                  <motion.div
                    key={form.title + form.image + form.prompt + form.status}
                    initial={{ opacity: 0.7, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/25"
                  >
                    <img
                      src={form.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"}
                      alt="Preview"
                      className="h-80 w-full object-cover"
                    />
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold">{form.title || "Your prompt title"}</h3>
                          <p className="mt-1 text-sm text-white/50">@bassam • {form.category}</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            form.status === "Published" ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"
                          }`}
                        >
                          {form.status}
                        </span>
                      </div>
                      <p className="mt-4 leading-7 text-white/70">
                        {form.prompt || "Your prompt description will appear here as a preview card before publishing."}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
                  <h2 className="text-lg font-semibold">Site Identity</h2>
                  <div className="mt-5 space-y-4">
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                    />
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                      value={siteSettings.heroTitle}
                      onChange={(e) => setSiteSettings({ ...siteSettings, heroTitle: e.target.value })}
                    />
                    <textarea
                      rows={4}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                      value={siteSettings.heroSubtitle}
                      onChange={(e) => setSiteSettings({ ...siteSettings, heroSubtitle: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
