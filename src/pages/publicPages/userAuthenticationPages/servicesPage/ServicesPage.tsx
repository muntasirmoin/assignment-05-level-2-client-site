import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useGetAllServicesQuery } from "../../../../redux/features/publicPages/services.api";
import { Helmet } from "react-helmet-async";
import ScrollToTopButton from "../../../../components/shared/ScrollToTopButton";

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
}

const ServicesPage: React.FC = () => {
  // const [services, setServices] = useState<Service[]>([
  //   {
  //     id: "1",
  //     name: "Basic Wash",
  //     description: "Exterior wash and interior vacuuming.",
  //     price: 20,
  //     duration: "30 min",
  //     image: "https://via.placeholder.com/150?text=Basic+Wash",
  //   },
  //   {
  //     id: "2",
  //     name: "Deluxe Wash",
  //     description: "Exterior wash, interior vacuuming, and wax.",
  //     price: 40,
  //     duration: "45 min",
  //     image: "https://via.placeholder.com/150?text=Deluxe+Wash",
  //   },
  //   {
  //     id: "3",
  //     name: "Ultimate Wash",
  //     description: "Full exterior and interior detailing.",
  //     price: 60,
  //     duration: "60 min",
  //     image: "https://via.placeholder.com/150?text=Ultimate+Wash",
  //   },
  //   {
  //     id: "4",
  //     name: "Express Wash",
  //     description: "Quick exterior wash and drying.",
  //     price: 15,
  //     duration: "15 min",
  //     image: "https://via.placeholder.com/150?text=Express+Wash",
  //   },
  // ]);

  const {
    data: servicesData,
    isLoading,
    error,
  } = useGetAllServicesQuery(undefined);

  const services = servicesData?.data;

  console.log("Services:", services);

  const [filteredServices, setFilteredServices] = useState<Service[]>(
    services!
  );
  const [filters, setFilters] = useState({
    search: "",
    priceSort: null as null | "asc" | "desc",
    durationSort: null as null | "asc" | "desc",
  });

  const { register, handleSubmit } = useForm<{ search: string }>();

  useEffect(() => {
    let filtered = services?.filter((service) => {
      // if (
      //   filters.search &&
      //   !service.name.toLowerCase().includes(filters.search.toLowerCase())
      // ) {
      //   return false;
      // }

      const searchTerm = filters.search.toLowerCase();
      console.log(searchTerm);

      if (
        searchTerm &&
        !(
          service.name.toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm) ||
          service.price.toString().includes(searchTerm) ||
          service.duration.toString().toLowerCase().includes(searchTerm)
        )
      ) {
        return false;
      }

      return true;
    });

    if (filters.priceSort === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.priceSort === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (filters.durationSort === "asc") {
      filtered.sort((a, b) => {
        const durationA =
          typeof a.duration === "string"
            ? parseInt(a.duration.split(" ")[0], 10)
            : parseInt(String(a.duration), 10);

        const durationB =
          typeof b.duration === "string"
            ? parseInt(b.duration.split(" ")[0], 10)
            : parseInt(String(b.duration), 10);
        return durationA - durationB;
      });
    } else if (filters.durationSort === "desc") {
      filtered.sort((a, b) => {
        const durationA =
          typeof a.duration === "string"
            ? parseInt(a.duration.split(" ")[0], 10)
            : parseInt(String(a.duration), 10);

        const durationB =
          typeof b.duration === "string"
            ? parseInt(b.duration.split(" ")[0], 10)
            : parseInt(String(b.duration), 10);
        return durationB - durationA;
      });
    }

    setFilteredServices(filtered);
  }, [services, filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handlePriceSort = (sortOrder: "asc" | "desc") => {
    setFilters({ ...filters, priceSort: sortOrder });
  };

  const handleDurationSort = (sortOrder: "asc" | "desc") => {
    setFilters({ ...filters, durationSort: sortOrder });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      priceSort: null,
      durationSort: null,
    });
    setFilteredServices(services!);
  };

  return (
    <>
      <Helmet>
        <title>Service | Wheels</title>
      </Helmet>
      <ScrollToTopButton></ScrollToTopButton>
      <div className="max-w-full mx-auto py-16 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 mt-5 text-center">
          Car Wash Services
        </h1>

        <div className="mb-4 flex items-center justify-between px-4">
          {/* Left Side: Search Form and Sort By Price */}
          <div className="flex items-center space-x-4">
            {/* Sort By Price */}
            <div className="flex items-center space-x-2">
              {/* <label className="mr-2">Sort by price:</label> */}
              <select
                className="select select-bordered"
                value={filters?.priceSort ?? ""}
                onChange={(e) =>
                  handlePriceSort(e.target.value as "asc" | "desc")
                }
              >
                <option value="">Sort by Price </option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>

            {/* Sort By Duration */}
            <div className="flex items-center space-x-2">
              {/* <label className="mr-2">Sort by duration:</label> */}
              <select
                className="select select-bordered"
                value={filters?.durationSort ?? ""}
                onChange={(e) =>
                  handleDurationSort(e.target.value as "asc" | "desc")
                }
              >
                <option value="">Sort by Duration</option>
                <option value="asc">Short to Long</option>
                <option value="desc">Long to Short</option>
              </select>
            </div>
          </div>

          {/* Right Side: search and Clear Filters Button */}
          <div className="flex items-center space-x-4">
            {/* Search*/}

            <form
              onSubmit={handleSubmit((data) =>
                setFilters({ ...filters, search: data?.search })
              )}
              className="flex items-center space-x-2 p-2"
            >
              <input
                type="text"
                placeholder="Search services..."
                className="input input-bordered"
                {...register("search")}
                onChange={handleSearchChange}
              />
              {/* <button type="submit" className="btn btn-success">
              Search
            </button> */}
            </form>

            {/* Clear Filters Button */}
            <button className="btn btn-error" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {filteredServices?.map((service) => (
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img
                  src={service.image} // Dynamically setting the image URL
                  alt={service.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title flex justify-between items-center">
                  {service.name}
                  <div className="badge badge-secondary">
                    {service.duration} Minutes
                  </div>{" "}
                  {/* Optional badge */}
                </h2>
                <p className="text-gray-700 mb-2">{service.description}</p>
                <p className="text-lg font-semibold mb-2">
                  BDT {service.price.toFixed(2)}
                </p>

                <div className="card-actions justify-end">
                  <Link to={`/service-details/${service._id}`}>
                    <button className="btn btn-sm btn-outline btn-info">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;

{
  /* data here with ul and li */
}
//  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
//  {filteredServices.map((service) => (
//    <li
//      key={service.id}
//      className="p-4 border rounded-lg flex items-center"
//    >
//      <img
//        src={service.image}
//        alt={service.name}
//        className="w-24 h-24 object-cover mr-4 rounded-lg"
//      />
//      <div>
//        <h2 className="text-xl font-bold">{service.name}</h2>
//        <p className="text-gray-700">{service.description}</p>
//        <p className="text-lg font-semibold">
//          Price: ${service.price.toFixed(2)}
//        </p>
//        <p className="text-sm text-gray-500">
//          Duration: {service.duration}
//        </p>
//      </div>
//    </li>
//  ))}
// </ul>
