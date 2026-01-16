import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext.tsx';
import Layout from './components/Layout.tsx';
import Shop from './pages/Shop.tsx';
import ProductDetails from './pages/ProductDetails.tsx';
import Cart from './pages/Cart.tsx';
import Checkout from './pages/Checkout.tsx';
import Admin from './pages/Admin.tsx';

const Main: React.FC = () => {
  const { currentView } = useStore();

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Shop />;
      case 'PRODUCT_DETAILS':
        return <ProductDetails />;
      case 'CART':
        return <Cart />;
      case 'CHECKOUT':
        return <Checkout />;
      case 'ADMIN':
        return <Admin />;
      default:
        return <Shop />;
    }
  };

  return (
    <Layout>
      {renderView()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
};

export default App;