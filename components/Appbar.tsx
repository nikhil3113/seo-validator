import Link from "next/link";

export default function Appbar() {
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
      </div>
    </div>
  );
}
