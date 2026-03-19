import Admin from "./admin.jsx";

export default function App() {
  const path = window.location.pathname;

  if (path === "/admin") {
    return <Admin />;
  }

  const cards = [
    {
      title: "Urban Reflection in Dramatic Light",
      creator: "@bassam",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
      prompt:
        "Ultra-realistic cinematic portrait, dramatic side lighting, monochrome mood, intense facial detail, editorial photography, shallow depth of field.",
    },
    {
      title: "Honey & Fire",
      creator: "@bassam",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
      prompt:
        "Golden-hour portrait with fiery bokeh, glowing skin, luxury beauty editorial style, sharp focus, premium studio retouching.",
    },
    {
      title: "Midnight City Motion",
      creator: "@bassam",
      image:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop",
      prompt:
        "Cinematic tracking shot through a rainy neon city street at night, reflective pavement, slow-motion pedestrians, atmospheric fog, film grain.",
    },
  ];

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
        {cards.map((card, i) => (
          <div className="card" key={i}>
            <img src={card.image} alt={card.title} />
            <div className="card-body">
              <h3>{card.title}</h3>
              <p className="meta">by {card.creator}</p>
              <p>{card.prompt}</p>
              <button
                onClick={() => navigator.clipboard.writeText(card.prompt)}
              >
                Copy Prompt
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
