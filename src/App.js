import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import disableScroll from "disable-scroll";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import Detail from "./pages/Detail";
import { DETAIL_ROUTE, HOME_ROUTE, MY_LIST_ROUTE } from "./utils/config";
import MyList from "./pages/MyList";

// var lastScrollTop = 0;

function App(props) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isChangeColorNavbar, setIsChangeColorNavbar] = useState(false);
  // const [isOpenFooter, setIsOpenFooter] = useState(false)

  const toggle = () => {
    disableScroll[isOpenSidebar ? "off" : "on"]();
    setIsOpenSidebar(!isOpenSidebar);
  };

  const toggleSidebar = () => {
    disableScroll[isOpenSidebar ? "off" : "on"]();
    setIsOpenSidebar(!isOpenSidebar);
    if (window.location.pathname==="") {
      window.scrollTo(0, 0)
    }
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpenSidebar) {
        setIsOpenSidebar(false);
        // console.log("i resized");
      }
    };

    const handleScroll = () => {
      let scrollTop =
        document.scrollingElement.scrollTop ||
        window.scrollY ||
        window.pageYOffset;
      if (scrollTop >= 10) {
        // console.log("Bottom");
        setIsChangeColorNavbar(true);
      } else {
        // console.log("Top");
        setIsChangeColorNavbar(false);
      }

      // if (scrollTop >= lastScrollTop) {
      //   setIsOpenFooter(true)
      // } else {
      //   setIsOpenFooter(false)
      // }
      // lastScrollTop = scrollTop
    };

    window.addEventListener("resize", hideMenu);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", hideMenu);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <Navbar toggle={toggle} isChangeColor={isChangeColorNavbar} />
      <Sidebar toggle={toggle} toggleSidebar={toggleSidebar} isOpen={isOpenSidebar} />
      <Switch>
        <Route path={HOME_ROUTE} exact component={Home} />
        <Route path={DETAIL_ROUTE} component={Detail} />
        <Route path={MY_LIST_ROUTE} component={MyList} />
      </Switch>
    </>
  );
}

export default withRouter(App);
