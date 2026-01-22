/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CustomFormField, { formFieldTypes } from "@/components/customFormField";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { SelectList } from "@/constants";
import { DeletingGallery, UpdatingGallery, FetchingGallery } from "@/lib/actions";
import { gallerySchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, ImageIcon, RefreshCw, Trash2, UploadCloud, AlertCircle } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export type gallery = {
  _id: string;
  galleryType: string;
  title: string;
  image: string;
  price: number;
};

interface GalleryItem {
  galleryType: string;
}

export const columns = (refresh: () => void): ColumnDef<gallery>[] => [
  {
    id: "rollNo",
    header: "Roll No",
    cell: ({ row }) => <h3>{row.index + 1}</h3>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Avatar>
        <Image
          src={row.getValue("image")}
          alt={row.getValue("title")}
          fill
          loading="eager"
          className="rounded-xl object-cover"
        />
      </Avatar>
    ),
  },
  {
    accessorKey: "galleryType",
    header: "Gallery Type",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const form = useForm<z.infer<typeof gallerySchema>>({
        resolver: zodResolver(gallerySchema) as any,
        defaultValues: {
          galleryType: row.original.galleryType,
          title: row.original.title,
          image: row.original.image,
          price: row.original.price,
        },
      });
      const [imagePreview, setImagePreview] = useState<string | null>(
        form.getValues("image"),
      );
      const [loading, setLoading] = useState(false);
      const [dialogOpen, setDialogOpen] = useState(false);
      const [alertOpen, setAlertOpen] = useState(false);
      const [galleries, setGalleries] = useState<GalleryItem[]>([]);
      const [galleryCounts, setGalleryCounts] = useState<Record<string, number>>({});
      
      const selectedGalleryType = form.watch("galleryType");
      const currentGalleryType = row.original.galleryType;
      const isChangingGalleryType = selectedGalleryType !== currentGalleryType;
      
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
      }, [dialogOpen]); // Fetch when dialog opens

      const getGalleryCountInfo = (galleryType: string) => {
        const count = galleryCounts[galleryType] || 0;
        const isFull = count >= 3;
        return { count, isFull };
      };

      const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
        
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME || "",
          );
          
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            },
          );
          
          if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
          }
          
          const data = await response.json();
          form.setValue("image", data.secure_url);
          toast.success("Image uploaded successfully");
        } catch (error: any) {
          toast.error(`Failed to upload image: ${error.message}`);
        }
      };
      
      const onSubmit = async (values: z.infer<typeof gallerySchema>) => {
        // Check if gallery type is being changed
        if (isChangingGalleryType) {
          const targetCount = galleryCounts[values.galleryType] || 0;
          if (targetCount >= 3) {
            toast.error(`"${values.galleryType}" already has 3 items (maximum). Cannot move item here.`);
            return;
          }
        }

        setLoading(true);
        try {
          await UpdatingGallery(row.original._id, values);
          setDialogOpen(false);
          toast.success("Gallery Updated Successfully");
          refresh();
        } catch {
          toast.error("Failed to update gallery");
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="flex items-center gap-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Edit />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Update Gallery</DialogTitle>
                <DialogDescription>
                  Update the information about {row.original.title}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  className="flex flex-col gap-5"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="flex items-center gap-5">
                    <CustomFormField
                      name="title"
                      control={form.control}
                      fieldType={formFieldTypes.INPUT}
                      label="Title: "
                      inputClassName="h-fit p-2 w-56"
                      required
                    />
                    <div className="flex flex-col gap-2">
                      <CustomFormField
                        name="galleryType"
                        control={form.control}
                        fieldType={formFieldTypes.SELECT}
                        label="Gallery Type: "
                        inputClassName="h-fit p-2 w-56"
                        required
                        listdisplay={SelectList}
                      />
                      {selectedGalleryType && isChangingGalleryType && (
                        <div className="text-sm">
                          {getGalleryCountInfo(selectedGalleryType).isFull ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <AlertCircle className="h-3 w-3" />
                              <span>
                                <strong>{selectedGalleryType}</strong> is full (3/3)
                              </span>
                            </div>
                          ) : (
                            <div className="text-blue-600">
                              <span>
                                <strong>{selectedGalleryType}</strong>:{" "}
                                {getGalleryCountInfo(selectedGalleryType).count}/3
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-5">
                    <CustomFormField
                      name="price"
                      control={form.control}
                      fieldType={formFieldTypes.INPUT}
                      label="Price: "
                      required
                      type="number"
                      inputClassName="h-fit p-2 w-56"
                    />
                    <div>
                      <Label htmlFor="image" className="text-sm font-medium">
                        Item Image:
                      </Label>
                      <div className="relative w-42 h-42 rounded-lg flex items-center justify-center overflow-hidden group mt-2">
                        {imagePreview ? (
                          <div className="relative w-full h-48">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              loading="eager"
                              className="object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                className="cursor-pointer"
                                onClick={() =>
                                  document
                                    .getElementById("image-upload")
                                    ?.click()
                                }
                              >
                                Change Image
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-6">
                            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <div className="mt-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="cursor-pointer"
                                onClick={() =>
                                  document
                                    .getElementById("image-upload")
                                    ?.click()
                                }
                              >
                                Upload Image
                              </Button>
                            </div>
                          </div>
                        )}
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImage} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full gap-2 cursor-pointer"
                      disabled={
                        loading || 
                        (isChangingGalleryType && getGalleryCountInfo(selectedGalleryType).isFull)
                      }
                    >
                      {loading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <UploadCloud className="h-4 w-4" />
                      )}
                      Update Gallery Item
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Trash2 className="text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Deleting {row.original.title}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure You want to delete {row.original.title}. This
                  Action can&apos;t be unDone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex items-center justify-end gap-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-400 cursor-pointer"
                  onClick={async () => {
                    try {
                      await DeletingGallery(row.original._id);
                      setAlertOpen(false);
                      toast.success("Gallery Deleted Successfully");
                      refresh();
                    } catch {
                      toast.error("Failed to delete gallery");
                    }
                  }}
                >
                  Delete
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];