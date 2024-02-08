import { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCT,
  selectProducts,
} from "../../../redux/slice/productReducer";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { FILTER_BY_SEARCH, selectFilterProducts } from "../../../redux/slice/filterReducer"
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";


const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [search, setSearch] = useState("");
  const products = useSelector(selectProducts);
  const filterProducts = useSelector(selectFilterProducts)
  // const products = [...data];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const [imageLoaded, setImageLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCT({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products: products,
        search: search,
      })
    );
  }, [dispatch, products, search]);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Cancelled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const getProducts = () => {
  //   setIsLoading(true);
  //   try {
  //     const productRef = collection(db, "products");
  //     const q = query(productRef, orderBy("createdAt", "desc"));

  //     onSnapshot(q, (Snapshot) => {
  //       // console.log(Snapshot);
  //       const allProducts = Snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       // console.log(allProducts);
  //       setproducts(allProducts);
  //       setIsLoading(false);
  //       dispatch(
  //         STORE_PRODUCT({
  //           products: allProducts,
  //         })
  //       );
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        <div className={styles.search}>
          <p>
            <b>{filterProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)}/>

        </div>
        {products.length === 0 ? (
          <p>No Product Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            {currentProducts.map((product, index) => {
              const { id, name, price, imageURL, category } = product;

              return (
                <tbody>
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{
                          width: "100px",
                          opacity: imageLoaded ? 1 : 0, // Initial opacity
                        }}
                        onLoad={() => setImageLoaded(true)}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-products/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
         <Pagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filterProducts.length}
      />
      </div>
    </>
  );
};

export default ViewProducts;
