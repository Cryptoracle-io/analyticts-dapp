import React from "react";
import { Link } from "react-router-dom";


//import images
import logoSm from "../assets/images/favicon.png";
import logoDark from "../assets/images/favicon.png";
import logoLight from "../assets/images/favicon.png";

//import Components

import LightDark from "../Components/Common/LightDark";
import Login from "../Components/Common/Login3";
import FullScreenDropdown from '../Components/Common/FullScreenDropdown';
import ProfileDropdown from '../Components/Common/ProfileDropdown';
import ModalCTest from "../Components/Common/SignUpModal/ModalCTest";
import ModalFeedback from "../Components/Common/ModalFeedback";
const Header = ({ onChangeLayoutMode, layoutModeType, leftSidebarType, headerClass }) => {


  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;

    if (windowSize > 767)
      document.querySelector(".hamburger-icon").classList.toggle("open");

    //For collapse horizontal menu
    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.contains("menu")
        ? document.body.classList.remove("menu")
        : document.body.classList.add("menu");
    }

    //For collapse vertical menu
    if (document.documentElement.getAttribute("data-layout") === "vertical") {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "sm"
          ? document.documentElement.setAttribute("data-sidebar-size", "")
          : document.documentElement.setAttribute("data-sidebar-size", "sm");
      } else if (windowSize > 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "lg"
          ? document.documentElement.setAttribute("data-sidebar-size", "sm")
          : document.documentElement.setAttribute("data-sidebar-size", "lg");
      } else if (windowSize <= 767) {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }

    //Two column menu
    if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
      document.body.classList.contains("twocolumn-panel")
        ? document.body.classList.remove("twocolumn-panel")
        : document.body.classList.add("twocolumn-panel");
    }

  };
  return (
    <React.Fragment>
      <header id="page-topbar" className={headerClass}>
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box horizontal-logo">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoDark} alt="" height="33" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoLight} alt="" height="33" />
                  </span>
                </Link>
              </div>

              <button
                onClick={toogleMenuBtn}
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>

            <div className="d-flex align-items-center">

              {/* FullScreenDropdown */}
              <div className="text-sm-end mt-1 mt-sm-1 me-2">
                <FullScreenDropdown />
              </div>
              {/* Dark/Light Mode set */}
              <div className="text-sm-end mt-1 mt-sm-1 me-2">
                <LightDark
                  layoutMode={layoutModeType}
                  leftSidebarType={leftSidebarType}
                  onChangeLayoutMode={onChangeLayoutMode}
                /></div>
              <div className="text-sm-end mt-1 mt-sm-1 me-3">
                <ul className="list-inline mb-0 footer-social-link ">
                  {/* <li className="list-inline-item px-2">
                    <a href="https://discord.gg/dzXAdqwrCU" target="_blank" rel="noreferrer noopener" className="avatar-xs d-block">
                      <div className="social-media-size avatar-title rounded-circle">
                        <i className="ri-discord-fill"></i>
                      </div>
                    </a>
                  </li> */}
                  <li className="list-inline-item px-1">
                  <ModalFeedback/>
                  </li>
                  
                  <li className="list-inline-item px-2">
                    <a href="https://twitter.com/Cryptoracleio" target="_blank" rel="noreferrer noopener" className="avatar-xs d-block">
                      <div className="social-media-size avatar-title rounded-circle">
                        <i className="ri-twitter-fill"></i>
                      </div>
                    </a>
                  </li>

                </ul>
              </div>
              <div>
                <Login />
              </div>
              {/* <div>
                <ModalCTest />
              </div> */}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
