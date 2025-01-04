"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <div className=" flex justify-center items-center mt-56">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign up
          </CardTitle>
          <CardDescription className="text-center">
            Sign-up with your google account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <button
            onClick={async () => await signIn("google")}
            className="flex gap-5 shadow-md px-8 py-2 rounded-lg"
          >
            <Image
              src="/google-icon.svg"
              width={20}
              height={20}
              alt="google-icon"
            />
            Sign up with Google
          </button>
        </CardContent>
        <CardFooter className="flex justify-center">
            Already have an account? <Link href="/signin" className="ml-2 underline underline-offset-1 text-blue-700"> Signin</Link>
        </CardFooter>
      </Card>
    </div>
  );
}