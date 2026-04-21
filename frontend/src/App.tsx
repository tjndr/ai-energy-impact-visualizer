import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Dashboard } from './pages/Dashboard';
import { ModelDetail } from './pages/ModelDetail';
import { RegionDetail } from './pages/RegionDetail';
import { ResearchHubPage } from './pages/ResearchHub';
import { ScenarioBuilder } from './components/ScenarioBuilder';
import { ReportViewer } from './components/ReportViewer';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <nav>
          <Link to="/">Dashboard</Link> | <Link to="/models">Models</Link> | <Link to="/regions">Regions</Link> | <Link to="/research">Research</Link>
        </nav>
        <Routes>
          <Route path="/" element={<><Dashboard /><ScenarioBuilder /><ReportViewer /></>} />
          <Route path="/models" element={<ModelDetail />} />
          <Route path="/regions" element={<RegionDetail />} />
          <Route path="/research" element={<ResearchHubPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
