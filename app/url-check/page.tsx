
import OnePageCheck from "@/components/OnePageCheck";
import { generativeAi } from "@/lib/generativeAi";

export default async function Page() {
  return (
    <div className="mx-auto ">
      <OnePageCheck generativeAi={generativeAi} />
    </div>
  );
}
