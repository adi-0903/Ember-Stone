import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Philosophy from '../components/Philosophy';
import MenuTeaser from '../components/MenuTeaser';
import BarTeaser from '../components/BarTeaser';
import ChefFeature from '../components/ChefFeature';
import PrivateDining from '../components/PrivateDining';
import Testimonials from '../components/Testimonials';
import Reservations from '../components/Reservations';

export default function HomePage() {
  const navigate = useNavigate();

  const scrollToReservations = () => {
    const el = document.getElementById('reservations');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navigateToMenu = () => {
    navigate('/menu');
  };

  return (
    <main>
      {/* Section 2: Hero with Looping Video & Staggered Entrance */}
      <Hero
        onReserveClick={scrollToReservations}
        onViewMenuClick={navigateToMenu}
      />

      {/* Section 3: Philosophy 2-Column Split & Dry-Aged Searing Photography */}
      <Philosophy />

      {/* Section 4: Menu Teaser / Gateway into Dedicated Multipage Menu */}
      <MenuTeaser />

      {/* Section 5: The Hearth Bar & Cocktail Lounge Gateway */}
      <BarTeaser />

      {/* Section 6: Executive Chef Feature with Parallax Depth */}
      <ChefFeature />

      {/* Section 7: Private Dining & Bespoke Inquiries */}
      <PrivateDining />

      {/* Section 8: Auto-Advancing Critical Acclaim & Testimonials Slider */}
      <Testimonials />

      {/* Section 9: Glassmorphism Table Reservation Experience */}
      <Reservations />
    </main>
  );
}
