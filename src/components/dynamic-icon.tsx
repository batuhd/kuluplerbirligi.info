import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  ClipboardList,
  Code,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  GraduationCap,
  Globe,
  HeartPulse,
  Instagram,
  Landmark,
  Leaf,
  Link2,
  Mail,
  MapPin,
  Megaphone,
  Music,
  Palette,
  Phone,
  Plane,
  ScrollText,
  Send,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  award: Award,
  book: BookOpen,
  briefcase: Briefcase,
  calendar: Calendar,
  clipboard: ClipboardList,
  code: Code,
  download: Download,
  external: ExternalLink,
  file: FileText,
  "file-check": FileCheck2,
  graduation: GraduationCap,
  globe: Globe,
  health: HeartPulse,
  instagram: Instagram,
  landmark: Landmark,
  leaf: Leaf,
  link: Link2,
  mail: Mail,
  map: MapPin,
  megaphone: Megaphone,
  music: Music,
  palette: Palette,
  phone: Phone,
  plane: Plane,
  scroll: ScrollText,
  send: Send,
  sparkles: Sparkles,
  trophy: Trophy,
  users: Users,
};

export function DynamicIcon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const Icon = (name && ICONS[name]) || Link2;
  return <Icon className={className} />;
}

export const ICON_NAMES = Object.keys(ICONS);
