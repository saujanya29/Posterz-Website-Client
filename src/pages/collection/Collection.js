import React, { useEffect, useState } from "react";
import "./Collection.scss";
import Product from "../../components/Product/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";

function Collection() {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const categories = useSelector((state) => state.categoryReducer.categories);
  const params = useParams();
  const [products, setProducts] = useState();

  const sortOptions = [
    {
      value: "Price - Low To High",
      sort: "price",
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];

  const [sortBy, setSortBy] = useState(sortOptions[0].sort);

  async function fetchProducts() {
    // if no category is set then load all the product
    const url = params.categoryId
      ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;
    const response = await axiosClient.get(url);
    setProducts(response.data.data);
  }

  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchProducts();
  }, [params, sortBy]);

  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }

  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Prints And Artwork</h2>
            <p>
              India's largest collection of wall posters for your bedroom,
              living room, kids room, kitchen and posters & art prints at
              highest quality lowest price guaranteed.
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <p className="sort-by-text">Sort By</p>
              <select
                name="select-sort-by"
                id="sort-by"
                onChange={(e) => setSortBy(e.target.value)}>
                {sortOptions.map((item) => (
                  <option value={item.sort} key={item.sort}>
                    {item.value}
                  </option>
                ))}
                {/* <option value="relevance">Relevance</option>
                <option value="newest-first">Newest First</option>
                <option value="orice-lth">Price - Low To High</option> */}
              </select>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories?.map((item) => (
                <div key={item.id} className="filter-radio">
                  <input
                    type="radio"
                    name="category"
                    id={item.id}
                    value={item.attributes.key}
                    onChange={updateCategory}
                    checked={item.attributes.key === categoryId}
                  />

                  <label htmlFor={item.id}>{item.attributes.Title}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="product-box">
            {products?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
