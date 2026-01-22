import Galleries from "@/app/models/Galleries";
import dbConnect from "@/lib/db";

interface propsID {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: propsID) {
  const { id } = await params;
  await dbConnect();
  const gallery = await Galleries.findById(id);
  
  if (!gallery) {
    return Response.json({ error: "Gallery not found" }, { status: 404 });
  }
  
  return Response.json({ gallery });
}

// DELETE request
export async function DELETE(request: Request, { params }: propsID) {
  try {
    const { id } = await params;
    await dbConnect();
    const deletingGalleries = await Galleries.findByIdAndDelete(id);
    
    if (!deletingGalleries) {
      return Response.json({ error: "Gallery not found" }, { status: 404 });
    }
    
    return Response.json({ 
      message: "Gallery deleted successfully", 
      deletingGalleries 
    });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    return Response.json({ 
      error: "Failed to delete gallery" 
    }, { status: 500 });
  }
}

// PATCH request for updating gallery
export async function PATCH(request: Request, { params }: propsID) {
  try {
    const { id } = await params;
    await dbConnect();
    const { title, image, price, galleryType } = await request.json();
    
    const updatingGalleries = await Galleries.findByIdAndUpdate(
      id,
      { title, image, price, galleryType },
      { new: true },
    );
    
    if (!updatingGalleries) {
      return Response.json({ error: "Gallery not found" }, { status: 404 });
    }
    
    return Response.json({ 
      message: "Gallery updated successfully", 
      updatingGalleries 
    });
  } catch (error) {
    console.error("Error updating gallery:", error);
    return Response.json({ 
      error: "Failed to update gallery" 
    }, { status: 500 });
  }
}