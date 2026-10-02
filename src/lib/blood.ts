export type RequestView = {
  id: string;
  name: string;
  area: string;
  distance: string | null;
  bloodType: string;
  urgent: boolean;
  published: string;
  sample: boolean;
  patient?: string;
};

export const sampleRequests: RequestView[] = [
  { id: "hospital-central", name: "Hospital Central", area: "Centro", distance: "2,4 km", bloodType: "A+", urgent: true, published: "há 25 minutos", sample: true },
  { id: "banco-regional", name: "Banco de Sangue Regional", area: "Zona Norte", distance: "5,1 km", bloodType: "AB+", urgent: false, published: "há 2 horas", sample: true },
];

const recipientsOf: Record<string, string[]> = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"],
};

export const normalizeType = (t: string) => t.replace("−", "-");
export const displayType = (t: string) => t.replace("-", "−");

export function canDonate(donor: string, recipient: string) {
  return recipientsOf[normalizeType(donor)]?.includes(normalizeType(recipient)) ?? false;
}

export function timeAgo(iso: string) {
  const min = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (min < 1) return "agora mesmo";
  if (min < 60) return `há ${min} minuto${min > 1 ? "s" : ""}`;
  const h = Math.round(min / 60);
  if (h < 24) return `há ${h} hora${h > 1 ? "s" : ""}`;
  const d = Math.round(h / 24);
  return `há ${d} dia${d > 1 ? "s" : ""}`;
}
