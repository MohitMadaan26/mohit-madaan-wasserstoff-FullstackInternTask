import { useSelector } from "react-redux";
import { selectIsLoggedIN } from "../../redux/slice/authReducer";

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIN);

  if (isLoggedIn) {
    return children;
  } else {
    return null;
  }
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIN);

  if (!isLoggedIn) {
    return children;
  } else {
    return null;
  }
};

export default ShowOnLogin;
