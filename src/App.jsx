import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import StorageModule from './modules/storage/StorageModule';
import ContainmentModule from './modules/containment/ContainmentModule';
import FusionLabModule from './modules/fusion/FusionLabModule';
import StoreModule from './modules/store/StoreModule';
import ResearchModule from './modules/research/ResearchModule';
import BattleModule from './modules/battle/BattleModule';
import './styles/global.css';
import './styles/pages.css';

// Placeholder components for navigation routes
const Research = () => <div className="page-container"><h1>Research Tree</h1><p>Research tree content will be displayed here</p></div>;
const Battle = () => <div className="page-container"><h1>Battle Module</h1><p>Battle content will be displayed here</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="storage" element={<StorageModule />} />
          <Route path="fusion" element={<FusionLabModule />} />
          <Route path="containment" element={<ContainmentModule />} />
          <Route path="research" element={<ResearchModule />} />
          <Route path="battle" element={<BattleModule />} />
          <Route path="store" element={<StoreModule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
