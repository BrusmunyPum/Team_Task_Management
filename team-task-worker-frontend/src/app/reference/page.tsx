import Link from "next/link";
import Image from "next/image";
import { AppIcon } from "@/components/ui/AppIcon";
import { referenceScreens } from "@/lib/reference-screens";
import { routes } from "@/lib/routes";

export default function ReferenceIndexPage() {
  return (
    <main className="reference-page">
      <section className="reference-hero">
        <div>
          <div>
            <p className="eyebrow">Static UI reference</p>
            <h1>Screen reference library</h1>
            <p>
              Original static mockups used to guide the Next.js frontend pages,
              components, spacing, and feature coverage.
            </p>
          </div>
          <Link className="secondary-action" href={routes.dashboard}>
            <AppIcon name="dashboard" />
            Back to app
          </Link>
        </div>
        <Image
          src={referenceScreens[0].image}
          alt={`${referenceScreens[0].title} preview`}
          width={1280}
          height={820}
          priority
        />
      </section>

      <section className="panel reference-detail-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">All screens</p>
            <h2>{referenceScreens.length} imported references</h2>
          </div>
        </div>
        <div className="project-grid">
          {referenceScreens.map((screen) => (
            <article className="project-card" key={screen.slug}>
              <span className="pill neutral">{screen.category}</span>
              <h3>
                <Link href={`/reference/${screen.slug}`}>{screen.title}</Link>
              </h3>
              <p>{screen.description}</p>
              <Image
                className="reference-card-image"
                src={screen.image}
                alt={`${screen.title} preview`}
                width={640}
                height={410}
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
