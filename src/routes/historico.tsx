import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { donationRules, type Sex } from "@/lib/blood";

export const Route = createFileRoute("/historico")({
  head: () => ({ meta: [
    { title: "Meu histórico | ConectaSangue" },
    { name: "description", content: "Histórico de doações, hemograma e intervalo entre doações de sangue." },
    { property: "og:title", content: "Meu histórico | ConectaSangue" },
    { property: "og:description", content: "Histórico de doações, hemograma e intervalo entre doações de sangue." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: History,
});

const donations = [
  { date: "12/06/2026", place: "Hospital Central", exam: true },
  { date: "20/02/2026", place: "Banco de Sangue Regional", exam: false },
  { date: "15/10/2025", place: "Hospital Central", exam: false },
];

function History() {
  const [sex, setSex] = useState<Sex | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const { data } = await supabase.from("donor_profiles").select("sex").eq("id", user.id).maybeSingle();
      if (data?.sex === "feminino" || data?.sex === "masculino") setSex(data.sex);
    })();
  }, []);

  async function choose(s: Sex) {
    setSex(s);
    if (userId) await supabase.from("donor_profiles").update({ sex: s }).eq("id", userId);
  }

  const rule = sex ? donationRules[sex] : null;

  return <main className="min-h-dvh bg-background py-0 sm:px-4 sm:py-10">
    <div className="app-frame sm:min-h-[812px]">
      <div className="flex-1 px-5 pb-8 pt-5">
        <h1 className="text-[23px] font-extrabold leading-tight">Meu histórico</h1>
        <Link to="/pre-requisitos" className="mt-3 flex items-center justify-between rounded-[14px] bg-alert px-4 py-3 text-sm font-extrabold text-primary hover:bg-secondary">Pré-requisitos e guia do doador <span aria-hidden>›</span></Link>

        <section className="mt-4 rounded-[16px] border border-border bg-background p-4" aria-labelledby="interval-h">
          <h2 id="interval-h" className="flex items-center gap-1.5 text-sm font-extrabold"><Info size={15} className="text-primary" /> Intervalo entre doações</h2>
          <p className="mt-1 text-xs text-muted-foreground">Informe seu sexo biológico para ver a regra aplicável:</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button type="button" variant="bloodChoice" data-selected={sex === "feminino"} aria-pressed={sex === "feminino"} onClick={() => choose("feminino")} className="h-10">Feminino</Button>
            <Button type="button" variant="bloodChoice" data-selected={sex === "masculino"} aria-pressed={sex === "masculino"} onClick={() => choose("masculino")} className="h-10">Masculino</Button>
          </div>
          {rule && <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-alert p-3 text-primary"><p className="text-lg font-extrabold">{rule.label}</p><p className="text-[10px] font-bold">intervalo mínimo ({rule.days} dias)</p></div>
            <div className="rounded-lg bg-alert p-3 text-primary"><p className="text-lg font-extrabold">{rule.perYear}x</p><p className="text-[10px] font-bold">máximo por ano</p></div>
          </div>}
          <p className="mt-3 text-[10px] leading-snug text-muted-foreground">Regras do Ministério da Saúde: mulheres a cada 90 dias (até 3 vezes em 12 meses); homens a cada 60 dias (até 4 vezes em 12 meses). Informação educativa — confirme sua aptidão no serviço de hemoterapia.</p>
        </section>

        <p className="mt-5 rounded-lg border border-border px-3 py-2 text-[10px] text-muted-foreground">Os dados abaixo são fictícios, de exemplo para o protótipo.</p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-[14px] border border-border bg-background p-3"><p className="text-[10px] text-muted-foreground">Última doação</p><p className="text-sm font-extrabold">12/06/2026</p></div>
          <div className="rounded-[14px] bg-success p-3 text-success-foreground"><p className="text-[10px]">Próxima doação apta</p><p className="text-sm font-extrabold">Disponível agora</p></div>
        </div>

        <section className="mt-5" aria-labelledby="don-h">
          <h2 id="don-h" className="mb-2 text-sm font-extrabold">Doações</h2>
          <ul className="divide-y divide-border rounded-[16px] border border-border bg-background">
            {donations.map(d => <li key={d.date} className="flex items-center justify-between px-4 py-2.5"><div><p className="text-xs font-extrabold">{d.date}</p><p className="text-[11px] text-muted-foreground">{d.place}</p></div>{d.exam && <span className="rounded-full bg-alert px-2 py-0.5 text-[10px] font-bold text-primary">Hemograma</span>}</li>)}
          </ul>
        </section>

        <section className="mt-5 rounded-[16px] border border-border bg-background p-4" aria-labelledby="hemo-h">
          <div className="flex items-center justify-between"><h2 id="hemo-h" className="text-sm font-extrabold">Hemograma</h2><span className="rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-success-foreground">Dentro da referência</span></div>
          <p className="text-[11px] text-muted-foreground">12/06/2026 · Hospital Central</p>
          <dl className="mt-2 space-y-1.5 text-xs">
            {[["Hemoglobina", "14,2 g/dL"], ["Hematócrito", "42%"], ["Plaquetas", "250 mil/µL"]].map(([k, v]) => <div key={k} className="flex justify-between"><dt>{k}</dt><dd className="font-bold">{v}</dd></div>)}
          </dl>
        </section>
      </div>
      <BottomNav active="/historico" />
    </div>
  </main>;
}
