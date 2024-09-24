import { Package2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  MessageSquareMore,
  BriefcaseBusiness,
  LogOut,
  UserRoundSearch,
  SquarePen,
  Images,
  SquareUserRound,
} from "lucide-react";
import { ThemeToggler } from "../themes/theme-toggler";
import { signOut } from "@/lib/actions/auth-action";
import Link from "next/link";
import Image from "next/image";

export default async function Sidenav() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <aside className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 py-5 lg:h-[60px] lg:px-6 ">
          <Link
            href="/workers"
            className="flex items-center gap-2 font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span>Freelancity</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/profile"
              className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
            >
              <Image
                src={data?.user?.user_metadata.picture}
                alt="user-avatar"
                height={35}
                width={35}
                className="rounded-full"
              />
              <h1 className="text-md">{data?.user?.user_metadata.name}</h1>
            </Link>
            <div className="mt-2">
              <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                Pages
              </p>
              {pages.map((item, index) => (
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
                Management
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
                <button className="text-md flex items-center gap-2 hover:bg-muted rounded-md p-2 w-full">
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
    name: "Profile",
    href: "/profile",
    icon: <SquareUserRound />,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: <MessageSquareMore />,
  },
  {
    name: "Services",
    href: "/profile/services",
    icon: <BriefcaseBusiness />,
  },
  {
    name: "Gallery",
    href: "/profile/gallery",
    icon: <Images />,
  },
  {
    name: "Reviews",
    href: "/profile/reviews",
    icon: <SquarePen />,
  },
];

export const pages = [
  {
    name: "Find Workers",
    href: "/workers",
    icon: <UserRoundSearch />,
  },
];
