import {
  Search,
  MessagesSquare,
  TextCursorInput,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import type { Platform } from "@/lib/ontology";

export const PLATFORM_ICON: Record<Platform, LucideIcon> = {
  google: Search,
  paa: MessagesSquare,
  autocomplete: TextCursorInput,
  reddit: MessageCircle,
};
