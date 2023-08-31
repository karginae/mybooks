import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-left">
          <span>&#169; 2023 FlawedCrystal</span>
        </div>
        <ul className="footer-right">
          <li>
            <a href="https://t.me/whykargin" target="_blank" rel="noreferrer">
              <img src="/img/logo/telegram.svg" alt="Telegram" className="logo-telegram" />
            </a>
          </li>
          <li>
            <a href="https://vk.com/wyliekaes" target="_blank" rel="noreferrer">
              <img src="/img/logo/vk.svg" alt="VK" className="logo-vk" />
            </a>
          </li>
          <li>
            <a href="mailto:cargin.art@yandex.ru">
              <img src="/img/logo/email.svg" alt="E-mail" className="logo-email" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
