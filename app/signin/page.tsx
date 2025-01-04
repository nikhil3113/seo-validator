import GmailButton from "@/components/GmailButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

export default function Signin() {
  return (
    <div className=" flex justify-center items-center mt-56">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Sign-in with your google account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          {/* <button
            onClick={async () => await signIn("google")}
            className="flex gap-5 shadow-md px-8 py-2 rounded-lg"
          >
            <Image
              src="/google-icon.svg"
              width={20}
              height={20}
              alt="google-icon"
            />
            Sign in with Google
          </button> */}
          <GmailButton text="Sign in with Google" />
        </CardContent>
        <CardFooter className="flex justify-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="ml-2 underline underline-offset-1 text-blue-700"
          >
            {" "}
            Signup
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
