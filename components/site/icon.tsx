import {
  UtensilsCrossed,
  Music,
  Languages,
  Landmark,
  Users,
  MapPin,
  Cpu,
  GraduationCap,
  TrendingUp,
  Globe2,
  Search,
  MessagesSquare,
  TextCursorInput,
  MessageCircle,
  type LucideIcon,
  HelpCircle,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Music,
  Languages,
  Landmark,
  Users,
  MapPin,
  Cpu,
  GraduationCap,
  TrendingUp,
  Globe2,
  Search,
  MessagesSquare,
  TextCursorInput,
  MessageCircle,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = MAP[name] ?? HelpCircle;
  return <Cmp className={className} />;
}
