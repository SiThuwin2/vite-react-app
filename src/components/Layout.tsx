import { Link, Outlet } from "react-router";
import { useTheme } from "../context/ThemeContext";

function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <nav className="border-b border-b-zinc-200 dark:border-zinc-800 p-4 max-w-4xl mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-xl font-bold tracking-tight">
          CardNotes
        </Link>
        <div className="flex gap-4 items-center">
          <Link to={"/new"} className="text-sm font-medium hover:text-blue-500">
            New Note
          </Link>
          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-md"
          >
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
