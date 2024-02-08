import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductFilter.module.scss";
import React, { useEffect, useState } from "react";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productReducer";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterReducer";

const ProductFilter = () => {
  const products = useSelector(selectProducts);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];
  // console.log(allBrands);

  useEffect(() => {
    dispatch(
      FILTER_BY_BRAND({
        products: products,
        brand: brand,
      })
    );
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(
      FILTER_BY_PRICE({
        products,
        price,
      })
    );
  }, [dispatch, products, price]);

  const filteredproduct = (cat) => {
    setCategory(cat);
    dispatch(
      FILTER_BY_CATEGORY({
        products: products,
        category: cat,
      })
    );
  };

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h2
        style={{ marginLeft: "-2px", color: "#ff4500" }}
        className={styles.dynaCate}
      >
        Categories
      </h2>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => filteredproduct(cat)}
              className={`${category === cat ? styles.active : null} ${
                styles.spcl
              }`}
            >
              &#8250; {cat}
            </button>
          );
        })}
        {/* <button> All</button> */}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div className={styles.price}>
          <input
            type="range"
            value={price}
            min={minPrice}
            max={maxPrice}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <br />
        <button className="--btn --btn-danger" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
