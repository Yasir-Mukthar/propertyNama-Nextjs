
const apiDomain= process.env.NEXT_PUBLIC_API_DOMAIN || null


//fetch all properties
async function fetchProperties(){
    try {
    
    if(!apiDomain){
        return []
    }
      const response = await fetch(`${apiDomain}/properties`,{
        cache:"no-store"
      });
      if(!response.ok){
        throw new Error("An error occurred while fetching the data")
      }
  
      const data = await response.json();
      return data
      
    } catch (error) {
      console.error(error);
      
    }
  }


  //fetch one property
  async function fetchProperty(id){
    try {
    
    if(!apiDomain){
        return null
    }
      const response = await fetch(`${apiDomain}/properties/${id}`);
      if(!response.ok){
        throw new Error("An error occurred while fetching the data")
      }
  
      const data = await response.json();
      return data
      
    } catch (error) {
      console.error(error);
      
    }
  }


  export {
    fetchProperties,
    fetchProperty
  }