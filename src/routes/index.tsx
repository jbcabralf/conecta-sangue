import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Building2, Droplet, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Cadastro do doador | ConectaSangue" },
    { name: "description", content: "Cadastre-se como doador de sangue no ConectaSangue." },
    { property: "og:title", content: "Cadastro do doador | ConectaSangue" },
    { property: "og:description", content: "Cadastre-se como doador de sangue no ConectaSangue." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Registration,
});

const types = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bloodType, setBloodType] = useState("A+");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"register" | "login">("register");
  const [accountKind, setAccountKind] = useState<"pf" | "pj">("pf");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/inicio" });
    });
  }, [navigate]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setPending(true);
    try {
      if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
        navigate({ to: "/inicio" });
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(), password,
          options: { data: { full_name: name.trim(), neighborhood_city: location.trim(), blood_type: bloodType } },
        });
        if (authError) throw authError;
        if (data.session && data.user) {
          const { error: profileError } = await supabase.from("donor_profiles").upsert({
            id: data.user.id, full_name: name.trim(), email: email.trim(), neighborhood_city: location.trim(), blood_type: bloodType,
          });
          if (profileError) throw profileError;
          navigate({ to: "/inicio" });
        } else {
          setMessage("Cadastro recebido! Confira seu e-mail para confirmar a conta. Depois, entre com sua senha.");
        }
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível continuar. Tente novamente.");
    } finally {
      setPending(false);
    }
  }

  return <main className="min-h-dvh bg-background py-0 sm:py-10 sm:px-4">
    <div className="app-frame px-6 py-7 sm:min-h-[812px]">
      <div className="mb-6 flex items-center gap-2 text-primary">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Droplet size={21} strokeWidth={2.5} /></span>
        <span className="text-sm font-extrabold">ConectaSangue</span>
      </div>
      <h1 className="text-[27px] leading-[1.12] font-extrabold">{mode === "register" ? <>Doe sangue.<br />Salve vidas.</> : <>Bem-vindo<br />de volta.</>}</h1>
      <p className="mt-2 mb-6 max-w-[310px] text-sm leading-[1.55] text-muted-foreground">{mode === "register" ? "Receba um aviso quando alguém perto de você precisar do seu tipo sanguíneo." : "Entre para acompanhar as informações da sua conta."}</p>

      {mode === "register" && <fieldset>
        <legend className="mb-2 text-xs font-bold">Tipo de conta</legend>
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="bloodChoice" data-selected={accountKind === "pf"} aria-pressed={accountKind === "pf"} onClick={() => setAccountKind("pf")} className="h-12 flex-col gap-0.5 text-xs"><User size={16} />Pessoa física</Button>
          <Button type="button" variant="bloodChoice" data-selected={accountKind === "pj"} aria-pressed={accountKind === "pj"} onClick={() => setAccountKind("pj")} className="h-12 flex-col gap-0.5 text-xs"><Building2 size={16} />Pessoa jurídica</Button>
        </div>
      </fieldset>}

      {mode === "register" && accountKind === "pj" ? <PjPanel /> : <form onSubmit={submit} className={mode === "register" ? "mt-6 space-y-4" : "space-y-4"}>
        {mode === "register" && <div className="space-y-1.5"><Label htmlFor="name" className="text-xs font-bold">Nome completo</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} required maxLength={120} autoComplete="name" placeholder="Como você se chama?" className="app-field" /></div>}
        <div className="space-y-1.5"><Label htmlFor="email" className="text-xs font-bold">E-mail</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" placeholder="voce@email.com" className="app-field" /></div>
        {mode === "register" && <div className="space-y-1.5"><Label htmlFor="location" className="text-xs font-bold">Bairro e cidade</Label><Input id="location" value={location} onChange={e => setLocation(e.target.value)} required maxLength={120} autoComplete="address-level2" placeholder="Ex.: Centro, Rio de Janeiro" className="app-field" /></div>}
        {mode === "register" && <fieldset><legend className="mb-2 text-xs font-bold">Tipo sanguíneo</legend><div className="grid grid-cols-4 gap-2">{types.map(type => <Button key={type} type="button" variant="bloodChoice" data-selected={bloodType === type} aria-pressed={bloodType === type} onClick={() => setBloodType(type)} className="h-10 px-0 text-xs">{type}</Button>)}</div></fieldset>}
        <div className="space-y-1.5"><Label htmlFor="password" className="text-xs font-bold">Senha</Label><Input id="password" type="password" minLength={6} required value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === "register" ? "new-password" : "current-password"} placeholder="Mínimo de 6 caracteres" className="app-field" /></div>
        {error && <p role="alert" className="text-xs leading-relaxed text-primary">{error}</p>}
        {message && <p role="status" className="rounded-lg bg-success p-3 text-xs leading-relaxed text-success-foreground">{message}</p>}
        <Button variant="blood" size="blood" type="submit" disabled={pending}>{pending ? "Aguarde..." : mode === "register" ? "Criar conta de doador" : "Entrar"}</Button>
      </form>}
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground"><ShieldCheck size={13} /> Seus dados são protegidos pela LGPD.</p>
      <div className="mt-auto pt-6 text-center text-xs">
        <Button variant="link" size="sm" onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(""); setMessage(""); }} className="font-bold">{mode === "register" ? "Já tenho uma conta" : "Criar conta"}</Button>
        <div><Link to="/inicio" className="text-muted-foreground underline underline-offset-4 hover:text-primary">Ver início de exemplo</Link></div>
      </div>
    </div>
  </main>;
}

const pjDocs = [
  "Cartão CNPJ atualizado",
  "Contrato Social (ou Estatuto Social)",
  "Alvará da Vigilância Sanitária",
  "Comprovante de registro no CNES",
  "Certificado de Regularidade Técnica (CRM) do Diretor Técnico",
  "Alvará de Localização e Funcionamento (Prefeitura)",
  "Documento de identidade com foto (RG ou CNH) do responsável pelo cadastro",
  "Procuração simples (apenas se o responsável pelo cadastro não for um dos sócios listados no Contrato Social)",
];

const pjMail = "mailto:cadastro@conectasangue.com.br?subject=Verificação%20de%20conformidade%20%E2%80%94%20ConectaSangue";

function PjPanel() {
  return <div className="mt-6 rounded-xl border border-border bg-background p-4">
    <p className="text-sm font-extrabold">Cadastro de hospitais e bancos de sangue</p>
    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Para garantir a segurança da nossa rede de solicitantes, o cadastro de hospitais e bancos de sangue privados no ConectaSangue passa por uma verificação de conformidade.</p>
    <p className="mt-3 text-xs leading-relaxed font-bold">Por favor, envie as cópias (PDF ou imagem) dos documentos abaixo para <a href="mailto:cadastro@conectasangue.com.br" className="text-primary underline underline-offset-2">cadastro@conectasangue.com.br</a>:</p>
    <ul className="mt-2 space-y-1.5">
      {pjDocs.map(doc => <li key={doc} className="flex gap-2 text-xs leading-relaxed text-muted-foreground"><span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{doc}</li>)}
    </ul>
    <div className="mt-4 rounded-lg bg-secondary p-3">
      <p className="text-xs font-extrabold text-primary">Próximos passos</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Assim que recebermos o e-mail, nossa equipe fará a análise técnica da documentação. Após a aprovação, você receberá um link de confirmação para cadastrar sua senha e acessar a plataforma.</p>
    </div>
    <Button asChild variant="blood" size="blood" className="mt-4">
      <a href={pjMail}>Enviar documentos por e-mail</a>
    </Button>
  </div>;
}