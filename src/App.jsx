import { useState } from 'react'

const products = [
  { id: 1, name: 'Torta de chocolate', category: 'Tortas', price: 78, emoji: '🍫', color: 'chocolate', description: 'Bizcocho húmedo de cacao, relleno de fudge y cobertura de ganache.' },
  { id: 2, name: 'Torta de lúcuma', category: 'Tortas', price: 82, emoji: '🍰', color: 'lucuma', description: 'Suave crema de lúcuma peruana con delicado bizcocho de vainilla.' },
  { id: 3, name: 'Cupcakes de vainilla', category: 'Cupcakes', price: 24, emoji: '🧁', color: 'vanilla', description: 'Seis cupcakes esponjosos con buttercream de colores pastel.' },
  { id: 4, name: 'Tres leches', category: 'Postres', price: 16, emoji: '🥛', color: 'cream', description: 'Nuestro clásico tres leches, fresco y generoso.' },
  { id: 5, name: 'Alfajores caseros', category: 'Postres', price: 18, emoji: '🍪', color: 'caramel', description: 'Cuatro alfajores de maicena con abundante manjar blanco.' },
  { id: 6, name: 'Torta de fresa', category: 'Tortas', price: 85, emoji: '🍓', color: 'berry', description: 'Crema chantilly, fresas frescas y un toque de vainilla.' },
]

const adminItems = [
  ['Panel administrativo', 'admin', '▦'],
  ['Gestión de productos', 'productsAdmin', '◈'],
  ['Pedidos', 'orders', '▤'],
  ['Pagos', 'payment', '◉'],
]

function Logo({ compact = false, go }) {
  return <button className="brand" onClick={() => go?.('home')}>
    <span className="brand-mark">✦</span><span>{compact ? 'Sortilegios' : 'Dulces Sortilegios'}</span>
  </button>
}

function Header({ go, view }) {
  return <header className="topbar">
    <Logo go={go} />
    <nav className="main-nav">
      <button className={view === 'home' ? 'active' : ''} onClick={() => go('home')}>Inicio</button>
      <button className={view === 'catalog' ? 'active' : ''} onClick={() => go('catalog')}>Catálogo</button>
      <button onClick={() => go('custom')}>Pedido personalizado</button>
    </nav>
    <div className="header-actions">
      <button className="cart" onClick={() => go('catalog')}>🛍️ <span>0</span></button>
      <button className="outline-btn" onClick={() => go('login')}>Ingresar</button>
      <button className="solid-btn" onClick={() => go('register')}>Crear cuenta</button>
    </div>
  </header>
}

function ProductCard({ product, go }) {
  return <article className="product-card">
    <div className={`product-art ${product.color}`}><span>{product.emoji}</span><small>{product.category}</small></div>
    <div className="product-info">
      <h3>{product.name}</h3><p>{product.description}</p>
      <div className="product-foot"><strong>S/ {product.price.toFixed(2)}</strong><button onClick={() => go('detail', product)}>Ver detalle →</button></div>
    </div>
  </article>
}

function SectionTitle({ eyebrow, title, text, action }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>
}

function Home({ go }) {
  return <>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">PASTELERÍA ARTESANAL PERUANA</span><h1>Un toque de magia<br /><em>en cada bocado.</em></h1><p>Tortas, cupcakes y postres hechos con cariño para acompañar tus momentos más dulces.</p><div className="hero-buttons"><button className="solid-btn large" onClick={() => go('catalog')}>Ver catálogo</button><button className="text-btn" onClick={() => go('custom')}>Crea tu pedido personalizado →</button></div></div>
      <div className="hero-art"><div className="sun"></div><div className="cake"><span>🍓</span><i></i><b></b></div><span className="spark one">✦</span><span className="spark two">✧</span><span className="spark three">✦</span></div>
    </section>
    <section className="container feature-section"><SectionTitle eyebrow="NUESTROS FAVORITOS" title="Dulces que encantan" action={<button className="text-btn" onClick={() => go('catalog')}>Ver todos →</button>} /><div className="product-grid">{products.slice(0, 3).map(p => <ProductCard key={p.id} product={p} go={go} />)}</div></section>
    <section className="magic-band"><span>✦</span><div><h2>Celebramos contigo</h2><p>Haz que tu celebración sea única con una torta pensada especialmente para ti.</p></div><button className="light-btn" onClick={() => go('custom')}>Personalizar mi torta</button></section>
  </>
}

function Catalog({ go }) {
  const [filter, setFilter] = useState('Todos')
  const filtered = filter === 'Todos' ? products : products.filter(p => p.category === filter)
  return <main className="container page"><SectionTitle eyebrow="HECHO PARA TI" title="Nuestro catálogo" text="Pequeños detalles que hacen grandes momentos." />
    <div className="filter-row">{['Todos', 'Tortas', 'Cupcakes', 'Postres'].map(f => <button key={f} className={filter === f ? 'filter active-filter' : 'filter'} onClick={() => setFilter(f)}>{f}</button>)}</div>
    <div className="product-grid catalog-grid">{filtered.map(p => <ProductCard key={p.id} product={p} go={go} />)}</div>
  </main>
}

function ProductDetail({ product = products[0], go }) {
  return <main className="container page detail-page"><button className="back" onClick={() => go('catalog')}>← Volver al catálogo</button><div className="detail-layout"><div className={`detail-art ${product.color}`}><span>{product.emoji}</span></div><div className="detail-copy"><span className="eyebrow">{product.category.toUpperCase()}</span><h1>{product.name}</h1><div className="price">S/ {product.price.toFixed(2)}</div><p>{product.description}</p><hr /><label>Porciones</label><div className="choice-row"><button className="choice selected">8 porciones</button><button className="choice">12 porciones</button><button className="choice">16 porciones</button></div><label>Mensaje en la torta <small>(opcional)</small></label><input placeholder="Ej. Feliz cumpleaños, Valeria" /><div className="detail-actions"><button className="solid-btn large" onClick={() => go('orders')}>Agregar al pedido</button><button className="heart">♡</button></div><p className="note">✦ Preparación artesanal · Entrega en Lima Metropolitana</p></div></div></main>
}

function FormField({ label, placeholder, type = 'text' }) { return <label className="form-field">{label}<input type={type} placeholder={placeholder} /></label> }
function SelectField({ label, children }) { return <label className="form-field">{label}<select>{children}</select></label> }

function Auth({ type, go }) {
  const login = type === 'login'
  return <main className="auth-page"><div className="auth-art"><Logo compact /><div className="auth-cake">🧁</div><h2>La magia empieza<br />con algo dulce.</h2><p>Descubre sabores preparados especialmente para celebrar tus momentos.</p></div><section className="auth-card"><span className="eyebrow">{login ? 'BIENVENIDA DE VUELTA' : 'ÚNETE A NOSOTROS'}</span><h1>{login ? 'Inicia sesión' : 'Crea tu cuenta'}</h1><p>{login ? 'Ingresa para ver tus pedidos y favoritos.' : 'Regístrate para disfrutar una experiencia más dulce.'}</p><div className="form-grid">{!login && <FormField label="Nombre completo" placeholder="Tu nombre" />}<FormField label="Correo electrónico" placeholder="nombre@correo.com" type="email" /><FormField label="Contraseña" placeholder="••••••••" type="password" />{!login && <FormField label="Celular" placeholder="999 999 999" />}</div>{login && <button className="text-btn form-link">¿Olvidaste tu contraseña?</button>}<button className="solid-btn full" onClick={() => go(login ? 'account' : 'login')}>{login ? 'Ingresar' : 'Crear mi cuenta'}</button><p className="auth-switch">{login ? '¿Aún no tienes una cuenta?' : '¿Ya tienes una cuenta?'} <button onClick={() => go(login ? 'register' : 'login')}>{login ? 'Regístrate' : 'Inicia sesión'}</button></p></section></main>
}

function Account({ go }) { return <main className="container page account-layout"><aside className="account-menu"><div className="avatar">MS</div><h3>María Salazar</h3><p>maria@email.com</p><button className="menu-active">Mi perfil</button><button onClick={() => go('orders')}>Mis pedidos</button><button onClick={() => go('home')}>Cerrar sesión</button></aside><section className="account-content"><SectionTitle eyebrow="MI CUENTA" title="Hola, María" text="Administra tu información y revisa tus pedidos." /><div className="info-panel"><h3>Datos personales</h3><div className="two-col"><FormField label="Nombre" placeholder="María Salazar" /><FormField label="Correo electrónico" placeholder="maria@email.com" /><FormField label="Celular" placeholder="987 654 321" /><FormField label="Distrito" placeholder="Miraflores" /></div><button className="solid-btn">Guardar cambios</button></div><div className="quick-card"><div><span>🧁</span><h3>¿Tienes una celebración?</h3><p>Diseñemos juntos un dulce momento.</p></div><button className="outline-btn" onClick={() => go('custom')}>Personalizar pedido</button></div></section></main> }

function CustomOrder({ go }) { return <main className="container page custom-page"><SectionTitle eyebrow="CREA ALGO ÚNICO" title="Tu pedido personalizado" text="Cuéntanos cómo imaginas tu dulce y lo haremos realidad." /><div className="custom-layout"><section className="form-panel"><div className="step"><b>1</b><h3>Cuéntanos sobre tu evento</h3></div><div className="two-col"><SelectField label="Tipo de celebración"><option>Cumpleaños</option><option>Boda</option><option>Aniversario</option></SelectField><FormField label="Fecha de entrega" placeholder="dd / mm / aaaa" /></div><div className="step"><b>2</b><h3>Elige los detalles</h3></div><div className="two-col"><SelectField label="Tipo de dulce"><option>Torta</option><option>Cupcakes</option><option>Mesa de postres</option></SelectField><SelectField label="Número de porciones"><option>12 porciones</option><option>20 porciones</option><option>30 porciones</option></SelectField></div><SelectField label="Sabor principal"><option>Chocolate</option><option>Vainilla</option><option>Lúcuma</option><option>Fresa</option></SelectField><label className="form-field">Describe tu idea<textarea placeholder="Colores, temática, mensaje y todo lo que imagines..."></textarea></label><button className="solid-btn full" onClick={() => go('orders')}>Enviar solicitud</button></section><aside className="custom-help"><span className="help-icon">✦</span><h3>Hecho a tu medida</h3><p>Revisaremos tu solicitud y te contactaremos para confirmar los detalles y el presupuesto.</p><ul><li>Ingredientes frescos</li><li>Diseños personalizados</li><li>Entrega coordinada</li></ul></aside></div></main> }

function Status({ label }) { return <span className={`status ${label.includes('Entregado') ? 'delivered' : label.includes('Preparación') ? 'baking' : 'pending'}`}>{label}</span> }
function Orders({ go }) { const orderRows = [{ code: '#DS-1048', date: '12 de octubre, 2026', item: 'Torta de chocolate', amount: 'S/ 78.00', status: 'En preparación' }, { code: '#DS-1021', date: '28 de setiembre, 2026', item: 'Cupcakes de vainilla', amount: 'S/ 24.00', status: 'Entregado' }]; return <main className="container page"><SectionTitle eyebrow="MIS COMPRAS" title="Mis pedidos" text="Revisa el estado de tus dulces favoritos." /><div className="order-list">{orderRows.map(o => <article className="order-card" key={o.code}><div className="order-icon">🧁</div><div className="order-main"><div><b>{o.code}</b><span>{o.date}</span></div><h3>{o.item}</h3></div><div className="order-price"><Status label={o.status} /><strong>{o.amount}</strong></div><button className="outline-btn" onClick={() => go('tracking')}>Ver seguimiento</button></article>)}</div><div className="empty-prompt"><p>¿Antojo de algo más?</p><button className="text-btn" onClick={() => go('catalog')}>Explorar catálogo →</button></div></main> }

function Tracking({ go }) { const steps = [['✓', 'Pedido recibido', 'Tu pedido fue registrado correctamente.', '12 oct · 09:32 a. m.'], ['✓', 'En preparación', 'Nuestra pastelería ya está creando tu dulce.', '12 oct · 10:15 a. m.'], ['3', 'Listo para entrega', 'Te avisaremos cuando salga a reparto.', 'Pendiente'], ['4', 'Entregado', 'Disfruta tu momento dulce.', 'Pendiente']]; return <main className="container page tracking"><button className="back" onClick={() => go('orders')}>← Volver a mis pedidos</button><SectionTitle eyebrow="PEDIDO #DS-1048" title="Seguimiento de pedido" text="Torta de chocolate · S/ 78.00" /><div className="tracking-layout"><section className="timeline">{steps.map((s, i) => <div className={`timeline-item ${i < 2 ? 'done' : ''}`} key={s[1]}><div className="timeline-dot">{s[0]}</div><div><h3>{s[1]}</h3><p>{s[2]}</p><small>{s[3]}</small></div></div>)}</section><aside className="delivery-card"><span>🚚</span><h3>Entrega estimada</h3><b>Hoy, 4:00 - 6:00 p. m.</b><p>Av. Larco 345, Miraflores</p><button className="outline-btn" onClick={() => go('payment')}>Ver pago</button></aside></div></main> }

function Payment({ go }) { return <main className="container page payment-page"><div className="payment-card"><span className="eyebrow">REGISTRO DE PAGO</span><h1>Finaliza tu pedido</h1><p>Pedido #DS-1048 · Torta de chocolate</p><div className="payment-total"><span>Total a pagar</span><strong>S/ 78.00</strong></div><div className="pay-options"><button className="pay-option selected">💳 Tarjeta</button><button className="pay-option">Yape</button><button className="pay-option">Plin</button></div><FormField label="Número de tarjeta" placeholder="0000 0000 0000 0000" /><div className="two-col"><FormField label="Vencimiento" placeholder="MM / AA" /><FormField label="CVV" placeholder="•••" /></div><button className="solid-btn full" onClick={() => go('tracking')}>Registrar pago</button><small className="secure">🔒 Esta es una interfaz de demostración. No se procesa ningún pago.</small></div></main> }

function AdminLayout({ view, go }) { const isProducts = view === 'productsAdmin'; return <div className="admin-shell"><aside className="admin-sidebar"><Logo compact /><p className="admin-label">ADMINISTRACIÓN</p>{adminItems.map(([label, key, icon]) => <button key={key} className={view === key ? 'admin-nav active-admin' : 'admin-nav'} onClick={() => go(key)}><span>{icon}</span>{label}</button>)}<div className="sidebar-bottom"><button onClick={() => go('home')}>← Ir a la tienda</button><div className="admin-user"><span>AS</span><div><b>Andrea Silva</b><small>Administradora</small></div></div></div></aside><main className="admin-content">{isProducts ? <ProductManagement /> : <AdminDashboard go={go} />}</main></div> }

function AdminDashboard({ go }) { return <><div className="admin-head"><div><span className="eyebrow">RESUMEN GENERAL</span><h1>Panel administrativo</h1><p>Así va Dulces Sortilegios hoy.</p></div><button className="solid-btn" onClick={() => go('productsAdmin')}>+ Nuevo producto</button></div><div className="stats"><div><span>Ventas del mes</span><b>S/ 4,680</b><small>↑ 12% vs. mes anterior</small></div><div><span>Pedidos activos</span><b>18</b><small>6 por entregar hoy</small></div><div><span>Clientes nuevos</span><b>24</b><small>↑ 8% esta semana</small></div></div><section className="admin-table-wrap"><div className="table-head"><h2>Pedidos recientes</h2><button className="text-btn" onClick={() => go('orders')}>Ver todos →</button></div><table><thead><tr><th>Pedido</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead><tbody><tr><td>#DS-1048</td><td>María Salazar</td><td>12 Oct, 2026</td><td>S/ 78.00</td><td><Status label="En preparación" /></td></tr><tr><td>#DS-1047</td><td>Carlos Ríos</td><td>12 Oct, 2026</td><td>S/ 125.00</td><td><Status label="Pendiente" /></td></tr><tr><td>#DS-1046</td><td>Lucía Torres</td><td>11 Oct, 2026</td><td>S/ 56.00</td><td><Status label="Entregado" /></td></tr></tbody></table></section></> }

function ProductManagement() { return <><div className="admin-head"><div><span className="eyebrow">CATÁLOGO</span><h1>Gestión de productos</h1><p>Administra los dulces disponibles en tu tienda.</p></div><button className="solid-btn">+ Agregar producto</button></div><div className="product-admin-toolbar"><input placeholder="Buscar producto..." /><button className="filter active-filter">Todos</button><button className="filter">Tortas</button><button className="filter">Cupcakes</button><button className="filter">Postres</button></div><div className="admin-products">{products.map(p => <div className="admin-product" key={p.id}><div className={`mini-art ${p.color}`}>{p.emoji}</div><div><h3>{p.name}</h3><p>{p.category}</p></div><strong>S/ {p.price.toFixed(2)}</strong><Status label="Disponible" /><button className="edit-btn">Editar</button><button className="dots">•••</button></div>)}</div></> }

function Footer({ go }) { return <footer><div><Logo /><p>Pastelería artesanal para hacer tus días un poco más mágicos.</p></div><div><h4>Explora</h4><button onClick={() => go('catalog')}>Catálogo</button><button onClick={() => go('custom')}>Pedidos personalizados</button></div><div><h4>Atención</h4><span>📍 Lima, Perú</span><span>✉ hola@dulcessortilegios.pe</span></div><small>© 2026 Dulces Sortilegios</small></footer> }

export default function App() { const [view, setView] = useState('home'); const [selected, setSelected] = useState(products[0]); const go = (to, product) => { if (product) setSelected(product); setView(to); window.scrollTo({ top: 0, behavior: 'smooth' }) }; window.onpopstate = null; window.addEventListener('go-home', () => setView('home'), { once: true }); const admin = ['admin', 'productsAdmin'].includes(view); const screens = { home: <Home go={go} />, catalog: <Catalog go={go} />, detail: <ProductDetail product={selected} go={go} />, login: <Auth type="login" go={go} />, register: <Auth type="register" go={go} />, account: <Account go={go} />, custom: <CustomOrder go={go} />, orders: <Orders go={go} />, tracking: <Tracking go={go} />, payment: <Payment go={go} /> }; if (admin) return <AdminLayout view={view} go={go} />; return <><Header go={go} view={view} />{screens[view]}<Footer go={go} /><button className="admin-access" onClick={() => go('admin')}>Acceso administrativo</button></> }
