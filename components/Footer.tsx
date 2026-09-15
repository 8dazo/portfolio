import { info } from "@/lib/data";

const columns = [
  {
    heading: "sitemap",
    items: [
      { label: "Welcome", href: "/" },
      { label: "Work", href: "/work" },
      { label: "Story", href: "/story" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    heading: "elsewhere",
    items: [
      { label: "GitHub ↗", href: info.github },
      { label: "LinkedIn ↗", href: info.linkedin },
      { label: "LeetCode ↗", href: "https://leetcode.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1524px] grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
        <div>
          <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
            contact
          </p>
          <a
            href={`mailto:${info.email}`}
            className="link-sweep font-medium text-foreground"
          >
            {info.email}
          </a>
          <p className="mt-4 text-[15px] text-ink-2">Let&apos;s get in touch!</p>
          <p className="text-[15px] text-muted">Response within 24 hours</p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
              {col.heading}
            </p>
            <ul className="flex flex-col gap-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="link-sweep text-[15px] text-ink-2"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
            studio
          </p>
          <p className="text-[15px] text-ink-2">{info.location}</p>
          <p className="text-[15px] text-muted">
            AI engineering · Agents · Full-stack
          </p>
        </div>
      </div>

      <div className="hatch-line" />

      <div className="mx-auto flex max-w-[1524px] items-center justify-between px-5 py-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted sm:px-10">
        <span>
          © {new Date().getFullYear()} {info.name} — all rights reserved
        </span>
        <span className="hidden sm:block">
          creative by night, debugging by midnight
        </span>
      </div>
    </footer>
  );
}
