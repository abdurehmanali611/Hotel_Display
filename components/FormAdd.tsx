/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { gallerySchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import {
  CreatingGallery,
  handleUploadSuccess,
  FetchingGallery,
} from "@/lib/actions";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { SelectList } from "@/constants";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

interface FormAddProps {
  title: string;
  desc: string;
}

interface GalleryItem {
  galleryType: string;
}

const FormAdd = ({ title, desc }: FormAddProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [galleryCounts, setGalleryCounts] = useState<Record<string, number>>(
    {},
  );

  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema) as any,
    defaultValues: {
      title: "",
      image: "",
      price: 100,
      galleryType: "",
    },
  });

  const selectedGalleryType = form.watch("galleryType");
  const remainingInSelected = selectedGalleryType
    ? 3 - (galleryCounts[selectedGalleryType] || 0)
    : 0;

  const totalRemainingSlots = 18 - galleries.length;

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await FetchingGallery();
        setGalleries(data);

        const counts: Record<string, number> = {};
        SelectList.forEach((gallery) => {
          const count = data.filter(
            (item: GalleryItem) => item.galleryType === gallery.realValue,
          ).length;
          counts[gallery.realValue] = count;
        });
        setGalleryCounts(counts);
      } catch (error) {
        console.error("Error fetching galleries:", error);
      }
    };

    fetchGalleries();
  }, []);

  const handleSubmit = async (values: z.infer<typeof gallerySchema>) => {
    const currentCount = galleryCounts[values.galleryType] || 0;
    if (currentCount >= 3) {
      toast.error(`"${values.galleryType}" already has 3 items (maximum)`);
      return;
    }

    if (galleries.length >= 18) {
      toast.error("Maximum of 18 galleries reached!");
      return;
    }

    try {
      await CreatingGallery(values, setLoading);

      const newGalleries = [...galleries, values];
      setGalleries(newGalleries);

      setGalleryCounts((prev) => ({
        ...prev,
        [values.galleryType]: (prev[values.galleryType] || 0) + 1,
      }));

      form.reset();
      setPreviewUrl(null);
      toast.success("Gallery Created Successfully");
    } catch {
    }
  };

  return (
    <div className="flex items-end gap-5">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="flex items-start gap-5">
                <CustomFormField
                  name="galleryType"
                  control={form.control}
                  fieldType={formFieldTypes.SELECT}
                  label="Gallery Type: "
                  placeholder="Select gallery type"
                  required
                  inputClassName="h-fit p-2 w-56"
                  listdisplay={SelectList}
                  disabled={totalRemainingSlots === 0}
                />
                <CustomFormField
                  name="title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Title: "
                  placeholder="Enter the Item title"
                  required
                  inputClassName="h-fit p-2 w-56"
                  disabled={totalRemainingSlots === 0}
                />
              </div>
              <div className="flex items-start gap-10">
                <CustomFormField
                  name="price"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Price: "
                  placeholder="Enter the Item price"
                  required
                  type="number"
                  inputClassName="h-fit p-2 w-56"
                  disabled={totalRemainingSlots === 0}
                />
                <CustomFormField
                  name="image"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Image: "
                  previewUrl={previewUrl}
                  handleCloudinary={(result) =>
                    handleUploadSuccess(result, form, setPreviewUrl, "image")
                  }
                  required
                  disabled={totalRemainingSlots === 0}
                />
              </div>
              {selectedGalleryType && (
                <div className="text-sm text-blue-600 text-center">
                  {remainingInSelected > 0 ? (
                    <span>
                      Remaining slots in <strong>{selectedGalleryType}</strong>:{" "}
                      {remainingInSelected}
                    </span>
                  ) : (
                    <span className="text-red-600">
                      <strong>{selectedGalleryType}</strong> is full (3/3)
                    </span>
                  )}
                </div>
              )}
              <Button
                type="submit"
                className="cursor-pointer w-56 self-center"
                disabled={
                  loading ||
                  totalRemainingSlots === 0 ||
                  (selectedGalleryType !== "" && remainingInSelected === 0)
                }
              >
                {loading ? "Creating..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center">
        <div className="flex flex-col flex-wrap h-20 gap-2">
          {SelectList.map((gallery) => (
            <Badge
              key={gallery.id}
              variant={
                (galleryCounts[gallery.realValue] || 0) >= 3
                  ? "destructive"
                  : "default"
              }
              className="px-2 py-1"
            >
              {gallery.name}: {galleryCounts[gallery.realValue] || 0}/3
            </Badge>
          ))}
        </div>
        <Badge className="px-3 py-1 bg-green-600">
          <p className="text-lg">
            <span className="font-semibold font-serif">Remaining Total:</span>{" "}
            {totalRemainingSlots}/18
          </p>
        </Badge>
      </div>
    </div>
  );
};

export default FormAdd;
