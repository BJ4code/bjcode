import Admin from "./admin.jsx";

export default function App() {
  const path = window.location.pathname;

  if (path === "/admin") {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex items-center justify-between">
          <div className="text-3xl font-bold">PromptHub</div>
          <nav className="flex gap-6 text-sm text-white/80">
            <a href="/">Home</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>

        <section className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Share the prompts behind the art
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            Discover AI image and video prompts in a clean gallery inspired by modern prompt-sharing sites.
          </p>
        </section>
      </div>
    </div>
  );
}
