import { z } from "zod"

export const gallerySchema = z.object({
    title: z.string().min(2, "Please Enter valid Image Title"),
    image: z.string().min(2, "Please Upload valid Image"),
    price: z.coerce.number().min(0, "Please Enter Valid Price"),
    galleryType: z.string().min(2, "Please Select Gallery Type")
})