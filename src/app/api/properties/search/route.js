import connectDB from "@/config/database";
import Property from "@/models/Property";



// GET /api/properties/search

export const GET = async(req)=>{

    try {
        await connectDB()
        const {searchParams} = new URL(req.url)
        const location = 
        searchParams.get("location") || "";
        const propertyType=
        searchParams.get("propertyType") || "";

        console.log(location, propertyType);

        const locationPattern=new RegExp(location, "i");

        let query={
            $or:[
                {name:locationPattern},
                {description:locationPattern},
                {'location.street':locationPattern},
                {'location.city':locationPattern},
                {'location.state':locationPattern},
                {'location.zipcode':locationPattern}

            ]
        }

        if(propertyType && propertyType !== "all"){
            const typePattern=new RegExp(propertyType, "i");

            query.type=typePattern;
        }

        const properties = await Property.find(query);
        
        return new Response(JSON.stringify(properties),{
            status:200,
            headers:{
                "Content-Type":"application/json"
            }
        })
        
    } catch (error) {
        return new Response(error.message, {status:500})
    }
}
        
    
