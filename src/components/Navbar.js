//import { Link } from "react-router-dom";
//import Notifications from "./Notifications";

function Navbar() {
  //const user = JSON.parse(localStorage.getItem("user")); // eslint-disable-line no-unused-vars

  //const logout = () => { // eslint-disable-line no-unused-vars
    localStorage.clear();
    window.location.href = "/";
  //};

  return (
    <nav >  
    </nav>
  );
}

export default Navbar;