import {
  LogOut,
  House,
  NotebookPen,
  Hospital,
  CalendarDays,
} from "lucide-react";
import { ThemeToggler } from "../themes/theme-toggler";
import { signOut } from "@/lib/actions/auth-action";
import Link from "next/link";
import logo from "@/app/logo.png";
import Image from "next/image";

export default async function Sidenav() {
  return (
    <aside className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 py-5 lg:h-[60px] lg:px-6 ">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src={logo} width={30} height={30} alt="logo" />

            <span className="text-sm lg:text-base">
              San Jose Municipal Health
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div className="mt-2">
              <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                Pages
              </p>
              {userLinks.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
                >
                  {item.icon}
                  <h1 className="text-md">{item.name}</h1>
                </Link>
              ))}
            </div>

            <div className="mt-2">
              <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                Settings
              </p>

              <div className="flex items-center gap-2">
                <ThemeToggler>Theme</ThemeToggler>
              </div>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-md flex items-center gap-2 hover:bg-muted rounded-md p-2 w-full"
                >
                  <LogOut />
                  Logout
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export const userLinks = [
  {
    name: "Home",
    href: "/",
    icon: <House />,
  },
  {
    name: "Services",
    href: "/health-services",
    icon: <Hospital />,
  },
  {
    name: "Book",
    href: "/book",
    icon: <NotebookPen />,
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: <CalendarDays />,
  },
];
