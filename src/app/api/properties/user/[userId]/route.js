import connectDB from "@/config/database";
import Property from "@/models/Property";



// GET /api/properties/user/:userId
export const GET = async (req, {params}) => {
  try {
    await connectDB();
    console.log("db connected");
    const userId = params.userId;
    console.log(params, " parms")
    if(!userId){
        return new Response("User not found", { status: 404 });
    }
    const properties = await Property.find({owner:userId});

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
