import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Droplet, ShieldCheck } from "lucide-react";
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

      <form onSubmit={submit} className="space-y-4">
        {mode === "register" && <div className="space-y-1.5"><Label htmlFor="name" className="text-xs font-bold">Nome completo</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} required maxLength={120} autoComplete="name" placeholder="Como você se chama?" className="app-field" /></div>}
        <div className="space-y-1.5"><Label htmlFor="email" className="text-xs font-bold">E-mail</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" placeholder="voce@email.com" className="app-field" /></div>
        {mode === "register" && <div className="space-y-1.5"><Label htmlFor="location" className="text-xs font-bold">Bairro e cidade</Label><Input id="location" value={location} onChange={e => setLocation(e.target.value)} required maxLength={120} autoComplete="address-level2" placeholder="Ex.: Centro, Rio de Janeiro" className="app-field" /></div>}
        {mode === "register" && <fieldset><legend className="mb-2 text-xs font-bold">Tipo sanguíneo</legend><div className="grid grid-cols-4 gap-2">{types.map(type => <Button key={type} type="button" variant="bloodChoice" data-selected={bloodType === type} aria-pressed={bloodType === type} onClick={() => setBloodType(type)} className="h-10 px-0 text-xs">{type}</Button>)}</div></fieldset>}
        <div className="space-y-1.5"><Label htmlFor="password" className="text-xs font-bold">Senha</Label><Input id="password" type="password" minLength={6} required value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === "register" ? "new-password" : "current-password"} placeholder="Mínimo de 6 caracteres" className="app-field" /></div>
        {error && <p role="alert" className="text-xs leading-relaxed text-primary">{error}</p>}
        {message && <p role="status" className="rounded-lg bg-success p-3 text-xs leading-relaxed text-success-foreground">{message}</p>}
        <Button variant="blood" size="blood" type="submit" disabled={pending}>{pending ? "Aguarde..." : mode === "register" ? "Criar conta de doador" : "Entrar"}</Button>
      </form>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground"><ShieldCheck size={13} /> Seus dados são protegidos pela LGPD.</p>
      <div className="mt-auto pt-6 text-center text-xs">
        <Button variant="link" size="sm" onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(""); setMessage(""); }} className="font-bold">{mode === "register" ? "Já tenho uma conta" : "Criar conta"}</Button>
        <div><Link to="/inicio" className="text-muted-foreground underline underline-offset-4 hover:text-primary">Ver início de exemplo</Link></div>
      </div>
    </div>
  </main>;
}