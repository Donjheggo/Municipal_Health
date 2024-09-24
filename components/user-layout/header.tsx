import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, AlignLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/server";
import { ThemeToggler } from "../themes/theme-toggler";
import { Button } from "../ui/button";
import { userLinks } from "./sidenav";
import { signOut } from "@/lib/actions/auth-action";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/logo.png";

export default async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <AlignLeft className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col item-start w-[280px]"
        >
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
          >
            <Image src={logo} width={30} height={30} alt="logo" />

            <span className="text-sm">
              San Jose Municipal Health
            </span>
          </Link>
          <nav className="grid items-start text-sm font-medium">
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
              <Link
                href="/profile"
                className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
              >
                <User />
                <h1 className="text-md">Profile</h1>
              </Link>
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
        </SheetContent>
      </Sheet>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hover:cursor-pointer">
            <Button variant="outline" size="icon" className="rounded-full">
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <User />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <ThemeToggler>
                <span className="font-normal opacity-95 dark:opacity-100">
                  Theme
                </span>
              </ThemeToggler>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={signOut}>
              <button type="submit" className="w-full">
                <DropdownMenuItem className="hover:cursor-pointer flex gap-2">
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
