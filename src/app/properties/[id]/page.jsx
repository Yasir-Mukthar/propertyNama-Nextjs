"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/request";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyDetail from "@/components/PropertyDetail";
import {FaArrowLeft} from "react-icons/fa"
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(property);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        return;
      }
      try {
        const data = await fetchProperty(id);
        setProperty(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 classNameName="font-bold text-2xl text-center">Property not found</h1>
    );
  }

  return (
    <>
    {
      loading && <Spinner loading={loading} />
    }
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className=" mr-2"></FaArrowLeft> Back to Properties
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container mx-auto py-10 px-6">
              <div className="grid grid-cols-1 mx-auto w-[80%] gap-6">
              <PropertyDetail property={property} />
                
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
