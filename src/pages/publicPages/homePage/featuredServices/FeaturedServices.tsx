import React from "react";
import { useGetAllServiceQuery } from "../../../../redux/features/user/service.api";

const FeaturedServices = () => {
  const { data: serviceData, isLoading: sIsLoading } =
    useGetAllServiceQuery(undefined);

  console.log(" useGetAllServiceQuery:", serviceData?.data, sIsLoading);

  // const services = [
  //   {
  //     id: 1,
  //     title: "Express Wash",
  //     description: "Quick and thorough exterior wash.",
  //     image: "https://i.ibb.co/yqF4twB/pexels-photo-372810.jpg", // Replace with your image URL
  //   },
  //   {
  //     id: 2,
  //     title: "Full Detail",
  //     description: "Complete interior and exterior detailing.",
  //     image: "https://via.placeholder.com/150", // Replace with your image URL
  //   },
  //   {
  //     id: 3,
  //     title: "Interior Cleaning",
  //     description: "Deep cleaning for your car's interior.",
  //     image: "https://via.placeholder.com/150", // Replace with your image URL
  //   },
  //   {
  //     id: 4,
  //     title: "Waxing",
  //     description: "Protective wax coating for a shine.",
  //     image: "https://via.placeholder.com/150", // Replace with your image URL
  //   },
  //   {
  //     id: 5,
  //     title: "Engine Cleaning",
  //     description: "Thorough cleaning of your engine bay.",
  //     image: "https://via.placeholder.com/150", // Replace with your image URL
  //   },
  //   {
  //     id: 6,
  //     title: "Headlight Restoration",
  //     description: "Restore clarity and brightness to headlights.",
  //     image: "https://via.placeholder.com/150", // Replace with your image URL
  //   },
  // ];

  return (
    <section className="py-12 bg-gray-100 mt-5 mb-5">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceData?.data.slice(0, 6).map((service) => (
            <div key={service._id} className="relative group">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <p className="text-white text-center p-4">
                  {service.description}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                <h3 className="text-lg font-semibold text-white absolute bottom-2 left-2">
                  {service.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    // <section className="py-6 bg-[#f3ede7]">
    //   <div className="container mx-auto px-6">
    //     <h2 className="text-3xl font-bold text-center mb-8">
    //       Featured Services
    //     </h2>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {services.map((service) => (
    //         <div
    //           key={service.id}
    //           className="card bg-white shadow-lg rounded-lg overflow-hidden"
    //         >
    //           <figure className="relative">
    //             <img
    //               src={service.image}
    //               alt={service.title}
    //               className="w-full h-32 object-cover"
    //             />
    //             <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
    //               <h3 className="text-lg font-semibold text-white">
    //                 {service.title}
    //               </h3>
    //             </figcaption>
    //           </figure>
    //           <div className="p-4">
    //             <p className="text-gray-600">{service.description}</p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
  );
};

export default FeaturedServices;
