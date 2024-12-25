import BulkCheck from "@/components/BulkCheck";
import OnePageCheck from "@/components/OnePageCheck";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default async function Home() {
  return (
    <>
      <Tabs
        defaultValue="onePage"
        className="flex flex-col justify-center items-center mt-20 "
      >
        <TabsList className="mb-10">
          <TabsTrigger value="onePage">One Page Check</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Check</TabsTrigger>
        </TabsList>
        <TabsContent value="onePage" className="w-full max-w-6xl mx-auto">
          <OnePageCheck />
        </TabsContent>
        <TabsContent value="bulk" className="w-full max-w-6xl mx-auto">
          <BulkCheck/>
        </TabsContent>
      </Tabs>
      ;
    </>
  );
}
