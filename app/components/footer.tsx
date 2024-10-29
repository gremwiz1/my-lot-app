import React from "react";
import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.brand}>
        <img
              src="/images/brand.png"
              alt="Logo"
            />
        </div>
      <div className={styles.footerMiddle}>
        <div className={styles.left}>   
            <a href="#">Правила аукциона</a>
            <a href="#">Импорт лотов</a>
        </div>
        <div className={styles.left}>
            <a href="#">Интернет-магазин масштабных моделей</a>
            <a href="#">Купить рекламу на scalebay.ru</a>
        </div>
        <div className={styles.support}>
          <p>Служба поддержки пользователей</p>
          <a href="mailto:support@scalebay.ru">
            support@scalebay.ru
          </a>
        </div>

        <div className={styles.right}>
          <div className={styles.socialIcons}>
            <img
              src="/images/logotip.png"
              alt="Logo RC Forum"
              className={styles.logotip}
            />
            <img src="/images/vk.png" alt="VK" className={styles.socialIcon} />
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
      <img
              src="/images/metrika.png"
              alt="Metrika"
              className={styles.metrika}
            />
      <p className={styles.copy}>Сделано в Fortress Hill</p>
      </div>
    </footer>
  );
};

export default Footer;
