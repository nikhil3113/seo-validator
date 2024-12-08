import BulkCheck from "@/components/BulkCheck";
import OnePageCheck from "@/components/OnePageCheck";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default async function Home() {
  return (
    <>
      <Tabs
        defaultValue="onePage"
        className="flex flex-col justify-center items-center mt-32"
      >
        <TabsList>
          <TabsTrigger value="onePage">One Page Check</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Check</TabsTrigger>
        </TabsList>
        <TabsContent value="onePage">
          <OnePageCheck />
        </TabsContent>
        <TabsContent value="bulk">
          <BulkCheck/>
        </TabsContent>
      </Tabs>
      ;
    </>
  );
}
