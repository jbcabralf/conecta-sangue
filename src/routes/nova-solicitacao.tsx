import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, Clock3, Flag, House, PlusCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/nova-solicitacao")({
  head: () => ({ meta: [
    { title: "Nova solicitação | ConectaSangue" },
    { name: "description", content: "Preencha uma solicitação demonstrativa de doação de sangue no ConectaSangue." },
    { property: "og:title", content: "Nova solicitação | ConectaSangue" },
    { property: "og:description", content: "Preencha uma solicitação demonstrativa de doação de sangue no ConectaSangue." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: NewRequest,
});

const bloodTypes = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

function NewRequest() {
  const [requester, setRequester] = useState<"hospital" | "family">("hospital");
  const [bloodType, setBloodType] = useState("O−");
  const [urgency, setUrgency] = useState<"normal" | "urgent">("urgent");
  const [location, setLocation] = useState("");
  const [patient, setPatient] = useState("");
  const [published, setPublished] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPublished(true);
  }

  return <main className="min-h-dvh bg-background py-0 sm:px-4 sm:py-10">
    <div className="app-frame sm:min-h-[812px]">
      <form onSubmit={submit} className="flex flex-1 flex-col px-5 pb-4 pt-5">
        <div>
          <h1 className="text-[23px] font-extrabold leading-tight">Nova solicitação</h1>
          <p className="mt-0.5 text-[10px] text-muted-foreground">Publicação de demonstração</p>
        </div>

        <fieldset className="mt-3">
          <legend className="sr-only">Quem está solicitando</legend>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="bloodChoice" data-selected={requester === "hospital"} aria-pressed={requester === "hospital"} onClick={() => setRequester("hospital")} className="h-11">Hospital ou banco</Button>
            <Button type="button" variant="bloodChoice" data-selected={requester === "family"} aria-pressed={requester === "family"} onClick={() => setRequester("family")} className="h-11">Familiar</Button>
          </div>
        </fieldset>

        <p className="mt-2 flex w-fit items-center gap-1 rounded-full bg-success px-2.5 py-1 text-[10px] font-bold text-success-foreground"><ShieldCheck size={13} /> Identidade validada por biometria facial</p>

        <fieldset className="mt-3">
          <legend className="mb-2 text-xs font-bold">Tipo sanguíneo necessário</legend>
          <div className="grid grid-cols-4 gap-2">{bloodTypes.map(type => <Button key={type} type="button" variant="bloodChoice" data-selected={bloodType === type} aria-pressed={bloodType === type} onClick={() => setBloodType(type)} className="h-10 px-0 text-xs">{type}</Button>)}</div>
        </fieldset>

        <fieldset className="mt-3">
          <legend className="mb-2 text-xs font-bold">Urgência</legend>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="bloodChoice" data-selected={urgency === "normal"} aria-pressed={urgency === "normal"} onClick={() => setUrgency("normal")} className="h-10">Normal</Button>
            <Button type="button" variant="bloodChoice" data-selected={urgency === "urgent"} aria-pressed={urgency === "urgent"} onClick={() => setUrgency("urgent")} className="h-10">Urgente</Button>
          </div>
        </fieldset>

        <div className="mt-3 space-y-1.5"><Label htmlFor="donation-location" className="text-xs font-bold">Local da doação</Label><Input id="donation-location" value={location} onChange={event => { setLocation(event.target.value); setPublished(false); }} required maxLength={120} placeholder="Hospital ou banco de sangue" className="app-field" /></div>
        <div className="mt-3 space-y-1.5"><Label htmlFor="patient-name" className="text-xs font-bold">Nome do paciente</Label><Input id="patient-name" value={patient} onChange={event => { setPatient(event.target.value); setPublished(false); }} required maxLength={120} placeholder="Quem vai receber a doação?" className="app-field" /></div>

        {published && <p role="status" className="mt-3 flex items-start gap-2 rounded-lg bg-success p-3 text-xs leading-relaxed text-success-foreground"><Check size={15} className="mt-0.5 shrink-0" /> Solicitação preparada nesta demonstração. Nenhum pedido real foi publicado.</p>}
        <Button variant="blood" size="blood" type="submit" className="mt-auto">Publicar solicitação</Button>
      </form>

      <nav aria-label="Navegação principal" className="grid h-[68px] grid-cols-4 border-t border-border bg-background">
        <Link to="/inicio" className="flex flex-col items-center justify-center gap-1 text-muted-foreground"><House size={19} /><span className="text-[10px] font-semibold">Início</span></Link>
        <span className="flex flex-col items-center justify-center gap-1 text-muted-foreground" aria-label="Campanhas: disponível em breve"><Flag size={19} /><span className="text-[10px] font-semibold">Campanhas</span></span>
        <Link to="/nova-solicitacao" aria-current="page" className="flex flex-col items-center justify-center gap-1 text-primary"><PlusCircle size={19} strokeWidth={2.3} /><span className="text-[10px] font-bold">Pedir sangue</span></Link>
        <span className="flex flex-col items-center justify-center gap-1 text-muted-foreground" aria-label="Histórico: disponível em breve"><Clock3 size={19} /><span className="text-[10px] font-semibold">Histórico</span></span>
      </nav>
    </div>
  </main>;
}