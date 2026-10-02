import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowLeft, Check, Clock3, MapPin, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { canDonate, displayType, sampleRequests, timeAgo, type RequestView } from "@/lib/blood";

export const Route = createFileRoute("/solicitacao")({
  validateSearch: (search: Record<string, unknown>) => ({ id: typeof search["id"] === "string" ? search["id"] : "hospital-central" }),
  head: () => ({ meta: [
    { title: "Solicitação de doação | ConectaSangue" },
    { name: "description", content: "Veja os detalhes de uma solicitação de doação de sangue e sua compatibilidade." },
    { property: "og:title", content: "Solicitação de doação | ConectaSangue" },
    { property: "og:description", content: "Veja os detalhes de uma solicitação de doação de sangue e sua compatibilidade." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: DonationRequest,
});

function DonationRequest() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const [confirmed, setConfirmed] = useState(false);
  const [request, setRequest] = useState<RequestView | null>(sampleRequests.find(r => r.id === id) ?? null);
  const [donorType, setDonorType] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setSignedIn(true);
        const { data: profile } = await supabase.from("donor_profiles").select("blood_type").eq("id", user.id).maybeSingle();
        const metaType = user.user_metadata["blood_type"];
        if (active) setDonorType(profile?.blood_type ?? (typeof metaType === "string" ? metaType : null));
        if (!sampleRequests.some(r => r.id === id)) {
          const { data } = await supabase.from("blood_requests").select("*").eq("id", id).maybeSingle();
          if (active && data) setRequest({ id: data.id, name: data.location, area: data.requester_kind === "hospital" ? "Hospital ou banco" : "Familiar", distance: null, bloodType: data.blood_type, urgent: data.urgent, published: timeAgo(data.created_at), sample: false, patient: data.patient_name });
        }
      } else if (active) setDonorType("A+");
      if (active) setLoading(false);
    })();
    return () => { active = false; };
  }, [id]);

  const compatible = request && donorType ? canDonate(donorType, request.bloodType) : null;

  return <main className="min-h-dvh bg-background py-0 sm:px-4 sm:py-10">
    <div className="app-frame px-5 pb-4 pt-5 sm:min-h-[812px]">
      <header className="flex items-center gap-2.5">
        <Button variant="outline" size="icon" aria-label="Voltar" title="Voltar" onClick={() => navigate({ to: "/inicio" })} className="size-10 shrink-0 rounded-full bg-background shadow-none"><ArrowLeft size={19} /></Button>
        <div>
          <h1 className="text-base font-extrabold">Solicitação de doação</h1>
          <p className="text-[10px] text-muted-foreground">{request?.sample === false ? "Solicitação salva por você" : "Solicitação de exemplo"}</p>
        </div>
      </header>

      {!request ? <p className="mt-6 text-sm text-muted-foreground">{loading ? "Carregando..." : "Solicitação não encontrada."}</p> : <>
        <section className="mt-4 flex min-h-[101px] items-center gap-3 rounded-[16px] border border-border bg-background px-4 py-3" aria-label="Resumo da solicitação">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground">{displayType(request.bloodType)}</span>
          <div className="min-w-0">
            <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${request.urgent ? "bg-warning text-warning-foreground" : "bg-muted text-muted-foreground"}`}>{request.urgent ? "Urgente" : "Normal"}</span>
            <h2 className="mt-1 text-base font-extrabold leading-tight">Precisa de sangue<br />tipo {displayType(request.bloodType)}</h2>
            <p className="mt-1 text-[11px] text-muted-foreground">{request.name}</p>
          </div>
        </section>

        <section className="mt-3 space-y-4 rounded-[16px] border border-border bg-background px-4 py-4 text-xs" aria-label="Detalhes da solicitação">
          <p className="flex items-start gap-2.5"><MapPin className="mt-0.5 shrink-0 text-primary" size={16} /><span>{request.name}, {request.area}{request.distance ? ` · ${request.distance} de você` : ""}</span></p>
          {request.patient && <p className="flex items-start gap-2.5"><User className="mt-0.5 shrink-0 text-primary" size={16} /><span>Paciente: {request.patient}</span></p>}
          <p className="flex items-start gap-2.5"><ShieldCheck className="mt-0.5 shrink-0 text-primary" size={16} /><span>{request.sample ? "Solicitante com identidade validada" : "Identidade ainda não verificada"}</span></p>
          <p className="flex items-start gap-2.5"><Clock3 className="mt-0.5 shrink-0 text-primary" size={16} /><span>Publicada {request.published}</span></p>
        </section>

        {compatible !== null && <section className={`mt-3 flex min-h-[72px] items-center gap-3 rounded-[16px] border px-4 py-3 ${compatible ? "border-success-foreground/15 bg-success text-success-foreground" : "border-border bg-alert text-primary"}`} aria-live="polite">
          {compatible ? <Check className="shrink-0" size={20} /> : <AlertCircle className="shrink-0" size={20} />}
          <div>
            <p className="text-sm font-extrabold">{confirmed ? "Interesse confirmado na demonstração" : compatible ? "Você é compatível" : "Seu tipo não é compatível"}</p>
            <p className="text-xs leading-snug">{confirmed ? "Nenhuma confirmação real foi enviada." : compatible
              ? `Seu tipo ${displayType(donorType!)} pode doar para quem precisa de ${displayType(request.bloodType)}.${signedIn ? " Confirme sua aptidão no serviço de saúde." : ""}`
              : `Seu tipo ${displayType(donorType!)} não pode doar para quem precisa de ${displayType(request.bloodType)}.`}</p>
          </div>
        </section>}
        {signedIn && !donorType && !loading && <p className="mt-3 text-xs text-muted-foreground">Não encontramos seu tipo sanguíneo no cadastro.</p>}

        <div className="mt-auto space-y-2 pt-6">
          {compatible && <Button variant="blood" size="blood" type="button" onClick={() => setConfirmed(true)} disabled={confirmed}>{confirmed ? "Interesse confirmado" : "Confirmar interesse"}</Button>}
          <Button variant="bloodOutline" size="blood" type="button" onClick={() => navigate({ to: "/inicio" })}>{compatible ? "Agora não" : "Voltar ao início"}</Button>
        </div>
      </>}
    </div>
  </main>;
}
