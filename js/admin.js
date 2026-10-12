/**
 * ============================================================================
 * Visit Cox's Bazar - Admin Authentication & CMS Content Manager (admin.js)
 * ============================================================================
 * Provides full Administrative CRUD (Create, Read, Update, Delete) permissions
 * for all website content:
 *   - Hotels & Accommodations
 *   - Sightseeing Destinations
 *   - Hidden Gems
 *   - Local Transportation & Pricing Routes
 *   - Frequently Asked Questions (FAQ)
 *   - Global Exchange Rate (USD <-> BDT) & Admin Credentials
 *
 * DEFAULT ADMIN CREDENTIALS:
 *   Username: admin   (or: anikbarua)
 *   Password: CoxAdmin@2026
 */

const ADMIN_AUTH_STORAGE_KEY = 'visit_cox_admin_session_v1';
const ADMIN_CREDS_STORAGE_KEY = 'visit_cox_admin_creds_v1';

const DEFAULT_ADMIN_CREDS = {
  username: 'admin',
  altUsername: 'anikbarua',
  password: 'CoxAdmin@2026'
};

const AdminState = {
  isAuthenticated: sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true' ||
                   localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true',
  activeTab: 'hotels', // 'hotels' | 'destinations' | 'hiddenGems' | 'transport' | 'faqs' | 'settings'
  editingCategory: null,
  editingId: null
};

/* --------------------------------------------------------------------------
 * 1. CREDENTIALS & AUTHENTICATION LOGIC
 * -------------------------------------------------------------------------- */
function getStoredAdminCreds() {
  try {
    const raw = localStorage.getItem(ADMIN_CREDS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return { ...DEFAULT_ADMIN_CREDS };
}

function verifyAdminLogin(usernameInput, passwordInput) {
  const creds = getStoredAdminCreds();
  const u = (usernameInput || '').trim().toLowerCase();
  const p = (passwordInput || '').trim();

  const validUser =
    u === creds.username.toLowerCase() ||
    (creds.altUsername && u === creds.altUsername.toLowerCase());

  return validUser && p === creds.password;
}

function handleAdminLoginSubmit(e) {
  if (e) e.preventDefault();
  const userEl = document.getElementById('admin-login-username');
  const passEl = document.getElementById('admin-login-password');
  const rememberEl = document.getElementById('admin-login-remember');
  const errEl = document.getElementById('admin-login-error');

  const username = userEl ? userEl.value : '';
  const password = passEl ? passEl.value : '';

  if (verifyAdminLogin(username, password)) {
    AdminState.isAuthenticated = true;
    sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'true');
    if (rememberEl && rememberEl.checked) {
      localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'true');
    }
    if (errEl) errEl.classList.add('hidden');
    closeAdminLoginModal();
    renderAll();
    updateAdminUI();
    openAdminDashboard('hotels');
    showAdminToast('Logged in as Administrator. Full Edit/Update/Delete access enabled!');
  } else {
    if (errEl) {
      errEl.textContent = 'Invalid administrator username or password. Please try again.';
      errEl.classList.remove('hidden');
    }
  }
}

function logoutAdmin() {
  AdminState.isAuthenticated = false;
  sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  closeAdminDashboard();
  closeEditorModal();
  renderAll();
  updateAdminUI();
  showAdminToast('Logged out of Administrator mode.');
}

/* --------------------------------------------------------------------------
 * 2. ADMIN MODALS & TOOLBAR CONTROLLER
 * -------------------------------------------------------------------------- */
function handleAdminButtonClick() {
  if (AdminState.isAuthenticated) {
    openAdminDashboard();
  } else {
    openAdminLoginModal();
  }
}

function openAdminLoginModal() {
  const modal = document.getElementById('admin-login-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.getElementById('admin-login-error')?.classList.add('hidden');
    setTimeout(() => document.getElementById('admin-login-username')?.focus(), 100);
  }
}

function closeAdminLoginModal() {
  const modal = document.getElementById('admin-login-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function openAdminDashboard(tab) {
  if (!AdminState.isAuthenticated) {
    openAdminLoginModal();
    return;
  }
  if (tab) AdminState.activeTab = tab;
  const modal = document.getElementById('admin-dashboard-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    renderAdminDashboardContent();
  }
}

function closeAdminDashboard() {
  const modal = document.getElementById('admin-dashboard-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function updateAdminUI() {
  const toolbar = document.getElementById('admin-floating-toolbar');
  const navBtnLabels = document.querySelectorAll('.admin-nav-btn-label');

  if (toolbar) {
    toolbar.classList.toggle('hidden', !AdminState.isAuthenticated);
    toolbar.classList.toggle('flex', AdminState.isAuthenticated);
  }

  navBtnLabels.forEach(el => {
    el.textContent = AdminState.isAuthenticated ? 'CMS Dashboard' : 'Admin Login';
  });
}

function showAdminToast(message) {
  let toast = document.getElementById('admin-toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'admin-toast-notification';
    toast.className =
      'fixed bottom-6 left-6 z-[90] max-w-md bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-teal-400/40 flex items-center gap-3 text-sm font-semibold transition-all duration-300';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
    <span>${message}</span>
  `;
  toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
  clearTimeout(window.__adminToastTimer);
  window.__adminToastTimer = setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
  }, 3500);
}

/* --------------------------------------------------------------------------
 * 3. INLINE ADMIN ACTION BADGES (Rendered inside Cards & Table Rows)
 * -------------------------------------------------------------------------- */
function getInlineAdminControls(category, itemId) {
  if (!AdminState.isAuthenticated) return '';
  return `
    <div class="inline-flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 shadow-md">
      <button
        type="button"
        onclick="event.stopPropagation(); openItemEditor('${category}', '${itemId}')"
        title="Edit Item"
        class="px-2 py-0.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-bold transition flex items-center gap-1">
        ✎ Edit
      </button>
      <button
        type="button"
        onclick="event.stopPropagation(); deleteCMSItem('${category}', '${itemId}')"
        title="Delete Item"
        class="px-2 py-0.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition flex items-center gap-1">
        ✕ Delete
      </button>
    </div>
  `;
}

/* --------------------------------------------------------------------------
 * 4. ADMIN CMS DASHBOARD RENDERER
 * -------------------------------------------------------------------------- */
function switchAdminTab(tabName) {
  AdminState.activeTab = tabName;
  renderAdminDashboardContent();
}

function renderAdminDashboardContent() {
  const tabs = [
    { id: 'hotels', label: `Hotels (${HOTELS_DATA.length})` },
    { id: 'destinations', label: `Sightseeing (${DESTINATIONS_DATA.length})` },
    { id: 'hiddenGems', label: `Hidden Gems (${HIDDEN_GEMS_DATA.length})` },
    { id: 'transport', label: `Transport (${TRANSPORT_DATA.length})` },
    { id: 'faqs', label: `FAQs (${FAQ_DATA.length})` },
    { id: 'settings', label: 'Settings & Credentials' }
  ];

  const tabBar = document.getElementById('admin-dashboard-tabs');
  if (tabBar) {
    tabBar.innerHTML = tabs
      .map(
        t => `
        <button
          type="button"
          onclick="switchAdminTab('${t.id}')"
          class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            AdminState.activeTab === t.id
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }">
          ${t.label}
        </button>
      `
      )
      .join('');
  }

  const body = document.getElementById('admin-dashboard-body');
  if (!body) return;

  const active = AdminState.activeTab;

  if (active === 'settings') {
    const creds = getStoredAdminCreds();
    body.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Currency Rate Setting -->
        <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h4 class="text-base font-extrabold text-slate-900 mb-1">Currency Converter Rate</h4>
          <p class="text-xs text-slate-500 mb-4">Set how many Bangladeshi Taka (BDT) equal 1 US Dollar ($1 USD).</p>
          <form onsubmit="handleSaveExchangeRate(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-600 mb-1">1 USD in BDT</label>
              <input
                id="admin-setting-rate"
                type="number"
                step="0.5"
                min="1"
                value="${CONFIG.exchangeRateUSD}"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition">
              Update Exchange Rate
            </button>
          </form>
        </div>

        <!-- Update Admin Credentials -->
        <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h4 class="text-base font-extrabold text-slate-900 mb-1">Administrator Credentials</h4>
          <p class="text-xs text-slate-500 mb-4">Update your admin username and password for this portal.</p>
          <form onsubmit="handleSaveAdminCredentials(event)" class="space-y-3">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Admin Username</label>
              <input
                id="admin-setting-username"
                type="text"
                value="${creds.username}"
                required
                class="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-600 mb-1">New Password</label>
              <input
                id="admin-setting-password"
                type="text"
                value="${creds.password}"
                required
                class="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition">
              Save Credentials
            </button>
          </form>
        </div>

        <!-- Backup / Reset Actions -->
        <div class="md:col-span-2 bg-amber-50/70 rounded-2xl p-6 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 class="text-base font-extrabold text-slate-900">Export Data or Restore Factory Defaults</h4>
            <p class="text-xs text-slate-600 mt-0.5">Download all current website content as JSON backup, or reset all sections back to the original Cox's Bazar dataset.</p>
          </div>
          <div class="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onclick="exportCMSDataJSON()"
              class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition">
              ⬇ Export JSON Backup
            </button>
            <button
              type="button"
              onclick="resetCMSDataToDefaults()"
              class="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition">
              ↺ Reset to Default Content
            </button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Render List Table for Active Category
  const categoryConfig = {
    hotels: {
      title: 'Manage Hotels & Resorts',
      addBtn: '+ Add New Hotel',
      items: HOTELS_DATA,
      getTitle: item => item.name.en,
      getSub: item => `${item.location.en} • ${item.minBDT} - ${item.maxBDT} BDT`
    },
    destinations: {
      title: 'Manage Sightseeing Spots',
      addBtn: '+ Add New Destination',
      items: DESTINATIONS_DATA,
      getTitle: item => item.name.en,
      getSub: item => `${item.vibe.en} | ${item.directions.en}`
    },
    hiddenGems: {
      title: 'Manage Hidden Gems',
      addBtn: '+ Add New Hidden Gem',
      items: HIDDEN_GEMS_DATA,
      getTitle: item => item.name.en,
      getSub: item => `${item.highlight.en} — ${item.description.en}`
    },
    transport: {
      title: 'Manage Local Transport Routes',
      addBtn: '+ Add New Transport Route',
      items: TRANSPORT_DATA,
      getTitle: item => `${item.route.en} (${item.vehicle.en})`,
      getSub: item => `${item.minBDT}-${item.maxBDT} BDT • ${item.modeNote.en} • ${item.duration.en}`
    },
    faqs: {
      title: 'Manage FAQ Questions & Answers',
      addBtn: '+ Add New FAQ',
      items: FAQ_DATA,
      getTitle: item => item.question.en,
      getSub: item => item.answer.en
    }
  }[active];

  const rowsHTML = categoryConfig.items
    .map(
      item => `
      <div class="p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition">
        <div class="min-w-0">
          <h5 class="font-bold text-slate-900 text-sm sm:text-base truncate">${categoryConfig.getTitle(item)}</h5>
          <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">${categoryConfig.getSub(item)}</p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onclick="openItemEditor('${active}', '${item.id}')"
            class="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition">
            ✎ Edit / Update
          </button>
          <button
            type="button"
            onclick="deleteCMSItem('${active}', '${item.id}')"
            class="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition">
            ✕ Delete
          </button>
        </div>
      </div>
    `
    )
    .join('');

  body.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <h4 class="text-lg font-extrabold text-slate-900">${categoryConfig.title}</h4>
      <button
        type="button"
        onclick="openItemEditor('${active}', null)"
        class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-sm transition">
        ${categoryConfig.addBtn}
      </button>
    </div>
    <div class="space-y-3">
      ${rowsHTML || '<p class="text-sm text-slate-500 py-8 text-center">No items found. Click the button above to add one.</p>'}
    </div>
  `;
}

/* --------------------------------------------------------------------------
 * 5. CREATE / EDIT / UPDATE / DELETE ITEM OPERATIONS
 * -------------------------------------------------------------------------- */
function deleteCMSItem(category, itemId) {
  if (!AdminState.isAuthenticated) return;
  if (!confirm('Are you sure you want to delete this item? This will immediately update the website.')) {
    return;
  }

  if (category === 'hotels') {
    HOTELS_DATA = HOTELS_DATA.filter(i => i.id !== itemId);
  } else if (category === 'destinations') {
    DESTINATIONS_DATA = DESTINATIONS_DATA.filter(i => i.id !== itemId);
  } else if (category === 'hiddenGems') {
    HIDDEN_GEMS_DATA = HIDDEN_GEMS_DATA.filter(i => i.id !== itemId);
  } else if (category === 'transport') {
    TRANSPORT_DATA = TRANSPORT_DATA.filter(i => i.id !== itemId);
  } else if (category === 'faqs') {
    FAQ_DATA = FAQ_DATA.filter(i => i.id !== itemId);
  }

  saveCMSDataToStorage();
  renderAll();
  renderAdminDashboardContent();
  showAdminToast('Item deleted successfully.');
}

function openItemEditor(category, itemId) {
  if (!AdminState.isAuthenticated) {
    openAdminLoginModal();
    return;
  }

  AdminState.editingCategory = category;
  AdminState.editingId = itemId;

  const modal = document.getElementById('admin-editor-modal');
  const titleEl = document.getElementById('admin-editor-title');
  const fieldsContainer = document.getElementById('admin-editor-fields');
  if (!modal || !fieldsContainer) return;

  const isEdit = Boolean(itemId);
  let item = null;

  if (category === 'hotels') {
    item = HOTELS_DATA.find(i => i.id === itemId) || {
      name: { en: '', bn: '' },
      locationKey: 'Sugandha Beach',
      location: { en: 'Sugandha Beach', bn: 'সুগন্ধা বিচ' },
      minBDT: 2000,
      maxBDT: 4000,
      rating: '4.5',
      badge: { en: 'Featured Stay', bn: 'জনপ্রিয় হোটেল' },
      amenities: { en: ['Near beach', 'Free Wi-Fi'], bn: ['সৈকতের কাছে', 'ফ্রি ওয়াই-ফাই'] },
      description: { en: '', bn: '' },
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80'
    };
    titleEl.textContent = isEdit ? `Edit Hotel: ${item.name.en}` : 'Add New Hotel';

    fieldsContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Hotel Name (English) *</label>
          <input id="f-name-en" type="text" required value="${escapeAttr(item.name.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Hotel Name (Bengali - Optional)</label>
          <input id="f-name-bn" type="text" value="${escapeAttr(item.name.bn)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Location Area (English) *</label>
          <input id="f-loc-en" type="text" required value="${escapeAttr(item.location.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Location Area (Bengali)</label>
          <input id="f-loc-bn" type="text" value="${escapeAttr(item.location.bn)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Min Rate (BDT / night) *</label>
          <input id="f-min-bdt" type="number" required value="${item.minBDT}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Max Rate (BDT / night) *</label>
          <input id="f-max-bdt" type="number" required value="${item.maxBDT}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Rating (e.g. 4.6)</label>
          <input id="f-rating" type="text" value="${escapeAttr(item.rating)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Badge Label (English)</label>
          <input id="f-badge-en" type="text" value="${escapeAttr(item.badge.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">Amenities (Comma-separated, English) *</label>
          <input id="f-amenities-en" type="text" required value="${escapeAttr(item.amenities.en.join(', '))}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">Amenities (Comma-separated, Bengali)</label>
          <input id="f-amenities-bn" type="text" value="${escapeAttr(item.amenities.bn.join(', '))}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">Description (English) *</label>
          <textarea id="f-desc-en" rows="2" required class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(item.description.en)}</textarea>
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">Description (Bengali)</label>
          <textarea id="f-desc-bn" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(item.description.bn)}</textarea>
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">Image URL *</label>
          <input id="f-image" type="url" required value="${escapeAttr(item.image)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
      </div>
    `;
  } else if (category === 'destinations') {
    item = DESTINATIONS_DATA.find(i => i.id === itemId) || {
      name: { en: '', bn: '' },
      tag: { en: 'Coastal Spot', bn: 'দর্শনীয় স্থান' },
      vibe: { en: '', bn: '' },
      directions: { en: '', bn: '' },
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80'
    };
    titleEl.textContent = isEdit ? `Edit Destination: ${item.name.en}` : 'Add New Sightseeing Spot';

    fieldsContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Spot Name (English) *</label>
          <input id="f-name-en" type="text" required value="${escapeAttr(item.name.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Spot Name (Bengali)</label>
          <input id="f-name-bn" type="text" value="${escapeAttr(item.name.bn)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Category Tag (English) *</label>
          <input id="f-tag-en" type="text" required value="${escapeAttr(item.tag.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Category Tag (Bengali)</label>
          <input id="f-tag-bn" type="text" value="${escapeAttr(item.tag.bn)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">The Vibe (English) *</label>
          <input id="f-vibe-en" type="text" required value="${escapeAttr(item.vibe.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">The Vibe (Bengali)</label>
          <input id="f-vibe-bn" type="text" value="${escapeAttr(item.vibe.bn)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">Directions (English) *</label>
          <input id="f-dir-en" type="text" required value="${escapeAttr(item.directions.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">Directions (Bengali)</label>
          <input id="f-dir-bn" type="text" value="${escapeAttr(item.directions.bn)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">Image URL *</label>
          <input id="f-image" type="url" required value="${escapeAttr(item.image)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
      </div>
    `;
  } else if (category === 'hiddenGems') {
    item = HIDDEN_GEMS_DATA.find(i => i.id === itemId) || {
      name: { en: '', bn: '' },
      highlight: { en: '', bn: '' },
      description: { en: '', bn: '' },
      icon: 'sunset'
    };
    titleEl.textContent = isEdit ? `Edit Hidden Gem: ${item.name.en}` : 'Add New Hidden Gem';

    fieldsContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Gem Name (English) *</label>
          <input id="f-name-en" type="text" required value="${escapeAttr(item.name.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Gem Name (Bengali)</label>
          <input id="f-name-bn" type="text" value="${escapeAttr(item.name.bn)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Highlight Tag (English) *</label>
          <input id="f-high-en" type="text" required value="${escapeAttr(item.highlight.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Highlight Tag (Bengali)</label>
          <input id="f-high-bn" type="text" value="${escapeAttr(item.highlight.bn)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">Description (English) *</label>
          <textarea id="f-desc-en" rows="2" required class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(item.description.en)}</textarea>
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700 mb-1">Description (Bengali)</label>
          <textarea id="f-desc-bn" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(item.description.bn)}</textarea>
        </div>
      </div>
    `;
  } else if (category === 'transport') {
    item = TRANSPORT_DATA.find(i => i.id === itemId) || {
      route: { en: '', bn: '' },
      vehicle: { en: 'Tomtom (Easybike)', bn: 'টমটম (ইজিবাইক)' },
      vehicleKey: 'tomtom',
      minBDT: 20,
      maxBDT: 30,
      modeNote: { en: 'Shared', bn: 'শেয়ারড' },
      duration: { en: '15 mins', bn: '১৫ মিনিট' }
    };
    titleEl.textContent = isEdit ? `Edit Route: ${item.route.en}` : 'Add New Transport Route';

    fieldsContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Route Name (English) *</label>
          <input id="f-route-en" type="text" required value="${escapeAttr(item.route.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Route Name (Bengali)</label>
          <input id="f-route-bn" type="text" value="${escapeAttr(item.route.bn)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Vehicle Label (English) *</label>
          <input id="f-veh-en" type="text" required value="${escapeAttr(item.vehicle.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Tooltip Glossary Type</label>
          <select id="f-veh-key" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">
            <option value="tomtom" ${item.vehicleKey === 'tomtom' ? 'selected' : ''}>Tomtom (Easybike)</option>
            <option value="chander_gari" ${item.vehicleKey === 'chander_gari' ? 'selected' : ''}>Chander Gari (Jeep)</option>
            <option value="cng" ${item.vehicleKey === 'cng' ? 'selected' : ''}>CNG Auto-Rickshaw</option>
            <option value="speedboat" ${item.vehicleKey === 'speedboat' ? 'selected' : ''}>Speedboat</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Min Fare (BDT) *</label>
          <input id="f-min-bdt" type="number" required value="${item.minBDT}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Max Fare (BDT) *</label>
          <input id="f-max-bdt" type="number" required value="${item.maxBDT}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Booking Type (e.g., Shared, Reserved) *</label>
          <input id="f-mode-en" type="text" required value="${escapeAttr(item.modeNote.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Estimated Duration (e.g., 20 mins) *</label>
          <input id="f-dur-en" type="text" required value="${escapeAttr(item.duration.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
      </div>
    `;
  } else if (category === 'faqs') {
    item = FAQ_DATA.find(i => i.id === itemId) || {
      question: { en: '', bn: '' },
      answer: { en: '', bn: '' }
    };
    titleEl.textContent = isEdit ? 'Edit FAQ Item' : 'Add New FAQ Item';

    fieldsContainer.innerHTML = `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Question (English) *</label>
          <input id="f-q-en" type="text" required value="${escapeAttr(item.question.en)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Question (Bengali)</label>
          <input id="f-q-bn" type="text" value="${escapeAttr(item.question.bn)}" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Answer (English) *</label>
          <textarea id="f-a-en" rows="3" required class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(item.answer.en)}</textarea>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Answer (Bengali)</label>
          <textarea id="f-a-bn" rows="3" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm">${escapeHtml(item.answer.bn)}</textarea>
        </div>
      </div>
    `;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeEditorModal() {
  const modal = document.getElementById('admin-editor-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleSaveItemSubmit(e) {
  if (e) e.preventDefault();
  const cat = AdminState.editingCategory;
  const id = AdminState.editingId || `${cat}-${Date.now()}`;

  const val = sel => (document.getElementById(sel)?.value || '').trim();

  if (cat === 'hotels') {
    const nameEn = val('f-name-en');
    const nameBn = val('f-name-bn') || nameEn;
    const locEn = val('f-loc-en');
    const locBn = val('f-loc-bn') || locEn;
    const badgeEn = val('f-badge-en') || 'Featured';
    const amenitiesEn = val('f-amenities-en').split(',').map(s => s.trim()).filter(Boolean);
    const amenitiesBnRaw = val('f-amenities-bn').split(',').map(s => s.trim()).filter(Boolean);
    const amenitiesBn = amenitiesBnRaw.length ? amenitiesBnRaw : amenitiesEn;
    const descEn = val('f-desc-en');
    const descBn = val('f-desc-bn') || descEn;

    const newObj = {
      id,
      name: { en: nameEn, bn: nameBn },
      locationKey: locEn,
      location: { en: locEn, bn: locBn },
      minBDT: Number(val('f-min-bdt')) || 1500,
      maxBDT: Number(val('f-max-bdt')) || 3000,
      rating: val('f-rating') || '4.5',
      badge: { en: badgeEn, bn: badgeEn },
      amenities: { en: amenitiesEn, bn: amenitiesBn },
      description: { en: descEn, bn: descBn },
      image: val('f-image')
    };

    upsertItem(HOTELS_DATA, id, newObj);
  } else if (cat === 'destinations') {
    const nameEn = val('f-name-en');
    const tagEn = val('f-tag-en');
    const vibeEn = val('f-vibe-en');
    const dirEn = val('f-dir-en');

    const newObj = {
      id,
      name: { en: nameEn, bn: val('f-name-bn') || nameEn },
      tag: { en: tagEn, bn: val('f-tag-bn') || tagEn },
      vibe: { en: vibeEn, bn: val('f-vibe-bn') || vibeEn },
      directions: { en: dirEn, bn: val('f-dir-bn') || dirEn },
      image: val('f-image')
    };

    upsertItem(DESTINATIONS_DATA, id, newObj);
  } else if (cat === 'hiddenGems') {
    const nameEn = val('f-name-en');
    const highEn = val('f-high-en');
    const descEn = val('f-desc-en');

    const newObj = {
      id,
      name: { en: nameEn, bn: val('f-name-bn') || nameEn },
      highlight: { en: highEn, bn: val('f-high-bn') || highEn },
      description: { en: descEn, bn: val('f-desc-bn') || descEn },
      icon: 'sunset'
    };

    upsertItem(HIDDEN_GEMS_DATA, id, newObj);
  } else if (cat === 'transport') {
    const routeEn = val('f-route-en');
    const vehEn = val('f-veh-en');
    const modeEn = val('f-mode-en');
    const durEn = val('f-dur-en');

    const newObj = {
      id,
      route: { en: routeEn, bn: val('f-route-bn') || routeEn },
      vehicle: { en: vehEn, bn: vehEn },
      vehicleKey: val('f-veh-key') || 'tomtom',
      minBDT: Number(val('f-min-bdt')) || 20,
      maxBDT: Number(val('f-max-bdt')) || 30,
      modeNote: { en: modeEn, bn: modeEn },
      duration: { en: durEn, bn: durEn }
    };

    upsertItem(TRANSPORT_DATA, id, newObj);
  } else if (cat === 'faqs') {
    const qEn = val('f-q-en');
    const aEn = val('f-a-en');

    const newObj = {
      id,
      question: { en: qEn, bn: val('f-q-bn') || qEn },
      answer: { en: aEn, bn: val('f-a-bn') || aEn }
    };

    upsertItem(FAQ_DATA, id, newObj);
  }

  saveCMSDataToStorage();
  closeEditorModal();
  renderAll();
  renderAdminDashboardContent();
  showAdminToast('Content saved and updated live on the website!');
}

function upsertItem(arrayRef, id, newObj) {
  const idx = arrayRef.findIndex(i => i.id === id);
  if (idx >= 0) {
    arrayRef[idx] = newObj;
  } else {
    arrayRef.push(newObj);
  }
}

/* --------------------------------------------------------------------------
 * 6. SETTINGS, EXPORT & FACTORY RESET HANDLERS
 * -------------------------------------------------------------------------- */
function handleSaveExchangeRate(e) {
  if (e) e.preventDefault();
  const rate = Number(document.getElementById('admin-setting-rate')?.value);
  if (rate && rate > 0) {
    CONFIG.exchangeRateUSD = rate;
    saveCMSDataToStorage();
    renderAll();
    showAdminToast(`Exchange rate updated: 1 USD = ${rate} BDT`);
  }
}

function handleSaveAdminCredentials(e) {
  if (e) e.preventDefault();
  const username = (document.getElementById('admin-setting-username')?.value || '').trim();
  const password = (document.getElementById('admin-setting-password')?.value || '').trim();
  if (!username || !password) return;

  localStorage.setItem(
    ADMIN_CREDS_STORAGE_KEY,
    JSON.stringify({ username, altUsername: 'anikbarua', password })
  );
  showAdminToast('Administrator credentials updated successfully!');
}

function exportCMSDataJSON() {
  const payload = {
    exchangeRateUSD: CONFIG.exchangeRateUSD,
    hotels: HOTELS_DATA,
    destinations: DESTINATIONS_DATA,
    hiddenGems: HIDDEN_GEMS_DATA,
    transport: TRANSPORT_DATA,
    faqs: FAQ_DATA,
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'visit-cox-cms-data.json';
  a.click();
  URL.revokeObjectURL(url);
  showAdminToast('Downloaded visit-cox-cms-data.json backup.');
}

function resetCMSDataToDefaults() {
  if (!confirm('Reset all Hotels, Spots, Transport fares, and FAQs back to the original factory data?')) {
    return;
  }
  localStorage.removeItem(CMS_STORAGE_KEY);
  CONFIG.exchangeRateUSD = FACTORY_DEFAULTS.exchangeRateUSD;
  HOTELS_DATA = JSON.parse(JSON.stringify(FACTORY_DEFAULTS.hotels));
  DESTINATIONS_DATA = JSON.parse(JSON.stringify(FACTORY_DEFAULTS.destinations));
  HIDDEN_GEMS_DATA = JSON.parse(JSON.stringify(FACTORY_DEFAULTS.hiddenGems));
  TRANSPORT_DATA = JSON.parse(JSON.stringify(FACTORY_DEFAULTS.transport));
  FAQ_DATA = JSON.parse(JSON.stringify(FACTORY_DEFAULTS.faqs));

  renderAll();
  renderAdminDashboardContent();
  showAdminToast('All website content restored to original defaults.');
}

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

document.addEventListener('DOMContentLoaded', () => {
  updateAdminUI();
});
