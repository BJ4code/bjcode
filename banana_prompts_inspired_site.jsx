import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Copy, Heart, Play, Image as ImageIcon, Menu, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const promptData = [
  {
    id: 1,
    type: "image",
    title: "Urban Reflection in Dramatic Light",
    creator: "@tariqHasanSyed",
    likes: 1500,
    premium: false,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    prompt:
      "Ultra-realistic cinematic portrait, dramatic side lighting, monochrome mood, intense facial detail, editorial photography, shallow depth of field.",
  },
  {
    id: 2,
    type: "image",
    title: "Honey & Fire",
    creator: "BKD",
    likes: 916,
    premium: true,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    prompt:
      "Golden-hour portrait with fiery bokeh, glowing skin, luxury beauty editorial style, sharp focus, premium studio retouching.",
  },
  {
    id: 3,
    type: "video",
    title: "Midnight City Motion",
    creator: "@filmcraft",
    likes: 870,
    premium: false,
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop",
    prompt:
      "Cinematic tracking shot through a rainy neon city street at night, reflective pavement, slow-motion pedestrians, atmospheric fog, film grain.",
  },
  {
    id: 4,
    type: "image",
    title: "Blue Dreams of Morocco",
    creator: "BKD",
    likes: 539,
    premium: true,
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1200&auto=format&fit=crop",
    prompt:
      "Travel editorial scene in a blue-painted alley, soft natural light, luxury composition, textured walls, vivid cultural detail.",
  },
  {
    id: 5,
    type: "video",
    title: "Submerged",
    creator: "@_raffanascimento",
    likes: 705,
    premium: false,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    prompt:
      "Hyper-realistic close-up of a face partially submerged in water, one eye in sharp focus, ripples, cinematic tension, 8K realism.",
  },
  {
    id: 6,
    type: "image",
    title: "Monochrome Strength",
    creator: "BKD",
    likes: 548,
    premium: true,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    prompt:
      "Black and white strength portrait, masculine editorial composition, high-contrast sculpted light, premium magazine look.",
  },
];

const stats = [
  { label: "Prompts this week", value: "82+" },
  { label: "Creators contributing", value: "1.9K+" },
  { label: "Total likes given", value: "71.5K+" },
];

function formatLikes(value) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return `${value}`;
}

export default function BananaPromptsInspiredSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const filtered = useMemo(() => {
    return promptData.filter((item) => {
      const matchesTab = tab === "all" ? true : item.type === tab;
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
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">PromptHub</p>
              <p className="text-xs text-white/55">AI image & video prompt gallery</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#home" className="text-sm text-white/80 transition hover:text-white">Home</a>
            <a href="#gallery" className="text-sm text-white/80 transition hover:text-white">Gallery</a>
            <a href="#studio" className="text-sm text-white/80 transition hover:text-white">Studio</a>
            <a href="#submit" className="text-sm text-white/80 transition hover:text-white">Submit</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10">Login</Button>
            <Button className="rounded-xl bg-white text-black hover:bg-white/90">Generate</Button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-white/10 p-2 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm text-white/80">
              <a href="#home">Home</a>
              <a href="#gallery">Gallery</a>
              <a href="#studio">Studio</a>
              <a href="#submit">Submit</a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Badge className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-white hover:bg-white/10">
                Community prompt studio & gallery
              </Badge>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
              >
                Share the prompts behind the art.
                <span className="block text-white/60">Discover what creators are making right now.</span>
              </motion.h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                Build a modern prompt-sharing website for AI images and videos. Users can browse trending creations,
                copy exact prompts, explore premium posts, and submit their own work.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="h-12 rounded-2xl bg-white px-6 text-black hover:bg-white/90">Explore prompts</Button>
                <Button variant="outline" className="h-12 rounded-2xl border-white/15 bg-transparent px-6 text-white hover:bg-white/10">
                  Submit your work
                </Button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <Card key={stat.label} className="rounded-2xl border-white/10 bg-white/5 shadow-2xl backdrop-blur">
                    <CardContent className="p-5">
                      <div className="text-2xl font-semibold md:text-3xl">{stat.value}</div>
                      <div className="mt-1 text-sm text-white/60">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-white/10 blur-3xl" />
              <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-white/5 shadow-2xl">
                <CardContent className="p-4 md:p-5">
                  <img
                    src={promptData[0].image}
                    alt={promptData[0].title}
                    className="h-[420px] w-full rounded-[1.5rem] object-cover"
                  />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-medium">{promptData[0].title}</p>
                      <p className="mt-1 text-sm text-white/60">Copy by {promptData[0].creator}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
                      <Heart className="h-4 w-4" /> {formatLikes(promptData[0].likes)}
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white/75">
                    {promptData[0].prompt}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">See what the community is creating.</h2>
              <p className="mt-2 max-w-2xl text-white/65">
                Every image and video can include the exact prompt used, so visitors learn by browsing real examples.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto md:min-w-[430px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search prompts, creators, or styles..."
                  className="h-11 rounded-2xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/35"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "All", icon: Star },
                  { key: "image", label: "Images", icon: ImageIcon },
                  { key: "video", label: "Videos", icon: Play },
                ].map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    onClick={() => setTab(key)}
                    variant="outline"
                    className={`rounded-2xl border-white/10 ${tab === key ? "bg-white text-black hover:bg-white/90" : "bg-white/5 text-white hover:bg-white/10"}`}
                  >
                    <Icon className="mr-2 h-4 w-4" /> {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Card className="group overflow-hidden rounded-[1.75rem] border-white/10 bg-white/5 shadow-xl transition hover:-translate-y-1 hover:bg-white/[0.07]">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img src={item.image} alt={item.title} className="h-72 w-full object-cover" />
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <Badge className="rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/60">
                          {item.type === "video" ? "Video" : "Image"}
                        </Badge>
                        {item.premium && (
                          <Badge className="rounded-full bg-amber-300 text-black hover:bg-amber-300">Premium</Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-medium leading-6">{item.title}</h3>
                          <p className="mt-1 text-sm text-white/55">by {item.creator}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-white/70">
                          <Heart className="h-4 w-4" /> {formatLikes(item.likes)}
                        </div>
                      </div>

                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/70">{item.prompt}</p>

                      <div className="mt-5 flex gap-3">
                        <Button
                          onClick={() => copyPrompt(item)}
                          className="flex-1 rounded-2xl bg-white text-black hover:bg-white/90"
                        >
                          <Copy className="mr-2 h-4 w-4" /> {copiedId === item.id ? "Copied" : "Copy prompt"}
                        </Button>
                        <Button variant="outline" className="rounded-2xl border-white/10 bg-transparent text-white hover:bg-white/10">
                          View details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="studio" className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-[2rem] border-white/10 bg-white/5 shadow-xl">
              <CardContent className="p-8">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">Why this site works</p>
                <h3 className="mt-3 text-2xl font-semibold md:text-3xl">The value is in discovery + copying + community.</h3>
                <p className="mt-4 text-white/70 leading-7">
                  This layout is designed for viral browsing. Visitors immediately see strong visuals, social proof, and a simple action:
                  copy the prompt. That makes the site sticky and shareable.
                </p>
                <div className="mt-6 grid gap-3 text-sm text-white/75">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Trending gallery for images and videos</div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Prompt detail pages with tags, tools, and creator profiles</div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Submission system for community uploads and moderation</div>
                </div>
              </CardContent>
            </Card>

            <Card id="submit" className="rounded-[2rem] border-white/10 bg-white text-black shadow-xl">
              <CardContent className="p-8">
                <p className="text-sm uppercase tracking-[0.2em] text-black/45">Next step</p>
                <h3 className="mt-3 text-2xl font-semibold md:text-3xl">Turn this into a real startup-ready website.</h3>
                <p className="mt-4 leading-7 text-black/70">
                  Add authentication, a database, categories, likes, premium gating, and an admin panel. The UI here is already structured
                  to grow into a production app.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Button className="h-12 rounded-2xl bg-black text-white hover:bg-black/90">Build with Next.js</Button>
                  <Button variant="outline" className="h-12 rounded-2xl border-black/15 bg-transparent hover:bg-black/5">Launch MVP plan</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
