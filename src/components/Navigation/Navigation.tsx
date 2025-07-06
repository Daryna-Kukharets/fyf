import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  classForList: string;
  classForLink: string;
  onLinkClick?: () => void;
};

const HEADER_HEIGHT = 80; // Висота хедера в пікселях — змінюй під свій хедер

const scrollToWithOffset = (id: string, offset: number) => {
  const element = document.getElementById(id);
  if (!element) return;

  const elementPosition =
    element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
};

export const Navigation: React.FC<Props> = ({
  classForList,
  classForLink,
  onLinkClick,
}) => {
  const [active, setActive] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || "home";
  });

  const location = useLocation();

  const links = [
    { id: "home", label: "Головна" },
    { id: "aboutUs", label: "Про нас" },
    { id: "activities", label: "Активності" },
    { id: "reviews", label: "Відгуки" },
  ];

  const basePath = window.location.pathname.endsWith("/")
    ? window.location.pathname
    : window.location.pathname + "/";

  useEffect(() => {
    // Якщо є хеш — прокручуємо до елемента при завантаженні
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => scrollToWithOffset(hash, HEADER_HEIGHT), 0);
    }
  }, [location]);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        const id = visible.target.id;
        setActive(id);

        const search = window.location.search;

        if (id === "home") {
          history.replaceState(null, "", `${basePath || "/"}${search}`);
        } else {
          history.replaceState(null, "", `${basePath || "/"}${search}#${id}`);
        }
      }
    },
    {
      rootMargin: "0px 0px -30% 0px",
      threshold: 0.4,
    }
  );

  const targets = links
    .map((link) => document.getElementById(link.id))
    .filter(Boolean) as HTMLElement[];

  targets.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);

const handleClick = (id: string) => {
  setActive(id);

  const search = window.location.search;

  if (id === "home") {
    history.replaceState(null, "", `${basePath || "/"}${search}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    history.replaceState(null, "", `${basePath || "/"}${search}#${id}`);
    scrollToWithOffset(id, HEADER_HEIGHT);
  }

  if (onLinkClick) {
    onLinkClick();
  }
};

  return (
    <nav className="nav">
      <ul className={`${classForList} nav__list`}>
        {classForList === "nav__list--footer" && (
          <p className="nav__link nav__link--footer nav__link--bold">
            Навігація
          </p>
        )}
        {links.map(({ id, label }) => (
          <li className="nav__item" key={id || "home"}>
            <Link
              to={id === "home" ? "/" :  `/${location.search}#${id}`}
              className={`${classForLink} nav__link ${
                active === id ? "nav__link--active" : ""
              }`}
              onClick={() => handleClick(id)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
