import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Plus, Sun, Moon } from "lucide-react";

export function Shell({ currentRoute = "/", onNavigate, children }) {
  const { user, signOut } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("fieldguide.theme") === "dark" ||
      document.documentElement.classList.contains("dark")
    );
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("fieldguide.theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("fieldguide.theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const navItems = [
    { label: "DISCOVER", route: "/" },
    { label: "CONTRIBUTE", route: "/contribute" },
    { label: "ABOUT", route: "/about" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* 64px Sticky Top Bar */}
      <header className="sticky top-0 z-40 h-16 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-[1120px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Serif Wordmark & Nav */}
          <div className="flex items-center gap-6 sm:gap-10">
            <button
              onClick={() => onNavigate("/")}
              className="font-display font-medium text-[17px] sm:text-[18px] text-foreground tracking-tight hover:opacity-80 transition-opacity cursor-pointer"
            >
              ANVESHA
            </button>

            {/* Nav links */}
            <nav className="flex items-center gap-5 sm:gap-7">
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.label}
                    onClick={() => onNavigate(item.route)}
                    className={`font-mono text-[12px] sm:text-[13px] uppercase tracking-wider transition-colors cursor-pointer relative py-1 ${
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Auth / Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <>
                {/* Initials Avatar */}
                <div
                  className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center font-mono text-[11px] font-medium text-foreground select-none"
                  title={user.name}
                >
                  {user.initials || "ME"}
                </div>

                {/* Notebook */}
                <button
                  onClick={() => onNavigate("/me")}
                  className={`font-mono text-[11px] sm:text-[12px] uppercase tracking-wider hidden md:inline transition-colors cursor-pointer ${
                    currentRoute === "/me"
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  NOTEBOOK
                </button>

                {/* + Add a language */}
                <button
                  onClick={() => onNavigate("/contribute?type=language")}
                  className="inline-flex items-center gap-1.5 bg-background border border-border hover:bg-card text-foreground font-mono text-[11px] sm:text-[12px] uppercase tracking-wider h-8 px-3 rounded-full transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add a language</span>
                </button>

                {/* Sign out */}
                <button
                  onClick={signOut}
                  className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate("/signin")}
                className="font-mono text-[12px] sm:text-[13px] uppercase tracking-wider text-foreground hover:text-primary transition-colors cursor-pointer py-1"
              >
                Sign in
              </button>
            )}

            {/* Theme Toggle (Dark / Light) */}
            <button
              type="button"
              onClick={toggleTheme}
              title={darkMode ? "Switch to light paper" : "Switch to dark ink"}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full border border-border bg-background hover:bg-card flex items-center justify-center text-foreground transition-colors cursor-pointer ml-1"
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1120px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {children}
      </main>

      {/* Editorial Colophon Footer */}
      <footer className="hairline-t py-12 mt-20 text-muted-foreground font-mono text-[12px]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-display font-medium text-foreground">
              The Language Field Guide
            </span>
            <span>·</span>
            <span>SPECIMEN COMPENDIUM</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate("/")}
              className="hover:text-foreground transition-colors"
            >
              INDEX
            </button>
            <button
              onClick={() => onNavigate("/contribute")}
              className="hover:text-foreground transition-colors"
            >
              CONTRIBUTE
            </button>
            <button
              onClick={() => onNavigate("/about")}
              className="hover:text-foreground transition-colors"
            >
              ABOUT
            </button>
            <span>·</span>
            <span>VER. 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
