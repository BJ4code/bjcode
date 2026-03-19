import React from "react";
import "./styles.css";

export default function App() {
  const cards = [
    {
      title: "Urban Reflection in Dramatic Light",
      creator: "@tariqHasanSyed",
      likes: "1.5k",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
      prompt:
        "Ultra-realistic cinematic portrait, dramatic side lighting, monochrome mood, intense facial detail, editorial photography, shallow depth of field.",
    },
    {
      title: "Honey & Fire",
      creator: "BKD",
      likes: "916",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
      prompt:
        "Golden-hour portrait with fiery bokeh, glowing skin, luxury beauty editorial style, sharp focus, premium studio retouching.",
    },
    {
      title: "Midnight City Motion",
      creator: "@filmcraft",
      likes: "870",
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
          <a href="#">Home</a>
          <a href="#">Gallery</a>
          <a href="#">Submit</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Share the prompts behind the art</h1>
        <p>
          Discover AI image and video prompts in a clean gallery inspired by
          modern prompt-sharing sites.
        </p>
        <button>Explore Prompts</button>
      </section>

      <section className="grid">
        {cards.map((card, i) => (
          <div className="card" key={i}>
            <img src={card.image} alt={card.title} />
            <div className="card-body">
              <h3>{card.title}</h3>
              <p className="meta">
                by {card.creator} • ♥ {card.likes}
              </p>
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
