import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlowPage from './pages/FlowPage';
import PreviewPage from './pages/PreviewPage';
import AppShell from './components/layout/AppShell';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flow/:sceneId" element={<FlowPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </AppShell>
  );
}
