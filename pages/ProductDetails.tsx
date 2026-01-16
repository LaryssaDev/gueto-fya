import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import Carousel from '../components/Carousel.tsx';
import { ArrowLeftIcon } from '../components/Icons.tsx';

const ProductDetails: React.FC = () => {
  const { products, selectedProductId, setCurrentView, addToCart } = useStore();
  
  const product = products.find(p => p.id === selectedProductId);

  if (!product) {
    return (
      <div className="text-center py-20">
        <p>Produto não encontrado.</p>
        <button onClick={() => setCurrentView('HOME')} className="text-brand-orange mt-4">Voltar para Loja</button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <button 
        onClick={() => setCurrentView('HOME')}
        className="flex items-center text-brand-light mb-4 hover:text-brand-orange"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-1" />
        Voltar
      </button>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
        <div className="h-[450px] md:h-[500px] w-full bg-brand-gray rounded-lg overflow-hidden">
          <Carousel images={product.images} className="h-full w-full" />
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h2 className="text-3xl font-display font-bold">{product.name}</h2>
            <p className="text-2xl font-bold text-brand-orange mt-2">
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>

          <div className="bg-brand-dark p-4 rounded border border-brand-gray">
            <h4 className="text-sm text-brand-light uppercase mb-2">Descrição</h4>
            <p className="text-brand-light leading-relaxed">{product.description}</p>
          </div>

          <div className="bg-brand-dark p-4 rounded border border-brand-gray">
             <h4 className="text-sm text-brand-light uppercase mb-2">Tamanhos Disponíveis</h4>
             <div className="flex flex-wrap gap-2">
               {product.sizes.map(size => (
                 <span key={size} className="px-3 py-1 border border-brand-gray rounded text-sm text-brand-light">
                   {size}
                 </span>
               ))}
             </div>
             <p className="text-xs text-brand-orange mt-2">* Selecione o tamanho no carrinho</p>
          </div>

          <button 
            onClick={() => {
              addToCart(product);
              setCurrentView('CART');
            }}
            className="w-full bg-brand-white text-brand-black font-bold py-4 text-lg uppercase hover:bg-brand-orange hover:text-white transition-colors tracking-widest mt-auto shadow-lg shadow-brand-orange/20"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;