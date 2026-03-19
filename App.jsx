import React, { useEffect, useState } from "react";
import "./styles.css";

const defaultCards = [
  {
    id: 1,
    title: "Urban Reflection in Dramatic Light",
    creator: "@bassam",
    likes: "1.5k",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    prompt: "Ultra-realistic cinematic portrait, dramatic side lighting, monochrome mood, intense facial detail."
  }
];

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
