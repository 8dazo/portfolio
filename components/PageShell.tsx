import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Nav instant />
      <main className="mx-2 border-x border-line pt-16 sm:mx-5">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
