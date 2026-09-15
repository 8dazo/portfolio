import AboutConsole from "@/components/scene/AboutConsole";

type AboutSectionProps = {
  badge?: string;
  headingLevel?: "h1" | "h2";
};

export default function AboutSection({
  badge = "01 · engineering modes",
  headingLevel = "h2",
}: AboutSectionProps) {
  const Heading = headingLevel;

  return (
    <section
      className="sec-frame px-5 pb-10 pt-20 sm:px-10 sm:pt-28"
      data-badge={badge}
    >
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
        about me · under the hood
      </p>
      <Heading className="mt-4 font-sans text-6xl font-bold uppercase leading-[0.9] tracking-tight sm:text-8xl">
        One engineer.
        <br />
        <span className="font-serif normal-case italic text-accent">
          four ways of thinking.
        </span>
      </Heading>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
        I move between agent infrastructure, full-stack products, model
        systems, and lower-level engineering. The medium changes; the habit
        stays the same: understand the constraint, build the smallest useful
        system, then measure what happens in the real world.
      </p>
      <div className="mt-12">
        <AboutConsole />
      </div>
    </section>
  );
}
