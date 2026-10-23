import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ResearchFocus } from './components/ResearchFocus';
import { Publications } from './components/Publications';
import { Projects } from './components/Projects';
import { CV } from './components/CV';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundLayer } from './background/BackgroundLayer';

/**
 * Page shell: skip link, sticky header, the network background layer,
 * and every page section in order.
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
          <CV />
          <ResearchFocus />
          <Publications />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
