export default function App() {
  const path = window.location.pathname;

  if (path === "/admin") {
    return <PromptHubAdminOnly />;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="logo">PromptHub</div>
        <nav>
          <a href="/">Home</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Share the prompts behind the art</h1>
        <p>Discover AI image and video prompts in a clean gallery.</p>
      </section>

    </div>
  );
}];

export default function App() {
  const [cards, setCards] = useState(defaultCards);

  useEffect(() => {
    const saved = localStorage.getItem("prompthub_admin_prompts_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      const published = parsed.filter((item) => item.status === "Published");
      if (published.length) {
        setCards(published);
      }
    }
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div className="logo">PromptHub</div>
        <nav>
          <a href="/">Home</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Share the prompts behind the art</h1>
        <p>Discover AI image and video prompts in a clean gallery.</p>
      </section>

      <section className="grid">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <img src={card.image} alt={card.title} />
            <div className="card-body">
              <h3>{card.title}</h3>
              <p className="meta">by {card.creator}</p>
              <p>{card.prompt}</p>
              <button onClick={() => navigator.clipboard.writeText(card.prompt)}>
                Copy Prompt
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
