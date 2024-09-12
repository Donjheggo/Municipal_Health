"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signin } from "@/lib/actions/auth-action";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    try {
      const { error } = await signin(formData);
      if (error) {
        toast.error(`Error: ${error}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="text-balance text-muted-foreground">
            Enter your credentials to login to your account
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
            {loading ? <Loader className="animate-spin" /> : "Login"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}
