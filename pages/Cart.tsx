import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { TrashIcon, ArrowLeftIcon } from '../components/Icons.tsx';

const Cart: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartItemSize, 
    cartSubtotal, 
    cartDiscount, 
    cartTotal,
    setCurrentView,
    cartTotalQuantity 
  } = useStore();

  // Check if all items have a size selected
  const isReadyToCheckout = cart.length > 0 && cart.every(item => item.selectedSize && item.selectedSize !== '');

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
        <p className="text-xl text-brand-light">Seu carrinho está vazio.</p>
        <button 
          onClick={() => setCurrentView('HOME')}
          className="bg-brand-orange text-white px-8 py-3 font-bold uppercase tracking-wider"
        >
          Ver Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center justify-between">
         <button 
          onClick={() => setCurrentView('HOME')}
          className="flex items-center text-brand-light hover:text-brand-orange"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-1" />
          Continuar Comprando
        </button>
        <h2 className="text-2xl font-display font-bold">Carrinho</h2>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.cartId} className="flex bg-brand-dark p-3 rounded-lg border border-brand-gray gap-4">
            <div className="w-24 h-28 bg-brand-gray rounded overflow-hidden flex-shrink-0">
              <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm md:text-base pr-4">{item.name}</h3>
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-brand-gray hover:text-red-500 p-1"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-brand-orange font-bold text-sm mt-1">
                  {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>

              <div className="mt-2">
                <label className="text-xs text-brand-light block mb-1 uppercase font-bold">
                  Tamanho <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {item.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => updateCartItemSize(item.cartId, size)}
                      className={`px-3 py-1 text-xs border rounded transition-colors ${
                        item.selectedSize === size 
                          ? 'bg-brand-white text-brand-black border-brand-white font-bold' 
                          : 'border-brand-gray text-brand-light hover:border-brand-orange'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!item.selectedSize && (
                  <p className="text-red-500 text-[10px] mt-1">Selecione um tamanho</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-brand-dark p-4 rounded-lg border border-brand-gray space-y-2 mt-6">
        <h3 className="font-display font-bold uppercase mb-4 border-b border-brand-gray pb-2">Resumo do Pedido</h3>
        
        <div className="flex justify-between text-brand-light text-sm">
          <span>Subtotal ({cartTotalQuantity} itens)</span>
          <span>{cartSubtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        
        {cartDiscount > 0 && (
          <div className="flex justify-between text-brand-orange text-sm font-bold">
            <span>Desconto Progressivo</span>
            <span>- {cartDiscount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        )}

        <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-brand-gray mt-2">
          <span>Total</span>
          <span>{cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
      </div>

      {/* Discount Info */}
      <div className="bg-blue-900/20 p-3 rounded border border-blue-900/50 text-xs text-blue-200">
        <p className="font-bold mb-1">🔥 DESCONTO PROGRESSIVO ATIVO:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li className={cartTotalQuantity === 2 ? 'text-brand-orange font-bold' : ''}>2 peças: 5% OFF</li>
          <li className={cartTotalQuantity === 3 ? 'text-brand-orange font-bold' : ''}>3 peças: 10% OFF</li>
          <li className={cartTotalQuantity >= 4 ? 'text-brand-orange font-bold' : ''}>4+ peças: 15% OFF</li>
        </ul>
      </div>

      <button
        onClick={() => isReadyToCheckout && setCurrentView('CHECKOUT')}
        disabled={!isReadyToCheckout}
        className={`w-full font-bold py-4 text-lg uppercase tracking-widest shadow-lg transition-all ${
          isReadyToCheckout 
            ? 'bg-brand-orange text-white hover:bg-orange-600' 
            : 'bg-brand-gray text-gray-500 cursor-not-allowed'
        }`}
      >
        {isReadyToCheckout ? 'Finalizar Pedido' : 'Selecione os Tamanhos'}
      </button>
    </div>
  );
};

export default Cart;