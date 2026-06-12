import { Link } from "react-router-dom";

export default function Sidebar() {
  const categories = [
    { name: "🏠 Home", path: "/" },
    { name: "⭐ Popular", path: "/search?q=popular" },
    { name: "🚗 Racing", path: "/search?cat=Racing" },
    { name: "🧩 Puzzle", path: "/search?cat=Puzzle" },
    { name: "🏃 Action", path: "/search?cat=Action" },
    { name: "👑 Adventure", path: "/search?cat=Adventure" },
    { name: "🎨 Coloring", path: "/search?cat=Coloring" }
  ];

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Categories</h3>
      <div className="sidebar-links">
        {categories.map(c => (
          <Link to={c.path} key={c.name} className="sidebar-link">
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}