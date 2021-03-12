import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { logOut } from "../actions/auth";

//import style
import "./styles/nav.css";

const Navbar: React.FC = () => {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();

  const openNav = () => setNav(!nav);

  useEffect(() => {
    if (nav) {
      document.getElementById("myNav")!.style.width = "100%";
    } else {
      document.getElementById("myNav")!.style.width = "0%";
    }
  }, [nav]);

  const menu = (
    <Menu>
      <Menu.Item>Clear Data</Menu.Item>
      <Menu.Item>Change Password</Menu.Item>
      <Menu.Item onClick={() => dispatch(logOut)}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div id="myNav" className="overlay">
        <div className="overlay-content">
          <Link to="/main">Home</Link>
          <Link to="/all">Searched Results</Link>
          <Link to="/all">Favourites</Link>
          <Link to="/faq">Faq</Link>
          <br />
          <Button onClick={() => dispatch(logOut())} className="btn">
            LOGOUT
          </Button>
        </div>
      </div>
      <div className="nav">
        <div className="logo-menu">
          <h3 className="logoName">CLOSESEARCH</h3>
        </div>
        <div className="nav-menu">
          <li>
            <NavLink className="link" to="/main" activeClassName="selected">
              HOME
            </NavLink>
          </li>

          <li>
            <NavLink className="link" to="/all" activeClassName="selected">
              SEARCHED RESULTS
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/faq" activeClassName="selected">
              FAQ
            </NavLink>
          </li>
          <li>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button>
                Joseph <DownOutlined />
              </Button>
            </Dropdown>
          </li>
          <li className="menu-icon" onClick={openNav}>
            {nav ? <CloseOutlined /> : <MenuOutlined />}
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
