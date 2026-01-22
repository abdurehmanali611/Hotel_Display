import Galleries from "@/app/models/Galleries";
import dbConnect from "@/lib/db";

export async function GET() {
    await dbConnect()
    const galleries = await Galleries.find({})
    return Response.json({galleries})
}

export async function POST(request: Request) {
    await dbConnect()
    const { title, image, price, galleryType } = await request.json();
    
    // Check if gallery already has 3 items
    const existingCount = await Galleries.countDocuments({ galleryType });
    if (existingCount >= 3) {
        return Response.json(
            { error: `Gallery "${galleryType}" already has 3 items (maximum)` }, 
            { status: 400 }
        );
    }
    
    const creatingGalleries = await Galleries.create({ title, image, price, galleryType })
    return Response.json({creatingGalleries}, { status: 201 })
}