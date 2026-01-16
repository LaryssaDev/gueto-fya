import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { WHATSAPP_NUMBER } from '../constants.ts';
import { ArrowLeftIcon } from '../components/Icons.tsx';

const Checkout: React.FC = () => {
  const { cart, cartSubtotal, cartDiscount, cartTotal, createOrder, setCurrentView } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Create Internal Order
    const order = createOrder({
      name: formData.name,
      phone: formData.phone,
      email: formData.email
    });

    // 2. Format WhatsApp Message
    const header = `*NOVO PEDIDO - GUETO FYA*`;
    const customerInfo = `👤 *Cliente:* ${formData.name}%0a📱 *Tel:* ${formData.phone}%0a📧 *Email:* ${formData.email}`;
    
    let itemsList = "";
    order.items.forEach(item => {
      itemsList += `▪️ ${item.quantity}x ${item.name} (${item.selectedSize}) - R$ ${item.price.toFixed(2)}%0a`;
    });

    const values = `💲 *Subtotal:* R$ ${order.subtotal.toFixed(2)}%0a📉 *Desconto:* R$ ${order.discount.toFixed(2)}%0a💰 *TOTAL:* R$ ${order.total.toFixed(2)}`;
    
    const footer = `🆔 *ID Pedido:* ${order.id}%0a⏳ *Status:* Aguardando Aprovação`;

    const message = `${header}%0a%0a${customerInfo}%0a%0a*🛒 PRODUTOS:*%0a${itemsList}%0a${values}%0a%0a${footer}`;

    // 3. Redirect
    setTimeout(() => {
      window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${message}`, '_blank');
      setIsSubmitting(false);
      // Navigate back to home or a success page
      setCurrentView('HOME');
      alert('Pedido realizado! Aguarde a confirmação no WhatsApp.');
    }, 1000);
  };

  return (
    <div className="py-4 space-y-6">
      <button 
        onClick={() => setCurrentView('CART')}
        className="flex items-center text-brand-light hover:text-brand-orange"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-1" />
        Voltar para Carrinho
      </button>

      <div className="bg-brand-dark p-6 rounded-lg border border-brand-gray">
        <h2 className="text-2xl font-display font-bold mb-6 text-center">Finalizar Compra</h2>
        
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-brand-light mb-1">Nome Completo</label>
            <input 
              type="text" 
              name="name" 
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-brand-black border border-brand-gray p-3 rounded focus:border-brand-orange focus:outline-none text-white"
              placeholder="Seu nome aqui"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-light mb-1">Telefone (WhatsApp)</label>
            <input 
              type="tel" 
              name="phone" 
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-brand-black border border-brand-gray p-3 rounded focus:border-brand-orange focus:outline-none text-white"
              placeholder="(11) 99999-9999"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-light mb-1">E-mail</label>
            <input 
              type="email" 
              name="email" 
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-brand-black border border-brand-gray p-3 rounded focus:border-brand-orange focus:outline-none text-white"
              placeholder="seu@email.com"
            />
          </div>

          <div className="pt-4 border-t border-brand-gray mt-4">
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total a pagar:</span>
              <span className="text-brand-orange">{cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#25D366] text-white font-bold py-4 text-lg uppercase tracking-widest hover:bg-[#20bd5a] transition-colors shadow-lg flex justify-center items-center"
            >
              {isSubmitting ? 'Processando...' : 'Enviar Pedido WhatsApp'}
            </button>
            <p className="text-center text-xs text-brand-light mt-4">
              Ao clicar, você será redirecionado para o WhatsApp para confirmar seu pedido com um atendente.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;