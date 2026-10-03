import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/pre-requisitos")({
  head: () => ({ meta: [
    { title: "Pré-requisitos para doar | ConectaSangue" },
    { name: "description", content: "Pré-triagem de aptidão e cartilha com requisitos, preparo e impedimentos para doar sangue." },
    { property: "og:title", content: "Pré-requisitos para doar | ConectaSangue" },
    { property: "og:description", content: "Pré-triagem de aptidão e cartilha com requisitos, preparo e impedimentos para doar sangue." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Prereq,
});

const checks = [
  { k: "doc", q: "Tenho documento oficial com foto (RG, CNH, passaporte ou carteira de trabalho)", fail: "Leve um documento oficial com foto — sem ele a doação não é feita." },
  { k: "sleep", q: "Dormi pelo menos 6 horas na última noite", fail: "Descanse: é preciso ter dormido ao menos 6 horas." },
  { k: "alcohol", q: "Não bebi álcool nas últimas 12 horas", fail: "Aguarde 12 horas após o consumo de bebida alcoólica." },
  { k: "food", q: "Estou alimentado (sem jejum) e não comi gordura nas últimas 3 horas", fail: "Faça uma refeição leve e evite gordura 3 horas antes." },
  { k: "smoke", q: "Não fumei nas últimas 2 horas", fail: "Aguarde 2 horas após fumar." },
  { k: "health", q: "Estou bem de saúde (sem febre, gripe ou resfriado nos últimos 7 dias)", fail: "Aguarde 7 dias após o fim dos sintomas." },
  { k: "temp", q: "Não estou em nenhuma condição temporária da cartilha abaixo (gravidez, vacina recente, tatuagem etc.)", fail: "Confira os prazos na cartilha de impedimentos temporários." },
] as const;

const guide = [
  { t: "Documentação", items: ["Documento oficial com foto: RG, CNH (física ou digital), passaporte, carteira de trabalho ou de conselho profissional.", "Menores de 16 e 17 anos: autorização assinada pelo responsável e documento do responsável."] },
  { t: "Preparação no dia", items: ["Beba bastante água antes e depois da doação.", "Não vá em jejum: faça uma refeição leve (frutas, pão, suco, café).", "Evite alimentos gordurosos nas 3 horas anteriores.", "Não consuma bebida alcoólica nas 12 horas anteriores.", "Não fume 2 horas antes e 2 horas depois.", "Durma ao menos 6 horas na noite anterior.", "Evite esforço físico intenso no dia da doação."] },
  { t: "Impedimentos temporários", items: ["Gripe, resfriado ou febre: 7 dias após o fim dos sintomas.", "Gravidez: impede durante toda a gestação.", "Pós-parto: 90 dias (normal) ou 180 dias (cesárea); amamentação: até 12 meses após o parto.", "Vacinas: 48 horas (gripe, inativadas) a 4 semanas (febre amarela, sarampo, rubéola, caxumba).", "Antibióticos: aguardar o fim do tratamento (em geral 7 a 14 dias); outros medicamentos são avaliados na triagem.", "Tatuagem, maquiagem definitiva ou piercing: 6 a 12 meses.", "Extração dentária: 7 dias; limpeza ou canal: 1 a 3 dias.", "Cirurgias, endoscopia ou transfusão: prazos de 3 a 12 meses, conforme o caso.", "Comportamento de risco para infecções sexualmente transmissíveis: 12 meses."] },
  { t: "Impedimentos definitivos", items: ["Hepatite após os 11 anos de idade.", "Infecção por HIV, HTLV, hepatites B ou C, doença de Chagas.", "Uso de drogas injetáveis ilícitas.", "Malária (quartã) e algumas doenças crônicas graves."] },
];

function Prereq() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [ans, setAns] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  const a = Number(age), w = Number(weight.replace(",", "."));
  const reasons: string[] = [];
  if (done) {
    if (!(a >= 16 && a <= 69)) reasons.push("A idade para doar é de 16 a 69 anos.");
    if (!(w >= 50)) reasons.push("O peso mínimo para doar é 50 kg.");
    checks.forEach((c) => { if (!ans[c.k]) reasons.push(c.fail); });
  }
  const ok = done && reasons.length === 0;

  return <main className="min-h-dvh bg-background py-0 sm:px-4 sm:py-10">
    <div className="app-frame sm:min-h-[812px]">
      <div className="flex-1 px-5 pb-8 pt-5">
        <div className="flex items-center gap-2">
          <Link to="/inicio" aria-label="Voltar" className="flex size-9 items-center justify-center rounded-full hover:bg-accent"><ArrowLeft size={20} /></Link>
          <div><h1 className="text-[21px] font-extrabold leading-tight">Pré-requisitos</h1><p className="text-xs text-muted-foreground">Pré-triagem e guia do doador</p></div>
        </div>

        <form className="mt-4 rounded-[16px] border border-border p-4" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
          <h2 className="text-sm font-extrabold">Posso doar hoje?</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <label className="text-xs font-bold">Idade<input className="app-field mt-1 w-full" inputMode="numeric" type="number" min={1} max={120} required value={age} onChange={(e) => { setAge(e.target.value); setDone(false); }} /></label>
            <label className="text-xs font-bold">Peso (kg)<input className="app-field mt-1 w-full" inputMode="decimal" type="number" step="0.1" min={1} max={400} required value={weight} onChange={(e) => { setWeight(e.target.value); setDone(false); }} /></label>
          </div>
          {a >= 16 && a < 18 && <p className="mt-2 text-xs text-muted-foreground">Menores de 18 anos precisam de autorização do responsável.</p>}
          {a > 60 && a <= 69 && <p className="mt-2 text-xs text-muted-foreground">Acima de 60 anos, só pode doar quem já doou antes dos 61.</p>}
          <div className="mt-3 space-y-2">
            {checks.map((c) => <label key={c.k} className="flex items-start gap-2 text-xs leading-snug">
              <input type="checkbox" className="mt-0.5 size-4 accent-[var(--primary)]" checked={!!ans[c.k]} onChange={(e) => { setAns({ ...ans, [c.k]: e.target.checked }); setDone(false); }} />{c.q}
            </label>)}
          </div>
          <Button type="submit" variant="blood" className="mt-4 w-full">Verificar</Button>
          {done && <div role="status" className={`mt-3 rounded-[14px] p-3 text-xs ${ok ? "bg-success text-success-foreground" : "bg-alert text-primary"}`}>
            <p className="flex items-center gap-1.5 text-sm font-extrabold">{ok ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}{ok ? "Você parece apto para doar hoje" : "Melhor não doar hoje"}</p>
            {ok ? <p className="mt-1">Leve seu documento oficial com foto. A triagem final é feita no hemocentro.</p>
              : <ul className="mt-1 list-disc pl-4">{reasons.map((r) => <li key={r}>{r}</li>)}</ul>}
          </div>}
        </form>

        <h2 className="mt-6 text-base font-extrabold">Cartilha do doador</h2>
        <div className="mt-2 space-y-2">
          {guide.map((g, i) => <section key={g.t} className="rounded-[14px] border border-border">
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-extrabold">{g.t}<ChevronDown size={16} className={open === i ? "rotate-180" : ""} /></button>
            {open === i && <ul className="list-disc space-y-1 px-4 pb-3 pl-8 text-xs leading-snug">{g.items.map((it) => <li key={it}>{it}</li>)}</ul>}
          </section>)}
        </div>
        <p className="mt-4 text-[11px] text-muted-foreground">Informação educativa baseada nas normas do Ministério da Saúde. A triagem clínica presencial no serviço de hemoterapia é a única avaliação oficial.</p>
      </div>
      <BottomNav active="historico" />
    </div>
  </main>;
}
