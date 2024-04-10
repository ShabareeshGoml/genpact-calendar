"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import { fetchAllProductList } from "@/services/apiServices/productPage";
import React, { useEffect, useState } from "react";
import "./product.css";

function ProductList() {
  useEffect(() => {
    fetchAllProductList().then((e) => setProducts(e));
  }, []);

  const [products, setProducts] = useState([]);

  console.log(products);

  return (
    <div className="product-page-layout-container">
      <span className="product-hero-heading-text">ProductList</span>
      <div className="product-hero-conatiner">
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            productName={product?.name}
            category={product?.category}
            id={product?.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
