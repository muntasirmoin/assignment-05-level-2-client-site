import React from "react";
import { Helmet } from "react-helmet-async";
import BrandingSection from "./homePage/BrandingSection";
import FeaturedServices from "./homePage/featuredServices/FeaturedServices";
import ReviewSection from "./homePage/Reviews/ReviewSection";
import ScrollToTopButton from "../../components/shared/ScrollToTopButton";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Wheels</title>
      </Helmet>
      <BrandingSection></BrandingSection>
      {/* call to action button inside hero/branding section */}
      <FeaturedServices></FeaturedServices>
      <ReviewSection></ReviewSection>
      <ScrollToTopButton></ScrollToTopButton>
    </>
  );
};

export default Home;
