import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { ShoppingBagIcon, MenuIcon, XIcon, WhatsappIcon } from './Icons.tsx';
import { WHATSAPP_NUMBER, LOGO_URL, INSTAGRAM_URL } from '../constants.ts';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setCurrentView, cartTotalQuantity } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNav = (view: any) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-black text-brand-white relative font-sans">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-black border-b border-brand-gray/50 backdrop-blur-md h-20 shadow-lg">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <button onClick={toggleMenu} className="p-2 -ml-2 hover:text-brand-orange transition-colors">
            {isMenuOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
          </button>

          <div 
            onClick={() => handleNav('HOME')}
            className="cursor-pointer select-none flex justify-center items-center h-full py-3"
          >
            <img src={LOGO_URL} alt="GUETO FYA" className="h-full object-contain max-h-14" />
          </div>

          <button 
            onClick={() => handleNav('CART')}
            className="p-2 -mr-2 relative hover:text-brand-orange transition-colors"
          >
            <ShoppingBagIcon className="w-7 h-7" />
            {cartTotalQuantity > 0 && (
              <span className="absolute top-1 right-0 bg-brand-orange text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border border-black">
                {cartTotalQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-black/98 pt-24 px-6 backdrop-blur-xl">
          <nav className="flex flex-col space-y-8 text-2xl font-bold uppercase tracking-wider font-display">
            <button onClick={() => handleNav('HOME')} className="text-left py-3 border-b border-brand-gray hover:text-brand-orange hover:pl-2 transition-all">Loja</button>
            <button onClick={() => handleNav('HOME')} className="text-left py-3 border-b border-brand-gray hover:text-brand-orange hover:pl-2 transition-all">Catálogo</button>
            <button onClick={() => handleNav('CART')} className="text-left py-3 border-b border-brand-gray hover:text-brand-orange hover:pl-2 transition-all">Carrinho ({cartTotalQuantity})</button>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-left py-3 border-b border-brand-gray hover:text-brand-orange hover:pl-2 transition-all flex items-center gap-2">
              Instagram
            </a>
            <button onClick={() => handleNav('ADMIN')} className="text-left py-3 border-b border-brand-gray hover:text-brand-orange text-brand-gray text-base mt-8">Área Restrita (Admin)</button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-24 container mx-auto px-4 max-w-4xl">
        {children}
      </main>

      {/* Floating WhatsApp */}
      <a 
        href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=Salve! Vim pelo site da GUETO FYA.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-40 flex items-center justify-center border-2 border-brand-black"
        aria-label="Fale conosco no WhatsApp"
      >
        <WhatsappIcon className="w-8 h-8" />
      </a>
    </div>
  );
};

export default Layout;