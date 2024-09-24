import Link from "next/link";
import SignOutButton from "@/components/signout-button";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <main className="max-w-screen-xl mx-auto min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1>{data?.user?.email}</h1>
        <Link href="/auth/sign-in" className="text-xl">
          Sign in
        </Link>
        <SignOutButton />
      </div>
    </main>
  );
}
