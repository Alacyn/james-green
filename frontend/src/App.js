import React, { Component, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import TeamPage from "@/pages/TeamPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    if (this.state.err) {
      return (
        <div className="flex h-screen items-center justify-center bg-black font-sans text-white/60">
          Something went wrong.
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#111111",
              border: "1px solid rgba(177, 132, 99, 0.4)",
              color: "#F5F0EA",
              borderRadius: "0",
              letterSpacing: "0.04em",
            },
          }}
        />
        <TeamPage />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
