import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// @ts-ignore
import debounce from 'lodash.debounce';
import { RootState } from '../redux/store';

type HeaderProps = {
  getSearchValue: (value: string) => void;
};

const Header: React.FC<HeaderProps> = ({ getSearchValue }) => {
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [burger, setBurger] = React.useState<boolean>(false);

  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const closeRef = React.useRef<HTMLLIElement>(null);
  const searchLogoRef = React.useRef<HTMLLIElement>(null);
  const burgerRef = React.useRef<HTMLButtonElement>(null);
  const genresRef = React.useRef<HTMLDivElement>(null);

  const favorites = useSelector((state: RootState) => state.favorites.data);
  const cart = useSelector((state: RootState) => state.cart.data);

  React.useEffect(() => {
    const handleClickOutsideSearch = (event: MouseEvent) => {
      if (
        ![searchInputRef.current, searchLogoRef.current].some(
          (el) => el && event.composedPath().includes(el),
        )
      ) {
        setIsSearching(false);
      }
    };

    document.body.addEventListener('click', handleClickOutsideSearch);

    const handleClickOutsideBurger = (event: MouseEvent) => {
      if (
        ![burgerRef.current, genresRef.current].some(
          (el) => el && event.composedPath().includes(el),
        )
      ) {
        setBurger(false);
      }
    };

    document.body.addEventListener('click', handleClickOutsideBurger);

    return () => {
      document.body.removeEventListener('click', handleClickOutsideSearch);
      document.body.removeEventListener('click', handleClickOutsideBurger);
    };
  }, []);

  const searchDebounce = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      getSearchValue(e.target.value);
    }, 500),
    [],
  );

  window.onscroll = () => {
    window.scrollY ? setScrolled(true) : setScrolled(false);
  };

  const clickSearch = () => {
    setIsSearching(!isSearching);
  };

  const favoritesValue = () => favorites?.length;
  const cartValue = () => cart?.length;

  const searching = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    searchDebounce(e);
  };

  return (
    <header
      style={
        scrolled ? { backgroundColor: '#060222', borderBottom: 'solid 1px #060222' } : undefined
      }
    >
      <div className="container">
        <div style={isSearching ? { width: '30px' } : undefined} className="header-left">
          <button
            className="button-burger"
            ref={burgerRef}
            onClick={() => {
              setBurger((prev) => !prev);
            }}
          >
            <img src="/img/logo/burger.svg" alt="menu" className="burger" />
          </button>
          <div
            className="burger-genres"
            ref={genresRef}
            style={{ display: burger ? 'block' : 'none', opacity: burger ? '1' : '0' }}
          >
            Скоро здесь появятся категории &#128521;
          </div>
        </div>
        {isSearching ? (
          <input
            autoFocus
            onChange={searching}
            className="search-input"
            type={'text'}
            value={searchValue}
            ref={searchInputRef}
            placeholder="Поиск..."
          />
        ) : (
          <div className="header-centr">
            <Link to="/">
              <h1>myBooks</h1>
            </Link>
          </div>
        )}
        <ul className="header-right">
          {searchValue && isSearching ? (
            <li
              onClick={() => {
                setSearchValue('');
                getSearchValue('');
                searchInputRef.current?.focus();
              }}
              className="close-search-logo"
              ref={closeRef}
            >
              <img src="/img/logo/close.svg" alt="close" />
            </li>
          ) : null}
          <li className="search-logo" onClick={clickSearch} ref={searchLogoRef}>
            <img src="/img/logo/search.svg" alt="search" />
          </li>
          <li className="auth-logo">
            <Link to="/auth">
              <img src="/img/logo/auth.svg" alt="sign-in" />
            </Link>
          </li>
          <li className="favorite-logo">
            <Link to="/favorites">
              <img src="/img/logo/favorite.svg" alt="favorite" />
              <span>{favoritesValue()}</span>
            </Link>
          </li>
          <li className="cart-logo">
            <Link to="/cart">
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
