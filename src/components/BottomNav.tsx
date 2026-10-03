import { Link } from "@tanstack/react-router";
import { Clock3, Flag, House, PlusCircle } from "lucide-react";

const items = [
  { to: "/inicio", label: "Início", Icon: House },
  { to: "/campanhas", label: "Campanhas", Icon: Flag },
  { to: "/nova-solicitacao", label: "Pedir sangue", Icon: PlusCircle },
  { to: "/historico", label: "Histórico", Icon: Clock3 },
] as const;

export function BottomNav({ active }: { active: (typeof items)[number]["to"] }) {
  return <nav aria-label="Navegação principal" className="grid h-[68px] grid-cols-4 border-t border-border bg-background">
    {items.map(({ to, label, Icon }) => {
      const on = to === active;
      return <Link key={to} to={to} aria-current={on ? "page" : undefined} className={`flex flex-col items-center justify-center gap-1 ${on ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
        <Icon size={19} strokeWidth={on ? 2.3 : 2} /><span className={`text-[10px] ${on ? "font-bold" : "font-semibold"}`}>{label}</span>
      </Link>;
    })}
  </nav>;
}
