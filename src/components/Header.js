import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header(props) {
  
  const [scrolled, setScrolled] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const favorites = useSelector((state) => state.favorites.data);
  const cart = useSelector((state) => state.cart.data);

  window.onscroll = () => {
    window.scrollY ? setScrolled(true) : setScrolled(null);
  };

  const clickSearch = () => {
    setIsSearching(!isSearching);
  };

  const favoritesValue = () => (favorites?.length);
  const cartValue = () => (cart?.length);

  const searching = (e) => {
    setSearchValue(e.target.value);
    props.getSearchValue(e.target.value);
  };

  return (
    <header style={scrolled && {backgroundColor: '#060222', borderBottom: 'solid 1px #060222'}}>
      <div className="container">
        <div style={isSearching ? {width: '30px'} : null} className="header-left">
          <img src="/img/logo/burger.svg" alt="menu" className="burger" />         
        </div>
        {isSearching ? <input onChange={searching} className="search-input" type={'text'} value={searchValue} placeholder="Поиск..."></input> : <div className="header-centr"><Link to='/'><h1>myBooks</h1></Link></div>}
        <ul className="header-right">
          {searchValue ? <li onClick={() => {setSearchValue(''); props.getSearchValue('');}} className="close-search-logo"><img src="/img/logo/close.svg" alt="close" /></li> : null}
          <li className="search-logo" onClick={clickSearch}>
            <img src="/img/logo/search.svg" alt="search" />
          </li>
          <li className="auth-logo">
            <Link to='/auth'>
              <img src="/img/logo/auth.svg" alt="sign-in" />
            </Link>
          </li>
          <li className="favorite-logo">
            <Link to='/favorites'>
              <img src="/img/logo/favorite.svg" alt="favorite" />
              <span>{favoritesValue()}</span>
            </Link>
          </li>
          <li className="cart-logo">
            <Link to='/cart'>
              <img src="/img/logo/cart.svg" alt="cart" />
              <span>{cartValue()}</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;