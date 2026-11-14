import { marquee } from "@/content/skills";
import { techIcons } from "@/components/icons";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <section aria-label="Tech stack" className="group relative border-y border-line bg-bg-elev/40 py-6">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="animate-marquee flex w-max items-center gap-12 pr-12">
          {items.map((name, i) => {
            const Icon = techIcons[name];
            return (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= marquee.length}
                className="flex items-center gap-3 whitespace-nowrap text-subtle transition-colors duration-300 hover:text-fg"
              >
                {Icon && <Icon className="size-5" />}
                <span className="text-sm font-medium tracking-tight">{name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
