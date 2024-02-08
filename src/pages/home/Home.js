import React, { useEffect } from "react";
import Slider from "../../components/slider/Sliders";
import Product from "../../components/product/Product";

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 500,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, [url]);

  // useEffect(() => {
  //   const scrollToProducts = () => {
  //     if (url.includes("#products")) {
  //       const productsElement = document.getElementById("MM");
  
  //       if (productsElement) {
  //         productsElement.scrollIntoView({ behavior: "smooth", duration: 500 });
  //       }
  //     }
  //   };
  
  //   scrollToProducts();
  // }, [url]);
  


  return (
    <div>
      <div>MM</div>
      <Slider />
      <Product id = "MM" />
    </div>
  );
};

export default Home;
