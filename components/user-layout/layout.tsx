import Header from "./header";
import Sidenav from "./sidenav";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidenav />
      <div className="flex flex-col">
        <Header />
        <div className="max-w-screen-xl mx-auto">{children}</div>
      </div>
    </div>
  );
}