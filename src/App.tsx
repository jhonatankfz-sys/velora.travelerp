import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { FeaturedDestinations } from './components/FeaturedDestinations';
import { TourCatalog } from './components/TourCatalog';
import { PromotionsSection } from './components/PromotionsSection';
import { PackageCalculator } from './components/PackageCalculator';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsAndTrust } from './components/ReviewsAndTrust';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TourModal } from './components/TourModal';
import { AdminModal } from './components/AdminModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';

import { getStoredConfig, saveConfig } from './data/config';
import type { VeloraConfig } from './data/config';
import { getStoredPromotions, savePromotions } from './data/promotions';
import { getStoredTours, saveTours } from './data/tours';
import type { Tour, TourCategory, Promotion } from './types';

export function App() {
  const [config, setConfig] = useState<VeloraConfig>(getStoredConfig);
  const [promotions, setPromotions] = useState<Promotion[]>(getStoredPromotions);
  const [tours, setTours] = useState<Tour[]>(getStoredTours);

  const [selectedCategory, setSelectedCategory] = useState<TourCategory | 'all'>('all');
  const [selectedTourForModal, setSelectedTourForModal] = useState<Tour | null>(null);
  const [calculatorPromoCode, setCalculatorPromoCode] = useState<string>('');
  const [destinationSearch, setDestinationSearch] = useState<string>('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleSaveConfig = (newConfig: VeloraConfig) => {
    setConfig(newConfig);
    saveConfig(newConfig);
  };

  const handleSavePromotions = (newPromos: Promotion[]) => {
    setPromotions(newPromos);
    savePromotions(newPromos);
  };

  const handleSaveTours = (newTours: Tour[]) => {
    setTours(newTours);
    saveTours(newTours);
  };

  const handleSelectDestinationTours = (destName: string) => {
    setDestinationSearch(destName);
    const element = document.getElementById('rutas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyPromoToCalculator = (code: string) => {
    setCalculatorPromoCode(code);
    const element = document.getElementById('cotizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    const element = document.getElementById('cotizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 text-velora-950 font-sans flex flex-col selection:bg-velora-500 selection:text-white">
      {/* 1. Navigation Bar */}
      <Navbar config={config} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 2. Hero 3D Section */}
        <Hero3D
          config={config}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenBooking={handleOpenBooking}
        />

        {/* 3. Featured Destinations */}
        <FeaturedDestinations
          onSelectDestinationTours={handleSelectDestinationTours}
        />

        {/* 4. Complete 50 Tours Catalog with 3D Tilt Cards */}
        <TourCatalog
          tours={tours}
          whatsappNumber={config.whatsappNumber}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onOpenModal={(tour) => setSelectedTourForModal(tour)}
          externalSearch={destinationSearch}
          onClearExternalSearch={() => setDestinationSearch('')}
        />

        {/* 5. Special Discounts & Promotions */}
        <PromotionsSection
          promotions={promotions}
          onApplyPromoToCalculator={handleApplyPromoToCalculator}
        />

        {/* 6. Interactive Package Calculator */}
        <PackageCalculator
          tours={tours}
          promotions={promotions}
          whatsappNumber={config.whatsappNumber}
          initialPromoCode={calculatorPromoCode}
        />

        {/* 7. About Us Section */}
        <AboutSection />

        {/* 8. Mosaic Visual Gallery */}
        <GallerySection />

        {/* 9. Reviews Transparency & FAQs */}
        <ReviewsAndTrust />

        {/* 10. Contact & Interactive Location */}
        <ContactSection config={config} />
      </main>

      {/* 11. Footer */}
      <Footer config={config} />

      {/* 12. Tour Detailed Modal */}
      <TourModal
        tour={selectedTourForModal}
        whatsappNumber={config.whatsappNumber}
        onClose={() => setSelectedTourForModal(null)}
      />

      {/* 13. Admin / Configuration Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        promotions={promotions}
        onSavePromotions={handleSavePromotions}
        tours={tours}
        onSaveTours={handleSaveTours}
      />

      {/* 14. Floating WhatsApp Quick Access Button */}
      <WhatsAppFloat
        whatsappNumber={config.whatsappNumber}
        whatsappDisplay={config.whatsappDisplay}
      />
    </div>
  );
}

export default App;
