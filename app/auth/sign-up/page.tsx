"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signup } from "@/lib/actions/auth-action";
import { useState } from "react";
import { Loader } from "lucide-react";

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    try {
      await signup(formData);
    } catch (error) {
      console.error("Registration error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <p className="text-balance text-muted-foreground">
            Enter credentials to create an account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="donjheggo@gmail.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="*************"
              required
            />
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              "Create an Account"
            )}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
}
