import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/ui/AppIcon";
import { referenceScreens } from "@/lib/reference-screens";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return referenceScreens.map((screen) => ({ slug: screen.slug }));
}

export default async function ReferenceDetailPage(props: PageProps<"/reference/[slug]">) {
  const { slug } = await props.params;
  const screen = referenceScreens.find((item) => item.slug === slug);

  if (!screen) {
    notFound();
  }

  return (
    <main className="reference-page">
      <section className="reference-hero">
        <div>
          <div>
            <p className="eyebrow">{screen.category}</p>
            <h1>{screen.title}</h1>
            <p>{screen.description}</p>
          </div>
          <div className="card-meta">
            <Link className="secondary-action" href={routes.reference}>
              <AppIcon name="folder" />
              All references
            </Link>
            <Link className="primary-action" href={routes.dashboard}>
              <AppIcon name="dashboard" />
              Open app
            </Link>
          </div>
        </div>
        <Image
          src={screen.image}
          alt={`${screen.title} preview`}
          width={1280}
          height={820}
          priority
        />
      </section>

      <section className="panel reference-detail-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Implementation note</p>
            <h2>How this maps into the app</h2>
          </div>
        </div>
        <p className="form-help">
          This page preserves the original static UI screenshot as a visual
          reference while the production Next.js pages use reusable components,
          mock data, route-level forms, and responsive workspace layouts.
        </p>
      </section>
    </main>
  );
}
