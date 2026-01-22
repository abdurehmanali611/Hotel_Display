import FormAdd from "@/components/FormAdd";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, TypeIcon } from "lucide-react";
import UpdateDeleteTable from "../UpdateDeleteTable/page";

export default function Admin() {
  return (
    <div className="flex flex-col gap-10 items-center h-screen justify-center">
      <Tabs defaultValue="create">
        <TabsList>
          <TabsTrigger value="create" asChild>
            <Button variant="outline">
              <TypeIcon />
              Create
            </Button>
          </TabsTrigger>
          <TabsTrigger value="update/delete" asChild>
            <Button variant="outline">
              <Edit />
              Update/Delete
            </Button>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <FormAdd
            title="Gallery"
            desc="Enter Gallery Images with their infos"
          />
        </TabsContent>
        <TabsContent value="update/delete">
          <Card>
            <CardHeader>
              <CardTitle>Customise your Gallery</CardTitle>
              <CardDescription>
                Update/Delete a gallery informations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UpdateDeleteTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
