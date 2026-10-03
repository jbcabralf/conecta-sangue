import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BottomNav } from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/campanhas")({
  head: () => ({ meta: [
    { title: "Campanhas | ConectaSangue" },
    { name: "description", content: "Campanhas de conscientização sobre doação de sangue e publicação de novas campanhas." },
    { property: "og:title", content: "Campanhas | ConectaSangue" },
    { property: "og:description", content: "Campanhas de conscientização sobre doação de sangue e publicação de novas campanhas." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Campaigns,
});

type Campaign = { id: string; title: string; message: string; created_at: string };

const samples = [
  { title: "Semana da doação de sangue", message: "Doe sangue e ajude a manter os estoques dos hospitais da cidade.", date: "15/09/2026" },
  { title: "Doar é seguro", message: "Conheça os requisitos e o passo a passo antes de ir ao local de doação.", date: "02/09/2026" },
];

function Card({ title, message, date, badge, onDelete }: { title: string; message: string; date: string; badge: string; onDelete?: () => void }) {
  return <article className="rounded-[16px] border border-border bg-background p-4">
    <div className="flex flex-wrap items-center justify-between gap-1.5"><span className="rounded-full bg-alert px-2.5 py-1 text-[10px] font-bold text-primary">{badge}</span><span className="flex items-center gap-2 text-[10px] text-muted-foreground">{date}{onDelete && <button type="button" onClick={onDelete} aria-label={`Excluir campanha ${title}`} className="hover:text-primary"><Trash2 size={13} /></button>}</span></div>
    <h3 className="mt-1 text-sm font-extrabold">{title}</h3>
    <p className="mt-1 whitespace-pre-line text-xs leading-snug text-muted-foreground">{message}</p>
  </article>;
}

function Campaigns() {
  const [mine, setMine] = useState<Campaign[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.from("campaigns").select("id, title, message, created_at").order("created_at", { ascending: false });
    if (data) setMine(data);
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => { if (user) { setSignedIn(true); load(); } });
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null); setStatus(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Entre na sua conta para publicar campanhas."); return; }
    setSaving(true);
    const { error: err } = await supabase.from("campaigns").insert({ user_id: user.id, title: title.trim(), message: message.trim() });
    setSaving(false);
    if (err) { setError("Não foi possível salvar. Tente novamente."); return; }
    setTitle(""); setMessage(""); setStatus("Campanha salva na sua conta. Ela ainda não é divulgada a outros usuários.");
    load();
  }

  async function remove(id: string) {
    await supabase.from("campaigns").delete().eq("id", id);
    setMine(m => m.filter(c => c.id !== id));
  }

  return <main className="min-h-dvh bg-background py-0 sm:px-4 sm:py-10">
    <div className="app-frame sm:min-h-[812px]">
      <div className="flex-1 px-5 pb-8 pt-5">
        <h1 className="text-[23px] font-extrabold leading-tight">Campanhas</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">Conscientização publicada por órgãos de saúde.</p>

        {mine.length > 0 && <section className="mt-4" aria-labelledby="mine-h">
          <h2 id="mine-h" className="mb-2 text-sm font-extrabold">Suas campanhas</h2>
          <div className="space-y-2">{mine.map(c => <Card key={c.id} title={c.title} message={c.message} date={new Date(c.created_at).toLocaleDateString("pt-BR")} badge="Sua campanha · não verificada" onDelete={() => remove(c.id)} />)}</div>
        </section>}

        <section className="mt-4 space-y-2" aria-label="Campanhas de exemplo">
          {samples.map(s => <Card key={s.title} {...s} badge="⚑ Órgão público de saúde · exemplo" />)}
        </section>

        <form onSubmit={submit} className="mt-6 rounded-[16px] border border-border bg-background p-4">
          <div className="flex items-center justify-between"><h2 className="text-sm font-extrabold">Publicar campanha</h2><span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">Órgãos de saúde</span></div>
          <div className="mt-3 space-y-1.5"><Label htmlFor="c-title" className="text-xs font-bold">Título</Label><Input id="c-title" value={title} onChange={e => setTitle(e.target.value)} required maxLength={120} placeholder="Nome da campanha" className="app-field" /></div>
          <div className="mt-3 space-y-1.5"><Label htmlFor="c-msg" className="text-xs font-bold">Mensagem</Label><textarea id="c-msg" value={message} onChange={e => setMessage(e.target.value)} required maxLength={600} rows={3} placeholder="O que você quer comunicar?" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          {status && <p role="status" className="mt-3 flex items-start gap-2 rounded-lg bg-success p-3 text-xs text-success-foreground"><Check size={15} className="mt-0.5 shrink-0" />{status}</p>}
          {error && <p role="alert" className="mt-3 rounded-lg bg-alert p-3 text-xs text-primary">{error}{!signedIn && <> <Link to="/" className="font-bold underline">Entrar</Link></>}</p>}
          <Button variant="blood" size="blood" type="submit" disabled={saving} className="mt-3 w-full">{saving ? "Salvando..." : "Publicar campanha"}</Button>
        </form>
      </div>
      <BottomNav active="/campanhas" />
    </div>
  </main>;
}
