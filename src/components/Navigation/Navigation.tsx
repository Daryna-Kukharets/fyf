import { useEffect, useState } from "react";

type Props = {
  classForList: string;
  classForLink: string;
};

const HEADER_HEIGHT = 80; // Висота хедера в пікселях — змінюй під свій хедер

const scrollToWithOffset = (id: string, offset: number) => {
  const element = document.getElementById(id);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
};

export const Navigation: React.FC<Props> = ({ classForList, classForLink }) => {
  const [active, setActive] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || "home";
  });
  

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
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const id = visible.target.id;

          setActive(id);

          if (id === "home") {
            history.replaceState(null, "", basePath || "/");
          } else {
            history.replaceState(null, "", `${basePath || "/"}#${id}`);
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

    if (id === "home") {
      history.replaceState(null, "", basePath || "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      history.replaceState(null, "", `${basePath || "/"}#${id}`);
      scrollToWithOffset(id, HEADER_HEIGHT);
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
            <a
              href={id === "home" ? "/" : `#${id}`}
              className={`${classForLink} nav__link ${
                active === id ? "nav__link--active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(id);
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
