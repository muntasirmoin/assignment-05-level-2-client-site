import React from "react";
import { Helmet } from "react-helmet-async";
import ScrollToTopButton from "../../components/shared/ScrollToTopButton";

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About | Wheels</title>
      </Helmet>
      <div className="p-20">
        <ScrollToTopButton></ScrollToTopButton>
        <div className="container mx-auto p-4 border-l-4 border-r-4 border-gray-100">
          <h1 className="text-4xl font-bold mb-4">About Wheels Wash</h1>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to Wheels Wash! We are your trusted partner for
            comprehensive vehicle service and wash solutions. At Wheels Wash, we
            understand the importance of maintaining your vehicle's cleanliness
            and performance. Our goal is to provide top-quality services that
            keep your vehicle in pristine condition.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our team of experienced professionals is dedicated to delivering
            exceptional service. Whether you're looking for a quick wash or a
            complete service package, we offer a range of options to meet your
            needs. We use the latest technology and eco-friendly products to
            ensure your vehicle gets the care it deserves.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            At Wheels Wash, we pride ourselves on our commitment to customer
            satisfaction. We go the extra mile to make sure our customers leave
            with a smile, knowing their vehicle has been expertly serviced and
            cleaned.
          </p>
          <hr className="border-l-4 border-r-4 border-gray-300" />
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our mission at Wheels Wash is to provide reliable and high-quality
            vehicle service and wash solutions that enhance the longevity and
            appearance of your vehicle. We are dedicated to delivering services
            that exceed customer expectations, making us the preferred choice
            for vehicle owners.
          </p>
          <hr className="border-l-4 border-r-4 border-gray-300" />
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 mb-4">
            We envision Wheels Wash as a leader in the vehicle service and wash
            industry, recognized for our innovation, customer-centric approach,
            and commitment to excellence. Our goal is to set the standard for
            quality in vehicle care, helping our customers maintain their
            vehicles in top condition.
          </p>
          <hr className="border-l-4 border-r-4 border-gray-300" />
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>
              Customer Satisfaction: Our customers are at the heart of
              everything we do.
            </li>
            <li>
              Integrity: We operate with honesty and transparency in all our
              services.
            </li>
            <li>
              Quality: We are committed to providing the highest quality service
              and care for your vehicle.
            </li>
            <li>
              Innovation: We continually seek new ways to improve our services
              and offerings.
            </li>
            <li>
              Sustainability: We use eco-friendly products and practices to
              protect the environment.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
