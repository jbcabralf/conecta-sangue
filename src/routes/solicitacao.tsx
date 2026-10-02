import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/solicitacao")({
  head: () => ({ meta: [
    { title: "Solicitação de doação | ConectaSangue" },
    { name: "description", content: "Veja os detalhes de uma solicitação demonstrativa de doação de sangue." },
    { property: "og:title", content: "Solicitação de doação | ConectaSangue" },
    { property: "og:description", content: "Veja os detalhes de uma solicitação demonstrativa de doação de sangue." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: DonationRequest,
});

function DonationRequest() {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  return <main className="min-h-dvh bg-background py-0 sm:px-4 sm:py-10">
    <div className="app-frame px-5 pb-4 pt-5 sm:min-h-[812px]">
      <header className="flex items-center gap-2.5">
        <Button variant="outline" size="icon" aria-label="Voltar" title="Voltar" onClick={() => navigate({ to: "/inicio" })} className="size-10 shrink-0 rounded-full bg-background shadow-none">
          <ArrowLeft size={19} />
        </Button>
        <div>
          <h1 className="text-base font-extrabold">Solicitação de doação</h1>
          <p className="text-[10px] text-muted-foreground">Demonstração do protótipo</p>
        </div>
      </header>

      <section className="mt-4 flex min-h-[101px] items-center gap-3 rounded-[16px] border border-border bg-background px-4 py-3" aria-label="Resumo da solicitação">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground">A+</span>
        <div className="min-w-0">
          <span className="rounded-full bg-warning px-2 py-1 text-[10px] font-bold text-warning-foreground">Urgente</span>
          <h2 className="mt-1 text-base font-extrabold leading-tight">Precisa de sangue<br />tipo A+</h2>
          <p className="mt-1 text-[11px] text-muted-foreground">Hospital Central</p>
        </div>
      </section>

      <section className="mt-3 space-y-4 rounded-[16px] border border-border bg-background px-4 py-4 text-xs" aria-label="Detalhes da solicitação">
        <p className="flex items-start gap-2.5"><MapPin className="mt-0.5 shrink-0 text-primary" size={16} /><span>Hospital Central, Centro · 2,4 km de você</span></p>
        <p className="flex items-start gap-2.5"><ShieldCheck className="mt-0.5 shrink-0 text-primary" size={16} /><span>Solicitante com identidade validada</span></p>
        <p className="flex items-start gap-2.5"><Clock3 className="mt-0.5 shrink-0 text-primary" size={16} /><span>Publicada há 25 minutos</span></p>
      </section>

      <section className="mt-3 flex min-h-[72px] items-center gap-3 rounded-[16px] border border-success-foreground/15 bg-success px-4 py-3 text-success-foreground" aria-live="polite">
        <Check className="shrink-0" size={20} />
        <div><p className="text-sm font-extrabold">{confirmed ? "Interesse confirmado na demonstração" : "Você é compatível e está apto"}</p><p className="text-xs leading-snug">{confirmed ? "Nenhuma confirmação real foi enviada." : "Seu tipo A+ atende esta solicitação."}</p></div>
      </section>

      <div className="mt-auto space-y-2 pt-6">
        <Button variant="blood" size="blood" type="button" onClick={() => setConfirmed(true)} disabled={confirmed}>{confirmed ? "Interesse confirmado" : "Confirmar interesse"}</Button>
        <Button variant="bloodOutline" size="blood" type="button" onClick={() => navigate({ to: "/inicio" })}>Agora não</Button>
      </div>
    </div>
  </main>;
}