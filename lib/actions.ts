/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

interface cloudinarySuccessResult {
  event: "success";
  info: {
    secure_url: string;
  };
}

interface Gallery {
  title: string;
  image: string;
  price: number;
  galleryType: string;
}

export const handleUploadSuccess = (
  result: unknown,
  form: UseFormReturn<any>,
  setPreviewUrl: (url: string | null) => void,
  formField: string
) => {
  if (
    typeof result == "object" &&
    result !== null &&
    "event" in result &&
    result.event == "success" &&
    "info" in result &&
    typeof result.info == "object" &&
    result.info !== null &&
    "secure_url" in result.info
  ) {
    const typedResult = result as cloudinarySuccessResult;
    const secured_url = typedResult.info.secure_url;

    form.setValue(formField, secured_url, { shouldValidate: true });
    setPreviewUrl(secured_url);
  } else {
    console.error(
      "Cloudinary Upload Failed or returned an unexpected structure."
    );

    form.setValue(formField, "");
    setPreviewUrl(null);
  }
};

export async function CreatingGallery(values: Gallery, setLoading: (value: boolean) => void) {
  try {
    setLoading(true);
    const response = await axios.post("/api/Galleries", values, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (response.status === 201) {
      return response.data;
    } else if (response.status === 400 && response.data?.error) {
      toast.error(response.data.error);
      throw new Error(response.data.error);
    }
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error)) {
      errorMessage = error?.response?.data?.message || error?.response?.data?.error || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
}

export async function UpdatingGallery(id: string, values: Partial<Gallery>) {
  try {
    const response = await axios.patch(`/api/Galleries/${id}`, values, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error)) {
      errorMessage = error?.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  } 
}

export async function DeletingGallery(id: string) {
  try {
    const response = await axios.delete(`/api/Galleries/${id}`);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error)) {
      errorMessage = error?.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
}

export async function FetchingGallery() {
  try {
    const response = await axios.get("/api/Galleries");
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.galleries)) {
      return response.data.galleries;
    } else {
      console.error("Unexpected response structure:", response.data);
      return [];
    }
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error)) {
      errorMessage = error?.response?.data?.message || error.message;
    } else if(error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    return [];
  }
}