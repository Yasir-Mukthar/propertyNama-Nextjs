import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/utils/cloudinary";

// GET /api/properties
export const GET = async (req) => {
  try {
    await connectDB();
    console.log("db connected");
    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

// POST /api/properties
export const POST = async (req) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { userId } = sessionUser;
    const formData = await req.formData();

    const amenities = formData.getAll("amenities");

    const images = formData.getAll("images").filter((img) => img.name !== "");

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        street: formData.get("location.street"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    //upload img to cloudinary

    const imageUploadPromises=[];

    
    for(const image of images){
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray)

      const imageBase64 = imageData.toString("base64")


      const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`,{
        folder:"property"
      });

      imageUploadPromises.push(result.secure_url);

      const uploadedImages = await Promise.all(imageUploadPromises)

      propertyData.images = uploadedImages;


    }

    console.log(propertyData);
    const newProperty = new Property(propertyData)
    await newProperty.save();

    return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)

  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
