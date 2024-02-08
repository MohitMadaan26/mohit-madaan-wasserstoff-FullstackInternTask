import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/slice/authReducer";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        mm<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

  const fixNavBar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavBar);

  // Monitoring currently active User

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;

        // console.log(user);

        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);

          // console.log(uName);
          setDisplayName(uName);
          // console.log(u1);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          actions.SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        // User is signed out
        setDisplayName("");
        dispatch(actions.REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const navigate = useNavigate();
  const currentPathname = window.location.pathname;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    if (currentPathname !== "/") {
      toast.error("Move to home page for logout");
      return;
    }

    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart" style={{ color: "#ffbf00" }}>
        Cart
        <FaCartShopping size={20} />
        <p style={{ color: "#fff" }}> {cartTotalQuantity} </p>
      </Link>
    </span>
  );

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <IoClose size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>

            <li>
              <NavLink className={activeLink} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={activeLink} to="/contact">
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink className={activeLink} to="/login">
                  Login
                </NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <NavLink
                  style={{
                    borderBottom: "2px solid transparent",
                    color: "#ff7722",
                  }}
                  to="#"
                  className={displayName ? `${styles.active}` : ""}
                >
                  <FaUserCircle size={16} />
                  Hi, {displayName}
                </NavLink>
              </ShowOnLogin>

              {/* <NavLink className={activeLink} to="/register">
                Register
              </NavLink> */}
              <ShowOnLogin>
                <NavLink className={activeLink} to="/order-history">
                  My Order
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink onClick={logoutUser}>Logout</NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
