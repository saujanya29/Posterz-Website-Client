import React from "react";
import "./Product.scss";
import dummyImg from "../../assets/naruto.jpeg";
import { useNavigate } from "react-router-dom";


function Product({product}) {
  const navigate  = useNavigate()
  return (
    <div className="Product" onClick={()=> navigate(`/product/${product?.attributes?.key}`)} >
      <div className="product-container">
        <div className="product-img">
          <div className="img-container">
            <img src={product?.attributes?.image.data.attributes?.url} alt={product?.attributes?.key} id="img" />
          </div>
        </div>

        <div className="product-info">
          <p className="title">{product?.attributes.key}</p>
          <p className="price">$ {product?.attributes.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
