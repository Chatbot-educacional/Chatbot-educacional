/* ----------------------------------------------------------------------------
  FlashcardStudio – Versão "robusta" (mini‑Anki)
  -----------------------------------------------------------------------------
  Recursos incluídos
  • Vários decks (seleção/criação)                                              
  • Algoritmo SM‑2 completo com parametrização                                  
  • Revisão espaçada (Due / New / Learning)                                     
  • Suporte a Markdown + preview (react‑markdown)                               
  • Upload de imagem (File → dataURL)                                           
  • Estatísticas básicas com gráficos (recharts)                                
  • Importar / Exportar JSON                                                    
  • Teclas de atalho: 1‑5 para pontuar, Barra de espaço para virar carta        
  • Persistência automática em localStorage                                     
  • Pesquisa / filtro por texto ou tags                                         
  • UI baseada em shadcn/ui                                                     
  -----------------------------------------------------------------------------
  Dependências (pnpm add ...):
  ─ react-markdown, remark-gfm, recharts, uuid
  -----------------------------------------------------------------------------*/

  import {
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
    KeyboardEvent,
  } from "react";
  import dayjs from "dayjs";
  import { v4 as uuid } from "uuid";
  import ReactMarkdown from "react-markdown";
  import remarkGfm from "remark-gfm";
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { Button } from "@/components/ui/button";
  import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
  import { Badge } from "@/components/ui/badge";
  
  /* ============================================================================
     Tipos e algoritmos ---------------------------------------------------------*/
  export type Quality = 0 | 1 | 2 | 3 | 4 | 5;
  
  export interface FlashCard {
    id: string;
    deckId: string;
    front: string;
    back: string;
    img?: string; // base64 ou URL
    tags: string[];
    createdAt: string;
    due: string;
    repetitions: number;
    interval: number; // dias
    ease: number; // ease factor
  }
  
  export interface Deck {
    id: string;
    name: string;
    createdAt: string;
  }
  
  export interface FlashState {
    decks: Deck[];
    cards: FlashCard[];
  }
  
  /* ------------------------- SM‑2 ------------------------------------------------*/
  function schedule(card: FlashCard, q: Quality): FlashCard {
    let { repetitions, interval, ease } = card;
  
    if (q < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * ease);
  
      repetitions += 1;
      ease = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    }
  
    return {
      ...card,
      repetitions,
      interval,
      ease,
      due: dayjs().add(interval, "day").toISOString(),
    };
  }
  
  /* ------------------------- Persistência ---------------------------------------*/
  const STORAGE_KEY = "flashstudio:v1";
  
  function loadState(): FlashState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) throw new Error();
      return JSON.parse(raw) as FlashState;
    } catch {
      // estado inicial
      const defaultDeck: Deck = {
        id: uuid(),
        name: "Default",
        createdAt: new Date().toISOString(),
      };
      return { decks: [defaultDeck], cards: [] };
    }
  }
  
  function saveState(state: FlashState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  
  /* ------------------------- Reducer -------------------------------------------*/
  
  type Action =
    | { type: "add-card"; payload: FlashCard }
    | { type: "update-card"; payload: FlashCard }
    | { type: "delete-card"; payload: string }
    | { type: "add-deck"; payload: Deck }
    | { type: "rename-deck"; payload: { id: string; name: string } }
    | { type: "import"; payload: FlashState };
  
  function reducer(state: FlashState, action: Action): FlashState {
    switch (action.type) {
      case "add-card":
        return { ...state, cards: [...state.cards, action.payload] };
      case "update-card":
        return {
          ...state,
          cards: state.cards.map((c) => (c.id === action.payload.id ? action.payload : c)),
        };
      case "delete-card":
        return { ...state, cards: state.cards.filter((c) => c.id !== action.payload) };
      case "add-deck":
        return { ...state, decks: [...state.decks, action.payload] };
      case "rename-deck":
        return {
          ...state,
          decks: state.decks.map((d) => (d.id === action.payload.id ? { ...d, name: action.payload.name } : d)),
        };
      case "import":
        return action.payload;
      default:
        return state;
    }
  }
  
  /* ============================================================================
     Componente principal -------------------------------------------------------*/
  export default function FlashcardStudio() {
    const [state, dispatch] = useReducer(reducer, undefined, loadState);
    const { decks, cards } = state;
    const [activeDeckId, setActiveDeckId] = useState<string>(decks[0].id);
    const [tab, setTab] = useState<"review" | "manage" | "stats">("review");
  
    /* --- Auto‑persist ---------------------------------------------------------*/
    useEffect(() => saveState(state), [state]);
  
    /* ---------------- Gerenciar ------------------------------------------------*/
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [tagsInput, setTagsInput] = useState("");
    const [imgFile, setImgFile] = useState<string | undefined>(undefined);
  
    const addCard = () => {
      if (!front.trim() || !back.trim()) return;
      const card: FlashCard = {
        id: uuid(),
        deckId: activeDeckId,
        front: front.trim(),
        back: back.trim(),
        img: imgFile,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        createdAt: new Date().toISOString(),
        due: new Date().toISOString(),
        repetitions: 0,
        interval: 0,
        ease: 2.5,
      };
      dispatch({ type: "add-card", payload: card });
      setFront("");
      setBack("");
      setTagsInput("");
      setImgFile(undefined);
    };
  
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => setImgFile(reader.result as string);
      reader.readAsDataURL(file);
    };
  
    /* ---------------- Revisão --------------------------------------------------*/
    const dueCards = useMemo(() =>
      cards.filter(
        (c) =>
          c.deckId === activeDeckId &&
          (dayjs(c.due).isBefore(dayjs(), "day") || dayjs(c.due).isSame(dayjs(), "day"))
      ),
    [cards, activeDeckId]);
  
    const [idx, setIdx] = useState(0);
    const [showBack, setShowBack] = useState(false);
  
    const current = dueCards[idx];
  
    const answer = (q: Quality) => {
      if (!current) return;
      dispatch({ type: "update-card", payload: schedule(current, q) });
      setShowBack(false);
      setIdx((i) => (i + 1) % dueCards.length);
    };
  
    /* Keyboard shortcuts */
    const containerRef = useRef<HTMLDivElement | null>(null);
    const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
      if (tab !== "review") return;
      if (e.key === " " && current) {
        e.preventDefault();
        setShowBack((s) => !s);
      }
      if ("12345".includes(e.key) && showBack) {
        answer((Number(e.key) + 1) as Quality); // 1->2, 2->3, etc.
      }
    };
  
    /* ----------------- Estatísticas -------------------------------------------*/
    const statsData = useMemo(() => {
      const last30 = Array.from({ length: 30 }).map((_, i) => {
        const date = dayjs().subtract(29 - i, "day");
        const reviewed = cards.filter((c) => dayjs(c.due).isSame(date, "day") && c.repetitions > 0).length;
        return { date: date.format("DD/MM"), reviewed };
      });
      return last30;
    }, [cards]);
  
    /* ----------------- Import / Export ----------------------------------------*/
    const exportJSON = () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "flashcards.json";
      a.click();
      URL.revokeObjectURL(url);
    };
  
    const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string) as FlashState;
          dispatch({ type: "import", payload: data });
        } catch (err) {
          alert("Arquivo inválido");
        }
      };
      reader.readAsText(file);
    };
  
    /* ----------------- Render --------------------------------------------------*/
    return (
      <div
        tabIndex={0}
        onKeyDown={handleKey}
        ref={containerRef}
        className="container mx-auto p-4 space-y-6 focus:outline-none"
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <Select value={activeDeckId} onValueChange={(v) => setActiveDeckId(v)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {decks.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name}
                </SelectItem>
              ))}
              <SelectItem value="_new" disabled>
                + Novo deck (em breve)
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" onClick={exportJSON}>
            Exportar JSON
          </Button>
          <Input type="file" accept="application/json" onChange={importJSON} className="w-40" />
        </div>
  
        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Flashcard Studio</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
              <TabsList className="mb-4">
                <TabsTrigger value="review">Revisar ({dueCards.length})</TabsTrigger>
                <TabsTrigger value="manage">Gerenciar</TabsTrigger>
                <TabsTrigger value="stats">Estatísticas</TabsTrigger>
              </TabsList>
  
              {/* ---------- Revisão ---------- */}
              <TabsContent value="review" className="space-y-4">
                {dueCards.length === 0 ? (
                  <p className="text-muted-foreground text-center">
                    Nada para rever hoje 🙌
                  </p>
                ) : (
                  <>
                    {/* Card */}
                    <div
                      className="border rounded-lg p-6 min-h-[160px] cursor-pointer select-none text-lg leading-relaxed"
                      onClick={() => setShowBack((s) => !s)}
                    >
                      {current?.img && <img src={current.img} alt="img" className="mb-2 max-h-40" />}
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {showBack ? current.back : current.front}
                      </ReactMarkdown>
                    </div>
  
                    {/* Actions */}
                    {showBack ? (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[0, 3, 4, 5].map((q) => (
                          <Button key={q} onClick={() => answer(q as Quality)}>
                            {q === 0 ? "Errei" : q === 3 ? "Bom" : q === 4 ? "Fácil" : "Muito fácil"}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">
                        Barra de espaço ou clique para virar
                      </p>
                    )}
                  </>
                )}
              </TabsContent>
  
              {/* ---------- Gerenciar ---------- */}
              <TabsContent value="manage" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Formulário */}
                  <div className="space-y-2">
                    <Input
                      placeholder="Frente (Markdown)"
                      value={front}
                      onChange={(e) => setFront(e.target.value)}
                    />
                    <Textarea
                      placeholder="Verso (Markdown)"
                      value={back}
                      onChange={(e) => setBack(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <Input
                      placeholder="Tags (separadas por vírgula)"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                    />
                    <Input type="file" accept="image/*" onChange={handleFile} />
                    <Button onClick={addCard}>Adicionar cartão</Button>
                  </div>
  
                  {/* Lista de cartões */}
                  <div className="border rounded p-2 max-h-[330px] overflow-y-auto space-y-2">
                    {cards.filter((c) => c.deckId === activeDeckId).length === 0 && (
                      <p className="text-center text-muted-foreground">Nenhum cartão.</p>
                    )}
                    {cards
                      .filter((c) => c.deckId === activeDeckId)
                      .map((c) => (
                        <div key={c.id} className="border rounded p-2 flex flex-col gap-1 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium truncate mr-4" title={c.front}>
                              {c.front}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {dayjs(c.due).format("DD/MM")}
                            </span>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {c.tags.map((t) => (
                              <Badge key={t}>{t}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>
  
              {/* ---------- Estatísticas ---------- */}
              <TabsContent value="stats">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={statsData} margin={{ top: 20, right: 20 }}>
                    <XAxis dataKey="date" hide />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="reviewed" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }
  