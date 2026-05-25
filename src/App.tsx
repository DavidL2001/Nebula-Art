import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './styles/global.scss';

const GeneratorPage = lazy(() => import('./pages/GeneratorPage'));
const GalleryPage   = lazy(() => import('./pages/GalleryPage'));

function Loader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', color: 'var(--color-cyan)', fontFamily: 'var(--font-display)',
      fontSize: '14px', letterSpacing: '0.2em'
    }}>
      LOADING...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<GeneratorPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
