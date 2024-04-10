import React from "react";
import "./productCard.css";
import { useRouter } from "next/navigation";

function ProductCard({ productName, id, category, type }) {
  const router = useRouter();
  const onProductCardClick = () => {
    if (type !== "agent")
      router.push(`/customer/bookAppointment/${id}`, { scroll: false });
    else router.push(`/agent/viewAppointment/${id}`, { scroll: false });
  };
  return (
    <div className="product-card-hero-container" onClick={onProductCardClick}>
      <span className="product-card-number">{id}</span>
      <div>{productName}</div>
      <div>Category : {category}</div>
    </div>
  );
}

export default ProductCard;
