import Image from "next/image";
import Link from "next/link";
import { referenceScreens } from "@/lib/reference-screens";

type ReferenceScreenCardProps = {
  screen: (typeof referenceScreens)[number];
};

export function ReferenceScreenCard({ screen }: ReferenceScreenCardProps) {
  return (
    <article className="module-card" data-title={screen.tags}>
      <Image
        src={screen.image}
        alt={`${screen.title} preview`}
        width={640}
        height={400}
        sizes="(max-width: 820px) 100vw, (max-width: 1180px) 50vw, 25vw"
      />
      <div className="module-card-body">
        <span className="module-kicker">{screen.kicker}</span>
        <h3>{screen.title}</h3>
        <p>{screen.description}</p>
        <Link href={`/reference/${screen.slug}`}>Open reference</Link>
      </div>
    </article>
  );
}
