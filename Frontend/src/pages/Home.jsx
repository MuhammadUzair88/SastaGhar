// Home.jsx
import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Offers from "../components/Offers";
import RecommendedCards from "../components/RecommendedCards";

const ExtraServices = lazy(() => import("../components/ExtraServices"));
const NewsletterSection = lazy(() => import("../components/NewsletterSection"));
const Footer = lazy(() => import("../components/Footer"));

const categories = [
  {
    id: 1,
    title: "Trendy Styles for Every Season",
    subTitle: "Women & Men Clothes",
    image: "/Cloths.webp",
    categoryParam: "Women & Men Clothes",
  },
  {
    id: 2,
    title: "Step Into Comfort & Style",
    subTitle: "Shoes Collection",
    image: "/Shoes.webp",
    categoryParam: "Shoes",
  },
  {
    id: 3,
    title: "Glow Up With Confidence",
    subTitle: "Cosmetics & Beauty",
    image: "/Cosmetics.webp",
    categoryParam: "Cosmetics & Beauty",
  },
  {
    id: 4,
    title: "Stay Connected, Stay Ahead",
    subTitle: "Mobile & Accessories",
    image: "/mobile.webp",
    categoryParam: "Mobile & Accessories",
  },
  {
    id: 5,
    title: "Cook Like a Pro",
    subTitle: "Kitchenware Essentials",
    image: "/Khichen.webp",
    categoryParam: "Kitchenware",
  },
];

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 p-2 rounded-full hover:bg-white"
  >
    <ChevronRight size={24} className="text-gray-700" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 p-2 rounded-full hover:bg-white"
  >
    <ChevronLeft size={24} className="text-gray-700" />
  </div>
);

const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  pauseOnHover: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden relative">
      <Slider {...sliderSettings}>
        {categories.map((item) => (
          <div key={item.id}>
            <div
              className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 max-w-xl text-center px-4 text-white">
                <p className="uppercase text-sm tracking-widest text-gray-300 mb-3">
                  {item.subTitle}
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  {item.title}
                </h2>
                <button
                  className="mt-6 inline-flex items-center gap-2 bg-white text-[#272343] font-medium px-6 py-3 rounded-md hover:bg-gray-200"
                  onClick={() =>
                    navigate(
                      `/products?search=&category=${encodeURIComponent(
                        item.categoryParam
                      )}`
                    )
                  }
                >
                  Explore Now <MoveRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const Home = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKENDURL}/api/product/list`)
      .then((res) => {
        setRecommendedItems(res.data.products || []);
      })
      .catch(console.error);
  }, []);

  const filteredRecommendedItems = useMemo(() => {
    return recommendedItems.filter((item) => !item.otherServices).slice(0, 10);
  }, [recommendedItems]);

  return (
    <Suspense fallback={<div className="text-center py-6">Loading...</div>}>
      <div className="w-full min-h-screen space-y-10 pb-10 bg-gray-100 overflow-x-hidden">
        <Banner />

        <div className="px-4 md:px-10 xl:px-14">
          <Offers />
        </div>

        <div className="px-4 md:px-10 xl:px-14">
          <h2 className="text-lg md:text-2xl font-semibold mb-6">
            Recommended Cards
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
            {filteredRecommendedItems.map((item) => (
              <RecommendedCards
                key={item._id}
                _id={item._id}
                name={item.name}
                price={item.price}
                image={item.image?.[0]}
                onSale={item.onSale}
                salePercentage={item.salePercentage}
              />
            ))}
          </div>
        </div>

        <div className="px-4 md:px-10 xl:px-14">
          <h2 className="text-lg md:text-2xl font-semibold mb-6">
            Our Extra Services
          </h2>
          <ExtraServices />
        </div>

        <NewsletterSection />
        <Footer />
      </div>
    </Suspense>
  );
};

export default Home;
