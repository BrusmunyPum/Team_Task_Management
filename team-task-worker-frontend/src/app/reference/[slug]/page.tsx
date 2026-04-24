import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/ui/AppIcon";
import { referenceScreens } from "@/lib/reference-screens";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return referenceScreens.map((screen) => ({ slug: screen.slug }));
}

export default async function ReferenceScreenPage(props: PageProps<"/reference/[slug]">) {
  const { slug } = await props.params;
  const screen = referenceScreens.find((item) => item.slug === slug);

  if (!screen) {
    notFound();
  }

  return (
    <main className="reference-page">
      <section className="reference-hero">
        <div>
          <Link className="brand" href={routes.home}>
            <span className="brand-mark" aria-hidden="true">
              <AppIcon name="hub" />
            </span>
            <span>
              <strong>TeamTask Pro</strong>
              <small>Reference screen</small>
            </span>
          </Link>

          <div>
            <p className="eyebrow">{screen.kicker}</p>
            <h1>{screen.title}</h1>
            <p>{screen.description}</p>
          </div>

          <div className="workspace-actions">
            <Link className="secondary-action" href="/#screens">
              <AppIcon name="home" />
              Screen library
            </Link>
            <Link className="primary-action" href={routes.dashboard}>
              <AppIcon name="dashboard" />
              App dashboard
            </Link>
          </div>
        </div>

        <Image
          src={screen.image}
          alt={`${screen.title} preview`}
          width={1280}
          height={800}
          priority
        />
      </section>

      <section className="panel reference-detail-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Migration note</p>
            <h2>Source HTML reference preserved</h2>
          </div>
        </div>
        <p className="form-help">
          This route ports the old extra reference page into the Next.js app as a
          navigable screen preview. The V1 implementation pages live in the main
          workspace routes: dashboard, projects, tasks, members, auth, and onboarding.
        </p>
      </section>
    </main>
  );
}
