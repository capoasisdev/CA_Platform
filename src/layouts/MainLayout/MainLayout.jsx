import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar/Navbar';
import Footer from '../../components/shared/Footer/Footer';
import './MainLayout.css';

const MainLayout = () => (
  <div className="main-layout">
    <Navbar />
    <main className="main-layout__content" id="main-content">
      <Outlet />
    </main>
    <Footer />
    <ScrollRestoration />
  </div>
);

export default MainLayout;
