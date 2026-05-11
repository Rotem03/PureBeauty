import { useState } from "react";
import { BottomNav } from "./components/BottomNav/BottomNav";
import { PageLanding } from "./components/Pages/Landing/PageLanding";
import { PageScanner } from "./components/Pages/Scanner/PageScanner";
import { PageResults } from "./components/Pages/Results/PageResults";
import { PageShop } from "./components/Pages/Shop/PageShop";
import { PageVanity } from "./components/Pages/Vanity/PageVanity";
import { PageTutorials } from "./components/Pages/Tutorials/PageTutorials";
import { theme } from "./constants/theme";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [prevPage, setPrevPage] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (to) => {
    if (to === page) return;
    setTransitioning(true);
    setTimeout(() => {
      setPrevPage(page);
      setPage(to);
      setTransitioning(false);
      window.scrollTo(0, 0);
    }, 180);
  };

  // Map page id → component
  const PAGES = {
    home: <PageLanding onNav={navigate} />,
    scan: <PageScanner onNav={navigate} />,
    results: <PageResults onNav={navigate} />,
    shop: <PageShop />,
    tutorials: <PageTutorials />,
    vanity: <PageVanity />,
  };

  return (
    <>
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateX(20px)" : "translateX(0)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
          minHeight: "100vh",
          background: theme.bg,
        }}
      >
        {PAGES[page] || PAGES.home}
      </div>

      <BottomNav page={page} onNav={navigate} />
    </>
  );
}
