import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCT,
  selectProducts,
} from "../../redux/slice/productReducer";
import spinnerImg from "../../assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";

const Product = ({id}) => {
  const { data, isLoading } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  // const products = [...data];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCT({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <>
      <section id={id}>
        <div className={`container ${styles.product}`}>
          <aside
            className={
              showFilter
                ? `${styles.filter} ${styles.show}`
                : `${styles.filter}`
            }
          >
            {isLoading ? null : (
              <div className={styles.asidee}>
                <ProductFilter />
              </div>
            )}
          </aside>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <div className={styles.content}>
            {isLoading ? (
              <img
                src={spinnerImg}
                alt="Loading..."
                style={{ width: "50px" }}
                className="--center-all"
              />
            ) : (
              <ProductList id={id} products={products} />
              
            )}
            <div className={styles.icon} onClick={toggleFilter}>
              <FaCogs size={20} color="orangered" />
              <p>
                <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
