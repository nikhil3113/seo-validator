import Link from "next/link";

export default function Appbar() {
  return (
    <div className="flex justify-between p-5 shadow-sm">
      <h2 className="text-xl text-blue-500 font-semibold">Seo Helper</h2>
      <div className="flex gap-5 ">
        <Link href="/manual">
          <h2 className="cursor-pointer">Check Manually</h2>
        </Link>
        <Link href="/">
          <h2 className="cursor-pointer">Check with URL</h2>
        </Link>
      </div>
    </div>
  );
}
