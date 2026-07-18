"use client";

import { useState, useEffect } from "react";

// ============================================
// PRODUCT DATA
// ============================================
const EQUIPMENT = [
  {
    id: 1,
    name: "Excavator CAT 320",
    emoji: "🦾",
    description: "Heavy-duty excavator perfect for digging, trenching, and heavy lifting projects.",
    dailyPrice: 450,
    weeklyPrice: 2700,
    monthlyPrice: 9000,
    rating: 4.8,
    reviews: 124,
    available: true,
    specs: ["20 ton capacity", "3.5m dig depth", "Diesel engine", "GPS tracking"],
  },
  {
    id: 2,
    name: "Tower Crane TC5013",
    emoji: "🏗️",
    description: "High-rise tower crane for lifting heavy materials to great heights efficiently.",
    dailyPrice: 850,
    weeklyPrice: 5100,
    monthlyPrice: 17000,
    rating: 4.9,
    reviews: 89,
    available: true,
    specs: ["8 ton max load", "50m radius", "Remote control", "Anti-collision system"],
  },
  {
    id: 3,
    name: "Bulldozer D6T",
    emoji: "🚜",
    description: "Powerful bulldozer for earthmoving, land clearing, and road construction.",
    dailyPrice: 650,
    weeklyPrice: 3900,
    monthlyPrice: 13000,
    rating: 4.7,
    reviews: 76,
    available: true,
    specs: ["230 HP", "Ripper attachment", "GPS grade control", "Eco mode"],
  },
  {
    id: 4,
    name: "Concrete Mixer Truck",
    emoji: "🔄",
    description: "Transit mixer truck for on-site concrete mixing and rapid delivery.",
    dailyPrice: 380,
    weeklyPrice: 2280,
    monthlyPrice: 7600,
    rating: 4.6,
    reviews: 92,
    available: true,
    specs: ["8 cubic meter", "360° rotation", "Water tank included", "Auto wash system"],
  },
  {
    id: 5,
    name: "Forklift 5 Ton",
    emoji: "🔱",
    description: "Versatile forklift for warehouse and construction material handling operations.",
    dailyPrice: 180,
    weeklyPrice: 1080,
    monthlyPrice: 3600,
    rating: 4.5,
    reviews: 156,
    available: true,
    specs: ["5000 kg capacity", "4m lift height", "Solid tires", "Side shift feature"],
  },
  {
    id: 6,
    name: "Backhoe Loader JCB",
    emoji: "⛏️",
    description: "Multi-purpose backhoe loader — excavate, load, and transport all in one machine.",
    dailyPrice: 280,
    weeklyPrice: 1680,
    monthlyPrice: 5600,
    rating: 4.7,
    reviews: 203,
    available: true,
    specs: ["1m³ bucket", "6m dig depth", "4WD capability", "Extendahoe option"],
  },
  {
    id: 7,
    name: "Scissor Lift GS-4047",
    emoji: "📐",
    description: "Electric scissor lift for indoor/outdoor elevated work platforms safely.",
    dailyPrice: 150,
    weeklyPrice: 900,
    monthlyPrice: 3000,
    rating: 4.4,
    reviews: 178,
    available: true,
    specs: ["14m working height", "Indoor/outdoor use", "Non-marking tires", "Battery powered"],
  },
  {
    id: 8,
    name: "Roller Compactor",
    emoji: "◼️",
    description: "Vibratory roller compactor for soil and asphalt compaction on job sites.",
    dailyPrice: 220,
    weeklyPrice: 1320,
    monthlyPrice: 4400,
    rating: 4.6,
    reviews: 67,
    available: false,
    specs: ["12 ton weight", "Dual drum design", "Amplitude control", "Water sprinkler"],
  },
];

const MATERIALS = [
  {
    id: 101,
    name: "Portland Cement (50kg)",
    emoji: "🧱",
    description: "Grade 53 OPC cement for all construction needs. High early strength formula.",
    price: 420,
    unit: "bag",
    stock: 2500,
    rating: 4.9,
    reviews: 456,
    badge: "Best Seller",
  },
  {
    id: 102,
    name: "Steel TMT Bars (12mm)",
    emoji: "🔩",
    description: "Fe-500 Grade TMT steel bars with superior bendability and tensile strength.",
    price: 85,
    unit: "kg",
    stock: 10000,
    rating: 4.8,
    reviews: 324,
    badge: "",
  },
  {
    id: 103,
    name: "Red Clay Bricks",
    emoji: "📦",
    description: "High-quality red clay bricks, machine-molded for uniform shape and strength.",
    price: 8,
    unit: "piece",
    stock: 50000,
    rating: 4.5,
    reviews: 189,
    badge: "",
  },
  {
    id: 104,
    name: "River Sand (per ton)",
    emoji: "⬛",
    description: "Clean, washed river sand ideal for plastering and concrete mixing work.",
    price: 1200,
    unit: "ton",
    stock: 200,
    rating: 4.6,
    reviews: 145,
    badge: "Popular",
  },
  {
    id: 105,
    name: "Coarse Aggregate (20mm)",
    emoji: "🪨",
    description: "Crushed stone aggregate for concrete mixing. Grade A quality guaranteed.",
    price: 950,
    unit: "ton",
    stock: 300,
    rating: 4.7,
    reviews: 98,
    badge: "",
  },
  {
    id: 106,
    name: "Fly Ash Bricks",
    emoji: "🟫",
    description: "Eco-friendly fly ash bricks that are lightweight yet high in compressive strength.",
    price: 7,
    unit: "piece",
    stock: 80000,
    rating: 4.4,
    reviews: 167,
    badge: "Eco-Friendly",
  },
  {
    id: 107,
    name: "Marble Tiles (2x2 ft)",
    emoji: "🔷",
    description: "Premium Italian marble tiles for luxury flooring and wall decoration.",
    price: 350,
    unit: "sq.ft",
    stock: 5000,
    rating: 4.9,
    reviews: 87,
    badge: "Premium",
  },
  {
    id: 108,
    name: "Waterproof Paint (20L)",
    emoji: "🎨",
    description: "Exterior emulsion paint with 10-year weatherproof and UV protection guarantee.",
    price: 4800,
    unit: "bucket",
    stock: 120,
    rating: 4.8,
    reviews: 234,
    badge: "",
  },
  {
    id: 109,
    name: "PVC Pipes (4 inch)",
    emoji: "🔌",
    description: "Heavy-duty PVC pipes for plumbing, drainage and irrigation systems.",
    price: 185,
    unit: "meter",
    stock: 8000,
    rating: 4.5,
    reviews: 112,
    badge: "",
  },
  {
    id: 110,
    name: "Electrical Wiring (2.5mm)",
    emoji: "🔋",
    description: "FR PVC insulated copper wire for residential and commercial wiring needs.",
    price: 32,
    unit: "meter",
    stock: 15000,
    rating: 4.6,
    reviews: 198,
    badge: "",
  },
];

// ============================================
// TYPE DEFINITIONS
// ============================================
interface CartItem {
  id: number;
  name: string;
  emoji?: string;
  type: "rental" | "material";
  rentalType?: string;
  qty: number;
  dailyPrice?: number;
  weeklyPrice?: number;
  monthlyPrice?: number;
  price?: number;
  unit?: string;
}

interface EquipmentItem {
  id: number;
  name: string;
  emoji: string;
  description: string;
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  rating: number;
  reviews: number;
  available: boolean;
  specs: string[];
}

interface MaterialItem {
  id: number;
  name: string;
  emoji: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  rating: number;
  reviews: number;
  badge: string;
}

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function Home() {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rentalPeriods, setRentalPeriods] = useState<Record<number, string>>({});
  const [materialQty, setMaterialQty] = useState<Record<number, number>>({});
  const [showToast, setShowToast] = useState<boolean>(false);
  const [expandedSpecs, setExpandedSpecs] = useState<Record<number, boolean>>({});
  const [scrollVisible, setScrollVisible] = useState<boolean>(false);

  // --- Scroll to Top Visibility ---
  useEffect(() => {
    const handleScroll = () => {
      setScrollVisible(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Search Filter ---
  const filteredEquipment = EQUIPMENT.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMaterials = MATERIALS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Cart Operations ---
  const addToCart = (item: EquipmentItem | MaterialItem) => {
    if ("dailyPrice" in item) {
      // Equipment
      const period = rentalPeriods[item.id] || "daily";
      const exists = cart.find(
        (c) => c.id === item.id && c.type === "rental" && c.rentalType === period
      );
      if (!exists) {
        setCart([...cart, {
          ...item,
          type: "rental",
          rentalType: period,
          qty: 1,
        }]);
      }
    } else {
      // Material
      const qty = materialQty[item.id] || 1;
      const existingIndex = cart.findIndex(
        (c) => c.id === item.id && c.type === "material"
      );
      if (existingIndex >= 0) {
        const newCart = [...cart];
        newCart[existingIndex].qty += qty;
        setCart(newCart);
      } else {
        setCart([...cart, { ...item, type: "material", qty }]);
      }
    }
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQty = (index: number, change: number) => {
    const newCart = [...cart];
    newCart[index].qty += change;
    if (newCart[index].qty < 1) {
      removeFromCart(index);
    } else {
      setCart(newCart);
    }
  };

  // --- Cart Totals ---
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      if (item.type === "rental") {
        const prices: Record<string, number> = {
          daily: item.dailyPrice || 0,
          weekly: item.weeklyPrice || 0,
          monthly: item.monthlyPrice || 0,
        };
        return total + (prices[item.rentalType || "daily"] || 0) * item.qty;
      }
      return total + (item.price || 0) * item.qty;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  };

  // --- Checkout Handler ---
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
    setCart([]);
  };

  // --- Set Rental Period ---
  const setPeriod = (id: number, period: string) => {
    setRentalPeriods({ ...rentalPeriods, [id]: period });
  };

  // --- Set Material Quantity ---
  const setMaterialQuantity = (id: number, change: number) => {
    const current = materialQty[id] || 1;
    const newVal = Math.max(1, current + change);
    setMaterialQty({ ...materialQty, [id]: newVal });
  };

  // --- Toggle Specs ---
  const toggleSpecs = (id: number) => {
    setExpandedSpecs({ ...expandedSpecs, [id]: !expandedSpecs[id] });
  };

  // --- Scroll To Top ---
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      {/* ===== NAVIGATION BAR ===== */}
      <nav className="navbar">
        <div className="container nav-container">
          {/* Logo */}
          <a href="#home" className="nav-logo">
            <div className="nav-logo-icon">🏗️</div>
            <div className="nav-logo-text">
              <h1>BuildRent Pro</h1>
              <p>Construction Solutions</p>
            </div>
          </a>

          {/* Desktop Menu */}
          <ul className="nav-menu">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#equipment" className="nav-link">Equipment Rental</a></li>
            <li><a href="#materials" className="nav-link">Materials</a></li>
            <li><a href="#about" className="nav-link">About Us</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            {/* Search */}
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Cart Button */}
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              🛒
              {cart.length > 0 && (
                <span className="cart-count">{getCartCount()}</span>
              )}
            </button>

            {/* Hamburger */}
            <button
              className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
          <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#equipment" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Equipment Rental</a>
          <a href="#materials" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Materials</a>
          <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About Us</a>
          <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">🏆 #1 Construction Equipment Provider</span>
            <h1 className="hero-title">
              Build Your Projects With{" "}
              <span className="highlight">Top-Quality</span>{" "}
              Equipment & Materials
            </h1>
            <p className="hero-description">
              Rent premium construction machinery or buy quality building materials at competitive prices.
              Fast delivery across India, expert technical support, flexible rental plans tailored to your project timeline.
            </p>
            <div className="hero-buttons">
              <a href="#equipment" className="btn-primary">🚜 Browse Equipment</a>
              <a href="#materials" className="btn-secondary">🧱 Shop Materials</a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <h3>500+</h3>
                <p>Equipments</p>
              </div>
              <div className="stat-item">
                <h3>15K+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <h3>98%</h3>
                <p>Satisfaction</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-wrapper">
              <div className="hero-card-bg"></div>
              <div className="hero-card-main">
                <div className="hero-card-emoji">🚧</div>
                <div className="hero-card-text">Construction Made Easy</div>
                <div className="hero-card-subtext">Rent • Buy • Build</div>
              </div>
              <span className="floating-badge badge-available">✓ Available Now</span>
              <span className="floating-badge badge-price">💰 Best Prices</span>
              <span className="floating-badge badge-fast">⚡ Fast Delivery</span>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="wave-divider">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#f8f9fa"/>
          </svg>
        </div>
      </section>

      {/* ===== FEATURES BAR ===== */}
      <section className="features-bar">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🚚</span>
              <div className="feature-info">
                <h4>Free Delivery</h4>
                <p>On orders above ₹5,000</p>
              </div>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💰</span>
              <div className="feature-info">
                <h4>Best Prices</h4>
                <p>Guaranteed lowest rates</p>
              </div>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔧</span>
              <div className="feature-info">
                <h4>Maintenance Free</h4>
                <p>We handle all servicing</p>
              </div>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⏰</span>
              <div className="feature-info">
                <h4>Flexible Rentals</h4>
                <p>Daily / Weekly / Monthly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="equipment" className="products-section">
        <div className="container">
          {/* Section Header */}
          <div className="section-header">
            <span className="section-badge badge-orange">🚜 EQUIPMENT RENTAL</span>
            <h2>Rent Premium Construction Equipment</h2>
            <p>Choose from our extensive fleet of well-maintained construction machinery. Flexible rental periods with operator support.</p>
          </div>

          {/* Tab Navigation */}
          <div className="tab-nav">
            <div className="tab-btn-group">
              <button
                className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >All Products</button>
              <button
                className={`tab-btn ${activeTab === "equipment" ? "active" : ""}`}
                onClick={() => setActiveTab("equipment")}
              >Equipment Only</button>
              <button
                className={`tab-btn ${activeTab === "materials" ? "active" : ""}`}
                onClick={() => setActiveTab("materials")}
              >Materials Only</button>
            </div>
          </div>

          {/* ====== EQUIPMENT CARDS ====== */}
          {(activeTab === "all" || activeTab === "equipment") && (
            <div className="products-grid">
              {filteredEquipment.map((item) => (
                <div key={item.id} className="product-card">
                  {/* Image Area */}
                  <div className="product-image">
                    <span className="emoji">{item.emoji}</span>
                    <span className="product-type-badge">For Rent</span>
                    <span className="product-rating">⭐ {item.rating}</span>
                    {!item.available && (
                      <div className="unavailable-overlay">
                        <span>Unavailable</span>
                      </div>
                    )}
                  </div>

                  {/* Info Area */}
                  <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    <p className="product-desc">{item.description}</p>

                    {/* Period Selector */}
                    <div className="rental-periods">
                      {["daily", "weekly", "monthly"].map((period) => (
                        <button
                          key={period}
                          className={`period-btn ${(rentalPeriods[item.id] || "daily") === period ? "active" : ""}`}
                          onClick={() => setPeriod(item.id, period)}
                        >
                          {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="price-display">
                      <span className="price-label">₹{
                        (rentalPeriods[item.id] === "weekly" ? item.weeklyPrice :
                         rentalPeriods[item.id] === "monthly" ? item.monthlyPrice :
                         item.dailyPrice)
                      }</span>
                      <span className="price-unit">/{rentalPeriods[item.id] || "daily"}</span>
                    </div>

                    {/* Specs Toggle */}
                    <span
                      className="specs-toggle"
                      onClick={() => toggleSpecs(item.id)}
                    >
                      {expandedSpecs[item.id] ? "▲ Hide Specs" : "▼ View Specifications"}
                    </span>
                    <ul className={`specs-list ${expandedSpecs[item.id] ? "show" : ""}`}>
                      {item.specs.map((spec, i) => (
                        <li key={i}>{spec}</li>
                      ))}
                    </ul>

                    {/* Add to Cart */}
                    <button
                      className="add-to-cart-btn"
                      disabled={!item.available}
                      onClick={() => addToCart(item)}
                    >
                      ➕ Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ====== MATERIALS SECTION ====== */}
          {(activeTab === "all" || activeTab === "materials") && (
            <>
              <div className="section-header" style={{ marginTop: "60px" }}>
                <span className="section-badge badge-green">🧱 CONSTRUCTION MATERIALS FOR SALE</span>
                <h2>Premium Quality Building Materials</h2>
                <p>From cement to steel, find everything you need at wholesale prices with doorstep delivery.</p>
              </div>

              <div className="products-grid">
                {filteredMaterials.map((item) => (
                  <div key={item.id} className="product-card material-card">
                    {/* Image Area */}
                    <div className="product-image">
                      <span className="emoji">{item.emoji}</span>
                      {item.badge && (
                        <span className="product-badge">{item.badge}</span>
                      )}
                      <span className="stock-badge">In Stock ({item.stock})</span>
                    </div>

                    {/* Info Area */}
                    <div className="product-info">
                      <h3 className="product-name">{item.name}</h3>

                      {/* Rating */}
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
                        <span style={{ color: "#ffc107", fontSize: "14px" }}>★</span>
                        <span style={{ color: "#888", fontSize: "13px" }}>{item.rating} ({item.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="material-price">
                        ₹{item.price} <span>/ {item.unit}</span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="quantity-selector">
                        <button className="qty-btn" onClick={() => setMaterialQuantity(item.id, -1)}>−</button>
                        <span className="qty-value">{materialQty[item.id] || 1}</span>
                        <button className="qty-btn" onClick={() => setMaterialQuantity(item.id, 1)}>+</button>
                        <span className="qty-unit">{item.unit}</span>
                      </div>

                      {/* Add Button */}
                      <button
                        className="add-to-cart-btn material-add-btn"
                        onClick={() => addToCart(item)}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="why-us">
        <div className="container">
          <div className="section-header">
            <span className="section-badge" style={{ background: "rgba(41,121,255,0.1)", color: "#2979ff" }}>WHY CHOOSE US</span>
            <h2>The BuildRent Pro Advantage</h2>
          </div>

          <div className="why-us-grid">
            {[
              { icon: "✅", title: "Quality Guaranteed", desc: "All equipment is regularly serviced and certified. Materials sourced from trusted manufacturers.", cls: "icon-green" },
              { icon: "💵", title: "Transparent Pricing", desc: "No hidden charges whatsoever. What you see is what you pay with detailed quotes upfront.", cls: "icon-blue" },
              { icon: "🛡️", title: "Insurance Included", desc: "All rentals include comprehensive insurance coverage for complete peace of mind during operation.", cls: "icon-purple" },
              { icon: "👨‍🔧", title: "Expert Operators", desc: "Need an operator? We provide trained, experienced operators certified for all equipment types.", cls: "icon-orange" },
              { icon: "🔄", title: "Easy Replacement", desc: "Equipment breakdown? We replace it within 24 hours absolutely free of cost to you.", cls: "icon-red" },
              { icon: "📞", title: "Dedicated Support", desc: "Our team is available round-the-clock via phone and chat to assist with any queries or issues.", cls: "icon-teal" },
            ].map((f, i) => (
              <div key={i} className="why-card">
                <div className={`why-icon-box ${f.cls}`}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-badge">ABOUT US</span>
              <h2>Building Dreams Since 2010</h2>
              <p>
                BuildRent Pro has been the trusted partner for contractors, builders, and developers
                across India for over 14 years. We offer a comprehensive range of construction equipment
                for rent and premium quality building materials for sale.
              </p>
              <p>
                Our mission is simple: empower every construction project with the best tools and materials
                at affordable prices. With a fleet of 500+ machines and partnerships with leading manufacturers,
                we are your one-stop solution.
              </p>

              <div className="about-stats-grid">
                <div className="about-stat-card"><h3>14+</h3><p>Years Experience</p></div>
                <div className="about-stat-card"><h3>500+</h3><p>Equipment Fleet</p></div>
                <div className="about-stat-card"><h3>15K+</h3><p>Happy Customers</p></div>
                <div className="about-stat-card"><h3>50+</h3><p>Cities Covered</p></div>
              </div>
            </div>

            <div className="about-visual-grid">
              <div className="about-visual-item">🏗️</div>
              <div className="about-visual-item">🏢</div>
              <div className="about-visual-item">🌉</div>
              <div className="about-visual-item">🛣️</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-badge" style={{ background: "rgba(233,30,99,0.1)", color: "#e91e63" }}>TESTIMONIALS</span>
            <h2>What Our Customers Say</h2>
          </div>

          <div className="testimonials-grid">
            {[
              {
                name: "Rajesh Kumar", role: "Contractor, Mumbai",
                text: "Excellent service! Rented an excavator for my project and it was delivered within 2 hours. Equipment was in top condition. Highly recommended!",
                rating: 5,
              },
              {
                name: "Priya Sharma", role: "Builder, Delhi",
                text: "Been buying materials from BuildRent Pro for 3 years now. Their cement and steel quality is unmatched, and the prices are always competitive.",
                rating: 5,
              },
              {
                name: "Mohammed Ali", role: "Developer, Bangalore",
                text: "The crane we rented came with an experienced operator who handled everything smoothly. Saved us time and money. Will definitely use again!",
                rating: 5,
              },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="star">★</span>
                  ))}
                </div>
                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.name[0]}</div>
                  <div className="author-info">
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-badge badge-green">GET IN TOUCH</span>
              <h2>Contact Us Today</h2>
              <p>
                Have questions about our equipment or materials? Need a custom quote?
                Reach out to our team and we&apos;ll get back to you within the hour.
              </p>

              <div className="contact-details">
                {[
                  { icon: "📍", label: "Address", value: "123 Construction Hub, Industrial Area, Mumbai - 400001" },
                  { icon: "📞", label: "Phone", value: "+91 98765 43210" },
                  { icon: "✉️", label: "Email", value: "info@buildrentpro.com" },
                  { icon: "🕐", label: "Hours", value: "Mon-Sat: 8AM - 8PM | Sun: 9AM - 5PM" },
                ].map((c, i) => (
                  <div key={i} className="contact-item">
                    <span className="contact-item-icon">{c.icon}</span>
                    <div className="contact-item-text">
                      <strong>{c.label}</strong>
                      <p>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h3>Send us a Message</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" className="form-input" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-input" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select className="form-select">
                    <option>Equipment Rental Inquiry</option>
                    <option>Material Purchase Quote</option>
                    <option>Bulk Order Request</option>
                    <option>Support / Complaint</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-textarea" rows={4} placeholder="Tell us about your requirements..."></textarea>
                </div>
                <button type="submit" className="form-submit-btn">Send Message 🚀</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="nav-logo">
                <div className="nav-logo-icon">🏗️</div>
                <div className="nav-logo-text">
                  <h1>BuildRent Pro</h1>
                  <p>Construction Solutions</p>
                </div>
              </div>
              <p>Your one-stop destination for construction equipment rental and premium building materials.</p>
              <div className="social-links">
                <a href="#" className="social-link">𝕏</a>
                <a href="#" className="social-link">in</a>
                <a href="#" className="social-link">fb</a>
                <a href="#" className="social-link">ig</a>
              </div>
            </div>

            {/* Link Columns */}
            {[
              {
                title: "Quick Links",
                links: ["Home", "Equipment Rental", "Building Materials", "About Us", "Contact"],
              },
              {
                title: "Equipment",
                links: ["Excavators", "Cranes", "Bulldozers", "Mixers", "All Equipment"],
              },
              {
                title: "Materials",
                links: ["Cement & Steel", "Aggregates", "Paints & Finishes", "Pipes & Wires", "All Materials"],
              },
            ].map((col, i) => (
              <div key={i} className="footer-col">
                <h4>{col.title}</h4>
                <ul className="footer-links">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">© 2024 BuildRent Pro. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== SHOPPING CART SIDEBAR ===== */}
      <div className={`cart-overlay ${cartOpen ? "active" : ""}`} onClick={() => setCartOpen(false)}></div>
      <div className={`cart-sidebar ${cartOpen ? "active" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <h2>🛒 Shopping Cart <span className="cart-header-count">{getCartCount()}</span></h2>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {/* Body */}
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add equipment or materials to get started!</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-top">
                  <div className="cart-item-thumb">{item.emoji || (item.type === "rental" ? "🚜" : "📦")}</div>
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    {item.type === "rental" ? (
                      <>
                        <p className="cart-item-price">₹{
                          item.rentalType === "weekly" ? item.weeklyPrice :
                          item.rentalType === "monthly" ? item.monthlyPrice :
                          item.dailyPrice
                        }/{item.rentalType}</p>
                        <span className="cart-item-rental-type">{item.rentalType} rental</span>
                      </>
                    ) : (
                      <p className="cart-item-price material-price-tag">₹{item.price}/{item.unit}</p>
                    )}
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(index)}>🗑</button>
                </div>
                <div className="cart-item-bottom">
                  <div className="cart-qty-controls">
                    <button className="cart-qty-btn" onClick={() => updateQty(index, -1)}>−</button>
                    <span className="cart-qty-value">{item.qty}</span>
                    <button className="cart-qty-btn" onClick={() => updateQty(index, 1)}>+</button>
                  </div>
                  <span className="cart-item-total">
                    ₹{(item.type === "rental"
                      ? (item.rentalType === "weekly" ? (item.weeklyPrice || 0) : item.rentalType === "monthly" ? (item.monthlyPrice || 0) : (item.dailyPrice || 0))
                      : (item.price || 0)
                    ) * item.qty}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Total Amount:</span>
              <span className="cart-total-value">₹{getCartTotal().toLocaleString()}</span>
            </div>
            <button
              className="cart-checkout-btn"
              onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
            >
              Proceed to Checkout ✨
            </button>
            <button className="cart-clear-btn" onClick={() => setCart([])}>Clear Cart</button>
          </div>
        )}
      </div>

      {/* ===== CHECKOUT MODAL ===== */}
      <div className={`checkout-modal-overlay ${checkoutOpen ? "active" : ""}`} onClick={() => setCheckoutOpen(false)}>
        <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="checkout-modal-header">
            <h2>📋 Checkout</h2>
            <button className="checkout-close" onClick={() => setCheckoutOpen(false)}>✕</button>
          </div>

          {/* Body */}
          <form className="checkout-modal-body" onSubmit={handleCheckout}>
            <div className="checkout-form-row">
              <div className="checkout-form-group">
                <label>Full Name *</label>
                <input type="text" className="checkout-input" placeholder="Enter your full name" required />
              </div>
              <div className="checkout-form-group">
                <label>Email Address *</label>
                <input type="email" className="checkout-input" placeholder="your@email.com" required />
              </div>
            </div>

            <div className="checkout-form-row">
              <div className="checkout-form-group">
                <label>Phone Number *</label>
                <input type="tel" className="checkout-input" placeholder="+91 XXXXX XXXXX" required />
              </div>
              <div className="checkout-form-group">
                <label>City *</label>
                <input type="text" className="checkout-input" placeholder="Mumbai" required />
              </div>
            </div>

            <div className="checkout-form-group">
              <label>Delivery Address *</label>
              <textarea className="checkout-textarea" rows={3} placeholder="Enter complete delivery address" required></textarea>
            </div>

            <div className="checkout-form-group">
              <label>Special Instructions</label>
              <textarea className="checkout-textarea" rows={2} placeholder="Any special requirements..."></textarea>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="order-summary-items">
                {cart.map((item, idx) => (
                  <div key={idx} className="order-summary-item">
                    <span className="order-summary-item-left">
                      {item.name} x{item.qty}{item.rentalType ? ` (${item.rentalType})` : ""}
                    </span>
                    <span className="order-summary-item-right">
                      ₹{(item.type === "rental"
                        ? (item.rentalType === "weekly" ? (item.weeklyPrice || 0) : item.rentalType === "monthly" ? (item.monthlyPrice || 0) : (item.dailyPrice || 0))
                        : (item.price || 0)
                      ) * item.qty}
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-total-row">
                <span className="order-total-label">Total:</span>
                <span className="order-total-value">₹{getCartTotal().toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods">
              <h4>Payment Method</h4>
              <div className="payment-options">
                {[
                  { value: "upi", label: "UPI" },
                  { value: "card", label: "Card" },
                  { value: "netbanking", label: "Net Banking" },
                  { value: "cod", label: "COD" },
                ].map((method) => (
                  <div key={method.value} className="payment-option">
                    <input type="radio" name="payment" id={`pay-${method.value}`} defaultValue={method.value} defaultChecked={method.value === "cod"} />
                    <label htmlFor={`pay-${method.value}`}>{method.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order — ₹{getCartTotal().toLocaleString()} 🎉
            </button>
          </form>
        </div>
      </div>

      {/* ===== SUCCESS TOAST ===== */}
      <div className={`success-toast ${showToast ? "active" : ""}`}>
        <span className="toast-icon">✅</span>
        <div className="toast-content">
          <h4>Order Placed Successfully!</h4>
          <p>We will contact you shortly.</p>
        </div>
      </div>

      {/* ===== SCROLL TO TOP BUTTON ===== */}
      <button className={`scroll-top ${scrollVisible ? "visible" : ""}`} onClick={scrollToTop}>
        ↑
      </button>
    </>
  );
}
