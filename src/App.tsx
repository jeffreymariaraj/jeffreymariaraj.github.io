import { Nav } from './components/Nav';

/**
 * Page shell for Stage 2: skip link, sticky header, and every section
 * wrapper with its id and data-bg state. Section content lands in
 * later stages; NetworkBackground lands in Stage 3.
 */
function App() {
  return (
    <div id="top" className="page">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div
        aria-hidden="true"
        style={{
          position: 'sticky',
          top: 0,
          height: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {/* NetworkBackground mounts here in Stage 3 */}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />

        <main id="main">
          <section id="hero" data-bg="0" />
          <section id="research" data-bg="1" />
          <section id="publications" data-bg="2" />
          <section id="projects" data-bg="2" />
          <section id="method" data-bg="2" />
          <section id="cv" data-bg="2" />
          <section id="contact" data-bg="3" />
        </main>
      </div>
    </div>
  );
}

export default App;
