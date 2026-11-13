// src/App.jsx
import React, { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { Shell } from "./components/site/Shell";
import { DiscoverPage } from "./pages/DiscoverPage";
import { LanguageDetailPage } from "./pages/LanguageDetailPage";
import { ContributePage } from "./pages/ContributePage";
import { AuthPage } from "./pages/AuthPage";
import { NotebookPage } from "./pages/NotebookPage";
import { AboutPage } from "./pages/AboutPage";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { Toaster } from "sonner";

function AppContent() {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname || "/",
  );

  // Listen to popstate (back/forward navigation)
  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (to) => {
    if (to !== window.location.pathname + window.location.search) {
      window.history.pushState({}, "", to);
      setCurrentPath(to.split("?")[0]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Extract route & params
  const cleanPath = currentPath.split("?")[0];

  let page = null;
  if (cleanPath === "/" || cleanPath === "/languages") {
    page = <DiscoverPage onNavigate={navigate} />;
  } else if (cleanPath.startsWith("/languages/")) {
    const slug = cleanPath.replace("/languages/", "").replace(/\/$/, "");
    page = <LanguageDetailPage slug={slug} onNavigate={navigate} />;
  } else if (cleanPath === "/contribute") {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get("type") || "language";
    page = <ContributePage initialType={typeParam} onNavigate={navigate} />;
  } else if (cleanPath === "/signin") {
    const urlParams = new URLSearchParams(window.location.search);
    const nextUrl = urlParams.get("next") || "/contribute";
    page = (
      <AuthPage initialMode="signin" nextUrl={nextUrl} onNavigate={navigate} />
    );
  } else if (cleanPath === "/signup") {
    const urlParams = new URLSearchParams(window.location.search);
    const nextUrl = urlParams.get("next") || "/contribute";
    page = (
      <AuthPage initialMode="signup" nextUrl={nextUrl} onNavigate={navigate} />
    );
  } else if (cleanPath === "/me") {
    page = <NotebookPage onNavigate={navigate} />;
  } else if (cleanPath === "/about") {
    page = <AboutPage onNavigate={navigate} />;
  } else {
    page = (
      <div className="text-center py-20 space-y-4">
        <h2 className="font-display text-[32px] text-foreground">
          Specimen Not Found
        </h2>
        <p className="text-[15px] text-muted-foreground font-sans">
          The requested page does not exist in this field guide.
        </p>
        <button
          onClick={() => navigate("/")}
          className="font-mono text-[12px] uppercase tracking-wider text-primary underline"
        >
          Return to index
        </button>
      </div>
    );
  }

  return (
    <Shell currentRoute={cleanPath} onNavigate={navigate}>
      {page}
      <Toaster
        theme="light"
        toastOptions={{
          style: {
            background: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
          },
        }}
      />
    </Shell>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
