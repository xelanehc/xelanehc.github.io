import { Badge } from "@/components/ui/badge";

export default function TechList({
  items,
  label = "Technologies",
}: {
  items: string[];
  label?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Badge variant="secondary" className="font-mono font-normal">
            {item}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
