const assetPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
const products = [
  {
    id: 'royal-ruby-lehenga',
    name: 'Royal Ruby Bridal Lehenga',
    category: 'bridal',
    price: '$389',
    oldPrice: '$469',
    image: 'assets/img/prod-lehenga-1.svg',
    badge: ['Best Seller', 'Made to Measure'],
    copy: 'Hand-finished embroidery, rich volume and a couture-inspired bridal finish.',
    notes: ['Heavy bridal craftsmanship', 'Custom fit support', 'Most loved for receptions']
  },
  {
    id: 'noor-elegance-saree',
    name: 'Noor Elegance Festive Saree',
    category: 'sarees',
    price: '$149',
    oldPrice: '$199',
    image: 'assets/img/prod-saree-1.svg',
    badge: ['Express Delivery', 'Soft Drape'],
    copy: 'A luminous saree designed for evening events, graceful movement and polished photos.',
    notes: ['Feather-soft drape', 'Pre-event styling friendly', 'Light glam finish']
  },
  {
    id: 'zaria-anarkali-set',
    name: 'Zaria Anarkali Palazzo Set',
    category: 'salwar',
    price: '$169',
    oldPrice: '$229',
    image: 'assets/img/prod-salwar-1.svg',
    badge: ['Trending', 'Inclusive Sizing'],
    copy: 'Flowy, flattering and easy to wear for parties, family events and festive dinners.',
    notes: ['Elegant fall', 'Comfort-friendly silhouette', 'Looks premium without overstyling']
  },
  {
    id: 'ivory-groom-sherwani',
    name: 'Ivory Groom Signature Sherwani',
    category: 'mens',
    price: '$279',
    oldPrice: '$339',
    image: 'assets/img/prod-men-1.svg',
    badge: ['Wedding Edit', 'Premium Fabric'],
    copy: 'Refined texture and regal tailoring built for ceremonies, portraits and formal entries.',
    notes: ['Structured premium cut', 'Ideal for wedding day looks', 'Pairs beautifully with safa styling']
  },
  {
    id: 'mehfil-velvet-lehenga',
    name: 'Mehfil Velvet Reception Lehenga',
    category: 'bridal',
    price: '$329',
    oldPrice: '$405',
    image: 'assets/img/prod-lehenga-2.svg',
    badge: ['New Arrival', 'Luxury Finish'],
    copy: 'Velvet depth, luminous embellishments and statement styling for glam reception nights.',
    notes: ['Velvet richness', 'High impact shine', 'Premium evening presence']
  },
  {
    id: 'rose-gold-saree',
    name: 'Rose Gold Sequin Saree',
    category: 'sarees',
    price: '$189',
    oldPrice: '$239',
    image: 'assets/img/prod-saree-2.svg',
    badge: ['Party Edit', 'Ready to Wear'],
    copy: 'Modern shimmer with a polished drape that feels glamorous without losing elegance.',
    notes: ['Camera-ready sparkle', 'Easy event styling', 'Soft rose-gold story']
  },
  {
    id: 'gulnaar-suit',
    name: 'Gulnaar Embroidered Suit Set',
    category: 'salwar',
    price: '$139',
    oldPrice: '$174',
    image: 'assets/img/prod-salwar-2.svg',
    badge: ['Fresh Drop', 'Compliment Magnet'],
    copy: 'A versatile embroidered set that feels refined, wearable and gift-worthy.',
    notes: ['Day-to-evening ease', 'Polished embroidery', 'Family event favourite']
  },
  {
    id: 'midnight-bandi',
    name: 'Midnight Regal Bandi Set',
    category: 'mens',
    price: '$149',
    oldPrice: '$189',
    image: 'assets/img/prod-men-2.svg',
    badge: ['Festive Ready', 'Tailored Look'],
    copy: 'Clean sharp menswear with structure, depth and a celebration-ready presence.',
    notes: ['Smart festive essential', 'Tailored silhouette', 'Easy styling for modern events']
  }
];

function productUrl(id) {
  return `${assetPrefix}pages/product.html?product=${id}`;
}

function renderProducts(filter = 'all') {
  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;
  const list = filter === 'all' ? products : products.filter((item) => item.category === filter);
  grid.innerHTML = list.map((p) => `
    <article class="product-card">
      <a href="${productUrl(p.id)}" class="product-image" style="background-image:url('${assetPrefix}${p.image}')" aria-label="${p.name}"></a>
      <div class="product-body">
        <div class="badge-row">${p.badge.map((b) => `<span class="badge">${b}</span>`).join('')}</div>
        <h3>${p.name}</h3>
        <div class="product-meta">${p.copy}</div>
        <div class="price-row"><strong>${p.price}</strong><span>${p.oldPrice}</span></div>
        <div class="card-actions">
          <a class="btn btn-primary" href="${productUrl(p.id)}">View details</a>
          <button class="btn btn-secondary" type="button">Quick shortlist</button>
        </div>
      </div>
    </article>
  `).join('');
}

function bindTabs() {
  const buttons = document.querySelectorAll('[data-tab]');
  if (!buttons.length) return;
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.tab);
    });
  });
}

function mobileMenu() {
  const toggle = document.querySelector('[data-mobile-toggle]');
  const panel = document.querySelector('[data-mobile-panel]');
  const closeBtn = document.querySelector('[data-mobile-close]');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', () => panel.classList.add('open'));
  closeBtn?.addEventListener('click', () => panel.classList.remove('open'));
  panel.addEventListener('click', (e) => {
    if (e.target === panel) panel.classList.remove('open');
  });
}

function newsletterForm() {
  document.querySelectorAll('[data-fake-submit]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('[data-note]');
      if (note) note.textContent = 'Thanks. Your request has been captured for styling follow-up.';
      form.reset();
    });
  });
}

function quantityBox() {
  const wrap = document.querySelector('[data-qty]');
  if (!wrap) return;
  const input = wrap.querySelector('input');
  wrap.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      let value = parseInt(input.value || '1', 10);
      if (btn.dataset.action === 'minus') value = Math.max(1, value - 1);
      if (btn.dataset.action === 'plus') value += 1;
      input.value = value;
    });
  });
}

function renderProductDetails() {
  const mount = document.querySelector('[data-product-detail]');
  if (!mount) return;
  const id = new URLSearchParams(window.location.search).get('product') || 'royal-ruby-lehenga';
  const p = products.find((item) => item.id === id) || products[0];
  mount.innerHTML = `
    <div class="product-gallery">
      <div class="gallery-main" style="background-image:url('${assetPrefix}${p.image}')"></div>
      <div class="gallery-row">
        <div class="gallery-thumb" style="background-image:url('${assetPrefix}${p.image}')"></div>
        <div class="gallery-thumb" style="background-image:url('${assetPrefix}assets/img/look-1.svg')"></div>
        <div class="gallery-thumb" style="background-image:url('${assetPrefix}assets/img/look-2.svg')"></div>
      </div>
    </div>
    <div class="checkout-card">
      <div class="eyebrow">Choice Fashion Signature</div>
      <h1 class="section-title">${p.name}</h1>
      <div class="rating">★★★★★ 4.9 · 218 verified reviews</div>
      <p class="section-copy" style="margin-top:14px;">${p.copy} Created for milestone moments, flattering photos and the premium finish shoppers expect from Choice Fashion Centre.</p>
      <div class="price-row"><strong style="font-size:2rem;">${p.price}</strong><span style="font-size:1.1rem;">${p.oldPrice}</span></div>
      <div class="badge-row">${p.badge.map((b) => `<span class="badge">${b}</span>`).join('')}<span class="badge">Free styling help</span></div>
      <table class="table-like">
        <tr><th>Fabric</th><td>Premium silk-blend with soft inner lining</td></tr>
        <tr><th>Fit</th><td>Made-to-measure assistance available</td></tr>
        <tr><th>Timeline</th><td>Priority dispatch on select designs</td></tr>
        <tr><th>Best for</th><td>Wedding, reception, festive and formal events</td></tr>
      </table>
      <div class="feature-list" style="margin-top:16px;">
        ${p.notes.map((item) => `<div class="feature-card"><strong>${item}</strong><p class="small">Presentation copy block ready for production product data.</p></div>`).join('')}
      </div>
      <div class="qty-row">
        <div class="qty-box" data-qty>
          <button type="button" data-action="minus">−</button>
          <input value="1" aria-label="Quantity">
          <button type="button" data-action="plus">+</button>
        </div>
        <a class="btn btn-primary" href="${assetPrefix}pages/contact.html">Book styling help</a>
        <button class="btn btn-secondary" type="button">Add to shortlist</button>
      </div>
      <div class="flash-note">Ready-to-deploy front-end preview. Connect real cart, inventory, payment and CRM flows later.</div>
    </div>
  `;
  quantityBox();
}

renderProducts();
bindTabs();
mobileMenu();
newsletterForm();
renderProductDetails();
