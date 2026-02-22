/* ============================================
   SPESATRACKER - APP.JS
   Complete Expense Tracking Application
   ============================================ */

// ═══════════════════════════════════════════
//  CONFIGURATION & CONSTANTS
// ═══════════════════════════════════════════

const CATEGORIES = [
    { id: 'frutta_verdura', name: 'Frutta e Verdura', icon: '🍎' },
    { id: 'carne_pesce', name: 'Carne e Pesce', icon: '🥩' },
    { id: 'latticini', name: 'Latticini e Uova', icon: '🧀' },
    { id: 'pane_cereali', name: 'Pane e Cereali', icon: '🍞' },
    { id: 'dispensa', name: 'Dispensa', icon: '🥫' },
    { id: 'surgelati', name: 'Surgelati', icon: '🧊' },
    { id: 'bevande', name: 'Bevande', icon: '🥤' },
    { id: 'snack_dolci', name: 'Snack e Dolci', icon: '🍫' },
    { id: 'casa_pulizia', name: 'Casa e Pulizia', icon: '🧹' },
    { id: 'igiene', name: 'Igiene e Cura', icon: '🧴' },
    { id: 'salute', name: 'Salute', icon: '💊' },
    { id: 'ristorante', name: 'Ristorante/Bar', icon: '🍽️' },
    { id: 'trasporti', name: 'Trasporti', icon: '⛽' },
    { id: 'svago', name: 'Svago', icon: '🎭' },
    { id: 'abbigliamento', name: 'Abbigliamento', icon: '👗' },
    { id: 'bollette', name: 'Bollette', icon: '🏠' },
    { id: 'tecnologia', name: 'Tecnologia', icon: '📱' },
    { id: 'altro', name: 'Altro', icon: '📦' },
];

const CATEGORY_KEYWORDS = {
    frutta_verdura: [
        'mela', 'mele', 'banana', 'banane', 'arancia', 'arance', 'limone', 'limoni',
        'pomodoro', 'pomodori', 'pachino', 'ciliegino', 'insalata', 'lattuga', 'rucola',
        'carota', 'carote', 'zucchina', 'zucchine', 'patata', 'patate', 'cipolla', 'cipolle',
        'aglio', 'peperone', 'peperoni', 'melanzana', 'melanzane', 'spinaci', 'broccoli',
        'cavolfiore', 'cavolo', 'sedano', 'finocchio', 'basilico', 'prezzemolo', 'pera',
        'pere', 'pesca', 'pesche', 'uva', 'fragola', 'fragole', 'kiwi', 'ananas', 'mango',
        'avocado', 'cetriolo', 'cetrioli', 'fungo', 'funghi', 'verdura', 'verdure', 'frutta',
        'golden', 'fuji', 'gala', 'radicchio', 'zucca', 'carciofo', 'carciofi', 'asparagi',
        'fagiolini', 'piselli freschi', 'rapa', 'rape', 'porro', 'porri',
    ],
    carne_pesce: [
        'pollo', 'manzo', 'vitello', 'maiale', 'agnello', 'tacchino', 'salmone', 'tonno',
        'merluzzo', 'gambero', 'gamberi', 'calamaro', 'calamari', 'cozze', 'vongole',
        'prosciutto', 'salame', 'mortadella', 'bresaola', 'speck', 'pancetta', 'salsiccia',
        'salsicce', 'hamburger', 'bistecca', 'filetto', 'cotoletta', 'petto', 'coscia',
        'carne', 'pesce', 'wurstel', 'würstel', 'arrosto', 'scaloppina', 'carpaccio',
        'coppa', 'lonza', 'guanciale', 'baccalà', 'orata', 'branzino', 'trota', 'acciughe',
        'alici', 'sgombro', 'polpo', 'seppia', 'seppie',
    ],
    latticini: [
        'latte', 'yogurt', 'formaggio', 'mozzarella', 'parmigiano', 'grana padano',
        'ricotta', 'mascarpone', 'burro', 'panna', 'uova', 'uovo', 'stracchino',
        'gorgonzola', 'pecorino', 'provolone', 'scamorza', 'philadelphia', 'kefir',
        'latticini', 'emmental', 'edamer', 'asiago', 'fontina', 'taleggio', 'brie',
        'camembert', 'crescenza', 'primo sale', 'caciotta',
    ],
    pane_cereali: [
        'pane', 'pasta', 'riso', 'farina', 'cereali', 'biscotti', 'crackers', 'grissini',
        'fette biscottate', 'cornflakes', 'muesli', 'spaghetti', 'penne', 'fusilli',
        'rigatoni', 'lasagna', 'tortellini', 'ravioli', 'gnocchi', 'pancarré', 'focaccia',
        'pizza', 'panino', 'brioche', 'croissant', 'casereccio', 'integrale', 'cous cous',
        'orzo', 'farro', 'avena', 'tagliatelle', 'bucatini', 'orecchiette', 'farfalle',
        'linguine', 'paccheri', 'mezze maniche',
    ],
    dispensa: [
        'olio', 'oliva', 'aceto', 'sale', 'pepe', 'zucchero', 'miele', 'marmellata',
        'confettura', 'nutella', 'salsa', 'passata', 'pelati', 'pomodoro pelato',
        'dado', 'spezie', 'origano', 'rosmarino', 'conserva', 'legumi', 'fagioli',
        'ceci', 'lenticchie', 'piselli', 'mais', 'tonno scatola', 'sottoli', 'sottaceti',
        'maionese', 'ketchup', 'senape', 'pesto', 'ragù', 'sugo',
    ],
    surgelati: [
        'surgelat', 'gelato', 'frozen', 'bastoncini', 'findus', 'quattro salti',
        'minestrone surg', 'pizza surg', 'ghiaccioli', 'sorbetto',
    ],
    bevande: [
        'acqua', 'vino', 'birra', 'succo', 'coca cola', 'coca-cola', 'pepsi', 'sprite',
        'fanta', 'aranciata', 'limonata', 'the', 'thè', 'tè', 'caffè', 'caffe',
        'tisana', 'camomilla', 'bevanda', 'drink', 'prosecco', 'spumante', 'aperol',
        'campari', 'amaro', 'grappa', 'liquore', 'energy drink', 'redbull', 'monster',
    ],
    snack_dolci: [
        'cioccolato', 'cioccolata', 'caramelle', 'gomme', 'patatine', 'chips', 'snack',
        'merendina', 'torta', 'dolce', 'budino', 'crostata', 'wafer', 'barretta',
        'biscotto', 'pasticcino', 'cornetto', 'brioches', 'muffin', 'plumcake',
    ],
    casa_pulizia: [
        'detersivo', 'sapone piatti', 'candeggina', 'ammorbidente', 'spugna', 'spugne',
        'carta igienica', 'scottex', 'rotolone', 'alluminio', 'pellicola', 'sacchetti',
        'sacchi', 'pattumiera', 'mocio', 'scopa', 'detergente', 'sgrassatore',
        'anticalcare', 'napisan', 'ace', 'swiffer', 'pile', 'batterie', 'lampadina',
    ],
    igiene: [
        'shampoo', 'bagnoschiuma', 'dentifricio', 'spazzolino', 'deodorante', 'crema',
        'sapone mani', 'assorbenti', 'pannolini', 'fazzoletti', 'cotton fioc',
        'rasoio', 'schiuma barba', 'collutorio', 'balsamo capelli',
    ],
};

const MONTH_NAMES = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

const WEEKDAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

// Chart.js defaults
Chart.defaults.color = '#8888a8';
Chart.defaults.borderColor = 'rgba(37,42,64,.5)';
Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif";

// ═══════════════════════════════════════════
//  UTILITY FUNCTIONS
// ═══════════════════════════════════════════

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const fmt = (n) => '€' + Number(n).toFixed(2);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const today = () => new Date().toISOString().split('T')[0];

function getCatInfo(catId) {
    return CATEGORIES.find(c => c.id === catId) || CATEGORIES[CATEGORIES.length - 1];
}

function toast(msg, type = 'info') {
    const c = $('#toast-container');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3500);
}

function showLoading(show = true) {
    $('#loading-overlay').style.display = show ? 'flex' : 'none';
}

// ═══════════════════════════════════════════
//  SETTINGS MANAGER
// ═══════════════════════════════════════════

const Settings = {
    _defaults: {
        apiUrl: 'https://script.google.com/macros/s/AKfycbx6P29pl0Q4HpR1Dy9mNUuxV8C3gGAhv-uqGvrF0K4SUIMJvDEXf9pbOtJEUV3dceOQ/exec',
        name1: 'Alberto',
        name2: 'Valentina',
        budget: 1500,
        theme: 'light',
    },
    get() {
        const saved = localStorage.getItem('spesa_settings');
        return { ...this._defaults, ...(saved ? JSON.parse(saved) : {}) };
    },
    save(s) {
        localStorage.setItem('spesa_settings', JSON.stringify(s));
    }
};

// ═══════════════════════════════════════════
//  DATA STORE  (localStorage + Google Sheets)
// ═══════════════════════════════════════════

const DataStore = {
    _cache: [],

    async load() {
        const settings = Settings.get();
        // Try Google Sheets first
        if (settings.apiUrl) {
            try {
                const res = await fetch(settings.apiUrl + '?action=getAll');
                const json = await res.json();
                if (json.success) {
                    this._cache = json.data.map(row => ({
                        id: row[0],
                        date: row[1],
                        person: row[2],
                        category: row[3],
                        description: row[4],
                        amount: parseFloat(row[5]),
                        store: row[6] || '',
                        notes: row[7] || '',
                        items: row[8] ? JSON.parse(row[8]) : [],
                    }));
                    // Sync to localStorage as backup
                    localStorage.setItem('spesa_data', JSON.stringify(this._cache));
                    return this._cache;
                }
            } catch (e) {
                console.warn('Google Sheets non disponibile, uso localStorage', e);
            }
        }
        // Fallback to localStorage
        const local = localStorage.getItem('spesa_data');
        this._cache = local ? JSON.parse(local) : [];
        return this._cache;
    },

    getAll() {
        return [...this._cache];
    },

    async add(expense) {
        expense.id = expense.id || uid();
        this._cache.push(expense);
        this._saveLocal();
        await this._syncToSheets('add', expense);
        return expense;
    },

    async update(expense) {
        const idx = this._cache.findIndex(e => e.id === expense.id);
        if (idx >= 0) {
            this._cache[idx] = expense;
            this._saveLocal();
            await this._syncToSheets('update', expense);
        }
    },

    async remove(id) {
        this._cache = this._cache.filter(e => e.id !== id);
        this._saveLocal();
        await this._syncToSheets('delete', { id });
    },

    _saveLocal() {
        localStorage.setItem('spesa_data', JSON.stringify(this._cache));
    },

    async _syncToSheets(action, data) {
        const settings = Settings.get();
        if (!settings.apiUrl) return;
        try {
            await fetch(settings.apiUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, ...data, items: JSON.stringify(data.items || []) }),
            });
        } catch (e) {
            console.warn('Sync errore:', e);
        }
    },

    importData(data) {
        this._cache = data;
        this._saveLocal();
    },

    exportData() {
        return JSON.stringify(this._cache, null, 2);
    }
};

// ═══════════════════════════════════════════
//  AUTO-CATEGORIZER
// ═══════════════════════════════════════════

function categorizeItem(itemName) {
    const lower = itemName.toLowerCase().trim();
    let bestCat = 'altro';
    let bestScore = 0;

    for (const [catId, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        for (const kw of keywords) {
            if (lower.includes(kw) && kw.length > bestScore) {
                bestCat = catId;
                bestScore = kw.length;
            }
        }
    }
    return bestCat;
}

// ═══════════════════════════════════════════
//  OCR & RECEIPT PARSER
// ═══════════════════════════════════════════

const ReceiptScanner = {
    async scan(imageSource) {
        const progressFill = $('#progress-fill');
        const progressText = $('#progress-text');
        $('#scan-progress').style.display = 'block';
        progressFill.style.width = '20%';
        progressText.textContent = 'Invio a Gemini AI...';

        try {
            const settings = Settings.get();
            if (!settings.apiUrl) {
                toast('Configura l\'URL di Google Script nelle impostazioni', 'error');
                return null;
            }

            // Extract base64 part
            const base64 = imageSource.split(',')[1];

            const response = await fetch(settings.apiUrl, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'scan',
                    image: base64
                })
            });

            const result = await response.json();

            if (result.success && result.analysis && !result.analysis.error) {
                progressFill.style.width = '100%';
                progressText.textContent = 'Analisi completata!';
                return {
                    rawText: 'Analisi effettuata con successo tramite AI.',
                    ...result.analysis
                };
            } else {
                throw new Error(result.analysis?.error || 'Errore API Gemini');
            }
        } catch (err) {
            console.error('Scan Error:', err);
            toast(`Errore scansione: ${err.message}`, 'error');
            return null;
        }
    },

    parseReceipt(text) {
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        const result = {
            rawText: text,
            store: this._extractStore(lines),
            date: this._extractDate(text),
            total: this._extractTotal(text),
            items: this._extractItems(lines),
        };
        return result;
    },

    _extractStore(lines) {
        // Store name is usually in the first 3-4 lines
        const storePatterns = [
            /conad/i, /esselunga/i, /coop/i, /lidl/i, /eurospin/i, /aldi/i,
            /carrefour/i, /penny/i, /md\s/i, /pam/i, /despar/i, /spar/i,
            /tigre/i, /sigma/i, /simply/i, /iper/i, /bennet/i, /famila/i,
            /interspar/i, /todis/i, /prix/i, /auchan/i, /ipercoop/i,
            /supermercato/i, /market/i, /discount/i, /alimentari/i,
        ];
        for (let i = 0; i < Math.min(5, lines.length); i++) {
            for (const pat of storePatterns) {
                if (pat.test(lines[i])) return lines[i];
            }
        }
        // Return first non-empty, non-numeric line
        for (let i = 0; i < Math.min(3, lines.length); i++) {
            if (lines[i].length > 2 && !/^\d+$/.test(lines[i])) return lines[i];
        }
        return '';
    },

    _extractDate(text) {
        // DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
        const m = text.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
        if (m) {
            const day = m[1].padStart(2, '0');
            const month = m[2].padStart(2, '0');
            let year = m[3];
            if (year.length === 2) year = '20' + year;
            return `${year}-${month}-${day}`;
        }
        return today();
    },

    _extractTotal(text) {
        // Look for TOTALE, TOT., TOTAL lines
        const patterns = [
            /totale\s*(?:eur|€|euro)?\s*[:\s]*(\d+[,\.]\d{2})/i,
            /tot\.?\s*(?:eur|€|euro)?\s*[:\s]*(\d+[,\.]\d{2})/i,
            /(?:eur|€)\s*(\d+[,\.]\d{2})\s*$/im,
            /totale\s+(\d+[,\.]\d{2})/i,
            /total[e]?\s*(\d+[,\.]\d{2})/i,
        ];

        for (const pat of patterns) {
            const m = text.match(pat);
            if (m) return parseFloat(m[1].replace(',', '.'));
        }

        // Last resort: find the largest number
        const nums = [...text.matchAll(/(\d+[,\.]\d{2})/g)]
            .map(m => parseFloat(m[1].replace(',', '.')))
            .filter(n => n > 0 && n < 10000);
        return nums.length ? Math.max(...nums) : 0;
    },

    _extractItems(lines) {
        const items = [];
        const priceRegex = /(\d+[,\.]\d{2})\s*[A-Z]?\s*$/;
        const skipPatterns = [
            /^totale/i, /^tot\./i, /^subtotale/i, /^contant/i,
            /^resto/i, /^sconto/i, /^carta/i, /^bancomat/i,
            /^iva/i, /^p\.iva/i, /^c\.f/i, /^scontrino/i,
            /^grazie/i, /^arrivederci/i, /^num\./i, /^cassa/i,
            /^euro\s/i, /^cambio/i, /^\d{1,2}[\/\-\.]\d{1,2}/,
        ];

        for (const line of lines) {
            // Skip non-item lines
            if (skipPatterns.some(p => p.test(line))) continue;
            if (line.length < 4) continue;

            const priceMatch = line.match(priceRegex);
            if (priceMatch) {
                const price = parseFloat(priceMatch[1].replace(',', '.'));
                if (price > 0 && price < 1000) {
                    let name = line.slice(0, priceMatch.index).trim();
                    // Clean up: remove quantity info like "1 x", "KG 0.500"
                    name = name.replace(/\d+\s*[xX]\s*/, '').replace(/KG\s*[\d,.]+/gi, '').trim();
                    if (name.length > 1) {
                        items.push({
                            name: name,
                            price: price,
                            category: categorizeItem(name),
                        });
                    }
                }
            }
        }
        return items;
    }
};

// ═══════════════════════════════════════════
//  STATISTICS ENGINE
// ═══════════════════════════════════════════

const Stats = {
    // Filter expenses by criteria
    filter(expenses, { person, month, year } = {}) {
        return expenses.filter(e => {
            if (person && person !== 'all' && e.person !== person) return false;
            if (month && month !== '' && new Date(e.date).getMonth() !== parseInt(month)) return false;
            if (year && year !== '' && new Date(e.date).getFullYear() !== parseInt(year)) return false;
            return true;
        });
    },

    totalAmount(expenses) {
        return expenses.reduce((s, e) => s + e.amount, 0);
    },

    avgDaily(expenses, month, year) {
        const total = this.totalAmount(expenses);
        const now = new Date();
        let days;
        if (parseInt(year) === now.getFullYear() && parseInt(month) === now.getMonth()) {
            days = now.getDate();
        } else {
            days = new Date(year, parseInt(month) + 1, 0).getDate();
        }
        return days > 0 ? total / days : 0;
    },

    byCategory(expenses) {
        const map = {};
        expenses.forEach(e => {
            map[e.category] = (map[e.category] || 0) + e.amount;
        });
        return Object.entries(map)
            .map(([cat, amount]) => ({ category: cat, amount }))
            .sort((a, b) => b.amount - a.amount);
    },

    byPerson(expenses) {
        const map = {};
        expenses.forEach(e => {
            map[e.person] = (map[e.person] || 0) + e.amount;
        });
        return map;
    },

    monthlyTotals(expenses, year) {
        const totals = new Array(12).fill(0);
        expenses.forEach(e => {
            const d = new Date(e.date);
            if (d.getFullYear() === parseInt(year)) {
                totals[d.getMonth()] += e.amount;
            }
        });
        return totals;
    },

    dailyTotals(expenses, month, year) {
        const daysInMonth = new Date(year, parseInt(month) + 1, 0).getDate();
        const totals = new Array(daysInMonth).fill(0);
        expenses.forEach(e => {
            const d = new Date(e.date);
            if (d.getFullYear() === parseInt(year) && d.getMonth() === parseInt(month)) {
                totals[d.getDate() - 1] += e.amount;
            }
        });
        return totals;
    },

    weekdayAvg(expenses) {
        const sums = new Array(7).fill(0);
        const counts = new Array(7).fill(0);
        expenses.forEach(e => {
            const day = new Date(e.date).getDay();
            sums[day] += e.amount;
            counts[day]++;
        });
        return sums.map((s, i) => counts[i] > 0 ? s / counts[i] : 0);
    },

    // Linear regression for prediction
    linearRegression(values) {
        const n = values.length;
        if (n < 2) return { slope: 0, intercept: values[0] || 0 };
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        for (let i = 0; i < n; i++) {
            sumX += i;
            sumY += values[i];
            sumXY += i * values[i];
            sumXX += i * i;
        }
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        return { slope, intercept };
    },

    predict(expenses, monthsAhead = 3) {
        // Get monthly totals for last 12 months
        const now = new Date();
        const monthlyData = [];
        const labels = [];

        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const m = d.getMonth();
            const y = d.getFullYear();
            const monthExpenses = expenses.filter(e => {
                const ed = new Date(e.date);
                return ed.getMonth() === m && ed.getFullYear() === y;
            });
            monthlyData.push(this.totalAmount(monthExpenses));
            labels.push(`${MONTH_NAMES[m].slice(0, 3)} ${y}`);
        }

        // Only use months that have data
        const nonZeroStart = monthlyData.findIndex(v => v > 0);
        const validData = nonZeroStart >= 0 ? monthlyData.slice(nonZeroStart) : monthlyData;
        const { slope, intercept } = this.linearRegression(validData);

        const predictions = [];
        const predLabels = [];
        for (let i = 1; i <= monthsAhead; i++) {
            const idx = validData.length - 1 + i;
            let pred = slope * idx + intercept;
            if (pred < 0) pred = 0;
            predictions.push(Math.round(pred * 100) / 100);
            const fd = new Date(now.getFullYear(), now.getMonth() + i, 1);
            predLabels.push(`${MONTH_NAMES[fd.getMonth()].slice(0, 3)} ${fd.getFullYear()}`);
        }

        return { historical: monthlyData, labels, predictions, predLabels };
    },

    generateInsights(expenses) {
        const insights = [];
        const now = new Date();
        const thisMonth = this.filter(expenses, { month: now.getMonth().toString(), year: now.getFullYear().toString() });
        const lastMonth = this.filter(expenses, {
            month: (now.getMonth() === 0 ? 11 : now.getMonth() - 1).toString(),
            year: (now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()).toString()
        });

        const thisTotal = this.totalAmount(thisMonth);
        const lastTotal = this.totalAmount(lastMonth);

        if (lastTotal > 0) {
            const pctChange = ((thisTotal - lastTotal) / lastTotal * 100).toFixed(1);
            if (pctChange > 10) {
                insights.push({ icon: '📈', type: 'up', text: `Spesa in <strong>aumento del ${pctChange}%</strong> rispetto al mese scorso. Controlla le categorie più costose.` });
            } else if (pctChange < -10) {
                insights.push({ icon: '📉', type: 'down', text: `Ottimo! Spesa in <strong>calo del ${Math.abs(pctChange)}%</strong> rispetto al mese scorso.` });
            } else {
                insights.push({ icon: 'ℹ️', type: 'info', text: `Spesa <strong>stabile</strong> rispetto al mese scorso (${pctChange > 0 ? '+' : ''}${pctChange}%).` });
            }
        }

        // Top category
        const cats = this.byCategory(thisMonth);
        if (cats.length > 0) {
            const top = cats[0];
            const catInfo = getCatInfo(top.category);
            const pct = thisTotal > 0 ? (top.amount / thisTotal * 100).toFixed(0) : 0;
            insights.push({
                icon: catInfo.icon, type: 'info',
                text: `La categoria più costosa è <strong>${catInfo.name}</strong> con ${fmt(top.amount)} (${pct}% del totale).`
            });
        }

        // Person comparison
        const byPerson = this.byPerson(thisMonth);
        const io = byPerson['io'] || 0;
        const partner = byPerson['partner'] || 0;
        if (io > 0 && partner > 0) {
            const diff = io - partner;
            if (Math.abs(diff) > 50) {
                const who = diff > 0 ? Settings.get().name1 : Settings.get().name2;
                insights.push({
                    icon: '👤', type: 'info',
                    text: `<strong>${who}</strong> ha speso ${fmt(Math.abs(diff))} in più questo mese.`
                });
            }
        }

        // Budget
        const budget = Settings.get().budget;
        if (budget > 0 && thisTotal > 0) {
            const pctBudget = (thisTotal / budget * 100).toFixed(0);
            const remaining = budget - thisTotal;
            if (remaining > 0) {
                const daysLeft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
                const dailyBudget = daysLeft > 0 ? (remaining / daysLeft).toFixed(2) : 0;
                insights.push({
                    icon: '🎯', type: 'down',
                    text: `Hai usato il <strong>${pctBudget}%</strong> del budget. Rimangono ${fmt(remaining)} (${fmt(dailyBudget)}/giorno per ${daysLeft} giorni).`
                });
            } else {
                insights.push({
                    icon: '⚠️', type: 'up',
                    text: `<strong>Budget superato!</strong> Hai speso ${fmt(Math.abs(remaining))} oltre il budget di ${fmt(budget)}.`
                });
            }
        }

        // Weekday pattern
        const weekday = this.weekdayAvg(expenses);
        const maxDay = weekday.indexOf(Math.max(...weekday));
        if (Math.max(...weekday) > 0) {
            insights.push({
                icon: '📅', type: 'info',
                text: `Il giorno in cui spendi di più è il <strong>${WEEKDAY_NAMES[maxDay]}</strong> con una media di ${fmt(weekday[maxDay])}.`
            });
        }

        return insights;
    }
};

// ═══════════════════════════════════════════
//  CHART MANAGER
// ═══════════════════════════════════════════

const Charts = {
    _instances: {},

    destroy(id) {
        if (this._instances[id]) {
            this._instances[id].destroy();
            delete this._instances[id];
        }
    },

    _colors: [
        '#6c5ce7', '#00cec9', '#fd79a8', '#fdcb6e', '#00b894',
        '#e17055', '#74b9ff', '#a29bfe', '#55efc4', '#fab1a0',
        '#81ecec', '#ffeaa7', '#dfe6e9', '#b2bec3', '#636e72',
        '#ff7675', '#0984e3', '#e84393',
    ],

    _baseOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10, font: { size: 11 } } },
        },
    },

    renderMonthly(expenses, year) {
        this.destroy('monthly');
        const ctx = $('#chart-monthly');
        if (!ctx) return;

        const allData = Stats.monthlyTotals(expenses, year);
        const ioExpenses = expenses.filter(e => e.person === 'io');
        const partnerExpenses = expenses.filter(e => e.person === 'partner');
        const ioData = Stats.monthlyTotals(ioExpenses, year);
        const partnerData = Stats.monthlyTotals(partnerExpenses, year);

        this._instances['monthly'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: MONTH_NAMES.map(m => m.slice(0, 3)),
                datasets: [
                    {
                        label: Settings.get().name1,
                        data: ioData,
                        backgroundColor: 'rgba(0, 206, 201, 0.7)',
                        borderRadius: 6,
                        borderSkipped: false,
                    },
                    {
                        label: Settings.get().name2,
                        data: partnerData,
                        backgroundColor: 'rgba(253, 121, 168, 0.7)',
                        borderRadius: 6,
                        borderSkipped: false,
                    },
                ]
            },
            options: {
                ...this._baseOptions,
                scales: {
                    x: { stacked: true, grid: { display: false } },
                    y: { stacked: true, beginAtZero: true, ticks: { callback: v => '€' + v } },
                },
            }
        });
    },

    renderCategory(expenses) {
        this.destroy('category');
        const ctx = $('#chart-category');
        if (!ctx) return;

        const data = Stats.byCategory(expenses).slice(0, 8);

        this._instances['category'] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(d => getCatInfo(d.category).icon + ' ' + getCatInfo(d.category).name),
                datasets: [{
                    data: data.map(d => d.amount),
                    backgroundColor: this._colors.slice(0, data.length),
                    borderWidth: 0,
                    spacing: 2,
                }]
            },
            options: {
                ...this._baseOptions,
                cutout: '62%',
                plugins: {
                    ...this._baseOptions.plugins,
                    legend: { position: 'right', labels: { padding: 10, font: { size: 10 }, usePointStyle: true } },
                },
            }
        });
    },

    renderPerson(expenses) {
        this.destroy('person');
        const ctx = $('#chart-person');
        if (!ctx) return;

        const data = Stats.byPerson(expenses);
        const settings = Settings.get();

        this._instances['person'] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [settings.name1, settings.name2],
                datasets: [{
                    data: [data['io'] || 0, data['partner'] || 0],
                    backgroundColor: ['rgba(0, 206, 201, 0.8)', 'rgba(253, 121, 168, 0.8)'],
                    borderWidth: 0,
                    spacing: 3,
                }]
            },
            options: {
                ...this._baseOptions,
                cutout: '62%',
            }
        });
    },

    renderDaily(expenses, month, year) {
        this.destroy('daily');
        const ctx = $('#chart-daily');
        if (!ctx) return;

        const data = Stats.dailyTotals(expenses, month, year);
        const labels = data.map((_, i) => i + 1);

        // Cumulative
        const cumulative = [];
        data.reduce((acc, val) => { cumulative.push(acc + val); return acc + val; }, 0);

        this._instances['daily'] = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Spesa Giornaliera',
                        data: data,
                        borderColor: '#6c5ce7',
                        backgroundColor: 'rgba(108, 92, 231, 0.1)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 3,
                        pointHoverRadius: 6,
                    },
                    {
                        label: 'Cumulativo',
                        data: cumulative,
                        borderColor: '#00cec9',
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0.3,
                        pointRadius: 0,
                        yAxisID: 'y1',
                    }
                ]
            },
            options: {
                ...this._baseOptions,
                scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, ticks: { callback: v => '€' + v } },
                    y1: {
                        position: 'right',
                        beginAtZero: true,
                        grid: { drawOnChartArea: false },
                        ticks: { callback: v => '€' + v },
                    },
                },
            }
        });
    },

    renderPrediction(expenses) {
        this.destroy('prediction');
        const ctx = $('#chart-prediction');
        if (!ctx) return;

        const pred = Stats.predict(expenses, 3);
        const allLabels = [...pred.labels, ...pred.predLabels];
        const histData = [...pred.historical, ...new Array(3).fill(null)];
        const predData = [...new Array(11).fill(null), pred.historical[11], ...pred.predictions];

        this._instances['prediction'] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: allLabels,
                datasets: [
                    {
                        label: 'Storico',
                        data: histData,
                        borderColor: '#6c5ce7',
                        backgroundColor: 'rgba(108,92,231,0.1)',
                        fill: true,
                        tension: 0.35,
                        pointRadius: 4,
                    },
                    {
                        label: 'Previsione',
                        data: predData,
                        borderColor: '#fdcb6e',
                        borderDash: [8, 4],
                        backgroundColor: 'rgba(253,203,110,0.1)',
                        fill: true,
                        tension: 0.35,
                        pointRadius: 5,
                        pointStyle: 'triangle',
                    },
                ]
            },
            options: {
                ...this._baseOptions,
                scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, ticks: { callback: v => '€' + v } },
                },
            }
        });
    },

    renderYoY(expenses) {
        this.destroy('yoy');
        const ctx = $('#chart-yoy');
        if (!ctx) return;

        const now = new Date();
        const thisYear = now.getFullYear();
        const lastYear = thisYear - 1;
        const d1 = Stats.monthlyTotals(expenses, thisYear);
        const d2 = Stats.monthlyTotals(expenses, lastYear);

        this._instances['yoy'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: MONTH_NAMES.map(m => m.slice(0, 3)),
                datasets: [
                    { label: String(lastYear), data: d2, backgroundColor: 'rgba(116,185,255,.5)', borderRadius: 4, borderSkipped: false },
                    { label: String(thisYear), data: d1, backgroundColor: 'rgba(108,92,231,.7)', borderRadius: 4, borderSkipped: false },
                ]
            },
            options: {
                ...this._baseOptions,
                scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, ticks: { callback: v => '€' + v } },
                },
            }
        });
    },

    renderWeekday(expenses) {
        this.destroy('weekday');
        const ctx = $('#chart-weekday');
        if (!ctx) return;

        const data = Stats.weekdayAvg(expenses);

        this._instances['weekday'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: WEEKDAY_NAMES,
                datasets: [{
                    label: 'Media €',
                    data: data,
                    backgroundColor: WEEKDAY_NAMES.map((_, i) =>
                        i === data.indexOf(Math.max(...data))
                            ? 'rgba(225,112,85,0.8)'
                            : 'rgba(108,92,231,0.5)'
                    ),
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                ...this._baseOptions,
                plugins: { ...this._baseOptions.plugins, legend: { display: false } },
                scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, ticks: { callback: v => '€' + v } },
                },
            }
        });
    },
};

// ═══════════════════════════════════════════
//  UI CONTROLLER
// ═══════════════════════════════════════════

const UI = {
    currentView: 'dashboard',
    currentPerson: 'all',
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    sortField: 'date',
    sortDir: -1,

    init() {
        this._bindNavigation();
        this._bindPersonFilter();
        this._bindDateFilters();
        this._bindExpenseForm();
        this._bindScannerUI();
        this._bindHistoryUI();
        this._bindSettingsUI();
        this._bindMobileMenu();
        this._populateSelects();
        this._applyTheme();
        $('#exp-date').value = today();
    },

    // --- Navigation ---
    _bindNavigation() {
        $$('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.dataset.view;
                this.switchView(view);
            });
        });
    },

    switchView(view) {
        this.currentView = view;
        $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === view));
        $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + view));

        // Close mobile menu
        $('#sidebar').classList.remove('open');

        this.refresh();
    },

    // --- Person Filter ---
    _bindPersonFilter() {
        $$('.person-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('.person-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentPerson = btn.dataset.person;
                this.refresh();
            });
        });
    },

    // --- Date Filters ---
    _bindDateFilters() {
        const monthSel = $('#filter-month');
        const yearSel = $('#filter-year');

        if (monthSel) monthSel.addEventListener('change', () => {
            this.currentMonth = parseInt(monthSel.value);
            this.refresh();
        });

        if (yearSel) yearSel.addEventListener('change', () => {
            this.currentYear = parseInt(yearSel.value);
            this.refresh();
        });
    },

    _populateSelects() {
        // Month selects
        const monthSelects = ['#filter-month', '#hist-month'];
        monthSelects.forEach(sel => {
            const el = $(sel);
            if (!el) return;
            el.innerHTML = sel === '#hist-month' ? '<option value="">Tutti i mesi</option>' : '';
            MONTH_NAMES.forEach((name, i) => {
                el.innerHTML += `<option value="${i}" ${i === this.currentMonth && sel === '#filter-month' ? 'selected' : ''}>${name}</option>`;
            });
        });

        // Year selects
        const now = new Date().getFullYear();
        const yearSelects = ['#filter-year', '#hist-year'];
        yearSelects.forEach(sel => {
            const el = $(sel);
            if (!el) return;
            el.innerHTML = sel === '#hist-year' ? '<option value="">Tutti gli anni</option>' : '';
            for (let y = now; y >= now - 5; y--) {
                el.innerHTML += `<option value="${y}" ${y === this.currentYear && sel === '#filter-year' ? 'selected' : ''}>${y}</option>`;
            }
        });

        // Category selects
        const catSelects = ['#exp-category', '#edit-category', '#hist-cat'];
        catSelects.forEach(sel => {
            const el = $(sel);
            if (!el) return;
            el.innerHTML = sel === '#hist-cat' ? '<option value="">Tutte</option>' : '';
            CATEGORIES.forEach(c => {
                el.innerHTML += `<option value="${c.id}">${c.icon} ${c.name}</option>`;
            });
        });
    },

    // --- Theme ---
    _applyTheme() {
        const theme = Settings.get().theme || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        const themeSelect = $('#set-theme');
        if (themeSelect) themeSelect.value = theme;
        // Update Chart.js colors for light theme
        if (theme === 'light') {
            Chart.defaults.color = '#666680';
            Chart.defaults.borderColor = 'rgba(224,227,238,.5)';
        } else {
            Chart.defaults.color = '#8888a8';
            Chart.defaults.borderColor = 'rgba(37,42,64,.5)';
        }
    },

    // --- Mobile Menu ---
    _bindMobileMenu() {
        const toggle = $('#menu-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                $('#sidebar').classList.toggle('open');
            });
        }
    },

    // --- Expense Form ---
    _bindExpenseForm() {
        const form = $('#expense-form');
        const addItemBtn = $('#add-item-btn');

        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => this._addItemRow('#items-list'));
        }

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const items = this._collectItems('#items-list');
                const expense = {
                    date: $('#exp-date').value,
                    person: $('#exp-person').value,
                    category: $('#exp-category').value,
                    description: $('#exp-description').value,
                    amount: parseFloat($('#exp-amount').value),
                    store: $('#exp-store').value,
                    notes: $('#exp-notes').value,
                    items: items,
                };

                showLoading(true);
                await DataStore.add(expense);
                showLoading(false);

                toast('Spesa salvata con successo!', 'success');
                form.reset();
                $('#exp-date').value = today();
                $('#items-list').innerHTML = '';
                this.refresh();
            });
        }
    },

    _addItemRow(containerSel, data = {}) {
        const container = $(containerSel);
        if (!container) return;

        const row = document.createElement('div');
        row.className = 'item-row';
        row.innerHTML = `
            <input type="text" placeholder="Articolo" class="item-name" value="${data.name || ''}">
            <input type="number" step="0.01" placeholder="€" class="item-price" value="${data.price || ''}">
            <select class="item-cat">
                ${CATEGORIES.map(c => `<option value="${c.id}" ${c.id === (data.category || '') ? 'selected' : ''}>${c.icon} ${c.name}</option>`).join('')}
            </select>
            <button type="button" class="item-remove" title="Rimuovi">✕</button>
        `;

        row.querySelector('.item-remove').addEventListener('click', () => row.remove());

        // Auto-categorize on name change
        const nameInput = row.querySelector('.item-name');
        const catSelect = row.querySelector('.item-cat');
        nameInput.addEventListener('blur', () => {
            if (nameInput.value) {
                catSelect.value = categorizeItem(nameInput.value);
            }
        });

        container.appendChild(row);
    },

    _collectItems(containerSel) {
        const rows = $$(containerSel + ' .item-row');
        return Array.from(rows).map(row => ({
            name: row.querySelector('.item-name').value,
            price: parseFloat(row.querySelector('.item-price').value) || 0,
            category: row.querySelector('.item-cat').value,
        })).filter(item => item.name);
    },

    // --- Scanner UI ---
    _bindScannerUI() {
        const fileInput = $('#scan-input');
        const uploadZone = $('#upload-zone');
        const previewSection = $('#scan-preview');
        const previewImg = $('#preview-img');
        const startBtn = $('#start-scan-btn');
        const resetBtn = $('#reset-scan-btn');
        const saveBtn = $('#save-scan-btn');
        const discardBtn = $('#discard-scan-btn');

        // Drag and drop
        if (uploadZone) {
            ['dragenter', 'dragover'].forEach(evt => {
                uploadZone.addEventListener(evt, (e) => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
            });
            ['dragleave', 'drop'].forEach(evt => {
                uploadZone.addEventListener(evt, (e) => { e.preventDefault(); uploadZone.classList.remove('drag-over'); });
            });
            uploadZone.addEventListener('drop', (e) => {
                const file = e.dataTransfer.files[0];
                if (file) this._handleScanFile(file);
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', () => {
                if (fileInput.files[0]) this._handleScanFile(fileInput.files[0]);
            });
        }

        if (startBtn) {
            startBtn.addEventListener('click', async () => {
                const result = await ReceiptScanner.scan(previewImg.src);
                if (result) this._showScanResults(result);
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this._resetScan());
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', async () => {
                await this._saveScanResults();
            });
        }

        if (discardBtn) {
            discardBtn.addEventListener('click', () => this._resetScan());
        }
    },

    _handleScanFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            $('#preview-img').src = e.target.result;
            $('#upload-zone').style.display = 'none';
            $('#scan-preview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    },

    _showScanResults(result) {
        $('#scan-progress').style.display = 'none';
        $('#scan-results').style.display = 'block';

        $('#ocr-text').textContent = result.rawText;
        $('#scan-store').value = result.store;
        $('#scan-date').value = result.date;
        $('#scan-total').value = result.total;

        const list = $('#scan-items-list');
        list.innerHTML = '';
        result.items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'scan-item-row';
            row.innerHTML = `
                <input type="text" class="item-name" value="${item.name}">
                <input type="number" step="0.01" class="item-price" value="${item.price}">
                <select class="item-cat">
                    ${CATEGORIES.map(c => `<option value="${c.id}" ${c.id === item.category ? 'selected' : ''}>${c.icon} ${c.name}</option>`).join('')}
                </select>
                <button type="button" class="item-remove" onclick="this.parentElement.remove()">✕</button>
            `;
            list.appendChild(row);
        });
    },

    async _saveScanResults() {
        const store = $('#scan-store').value;
        const date = $('#scan-date').value || today();
        const total = parseFloat($('#scan-total').value) || 0;
        const person = $('#scan-person').value;

        const itemRows = $$('#scan-items-list .scan-item-row');
        const items = Array.from(itemRows).map(row => ({
            name: row.querySelector('.item-name').value,
            price: parseFloat(row.querySelector('.item-price').value) || 0,
            category: row.querySelector('.item-cat').value,
        })).filter(i => i.name);

        // Determine main category from items
        const catCounts = {};
        items.forEach(i => { catCounts[i.category] = (catCounts[i.category] || 0) + i.price; });
        const mainCat = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'altro';

        const expense = {
            date,
            person,
            category: mainCat,
            description: `Scontrino ${store}`,
            amount: total || items.reduce((s, i) => s + i.price, 0),
            store,
            notes: `${items.length} articoli scansionati`,
            items,
        };

        showLoading(true);
        await DataStore.add(expense);
        showLoading(false);

        toast(`Scontrino salvato! ${items.length} articoli registrati`, 'success');
        this._resetScan();
        this.refresh();
    },

    _resetScan() {
        $('#upload-zone').style.display = '';
        $('#scan-preview').style.display = 'none';
        $('#scan-progress').style.display = 'none';
        $('#scan-results').style.display = 'none';
        $('#progress-fill').style.width = '0%';
        $('#scan-input').value = '';
        $('#scan-items-list').innerHTML = '';
    },

    // --- History UI ---
    _bindHistoryUI() {
        // Search
        const searchInput = $('#search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => this._renderHistory());
        }

        // Filters
        ['#hist-month', '#hist-year', '#hist-cat', '#hist-person'].forEach(sel => {
            const el = $(sel);
            if (el) el.addEventListener('change', () => this._renderHistory());
        });

        // Sort
        $$('#expense-table th[data-sort]').forEach(th => {
            th.addEventListener('click', () => {
                const field = th.dataset.sort;
                if (this.sortField === field) this.sortDir *= -1;
                else { this.sortField = field; this.sortDir = -1; }
                this._renderHistory();
            });
        });

        // Export CSV
        const exportBtn = $('#export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this._exportCSV());
        }
    },

    _renderHistory() {
        let expenses = DataStore.getAll();

        // Filters
        const histMonth = $('#hist-month')?.value;
        const histYear = $('#hist-year')?.value;
        const histCat = $('#hist-cat')?.value;
        const histPerson = $('#hist-person')?.value;
        const search = ($('#search-input')?.value || '').toLowerCase();

        if (histMonth) expenses = expenses.filter(e => new Date(e.date).getMonth() === parseInt(histMonth));
        if (histYear) expenses = expenses.filter(e => new Date(e.date).getFullYear() === parseInt(histYear));
        if (histCat) expenses = expenses.filter(e => e.category === histCat);
        if (histPerson) expenses = expenses.filter(e => e.person === histPerson);
        if (this.currentPerson !== 'all') expenses = expenses.filter(e => e.person === this.currentPerson);
        if (search) {
            expenses = expenses.filter(e =>
                (e.description || '').toLowerCase().includes(search) ||
                (e.store || '').toLowerCase().includes(search) ||
                (e.notes || '').toLowerCase().includes(search)
            );
        }

        // Sort
        expenses.sort((a, b) => {
            let va = a[this.sortField], vb = b[this.sortField];
            if (this.sortField === 'date') { va = new Date(va); vb = new Date(vb); }
            if (this.sortField === 'amount') { va = Number(va); vb = Number(vb); }
            if (va < vb) return -1 * this.sortDir;
            if (va > vb) return 1 * this.sortDir;
            return 0;
        });

        const tbody = $('#expense-tbody');
        if (!tbody) return;

        const settings = Settings.get();
        tbody.innerHTML = expenses.map(e => {
            const cat = getCatInfo(e.category);
            const personName = e.person === 'comune' ? 'Comune' : (e.person === 'io' ? settings.name1 : settings.name2);
            return `
            <tr>
                <td>${new Date(e.date).toLocaleDateString('it-IT')}</td>
                <td><span class="person-badge ${e.person}">${personName}</span></td>
                <td><span class="cat-badge">${cat.icon} ${cat.name}</span></td>
                <td>${e.description || '-'}${e.store ? ` <small>(${e.store})</small>` : ''}</td>
                <td><strong>${fmt(e.amount)}</strong></td>
                <td>
                    <button class="action-btn" onclick="UI.editExpense('${e.id}')" title="Modifica">✏️</button>
                    <button class="action-btn" onclick="UI.deleteExpense('${e.id}')" title="Elimina">🗑️</button>
                </td>
            </tr>`;
        }).join('');

        const total = expenses.reduce((s, e) => s + e.amount, 0);
        const info = $('#table-info');
        if (info) info.textContent = `${expenses.length} transazioni • Totale: ${fmt(total)}`;
    },

    // --- Edit / Delete ---
    editExpense(id) {
        const expense = DataStore.getAll().find(e => e.id === id);
        if (!expense) return;

        $('#edit-id').value = expense.id;
        $('#edit-date').value = expense.date;
        $('#edit-person').value = expense.person;
        $('#edit-category').value = expense.category;
        $('#edit-amount').value = expense.amount;
        $('#edit-description').value = expense.description || '';
        $('#edit-store').value = expense.store || '';
        $('#edit-notes').value = expense.notes || '';

        const modal = $('#edit-modal');
        modal.classList.add('open');

        // Close handlers
        const closeModal = () => modal.classList.remove('open');
        $('#modal-close-btn').onclick = closeModal;
        modal.querySelector('.modal-backdrop').onclick = closeModal;

        // Save
        $('#edit-form').onsubmit = async (e) => {
            e.preventDefault();
            expense.date = $('#edit-date').value;
            expense.person = $('#edit-person').value;
            expense.category = $('#edit-category').value;
            expense.amount = parseFloat($('#edit-amount').value);
            expense.description = $('#edit-description').value;
            expense.store = $('#edit-store').value;
            expense.notes = $('#edit-notes').value;

            await DataStore.update(expense);
            closeModal();
            toast('Spesa aggiornata!', 'success');
            this.refresh();
        };

        // Delete from modal
        $('#delete-btn').onclick = async () => {
            if (confirm('Eliminare questa spesa?')) {
                await DataStore.remove(id);
                closeModal();
                toast('Spesa eliminata', 'warning');
                this.refresh();
            }
        };
    },

    async deleteExpense(id) {
        if (!confirm('Eliminare questa spesa?')) return;
        await DataStore.remove(id);
        toast('Spesa eliminata', 'warning');
        this.refresh();
    },

    _exportCSV() {
        const expenses = DataStore.getAll();
        const header = 'Data,Persona,Categoria,Descrizione,Importo,Negozio,Note\n';
        const rows = expenses.map(e =>
            `${e.date},"${e.person}","${getCatInfo(e.category).name}","${e.description || ''}",${e.amount},"${e.store || ''}","${e.notes || ''}"`
        ).join('\n');

        const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `spese_${today()}.csv`;
        link.click();
        toast('CSV esportato!', 'success');
    },

    // --- Settings UI ---
    _bindSettingsUI() {
        const saveBtn = $('#save-settings-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const s = {
                    apiUrl: $('#set-api')?.value || '',
                    name1: $('#set-name1')?.value || 'Io',
                    name2: $('#set-name2')?.value || 'Partner',
                    budget: parseInt($('#set-budget')?.value) || 1500,
                    theme: $('#set-theme')?.value || 'dark',
                };
                Settings.save(s);
                this._applyTheme();
                toast('Impostazioni salvate!', 'success');
                this.refresh();
            });
        }

        // Load settings into form
        const s = Settings.get();
        if ($('#set-api')) $('#set-api').value = s.apiUrl;
        if ($('#set-name1')) $('#set-name1').value = s.name1;
        if ($('#set-name2')) $('#set-name2').value = s.name2;
        if ($('#set-budget')) $('#set-budget').value = s.budget;
        if ($('#set-theme')) $('#set-theme').value = s.theme;

        // Export JSON
        $('#export-json-btn')?.addEventListener('click', () => {
            const blob = new Blob([DataStore.exportData()], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `spesa_backup_${today()}.json`;
            link.click();
            toast('Backup esportato!', 'success');
        });

        // Import JSON
        $('#import-btn')?.addEventListener('click', () => $('#import-input')?.click());
        $('#import-input')?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const data = JSON.parse(ev.target.result);
                    DataStore.importData(data);
                    toast(`Importati ${data.length} record!`, 'success');
                    this.refresh();
                } catch (err) {
                    toast('File non valido', 'error');
                }
            };
            reader.readAsText(file);
        });

        // Clear all
        $('#clear-btn')?.addEventListener('click', () => {
            if (confirm('⚠️ Cancellare TUTTI i dati? Questa azione è irreversibile!')) {
                DataStore.importData([]);
                toast('Tutti i dati cancellati', 'warning');
                this.refresh();
            }
        });
    },

    // --- Dashboard Stats ---
    _updateStats(expenses) {
        const monthExpenses = Stats.filter(expenses, {
            person: this.currentPerson,
            month: this.currentMonth.toString(),
            year: this.currentYear.toString(),
        });

        const total = Stats.totalAmount(monthExpenses);
        const avg = Stats.avgDaily(monthExpenses, this.currentMonth, this.currentYear);
        const cats = Stats.byCategory(monthExpenses);
        const topCat = cats[0];

        // Previous month for comparison
        const prevMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
        const prevYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
        const prevExpenses = Stats.filter(expenses, {
            person: this.currentPerson,
            month: prevMonth.toString(),
            year: prevYear.toString(),
        });
        const prevTotal = Stats.totalAmount(prevExpenses);
        const pctChange = prevTotal > 0 ? ((total - prevTotal) / prevTotal * 100).toFixed(1) : 0;

        // Update cards
        this._setStatCard('#stat-total', fmt(total),
            prevTotal > 0 ? `${pctChange > 0 ? '+' : ''}${pctChange}% vs mese prec.` : '',
            pctChange > 5 ? 'negative' : pctChange < -5 ? 'positive' : 'neutral'
        );
        this._setStatCard('#stat-avg', fmt(avg), `${monthExpenses.length} transazioni`, 'neutral');

        if (topCat) {
            const catInfo = getCatInfo(topCat.category);
            this._setStatCard('#stat-top', `${catInfo.icon} ${catInfo.name}`, fmt(topCat.amount), 'neutral');
        }

        this._setStatCard('#stat-count', String(monthExpenses.length),
            `${MONTH_NAMES[this.currentMonth]} ${this.currentYear}`, 'neutral'
        );
    },

    _setStatCard(sel, value, change, changeType) {
        const card = $(sel);
        if (!card) return;
        const valEl = card.querySelector('.stat-value');
        const chgEl = card.querySelector('.stat-change');
        if (valEl) valEl.textContent = value;
        if (chgEl) {
            chgEl.textContent = change;
            chgEl.className = 'stat-change ' + (changeType || 'neutral');
        }
    },

    // --- Recent Transactions ---
    _renderRecent(expenses) {
        const container = $('#recent-list');
        if (!container) return;

        const filtered = Stats.filter(expenses, { person: this.currentPerson });
        const recent = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);
        const settings = Settings.get();

        container.innerHTML = recent.map(e => {
            const cat = getCatInfo(e.category);
            const personName = e.person === 'comune' ? 'Comune' : (e.person === 'io' ? settings.name1 : settings.name2);
            return `
            <div class="recent-item">
                <div class="recent-left">
                    <div class="recent-cat-icon">${cat.icon}</div>
                    <div class="recent-info">
                        <span class="recent-desc">${e.description || cat.name}</span>
                        <span class="recent-meta">${new Date(e.date).toLocaleDateString('it-IT')} • ${personName}${e.store ? ' • ' + e.store : ''}</span>
                    </div>
                </div>
                <span class="recent-amount">${fmt(e.amount)}</span>
            </div>`;
        }).join('');

        if (!recent.length) {
            container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:24px;">Nessuna transazione registrata</p>';
        }
    },

    // --- Insights ---
    _renderInsights(expenses) {
        const container = $('#insights-list');
        if (!container) return;

        const insights = Stats.generateInsights(expenses);
        container.innerHTML = insights.map(ins => `
            <div class="insight-item">
                <div class="insight-icon ${ins.type}">${ins.icon}</div>
                <div class="insight-text">${ins.text}</div>
            </div>
        `).join('');

        if (!insights.length) {
            container.innerHTML = '<p style="color:var(--text-muted);padding:16px;">Aggiungi più dati per generare insights.</p>';
        }
    },

    // --- Main Refresh ---
    refresh() {
        const expenses = DataStore.getAll();

        switch (this.currentView) {
            case 'dashboard':
                this._updateStats(expenses);
                const monthFiltered = Stats.filter(expenses, {
                    person: this.currentPerson,
                    month: this.currentMonth.toString(),
                    year: this.currentYear.toString(),
                });
                Charts.renderMonthly(Stats.filter(expenses, { person: this.currentPerson }), this.currentYear);
                Charts.renderCategory(monthFiltered);
                Charts.renderPerson(monthFiltered);
                Charts.renderDaily(Stats.filter(expenses, { person: this.currentPerson }), this.currentMonth, this.currentYear);
                this._renderRecent(expenses);
                break;

            case 'history':
                this._renderHistory();
                break;

            case 'analysis':
                const filtered = Stats.filter(expenses, { person: this.currentPerson });
                Charts.renderPrediction(filtered);
                Charts.renderYoY(filtered);
                Charts.renderWeekday(filtered);
                this._renderInsights(filtered);
                break;
        }
    },
};

// ═══════════════════════════════════════════
//  APP INITIALIZATION
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', async () => {
    showLoading(true);

    UI.init();

    try {
        await DataStore.load();
        toast('Dati caricati!', 'success');
    } catch (e) {
        console.error('Load error:', e);
        toast('Errore caricamento dati', 'error');
    }

    UI.refresh();
    showLoading(false);

    // Demo data prompt
    if (DataStore.getAll().length === 0) {
        if (confirm('Nessun dato trovato. Vuoi caricare dei dati demo?')) {
            loadDemoData();
        }
    }
});

// ═══════════════════════════════════════════
//  DEMO DATA
// ═══════════════════════════════════════════

function loadDemoData() {
    const cats = ['frutta_verdura', 'carne_pesce', 'latticini', 'pane_cereali', 'bevande',
        'casa_pulizia', 'ristorante', 'trasporti', 'dispensa', 'snack_dolci'];
    const stores = ['Conad', 'Esselunga', 'Lidl', 'Eurospin', 'Carrefour', 'Coop'];
    const descs = [
        'Spesa settimanale', 'Spesa veloce', 'Cena fuori', 'Rifornimento', 'Detersivi',
        'Frutta e verdura', 'Aperitivo', 'Pizza', 'Spesa grossa', 'Colazione bar',
    ];
    const demo = [];
    const now = new Date();

    for (let i = 0; i < 120; i++) {
        const daysAgo = Math.floor(Math.random() * 365);
        const d = new Date(now);
        d.setDate(d.getDate() - daysAgo);

        demo.push({
            id: uid(),
            date: d.toISOString().split('T')[0],
            person: Math.random() > 0.45 ? 'io' : 'partner',
            category: cats[Math.floor(Math.random() * cats.length)],
            description: descs[Math.floor(Math.random() * descs.length)],
            amount: Math.round((5 + Math.random() * 120) * 100) / 100,
            store: stores[Math.floor(Math.random() * stores.length)],
            notes: '',
            items: [],
        });
    }

    DataStore.importData(demo);
    UI.refresh();
    toast('120 record demo caricati!', 'info');
}