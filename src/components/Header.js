import React from "react";

function Header() {

  const [scrolled, setScrolled] = React.useState(null);

  window.onscroll = () => {
    window.scrollY ? setScrolled(true) : setScrolled(null);
  }

  return (
    <header style={scrolled && {backgroundColor: '#060222', borderBottom: 'solid 1px #060222'}}>
      <div className="container">
        <div className="header-left">
          <img src="/img/logo/burger.svg" alt="menu" className="burger" />         
        </div>
        <div className="header-centr"><h1>myBooks</h1></div>
        <ul className="header-right">
          <li className="search-logo">
            <img src="/img/logo/search.svg" alt="search" />
          </li>
          <li className="favorite-logo">
            <img src="/img/logo/favorite.svg" alt="favorite" />
            <span>1</span>
          </li>
          <li className="cart-logo">
            <img src="/img/logo/cart.svg" alt="cart" />
            <span>2</span>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;