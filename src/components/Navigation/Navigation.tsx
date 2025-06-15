type Props = {
  classForList: string;
  classForLink: string;
};

export const Navigation: React.FC<Props> = ({ classForList, classForLink }) => (
  <nav className="nav">
    <ul className={`${classForList} nav__list`}>
      {classForList === "nav__list--footer" && (
        <p className="nav__link nav__link--footer nav__link--bold">Навігація</p>
      )}
      <li className="nav__item">
        <a href="#" className={`${classForLink} nav__link`}>
          Головна
        </a>
      </li>
      <li className="nav__item">
        <a href="#aboutUs" className={`${classForLink} nav__link`}>
          Про нас
        </a>
      </li>
      <li className="nav__item">
        <a href="#activities" className={`${classForLink} nav__link`}>
          Активності
        </a>
      </li>
      <li className="nav__item">
        <a href="#reviews" className={`${classForLink} nav__link`}>
          Відгуки
        </a>
      </li>
    </ul>
  </nav>
);
