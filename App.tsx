import React from 'react';
import { Chatbot } from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="bg-brand-950 text-white py-4 px-6 sm:px-12 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-brand-500 rounded flex items-center justify-center font-bold text-xl">E</div>
          <span className="text-xl font-bold tracking-tight">Elite Mobile Tint</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
          <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
        </div>
        <button className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm">
          Get a Quote
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative bg-gray-900 text-white py-24 sm:py-32 px-6 sm:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-gray-900 to-black opacity-90 z-0"></div>
          <div className="absolute inset-0 opacity-20 z-0" style={{ backgroundImage: 'url("https://picsum.photos/1920/1080?grayscale&blur=2")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Premium Window Tinting, <br className="hidden sm:block" />
              <span className="text-brand-400">Delivered to Your Door.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the ultimate convenience with our 100% mobile service. We bring top-tier ceramic and carbon films directly to your home or office.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="w-full sm:w-auto bg-brand-500 hover:bg-brand-400 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all transform hover:-translate-y-1 shadow-lg">
                Book Appointment
              </button>
              <button className="w-full sm:w-auto bg-transparent border-2 border-gray-500 hover:border-white text-white font-semibold px-8 py-4 rounded-full text-lg transition-all">
                View Film Options
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 sm:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mobile Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Professional installation wherever you are. We specialize in high-quality films that provide superior heat rejection and UV protection.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Automotive Tint</h3>
                <p className="text-gray-600 mb-6">Enhance your vehicle's look, protect the interior, and stay cool. We offer standard, carbon, and premium ceramic films.</p>
                <a href="#" className="text-brand-600 font-semibold hover:text-brand-800 flex items-center">
                  Learn more <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>

              {/* Service Card 2 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Residential Tint</h3>
                <p className="text-gray-600 mb-6">Reduce energy bills, stop furniture fading, and add privacy to your home without losing your view.</p>
                <a href="#" className="text-brand-600 font-semibold hover:text-brand-800 flex items-center">
                  Learn more <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>

              {/* Service Card 3 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Commercial Tint</h3>
                <p className="text-gray-600 mb-6">Improve workplace comfort, reduce glare on screens, and lower cooling costs for your business.</p>
                <a href="#" className="text-brand-600 font-semibold hover:text-brand-800 flex items-center">
                  Learn more <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Elite Mobile Tint. All rights reserved.</p>
        <p className="mt-2">Serving the greater metro area. Licensed and Insured.</p>
      </footer>

      {/* The Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default App;
