import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import PageHeader from "../components/Layout/PageHeader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {allProducts,isLoading} = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [allProducts, categoryData]);

  return (
  <>
  {
    isLoading ? (
      <Loader />
    ) : (
      <div>
        <Header activeHeading={3} />
        <PageHeader
          kicker="Collections"
          title={categoryData ? `${categoryData} essentials` : "All products"}
          subtitle="Browse verified items with clear pricing, live stock, and pharmacist-friendly details."
        />
        <div className={`${styles.section}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <p className="text-sm text-gray-500">
              Showing {data?.length || 0} items {categoryData ? `in ${categoryData}` : "across all categories"}.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-amber)]" />
              Live inventory updates
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12">
            {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
          {data && data.length === 0 ? (
            <div className="rounded-2xl border border-[var(--brand-mist)] bg-white p-10 text-center text-[var(--brand-ink)] shadow-sm mb-12">
              <h2 className="text-lg font-semibold">No products found</h2>
              <p className="mt-2 text-sm text-gray-500">Try a different category or clear filters.</p>
            </div>
          ) : null}
        </div>
        <Footer />
      </div>
    )
  }
  </>
  );
};

export default ProductsPage;

