import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ResearchFocus } from './components/ResearchFocus';
import { BackgroundLayer } from './background/BackgroundLayer';

/**
 * Page shell: skip link, sticky header, the network background layer,
 * and every section wrapper with its id and data-bg state. Section
 * content fills in across later stages.
 */
function App() {
  return (
    <div id="top" className="page">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <BackgroundLayer />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />

        <main id="main">
          <Hero />
          <ResearchFocus />
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
