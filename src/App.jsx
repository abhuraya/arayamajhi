import * as React from 'react';
import Blog from './components/Blog.jsx';
import MoleculeList from './components/MoleculeList.jsx';

function App() {
  const [showMolecules, setShowMolecules] = React.useState(
    window.location.hash === '#molecules',
  );

  React.useEffect(() => {
    const syncPage = () => setShowMolecules(window.location.hash === '#molecules');
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  return showMolecules ? <MoleculeList /> : <Blog />;
}

export default App