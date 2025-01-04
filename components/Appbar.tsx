import Link from "next/link";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import UserMenu from "./UserMenu";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH);
  return session;
}

export default async function Appbar() {
  const session = await getUser();
  return (
    <div className="flex justify-between p-5 shadow-sm">
      <Link href="/">
        <h2 className="text-xl text-blue-500 font-semibold">Seo Validator</h2>
      </Link>
      <div className="flex gap-5 ">
        <Link href="/manual-check">
          <h2 className="cursor-pointer">Manually</h2>
        </Link>
        <Link href="/url-check">
          <h2 className="cursor-pointer">URL</h2>
        </Link>
        <UserMenu session={session}/>
      </div>
    </div>
  );
}
