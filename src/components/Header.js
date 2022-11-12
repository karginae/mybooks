import React from "react";

function Header(props) {

  const [scrolled, setScrolled] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  window.onscroll = () => {
    window.scrollY ? setScrolled(true) : setScrolled(null);
  };

  const clickSearch = () => {
    setIsSearching(!isSearching);
  };

  const searching = (e) => {
    setSearchValue(e.target.value);
    props.pars(e.target.value);
  };

  return (
    <header style={scrolled && {backgroundColor: '#060222', borderBottom: 'solid 1px #060222'}}>
      <div className="container">
        <div style={isSearching ? {width: '30px'} : null} className="header-left">
          <img src="/img/logo/burger.svg" alt="menu" className="burger" />         
        </div>
        {isSearching ? <input onChange={searching} className="search-input" type={'text'} value={searchValue} placeholder="Поиск..."></input> : <div className="header-centr"><h1>myBooks</h1></div>}
        <ul className="header-right">
          {searchValue ? <li onClick={() => {setSearchValue(''); props.pars('');}} className="close-search-logo"><img src="/img/logo/close.svg" alt="close" /></li> : null}
          <li className="search-logo" onClick={clickSearch}>
            <img src="/img/logo/search.svg" alt="search" />
          </li>
          <li className="favorite-logo">
            <img src="/img/logo/favorite.svg" alt="favorite" />
            <span>{props.favoritesValue}</span>
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