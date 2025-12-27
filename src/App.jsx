import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Eager load Home for instant first paint
import Home from './pages/Home';

// Lazy load all other pages for code splitting
const AirLogistics = lazy(() => import('./pages/AirLogistics'));
const SeaFreight = lazy(() => import('./pages/SeaFreight'));
const RoadFreight = lazy(() => import('./pages/RoadFreight'));
const CustomsClearance = lazy(() => import('./pages/CustomsClearance'));
const ProjectOversizeShipments = lazy(() => import('./pages/ProjectOversizeShipments'));
const EventLogistics = lazy(() => import('./pages/EventLogistics'));
const FreightInsurance = lazy(() => import('./pages/FreightInsurance'));
const FoodStorage = lazy(() => import('./pages/FoodStorage'));
const Warehousing = lazy(() => import('./pages/Warehousing'));
const ConsolidationService = lazy(() => import('./pages/ConsolidationService'));
const Contact = lazy(() => import('./pages/Contact'));
const WhyChooseOFL = lazy(() => import('./pages/WhyChooseOFL'));
const Tracker = lazy(() => import('./pages/Tracker'));
const AirportCodeFinder = lazy(() => import('./pages/AirportCodeFinder'));
const CountryCodeFinder = lazy(() => import('./pages/CountryCodeFinder'));
const Incoterms = lazy(() => import('./pages/Incoterms'));

// Minimal loading spinner
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/air-logistics" element={<AirLogistics />} />
            <Route path="/sea-freight" element={<SeaFreight />} />
            <Route path="/road-freight" element={<RoadFreight />} />
            <Route path="/customs-clearance" element={<CustomsClearance />} />
            <Route path="/project-oversize-shipments" element={<ProjectOversizeShipments />} />
            <Route path="/event-logistics" element={<EventLogistics />} />
            <Route path="/freight-insurance" element={<FreightInsurance />} />
            <Route path="/food-storage" element={<FoodStorage />} />
            <Route path="/warehousing" element={<Warehousing />} />
            <Route path="/consolidation-service" element={<ConsolidationService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/why-choose-ofl" element={<WhyChooseOFL />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/airport-code-finder" element={<AirportCodeFinder />} />
            <Route path="/country-code-finder" element={<CountryCodeFinder />} />
            <Route path="/incoterms" element={<Incoterms />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
