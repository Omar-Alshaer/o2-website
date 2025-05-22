// Define the main App component
const App = () => {
  // Use useEffect to run GSAP animations after the component mounts
  React.useEffect(() => {
    // Animate the header
    gsap.fromTo(
      ".header",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Animate the nav links
    gsap.fromTo(
      ".nav-link",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );

    // Animate the main section
    gsap.fromTo(
      ".main-section",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="header text-center py-6">
        <h1 className="text-4xl font-bold">O2 - Wear the Vibe, Own the Scene</h1>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center space-x-6 py-4">
        <a href="#" className="nav-link text-lg hover:text-gray-400">Home</a>
        <a href="#" className="nav-link text-lg hover:text-gray-400">Shop</a>
        <a href="#" className="nav-link text-lg hover:text-gray-400">Cart</a>
      </nav>

      {/* Main Section */}
      <section className="main-section text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">Welcome to O2</h2>
        <p className="text-lg max-w-md mx-auto">
          Discover the latest trends in fashion and make a statement with our curated collections.
        </p>
      </section>
    </div>
  );
};

// Render the App component to the root element
ReactDOM.render(<App />, document.getElementById('root'));
