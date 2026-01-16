import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { OrderStatus, Product, ProductCategory } from '../types.ts';
import { TrashIcon } from '../components/Icons.tsx';

type AdminTab = 'DASHBOARD' | 'ORDERS' | 'PRODUCTS' | 'CUSTOMERS';

const Admin: React.FC = () => {
  const { 
    orders, customers, products, 
    updateOrderStatus, addProduct, deleteProduct, 
    isAdminLoggedIn, loginAdmin, logoutAdmin 
  } = useStore();
  
  const [activeTab, setActiveTab] = useState<AdminTab>('DASHBOARD');
  
  // Login State
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // New Product State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    images: [],
    sizes: ['P', 'M', 'G', 'GG'],
    category: 'Camisetas',
    stock: 0
  });
  const [imgInput, setImgInput] = useState('');

  const categories: ProductCategory[] = ['Camisetas', 'Bermudas', 'Calças', 'Bonés', 'Toucas', 'Moletons', 'Cuecas', 'Bags'];

  // --- LOGIC ---

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser === 'admin' && loginPass === 'admin22') {
      loginAdmin();
      setLoginError('');
    } else {
      setLoginError('Credenciais inválidas.');
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <h2 className="text-3xl font-display font-bold text-brand-orange">ADMIN GUETO FYA</h2>
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-brand-dark p-8 rounded-lg border border-brand-gray shadow-2xl">
           <div className="space-y-4">
             <div>
               <label className="text-sm font-bold text-brand-light">Usuário</label>
               <input 
                 type="text" 
                 value={loginUser} 
                 onChange={e => setLoginUser(e.target.value)}
                 className="w-full bg-black p-3 rounded border border-brand-gray text-white focus:border-brand-orange outline-none"
               />
             </div>
             <div>
               <label className="text-sm font-bold text-brand-light">Senha</label>
               <input 
                 type="password" 
                 value={loginPass} 
                 onChange={e => setLoginPass(e.target.value)}
                 className="w-full bg-black p-3 rounded border border-brand-gray text-white focus:border-brand-orange outline-none"
               />
             </div>
             {loginError && <p className="text-red-500 text-sm font-bold">{loginError}</p>}
             <button type="submit" className="w-full bg-brand-orange text-white font-bold py-3 rounded uppercase tracking-widest hover:bg-orange-600">
               Entrar
             </button>
           </div>
        </form>
      </div>
    );
  }

  // --- STATS CALCULATION ---
  // Only COUNT accepted orders for revenue
  const acceptedOrders = orders.filter(o => o.status === OrderStatus.ACCEPTED);
  
  const dailyRevenue = acceptedOrders
    .filter(o => {
      const orderDate = new Date(o.createdAt).toDateString();
      const today = new Date().toDateString();
      return orderDate === today;
    })
    .reduce((acc, curr) => acc + curr.total, 0);

  const monthlyRevenue = acceptedOrders
    .filter(o => {
      const orderDate = new Date(o.createdAt);
      const now = new Date();
      return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    })
    .reduce((acc, curr) => acc + curr.total, 0);

  const threeMonthsRevenue = acceptedOrders
    .filter(o => {
      const orderDate = new Date(o.createdAt);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return orderDate >= threeMonthsAgo;
    })
    .reduce((acc, curr) => acc + curr.total, 0);

  // Best Seller Logic
  const productSales: Record<string, number> = {};
  acceptedOrders.forEach(order => {
    order.items.forEach(item => {
      productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
    });
  });
  
  const bestSeller = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];

  // --- PRODUCT HANDLERS ---
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    
    addProduct({
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name!,
      price: Number(newProduct.price),
      description: newProduct.description || '',
      images: newProduct.images!.length > 0 ? newProduct.images! : ['https://via.placeholder.com/500'],
      sizes: newProduct.sizes!,
      category: newProduct.category || 'Camisetas',
      stock: Number(newProduct.stock) || 0
    });
    
    // Reset
    setNewProduct({ name: '', price: 0, description: '', images: [], sizes: ['P', 'M', 'G', 'GG'], category: 'Camisetas', stock: 0 });
    setImgInput('');
    alert('Produto cadastrado com sucesso!');
  };

  const addImageToProduct = () => {
    if (imgInput) {
      setNewProduct({ ...newProduct, images: [...(newProduct.images || []), imgInput] });
      setImgInput('');
    }
  };

  return (
    <div className="py-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold text-brand-orange">Painel Administrativo</h2>
        <button onClick={logoutAdmin} className="text-xs text-brand-light underline">Sair</button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
        {(['DASHBOARD', 'ORDERS', 'PRODUCTS', 'CUSTOMERS'] as AdminTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-bold text-sm transition-colors ${activeTab === tab ? 'bg-brand-white text-brand-black' : 'bg-brand-dark text-brand-light border border-brand-gray'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-brand-dark rounded-lg p-4 border border-brand-gray min-h-[500px]">
        
        {/* DASHBOARD */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black p-4 rounded border border-brand-gray/50">
                <h4 className="text-brand-light text-[10px] uppercase font-bold tracking-wider">Faturamento Hoje</h4>
                <p className="text-xl md:text-2xl font-bold text-green-500 font-display">
                  {dailyRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <div className="bg-black p-4 rounded border border-brand-gray/50">
                <h4 className="text-brand-light text-[10px] uppercase font-bold tracking-wider">Faturamento Mês</h4>
                <p className="text-xl md:text-2xl font-bold text-green-500 font-display">
                  {monthlyRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <div className="bg-black p-4 rounded border border-brand-gray/50">
                <h4 className="text-brand-light text-[10px] uppercase font-bold tracking-wider">Últimos 3 Meses</h4>
                <p className="text-xl md:text-2xl font-bold text-blue-400 font-display">
                  {threeMonthsRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <div className="bg-black p-4 rounded border border-brand-gray/50">
                <h4 className="text-brand-light text-[10px] uppercase font-bold tracking-wider">Mais Vendido</h4>
                <p className="text-sm md:text-base font-bold text-brand-orange truncate">
                  {bestSeller ? `${bestSeller[0]} (${bestSeller[1]})` : 'N/A'}
                </p>
              </div>
            </div>
            
            <div className="bg-red-900/20 p-4 rounded border border-red-900/50">
              <p className="text-xs text-red-300 font-bold text-center uppercase">
                🚨 ATENÇÃO: Apenas pedidos marcados como ACEITOS contam para o faturamento.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black p-4 rounded border border-brand-gray">
                <h4 className="text-brand-light text-xs uppercase mb-2">Pedidos Pendentes</h4>
                <p className="text-3xl font-bold text-yellow-500">
                  {orders.filter(o => o.status === OrderStatus.PENDING).length}
                </p>
              </div>
              <div className="bg-black p-4 rounded border border-brand-gray">
                <h4 className="text-brand-light text-xs uppercase mb-2">Total de Pedidos</h4>
                <p className="text-3xl font-bold text-white">
                  {orders.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === 'ORDERS' && (
          <div className="space-y-4">
             {orders.length === 0 ? <p className="text-brand-light text-center py-10">Nenhum pedido realizado.</p> : orders.map(order => (
               <div key={order.id} className="bg-black p-4 rounded border border-brand-gray flex flex-col md:flex-row justify-between md:items-start gap-4">
                 <div className="flex-grow">
                   <div className="flex items-center gap-2 mb-2">
                     <span className="font-bold text-brand-orange font-display tracking-wider">#{order.id}</span>
                     <span className="text-[10px] bg-brand-gray px-2 py-0.5 rounded text-white">{new Date(order.createdAt).toLocaleString()}</span>
                   </div>
                   <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-3">
                     <p><span className="text-brand-light">Cliente:</span> {order.customer.name}</p>
                     <p><span className="text-brand-light">Tel:</span> {order.customer.phone}</p>
                     <p className="col-span-2"><span className="text-brand-light">Email:</span> {order.customer.email}</p>
                   </div>
                   
                   <div className="bg-brand-dark p-2 rounded text-xs space-y-1 mb-2">
                    {order.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{i.quantity}x {i.name} ({i.selectedSize})</span>
                        <span className="text-brand-light">R$ {(i.price * i.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-brand-gray mt-2 pt-1 flex justify-between font-bold">
                       <span>Total (c/ desc):</span>
                       <span className="text-green-500">{order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                   </div>
                 </div>

                 <div className="flex flex-col gap-2 min-w-[120px]">
                   <div className={`px-2 py-2 rounded text-xs text-center font-bold uppercase tracking-wider
                     ${order.status === 'ACCEPTED' ? 'bg-green-600 text-white' : 
                       order.status === 'REJECTED' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}`}>
                     {order.status === 'ACCEPTED' ? 'ACEITO' : order.status === 'REJECTED' ? 'RECUSADO' : 'PENDENTE'}
                   </div>
                   
                   {order.status === OrderStatus.PENDING && (
                     <div className="flex flex-col gap-2">
                       <button 
                        onClick={() => updateOrderStatus(order.id, OrderStatus.ACCEPTED)}
                        className="bg-green-900 text-green-200 border border-green-700 px-3 py-2 rounded text-xs hover:bg-green-800 uppercase font-bold"
                       >
                         Aceitar
                       </button>
                       <button 
                        onClick={() => updateOrderStatus(order.id, OrderStatus.REJECTED)}
                        className="bg-red-900 text-red-200 border border-red-700 px-3 py-2 rounded text-xs hover:bg-red-800 uppercase font-bold"
                       >
                         Recusar
                       </button>
                     </div>
                   )}
                 </div>
               </div>
             ))}
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === 'PRODUCTS' && (
          <div className="space-y-8">
            {/* Add Form */}
            <div className="bg-black p-4 rounded border border-brand-gray">
              <h3 className="font-bold mb-4 text-brand-orange uppercase">Cadastrar Produto</h3>
              <form onSubmit={handleAddProduct} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" placeholder="Nome do Produto" className="col-span-2 bg-brand-dark p-2 rounded text-white border border-brand-gray text-sm"
                    value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required
                  />
                  <select 
                    className="bg-brand-dark p-2 rounded text-white border border-brand-gray text-sm"
                    value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as ProductCategory})}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input 
                    type="number" placeholder="Estoque" className="bg-brand-dark p-2 rounded text-white border border-brand-gray text-sm"
                    value={newProduct.stock || ''} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                  />
                  <input 
                    type="number" placeholder="Preço (R$)" step="0.01" className="col-span-2 bg-brand-dark p-2 rounded text-white border border-brand-gray text-sm"
                    value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} required
                  />
                </div>
                
                <textarea 
                  placeholder="Descrição detalhada" className="w-full bg-brand-dark p-2 rounded text-white border border-brand-gray text-sm h-20"
                  value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
                
                {/* Simulated Image Upload */}
                <div className="space-y-2">
                  <label className="text-xs text-brand-light">Imagens (URL)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" placeholder="https://..." className="flex-grow bg-brand-dark p-2 rounded text-white border border-brand-gray text-xs"
                      value={imgInput} onChange={e => setImgInput(e.target.value)}
                    />
                    <button type="button" onClick={addImageToProduct} className="bg-brand-gray px-4 rounded text-lg font-bold hover:bg-brand-orange hover:text-white">+</button>
                  </div>
                  {newProduct.images && newProduct.images.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto py-2">
                      {newProduct.images.map((img, idx) => (
                        <div key={idx} className="relative flex-shrink-0">
                          <img src={img} className="w-16 h-16 object-cover rounded border border-brand-gray" alt="preview" />
                          <button 
                            type="button"
                            onClick={() => setNewProduct({...newProduct, images: newProduct.images?.filter((_, i) => i !== idx)})}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-brand-light">Tamanhos (separados por vírgula)</label>
                  <input 
                    type="text" 
                    value={newProduct.sizes?.join(', ')} 
                    onChange={e => setNewProduct({...newProduct, sizes: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full bg-brand-dark p-2 rounded text-white border border-brand-gray text-xs"
                  />
                </div>

                <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded uppercase hover:bg-brand-orange hover:text-white transition-colors">Cadastrar Produto</button>
              </form>
            </div>

            {/* List */}
            <div className="space-y-2">
              <h3 className="font-bold text-brand-orange uppercase">Catálogo Atual</h3>
              {products.map(p => (
                <div key={p.id} className="flex justify-between items-center bg-black p-3 rounded border border-brand-gray">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} className="w-12 h-12 rounded object-cover" alt={p.name} />
                    <div>
                      <p className="font-bold text-sm text-white">{p.name}</p>
                      <p className="text-[10px] text-brand-light uppercase">{p.category} | Estoque: {p.stock}</p>
                      <p className="text-xs text-brand-orange font-bold">R$ {p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} className="text-brand-gray hover:text-red-500 transition-colors p-2">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOMERS */}
        {activeTab === 'CUSTOMERS' && (
          <div className="space-y-4">
             {customers.map(c => (
               <div key={c.id} className="bg-black p-4 rounded border border-brand-gray">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold text-brand-orange text-lg">{c.name}</p>
                        <p className="text-sm text-white">{c.email}</p>
                        <p className="text-sm text-brand-light">{c.phone}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs bg-brand-dark px-2 py-1 rounded border border-brand-gray">
                            {c.orders.length} pedidos
                        </span>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;