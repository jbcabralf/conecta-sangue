import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, ScanFace, TriangleAlert } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { normalizeType } from "@/lib/blood";

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
  const [requester, setRequester] = useState<"hospital" | "family">("family");
  const [bloodType, setBloodType] = useState("O−");
  const [urgency, setUrgency] = useState<"normal" | "urgent">("urgent");
  const [location, setLocation] = useState("");
  const [patient, setPatient] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [faceCheck, setFaceCheck] = useState(false);
  const navigate = useNavigate();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Entre na sua conta para salvar solicitações."); return; }
    setSaving(true);
    const { error: insertError } = await supabase.from("blood_requests").insert({
      user_id: user.id,
      requester_kind: requester === "hospital" ? "hospital" : "familiar",
      blood_type: normalizeType(bloodType),
      urgent: urgency === "urgent",
      location: location.trim(),
      patient_name: patient.trim(),
    });
    setSaving(false);
    if (insertError) { setError("Não foi possível salvar. Tente novamente."); return; }
    setPublished(true);
    setLocation(""); setPatient("");
    setTimeout(() => navigate({ to: "/inicio" }), 1200);
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
            <Button type="button" variant="bloodChoice" data-selected={false} aria-pressed={false} disabled aria-describedby="hospital-locked-note" className="h-11 cursor-not-allowed opacity-45">Hospital ou banco</Button>
            <Button type="button" variant="bloodChoice" data-selected={requester === "family"} aria-pressed={requester === "family"} onClick={() => setRequester("family")} className="h-11">Familiar</Button>
          </div>
          <p id="hospital-locked-note" className="mt-2 text-[10px] leading-relaxed text-muted-foreground">Para ativar esse campo, entre com seu cadastro de pessoa jurídica.</p>
        </fieldset>

        <p className="mt-2 flex w-fit items-start gap-1.5 rounded-lg bg-warning px-2.5 py-2 text-[10px] font-bold leading-relaxed text-warning-foreground"><TriangleAlert size={14} className="mt-0.5 shrink-0" /> Valide sua biometria facial antes de publicar uma solicitação.</p>

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

        <section aria-labelledby="face-check-title" className="mt-4 border-t border-border pt-3">
          <h2 id="face-check-title" className="flex items-center gap-2 text-xs font-bold"><ScanFace size={17} className="text-primary" /> Verificação da biometria facial</h2>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Obrigatória antes da publicação. Este botão é apenas uma demonstração do app; nenhuma imagem do seu rosto é coletada.</p>
          <Button type="button" variant="bloodOutline" onClick={() => setFaceCheck(true)} aria-pressed={faceCheck} className="mt-2 w-full text-xs">{faceCheck ? "Verificação de demonstração concluída" : "Verificar biometria facial"}</Button>
          {faceCheck && <p role="status" className="mt-2 text-[10px] leading-relaxed text-muted-foreground">Verificação de demonstração registrada neste protótipo. A conferência oficial acontece na triagem do local de doação.</p>}
        </section>

        {published && <p role="status" className="mt-3 flex items-start gap-2 rounded-lg bg-success p-3 text-xs leading-relaxed text-success-foreground"><Check size={15} className="mt-0.5 shrink-0" /> Solicitação salva na sua conta. Ela ainda não é enviada a doadores.</p>}
        {error && <p role="alert" className="mt-3 rounded-lg bg-alert p-3 text-xs text-primary">{error}{error.startsWith("Entre") && <> <Link to="/" className="font-bold underline">Entrar</Link></>}</p>}
        <Button variant="blood" size="blood" type="submit" disabled={saving} className="mt-auto">{saving ? "Salvando..." : "Salvar solicitação"}</Button>
      </form>

      <BottomNav active="/nova-solicitacao" />
    </div>
  </main>;
}