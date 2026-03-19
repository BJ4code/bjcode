import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Copy, Heart, Play, Image as ImageIcon, Menu, Star } from 'lucide-react';

const promptData = [
  {
    id: 1,
    type: 'image',
    title: 'Urban Reflection in Dramatic Light',
    creator: '@tariqHasanSyed',
    likes: 1500,
    premium: false,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Ultra-realistic cinematic portrait, dramatic side lighting, monochrome mood, intense facial detail, editorial photography, shallow depth of field.',
  },
  {
    id: 2,
    type: 'image',
    title: 'Honey & Fire',
    creator: 'BKD',
    likes: 916,
    premium: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Golden-hour portrait with fiery bokeh, glowing skin, luxury beauty editorial style, sharp focus, premium studio retouching.',
  },
  {
    id: 3,
    type: 'video',
    title: 'Midnight City Motion',
    creator: '@filmcraft',
    likes: 870,
    premium: false,
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Cinematic tracking shot through a rainy neon city street at night, reflective pavement, slow-motion pedestrians, atmospheric fog, film grain.',
  },
  {
    id: 4,
    type: 'image',
    title: 'Blue Dreams of Morocco',
    creator: 'BKD',
    likes: 539,
    premium: true,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Travel editorial scene in a blue-painted alley, soft natural light, luxury composition, textured walls, vivid cultural detail.',
  },
  {
    id: 5,
    type: 'video',
    title: 'Submerged',
    creator: '@_raffanascimento',
    likes: 705,
    premium: false,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Hyper-realistic close-up of a face partially submerged in water, one eye in sharp focus, ripples, cinematic tension, 8K realism.',
  },
  {
    id: 6,
    type: 'image',
    title: 'Monochrome Strength',
    creator: 'BKD',
    likes: 548,
    premium: true,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Black and white strength portrait, masculine editorial composition, high-contrast sculpted light, premium magazine look.',
  },
];

const stats = [
  { label: 'Prompts this week', value: '82+' },
  { label: 'Creators contributing', value: '1.9K+' },
  { label: 'Total likes given', value: '71.5K+' },
];

function formatLikes(value) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return `${value}`;
}

function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Badge({ children, className = '' }) {
  return <span className={`badge ${className}`}>{children}</span>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filtered = useMemo(() => {
    return promptData.filter((item) => {
      const matchesTab = tab === 'all' ? true : item.type === tab;
      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.creator.toLowerCase().includes(term) ||
        item.prompt.toLowerCase().includes(term);
      return matchesTab && matchesSearch;
    });
  }, [tab, search]);

  const copyPrompt = async (item) => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-wrap">
            <div className="brand-icon"><Sparkles size={20} /></div>
            <div>
              <div className="brand-title">PromptHub</div>
              <div className="brand-subtitle">AI image & video prompt gallery</div>
            </div>
          </div>

          <nav className="desktop-nav">
            <a href="#home">Home</a>
            <a href="#gallery">Gallery</a>
            <a href="#studio">Studio</a>
            <a href="#submit">Submit</a>
          </nav>

          <div className="desktop-actions">
            <Button variant="outline">Login</Button>
            <Button>Generate</Button>
          </div>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu container">
            <a href="#home">Home</a>
            <a href="#gallery">Gallery</a>
            <a href="#studio">Studio</a>
            <a href="#submit">Submit</a>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div>
              <Badge className="soft-badge">Community prompt studio & gallery</Badge>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="hero-title"
              >
                Share the prompts behind the art.
                <span>Discover what creators are making right now.</span>
              </motion.h1>
              <p className="hero-text">
                Build a modern prompt-sharing website for AI images and videos. Users can browse trending creations,
                copy exact prompts, explore premium posts, and submit their own work.
              </p>

              <div className="hero-actions">
                <Button>Explore prompts</Button>
                <Button variant="outline">Submit your work</Button>
              </div>

              <div className="stats-grid">
                {stats.map((stat) => (
                  <Card key={stat.label} className="stat-card">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55 }}
              className="hero-preview-wrap"
            >
              <div className="preview-glow" />
              <Card className="preview-card">
                <img src={promptData[0].image} alt={promptData[0].title} className="preview-image" />
                <div className="preview-meta">
                  <div>
                    <p className="preview-title">{promptData[0].title}</p>
                    <p className="preview-creator">Copy by {promptData[0].creator}</p>
                  </div>
                  <div className="likes-pill"><Heart size={15} /> {formatLikes(promptData[0].likes)}</div>
                </div>
                <div className="prompt-box">{promptData[0].prompt}</div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="gallery" className="section container">
          <div className="section-top">
            <div>
              <h2 className="section-title">See what the community is creating.</h2>
              <p className="section-text">
                Every image and video can include the exact prompt used, so visitors learn by browsing real examples.
              </p>
            </div>

            <div className="controls-wrap">
              <div className="search-wrap">
                <Search size={16} className="search-icon" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search prompts, creators, or styles..."
                  className="search-input"
                />
              </div>
              <div className="tabs">
                {[
                  { key: 'all', label: 'All', icon: Star },
                  { key: 'image', label: 'Images', icon: ImageIcon },
                  { key: 'video', label: 'Videos', icon: Play },
                ].map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    variant={tab === key ? 'primary' : 'outline'}
                    className={tab === key ? 'tab-active' : ''}
                    onClick={() => setTab(key)}
                  >
                    <Icon size={16} /> {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="cards-grid">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Card className="prompt-card">
                  <div className="image-wrap">
                    <img src={item.image} alt={item.title} className="card-image" />
                    <div className="card-badges">
                      <Badge className="dark-badge">{item.type === 'video' ? 'Video' : 'Image'}</Badge>
                      {item.premium && <Badge className="gold-badge">Premium</Badge>}
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-head">
                      <div>
                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-creator">by {item.creator}</p>
                      </div>
                      <div className="card-likes"><Heart size={15} /> {formatLikes(item.likes)}</div>
                    </div>

                    <p className="card-prompt">{item.prompt}</p>

                    <div className="card-actions">
                      <Button className="grow" onClick={() => copyPrompt(item)}>
                        <Copy size={16} /> {copiedId === item.id ? 'Copied' : 'Copy prompt'}
                      </Button>
                      <Button variant="outline">View details</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="studio" className="section container studio-grid">
          <Card className="info-card dark-panel">
            <p className="eyebrow">Why this site works</p>
            <h3 className="info-title">The value is in discovery + copying + community.</h3>
            <p className="info-text">
              This layout is designed for viral browsing. Visitors immediately see strong visuals, social proof, and a simple action:
              copy the prompt. That makes the site sticky and shareable.
            </p>
            <div className="feature-list">
              <div>Trending gallery for images and videos</div>
              <div>Prompt detail pages with tags, tools, and creator profiles</div>
              <div>Submission system for community uploads and moderation</div>
            </div>
          </Card>

          <Card id="submit" className="info-card light-panel">
            <p className="eyebrow light">Next step</p>
            <h3 className="info-title light-title">Turn this into a real startup-ready website.</h3>
            <p className="info-text light-text">
              Add authentication, a database, categories, likes, premium gating, and an admin panel. The UI here is already structured
              to grow into a production app.
            </p>
            <div className="dual-actions">
              <Button className="dark-btn">Build with Vite</Button>
              <Button variant="outline" className="light-outline">Launch MVP plan</Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
