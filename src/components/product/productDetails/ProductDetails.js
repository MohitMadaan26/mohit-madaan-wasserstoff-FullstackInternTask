import { Link, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import React, { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../../firebase/config";
// import { toast } from "react-toastify";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";


const ProductDetails = () => {
  const { id } = useParams();
  // console.log(id);
  const [product, setproduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filterReviews = data.filter((review) => review.productID === id);

  const cart = cartItems.find((cart) => cart.id === id);
  // console.log(cart);

  const isCartAdded = cartItems.findIndex((item) => item.id === id);
  // console.log(isCartAdded);

  // const getProduct = async () => {
  //   const docRef = doc(db, "products", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const obj = {
  //       id: id,
  //       ...docSnap.data(),
  //     };
  //     setproduct(obj);
  //   } else {
  //     toast.error("Product not found");
  //   }
  // };

  useEffect(() => {
    setproduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}></div>
      <h2>Product Details</h2>
      <div>
        <Link to="/#products">
        
          &larr; Back to Products
        
          </Link>

      </div>
      {product === null ? (
        <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
      ) : (
        <>
          <div className={styles.details}>
            <div className={styles.img}>
              <img src={product.imageURL} alt={product.name} />
              {/* <h1>Mohit</h1> */}
            </div>
            <div className={styles.content}>
              <h3>{product.name}</h3>
              <p className={styles.price}>{`$${product.price}`}</p>
              <p>{product.desc}</p>
              <p>
                <b>SKU</b> {product.id}
              </p>
              <p>
                <b>product.brand</b> {product.brand}
              </p>

              <div className={styles.count}>
                {isCartAdded < 0 ? null : (
                  <>
                    <button
                      className="--btn"
                      onClick={() => decreaseCart(product)}
                    >
                      -
                    </button>
                    <p>
                      <b>{cart.cartQuantity}</b>
                    </p>
                    <button
                      className="--btn"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
              <button
                className="--btn --btn-danger"
                onClick={() => addToCart(product)}
              >
                ADD TO CART
              </button>
            </div>
          </div>
          <Card cardClass={styles.card}>
            <h3>Product Reviews</h3>
            <div>
              {filterReviews.length === 0 ? (
                <p>There are no reviews for this product yet.</p>
              ) : (
                <>
                  {filterReviews.map((revieww, index) => {
                    const { rate, review, reviewDate, userName } = revieww;

                    return (
                      <div key={index} className={styles.review}>
                        <StarsRating value={rate} />
                        <p>{review}</p>
                        <span>
                          <b>{reviewDate}</b>
                        </span>
                        <br />
                        <span>
                          <b>By : {userName}</b>
                        </span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </Card>
        </>
      )}
    </section>
  );
};

export default ProductDetails;
