import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, Check, MapPin } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { displayType, sampleRequests, timeAgo, type RequestView } from "@/lib/blood";

function RequestCard({ request }: { request: RequestView }) {
  return <Link to="/solicitacao" search={{ id: request.id }} className="flex min-h-[74px] items-center gap-3 rounded-[16px] border border-border bg-background px-3 py-2 transition-colors hover:bg-accent" aria-label={`Ver solicitação de ${request.name}`}>
    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">{displayType(request.bloodType)}</span>
    <div className="min-w-0 flex-1"><h3 className="truncate text-xs font-extrabold leading-tight">{request.name}</h3><p className="mt-1 flex items-center gap-0.5 text-[11px] text-muted-foreground">{request.distance ? <><MapPin size={11} /> {request.distance}</> : `Publicada ${request.published}`}</p></div>
    <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${request.urgent ? "bg-warning text-warning-foreground" : "bg-muted text-muted-foreground"}`}>{request.urgent ? "Urgente" : "Normal"}</span>
  </Link>;
}

export const Route = createFileRoute("/inicio")({
  head: () => ({ meta: [
    { title: "Início | ConectaSangue" },
    { name: "description", content: "Acompanhe campanhas e solicitações de sangue no ConectaSangue." },
    { property: "og:title", content: "Início | ConectaSangue" },
    { property: "og:description", content: "Acompanhe campanhas e solicitações de sangue no ConectaSangue." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Home,
});

type Profile = { full_name: string; neighborhood_city: string; blood_type: string };

function Home() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [myRequests, setMyRequests] = useState<RequestView[]>([]);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (user) {
        setSignedIn(true);
        const { data } = await supabase.from("donor_profiles").select("full_name, neighborhood_city, blood_type").eq("id", user.id).maybeSingle();
        if (!active) return;
        if (data) setProfile(data);
        else {
          const metadata = user.user_metadata;
          if (typeof metadata['full_name'] === "string" && typeof metadata['neighborhood_city'] === "string" && typeof metadata['blood_type'] === "string" && user.email) {
            const candidate = { id: user.id, email: user.email, full_name: metadata['full_name'], neighborhood_city: metadata['neighborhood_city'], blood_type: metadata['blood_type'] };
            const { error } = await supabase.from("donor_profiles").upsert(candidate);
            if (!error && active) setProfile(candidate);
          }
        }
        const { data: reqs } = await supabase.from("blood_requests").select("*").order("created_at", { ascending: false });
        if (active && reqs) setMyRequests(reqs.map(d => ({ id: d.id, name: d.location, area: d.requester_kind === "hospital" ? "Hospital ou banco" : "Familiar", distance: null, bloodType: d.blood_type, urgent: d.urgent, published: timeAgo(d.created_at), sample: false, patient: d.patient_name })));
      }
      if (active) setLoading(false);
    }
    load();
    return () => { active = false; };
  }, []);

  const firstName = profile?.full_name.trim().split(/\s+/)[0] || (signedIn ? "doador" : "Ana");
  const type = profile?.blood_type || (signedIn ? "—" : "A+");
  const city = profile?.neighborhood_city || (signedIn ? "Local não informado" : "Rio de Janeiro");

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return <main className="min-h-dvh bg-background py-0 sm:py-10 sm:px-4">
    <div className="app-frame sm:min-h-[812px]">
      <div className="flex-1 px-5 pt-6 pb-10">
        <header className="mb-4 flex items-start justify-between gap-3">
          <div><h1 className="text-[23px] leading-tight font-extrabold">Olá, {loading ? "..." : firstName}</h1><p className="mt-0.5 text-xs text-muted-foreground">Tipo {type} · {city}</p></div>
          <Button variant="outline" size="icon" aria-label="Notificações" title="Notificações" onClick={() => setNoticeOpen(!noticeOpen)} className="size-10 shrink-0 rounded-full border-border bg-background shadow-none"><Bell size={18} /></Button>
        </header>
        {noticeOpen && <div className="mb-3 rounded-lg border border-border bg-background px-4 py-3 text-xs leading-relaxed" role="status">As solicitações exibidas nesta tela são exemplos do protótipo. Nenhum alerta real foi enviado.</div>}
        {!signedIn && <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-xs"><span>Visualização de exemplo</span><Link to="/" className="shrink-0 font-bold text-primary underline underline-offset-2">Cadastrar-me</Link></div>}
        {signedIn && <div className="mb-3 flex items-center justify-between gap-2 text-xs"><span className="text-muted-foreground">Dados de campanhas e solicitações ilustrativos</span><Button variant="link" size="sm" onClick={signOut} className="h-auto shrink-0 p-0">Sair</Button></div>}

        <div className="flex min-h-[90px] items-center gap-4 rounded-[18px] border border-success-foreground/15 bg-success px-4 py-3 text-success-foreground">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-success-foreground text-primary-foreground"><Check size={22} /></span>
          <div><p className="text-sm font-extrabold">{signedIn ? "Aptidão não verificada" : "Você pode doar agora"}</p><p className="mt-0.5 text-xs leading-snug">{signedIn ? "Confirme sua aptidão com um serviço de hemoterapia antes de doar." : "Intervalo mínimo entre doações cumprido."}</p><Link to="/pre-requisitos" className="mt-1 inline-block text-xs font-extrabold underline underline-offset-2">Verificar pré-requisitos para hoje</Link></div>
        </div>
        <Link to="/solicitacao" search={{ id: "hospital-central" }} className="mt-3 flex min-h-[72px] items-center gap-3 rounded-[17px] bg-alert px-4 py-3 text-primary transition-colors hover:bg-secondary" aria-label="Abrir solicitação de exemplo do Hospital Central">
          <Bell size={20} className="shrink-0" /><div><p className="text-sm font-extrabold">{signedIn ? "Solicitação de exemplo" : "Nova solicitação compatível"}</p><p className="text-xs leading-snug">Hospital Central precisa de A+ · 2,4 km</p></div>
        </Link>

        <section className="mt-7" aria-labelledby="campaigns-heading">
          <div className="mb-2 flex items-center justify-between"><h2 id="campaigns-heading" className="text-base font-extrabold">Campanhas</h2><Link to="/campanhas" className="text-xs font-bold text-primary hover:underline">Ver todas</Link></div>
          <article className="rounded-[16px] border border-border bg-background p-4">
            <div className="flex flex-wrap items-center justify-between gap-1.5"><span className="rounded-full bg-alert px-2.5 py-1 text-[10px] font-bold text-primary">⚑ Órgão público de saúde</span><time className="text-[10px] text-muted-foreground" dateTime="2026-09-15">15/09/2026</time></div>
            <h3 className="mt-1 text-sm font-extrabold">Semana da doação de sangue</h3>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">Doe sangue e ajude a manter os estoques dos hospitais da cidade.</p>
          </article>
        </section>

        {myRequests.length > 0 && <section className="mt-7" aria-labelledby="my-requests-heading">
          <h2 id="my-requests-heading" className="mb-2 text-base font-extrabold">Suas solicitações</h2>
          <div className="space-y-2">{myRequests.map(r => <RequestCard key={r.id} request={r} />)}</div>
        </section>}

        <section className="mt-7" aria-labelledby="requests-heading">
          <h2 id="requests-heading" className="mb-2 text-base font-extrabold">Solicitações perto de você</h2>
          <div className="space-y-2">{sampleRequests.map(r => <RequestCard key={r.id} request={r} />)}</div>
        </section>
      </div>
      <BottomNav active="/inicio" />
    </div>
  </main>;
}