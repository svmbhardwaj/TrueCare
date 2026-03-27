import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../../assets/hero_bg.png';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    { quote: '"When my father was in an emergency, I had no idea which hospital would accept CGHS. TrueCare navigated us through the entire process seamlessly."', name: 'Suresh Patel', role: 'Small Business Owner, Ahmedabad', initials: 'SP', badge: 'Emergency resolved', stars: 5 },
    { quote: '"At 1 AM, my mother had a cardiac episode. TrueCare showed the nearest hospital that accepted our Ayushman card. We saved ₹2.3 lakhs in out-of-pocket costs."', name: 'Priya Sharma', role: 'Teacher, Delhi', initials: 'PS', badge: 'Savings: ₹2.3L', stars: 5 },
    { quote: '"The TrueBill scanner found ₹8,400 in overcharges on my wife\'s maternity bill. The pharmacy had inflated MRPs on basic medicines by 300%."', name: 'Rahul Mehta', role: 'IT Professional, Mumbai', initials: 'RM', badge: 'Overcharge caught', stars: 5 },
    { quote: '"After my accident, family used TrueCare to find an orthopedic hospital that took CGHS cashless. The community badges helped them trust the hospital choice."', name: 'Anjali Gupta', role: 'Software Engineer, Bangalore', initials: 'AG', badge: 'Insurance verified', stars: 4 },
  ];

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const faqs = [
    { q: 'How does TrueCare find hospitals so fast?', a: 'We maintain a real-time database of hospitals filtered by medical specialty, bed availability, and insurance/scheme acceptance. When you select your need, we instantly match you to the nearest verified hospital.' },
    { q: 'Is TrueCare free to use?', a: 'Yes, completely free for all patients. Our mission is to ensure no family faces financial shock during a medical emergency. There are no hidden charges, subscriptions, or premium tiers.' },
    { q: 'How does the AI Bill Scanner work?', a: 'You upload a photo or PDF of your hospital bill. Our OCR engine extracts every line item, then our AI cross-references prices against NPPA guidelines and state-mandated caps to detect overcharges.' },
    { q: 'What insurance schemes are supported?', a: 'We support Ayushman Bharat (PMJAY), CGHS, ECHS, ESI, and 15+ major private insurers including Star Health, ICICI Lombard, and HDFC Ergo. We verify hospital empanelment in real-time.' },
    { q: 'How are Trust Badges earned by hospitals?', a: 'When patients confirm a hospital successfully processed their insurance without hassle, it earns trust points. Hospitals with consistently positive reports earn Platinum, Gold, or Silver community badges.' },
  ];

  return (
    <div className="homepage">

      <main className="homepage-content">
        {/* Section 1: HERO */}
        <section
          className="hero-section"
          id="hero"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        >
          <div className="container hero-container">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="material-symbols-outlined pulsar">verified</span>
                Verified by 10,347+ families today
              </div>
              <h1 className="hero-headline">
                Emergency Help.<br />
                <span className="text-highlight">Zero Financial Shock.</span>
              </h1>
              <p className="hero-subtext">
                Instantly find hospital beds, check insurance coverage, and get AI-powered bill protection. Trusted by Bharat's families.
              </p>

              <div className="hero-cta-wrapper">
                <button className="full-map-btn hero-map-btn" onClick={() => navigate('/dashboard')}>
                  <div className="map-icon-circle">
                    <span className="material-symbols-outlined">map</span>
                  </div>
                  <div className="map-btn-content">
                    <span className="map-btn-title">Open Full-Screen Smart Map</span>
                    <span className="map-btn-subtitle">Filter by medical need, schemes, and distance</span>
                  </div>
                  <span className="material-symbols-outlined arrow-move">arrow_forward</span>
                </button>

                <button className="bill-cta-btn" onClick={() => navigate('/truebill')}>
                  <div className="bill-cta-icon-circle">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </div>
                  <div className="bill-cta-content">
                    <span className="bill-cta-title">Check Your Hospital Bill</span>
                    <span className="bill-cta-subtitle">AI audit for overcharges, GST errors, and suspicious line items</span>
                  </div>
                  <span className="material-symbols-outlined">north_east</span>
                </button>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-illustration">
                <div className="illustration-glow"></div>
                <div className="illustration-main">
                  <span className="family-emoji">👨‍👩‍👦</span>
                  <div className="pulse-ring"></div>
                </div>
                {/* Floating Map Pins */}
                <div className="floating-pin pin1">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div className="floating-pin pin2">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div className="floating-pin pin3">
                  <span className="material-symbols-outlined">verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: FEATURES */}
        <section className="features-section">
          <div className="container">
            <div className="features-header">
              <span className="features-badge">PLATFORM FEATURES</span>
              <h2 className="features-headline">
                A Complete Medical & <span className="text-highlight-blue">Financial Lifeline</span>
              </h2>
              <p className="features-subheading">
                Two powerful systems working together to protect patients from the moment an emergency starts until the final bill is cleared.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-box blue">
                  <span className="material-symbols-outlined">explore</span>
                </div>
                <h3>Smart Emergency Navigator</h3>
                <p>Filter nearby hospitals by medical need AND financial compatibility. Find trauma centers, ICUs, or maternity wards that accept your exact coverage.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-box cyan">
                  <span className="material-symbols-outlined">document_scanner</span>
                </div>
                <h3>AI "True Bill" Scanner</h3>
                <p>Snap a photo of your hospital bill. Our ML pipeline extracts line items, cross-references tax rules, and exposes hidden overcharges instantly.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-box dark-blue">
                  <span className="material-symbols-outlined">shield</span>
                </div>
                <h3>End-to-End Protection</h3>
                <p>From emergency routing to discharge billing — we protect your family's health and finances throughout the entire hospital journey.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-box green">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h3>Community Trust Badges</h3>
                <p>Real users verify hospital claims. If a hospital successfully processes Ayushman cards without hassle, it earns a verified community trust badge.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-box teal">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <h3>WhatsApp Bot <span className="coming-soon">(Coming Soon)</span></h3>
                <p>In a real emergency, nobody downloads apps. Drop your location on WhatsApp and get instant hospital routing and bill scanning.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-box orange">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <h3>Insurance API Integration</h3>
                <p>Enter your policy number and instantly see exact room-rent capping, covered procedures, and benefits at the nearest hospital.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: NAVIGATOR */}
        <section className="navigator-section">
          <div className="container">
            <div className="navigator-header">
              <span className="navigator-badge">
                <span className="dot"></span>
                EMERGENCY NAVIGATOR
              </span>
              <h2 className="navigator-headline">
                Find the Right Hospital, <span className="text-highlight-blue">Instantly</span>
              </h2>
              <p className="navigator-subheading">
                Select your medical need and insurance coverage. We'll show you only hospitals that match both — saving precious time in a crisis.
              </p>
            </div>

            {/* Stepper */}
            <div className="navigator-stepper">
              <div className="step active">
                <div className="step-number">1</div>
                <span className="step-label">Medical Need</span>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number">2</div>
                <span className="step-label">Coverage</span>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number">3</div>
                <span className="step-label">Results</span>
              </div>
            </div>

            {/* Category Selection */}
            <div className="category-selection">
              <div className="selection-title">
                <span className="material-symbols-outlined">hospital</span>
                What do you need?
              </div>

              <div className="category-grid">
                <div className="category-card trauma" onClick={() => navigate('/dashboard')}>
                  <div className="category-icon-box">
                    <span className="material-symbols-outlined">ambulance</span>
                  </div>
                  <span className="category-name">Trauma / Emergency</span>
                </div>

                <div className="category-card icu" onClick={() => navigate('/dashboard')}>
                  <div className="category-icon-box">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                  <span className="category-name">ICU / Critical Care</span>
                </div>

                <div className="category-card maternity" onClick={() => navigate('/dashboard')}>
                  <div className="category-icon-box">
                    <span className="material-symbols-outlined">child_care</span>
                  </div>
                  <span className="category-name">Maternity</span>
                </div>

                <div className="category-card neuro" onClick={() => navigate('/dashboard')}>
                  <div className="category-icon-box">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                  <span className="category-name">Neurology</span>
                </div>

                <div className="category-card ortho" onClick={() => navigate('/dashboard')}>
                  <div className="category-icon-box">
                    <span className="material-symbols-outlined">bone</span>
                  </div>
                  <span className="category-name">Orthopedic</span>
                </div>

                <div className="category-card gen-med" onClick={() => navigate('/dashboard')}>
                  <div className="category-icon-box">
                    <span className="material-symbols-outlined">stethoscope</span>
                  </div>
                  <span className="category-name">General Medicine</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: TRUST & SOCIAL PROOF */}
        <section className="trust-section">
          <div className="container">
            <div className="trust-header">
              <span className="trust-badge">
                <span className="material-symbols-outlined">verified</span>
                COMMUNITY VERIFIED
              </span>
              <h2 className="trust-headline">
                Trust Built by <span className="text-highlight-blue">Real Patients</span>
              </h2>
              <p className="trust-subheading">
                Official data is often outdated. Our crowdsourced trust system gives you real-time verification from patients who've been there.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="stats-bar">
              <div className="stat-item">
                <span className="material-symbols-outlined">group</span>
                <div className="stat-text">
                  <strong>50,000+</strong>
                  <span>Active Users</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="material-symbols-outlined">check_circle</span>
                <div className="stat-text">
                  <strong>3,200+</strong>
                  <span>Verified Hospitals</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="material-symbols-outlined">forum</span>
                <div className="stat-text">
                  <strong>12,000+</strong>
                  <span>Community Reviews</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="material-symbols-outlined">trending_up</span>
                <div className="stat-text">
                  <strong>₹18Cr+</strong>
                  <span>Overcharges Detected</span>
                </div>
              </div>
            </div>

            <div className="trust-content-grid">
              {/* Patient Stories */}
              <div className="patient-stories">
                <div className="content-title">
                  <span className="material-symbols-outlined">chat_bubble</span>
                  Patient Stories
                </div>
                <div className="story-card">
                  <div className="story-user">
                    <div className="avatar">PS</div>
                    <div className="user-info">
                      <h4>Priya Sharma <span className="material-symbols-outlined verified-icon">verified</span></h4>
                      <span>Delhi • <small>Ayushman Bharat</small></span>
                    </div>
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p>"At 1 AM, my father had a cardiac episode. TrueCare showed us the nearest hospital that accepted our Ayushman card. We saved ₹2.3 lakhs in out-of-pocket costs."</p>
                </div>
                <div className="story-card">
                  <div className="story-user">
                    <div className="avatar">RM</div>
                    <div className="user-info">
                      <h4>Rahul Mehta <span className="material-symbols-outlined verified-icon">verified</span></h4>
                      <span>Mumbai • <small>Star Health</small></span>
                    </div>
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p>"The TrueBill scanner found ₹8,400 in overcharges on my wife's maternity bill. The pharmacy had inflated MRPs on basic medicines by 300%."</p>
                </div>
                <div className="story-card">
                  <div className="story-user">
                    <div className="avatar">AG</div>
                    <div className="user-info">
                      <h4>Anjali Gupta <span className="material-symbols-outlined verified-icon">verified</span></h4>
                      <span>Bangalore • <small>CGHS</small></span>
                    </div>
                    <div className="rating">⭐⭐⭐⭐</div>
                  </div>
                  <p>"After my accident, family used TrueCare to find an orthopedic hospital that took CGHS cashless. The community badges helped them trust the hospital choice."</p>
                </div>
              </div>

              {/* Top Verified Hospitals */}
              <div className="hospital-leaderboard">
                <div className="content-title">
                  <span className="material-symbols-outlined">task_alt</span>
                  Top Verified Hospitals
                </div>
                <div className="leader-card">
                  <div className="rank">#1</div>
                  <div className="hosp-info">
                    <h4>AIIMS Delhi <span className="material-symbols-outlined verified-icon">verified</span></h4>
                    <span className="badge platinum">Platinum Trust</span>
                    <span className="reviews"><span className="material-symbols-outlined">thumb_up</span> 2840 reviews</span>
                  </div>
                  <div className="score">
                    <strong>98</strong>
                    <span>TRUST SCORE</span>
                  </div>
                </div>
                <div className="leader-card">
                  <div className="rank">#2</div>
                  <div className="hosp-info">
                    <h4>Max Healthcare <span className="material-symbols-outlined verified-icon">verified</span></h4>
                    <span className="badge gold">Gold Trust</span>
                    <span className="reviews"><span className="material-symbols-outlined">thumb_up</span> 1560 reviews</span>
                  </div>
                  <div className="score">
                    <strong>94</strong>
                    <span>TRUST SCORE</span>
                  </div>
                </div>
                <div className="leader-card">
                  <div className="rank">#3</div>
                  <div className="hosp-info">
                    <h4>Fortis Hospital <span className="material-symbols-outlined verified-icon">verified</span></h4>
                    <span className="badge gold">Gold Trust</span>
                    <span className="reviews"><span className="material-symbols-outlined">thumb_up</span> 1200 reviews</span>
                  </div>
                  <div className="score">
                    <strong>91</strong>
                    <span>TRUST SCORE</span>
                  </div>
                </div>
                <div className="leader-card">
                  <div className="rank">#4</div>
                  <div className="hosp-info">
                    <h4>Safdarjung Hospital <span className="material-symbols-outlined verified-icon">verified</span></h4>
                    <span className="badge silver">Silver Trust</span>
                    <span className="reviews"><span className="material-symbols-outlined">thumb_up</span> 890 reviews</span>
                  </div>
                  <div className="score">
                    <strong>87</strong>
                    <span>TRUST SCORE</span>
                  </div>
                </div>

                <div className="trust-explainer">
                  <span className="material-symbols-outlined">info</span>
                  <div className="explainer-text">
                    <strong>How Trust Badges Work</strong>
                    <p>When patients confirm a hospital successfully processed their insurance or government scheme without issues, the hospital earns trust points. Hospitals with consistent positive reports earn Platinum, Gold, or Silver badges — giving you confidence in a crisis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: TESTIMONIAL SLIDER */}
        <section className="testimonial-section">
          <div className="container">
            <div className="testimonial-slider-header">
              <span className="section-small-badge">REAL STORIES</span>
              <h2 className="slider-headline">Trusted by <span className="text-highlight-blue">Thousands</span></h2>
              <p>Real people, real savings, real impact on healthcare transparency.</p>
            </div>

            <div className="testimonial-main-card" key={activeTestimonial}>
              <div className="quote-icon">
                <span className="material-symbols-outlined">format_quote</span>
              </div>
              <div className="rating-stars">{'⭐'.repeat(testimonials[activeTestimonial].stars)}</div>
              <p className="main-quote">{testimonials[activeTestimonial].quote}</p>

              <div className="testimonial-footer">
                <div className="user-profile">
                  <div className="avatar">{testimonials[activeTestimonial].initials}</div>
                  <div className="details">
                    <strong>{testimonials[activeTestimonial].name}</strong>
                    <span>{testimonials[activeTestimonial].role}</span>
                  </div>
                </div>
                <div className="resolved-badge">
                  <span className="dot"></span>
                  {testimonials[activeTestimonial].badge}
                </div>
              </div>
            </div>

            <div className="slider-controls">
              <button className="slider-btn prev" onClick={prevTestimonial}>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="slider-dots">
                {testimonials.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === activeTestimonial ? 'active' : ''}`}
                    onClick={() => setActiveTestimonial(i)}
                  ></span>
                ))}
              </div>
              <button className="slider-btn next" onClick={nextTestimonial}>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 6: COMPARISON & FINAL CTA */}
        <section className="comparison-section">
          <div className="container">
            <div className="comparison-header">
              <span className="section-small-badge">WHY WE ARE DIFFERENT</span>
              <h2 className="comparison-headline">We Built What <span className="text-highlight-blue">Others Couldn't</span></h2>
              <p>Existing solutions are fragmented, outdated, and abandon patients the moment they step into a hospital. TrueCare is different.</p>
            </div>

            {/* Competitor Pain Points */}
            <div className="comparison-grid">
              <div className="comp-card negative">
                <div className="comp-icon-header">
                  <span className="material-symbols-outlined">cancel</span>
                  <h4>Practo & Similar Apps</h4>
                </div>
                <ul>
                  <li><span className="material-symbols-outlined">close</span> Built for elective check-ups, not emergencies</li>
                  <li><span className="material-symbols-outlined">close</span> Cluttered UI useless at 2 AM panic</li>
                  <li><span className="material-symbols-outlined">close</span> No insurance/scheme filtering</li>
                  <li><span className="material-symbols-outlined">close</span> Zero post-admission protection</li>
                </ul>
              </div>

              <div className="comp-card negative">
                <div className="comp-icon-header">
                  <span className="material-symbols-outlined">cancel</span>
                  <h4>Government Portals</h4>
                </div>
                <ul>
                  <li><span className="material-symbols-outlined">close</span> Notoriously outdated hospital listings</li>
                  <li><span className="material-symbols-outlined">close</span> Expired empanelments still shown</li>
                  <li><span className="material-symbols-outlined">close</span> No real-time bed availability</li>
                  <li><span className="material-symbols-outlined">close</span> No financial auditing tools</li>
                </ul>
              </div>

              <div className="comp-card negative">
                <div className="comp-icon-header">
                  <span className="material-symbols-outlined">cancel</span>
                  <h4>Insurance Company Apps</h4>
                </div>
                <ul>
                  <li><span className="material-symbols-outlined">close</span> Only show their own network</li>
                  <li><span className="material-symbols-outlined">close</span> No cross-scheme comparison</li>
                  <li><span className="material-symbols-outlined">close</span> No fraud detection for patients</li>
                  <li><span className="material-symbols-outlined">close</span> Not designed for emergencies</li>
                </ul>
              </div>
            </div>

            <div className="truecare-advantage-banner">
              <span>TrueCare Is Different</span>
            </div>

            <div className="advantage-grid">
              <div className="adv-card">
                <span className="material-symbols-outlined adv-icon">electric_bolt</span>
                <h4>Total Financial Predictability</h4>
                <p>The only platform ensuring financial safety from start to finish — routing you to in-network hospitals first, auditing bills with AI later.</p>
                <div className="only-on">
                  <span className="material-symbols-outlined">check_circle</span>
                  Only on TrueCare
                </div>
              </div>
              <div className="adv-card">
                <span className="material-symbols-outlined adv-icon">health_metrics</span>
                <h4>HealthTech + FinTech Fusion</h4>
                <p>Not just a hospital directory — a consumer protection engine. Rigorous financial data-structuring applied to messy healthcare receipts.</p>
                <div className="only-on">
                  <span className="material-symbols-outlined">check_circle</span>
                  Only on TrueCare
                </div>
              </div>
              <div className="adv-card">
                <span className="material-symbols-outlined adv-icon">groups</span>
                <h4>Community-Verified Reality</h4>
                <p>Because official data is often outdated, we use crowdsourced trust badges from real patients who've been there recently.</p>
                <div className="only-on">
                  <span className="material-symbols-outlined">check_circle</span>
                  Only on TrueCare
                </div>
              </div>
            </div>

            {/* Journey Comparison */}
            <div className="journey-comparison">
              <h3>Your Emergency Journey: Others vs TrueCare</h3>

              <div className="journey-grid">
                <div className="journey-path others">
                  <div className="path-title">
                    <span className="material-symbols-outlined">history</span>
                    Without TrueCare
                  </div>
                  <div className="timeline">
                    <div className="timeline-item">
                      <span className="time">0 min</span>
                      <span className="material-symbols-outlined icon">warning</span>
                      <span className="event">Emergency occurs</span>
                    </div>
                    <div className="timeline-item">
                      <span className="time">15 min</span>
                      <span className="material-symbols-outlined icon">search</span>
                      <span className="event">Googling nearby hospitals</span>
                    </div>
                    <div className="timeline-item">
                      <span className="time">45 min</span>
                      <span className="material-symbols-outlined icon">domain_disabled</span>
                      <span className="event">Hospital denies Insurance</span>
                    </div>
                    <div className="timeline-item">
                      <span className="time">60 min</span>
                      <span className="material-symbols-outlined icon">schedule</span>
                      <span className="event">Searching for another hospital</span>
                    </div>
                    <div className="timeline-item">
                      <span className="time">After</span>
                      <span className="material-symbols-outlined icon">receipt_long</span>
                      <span className="event">Overcharged bill goes unnoticed</span>
                    </div>
                  </div>
                </div>

                <div className="journey-path truecare">
                  <div className="path-title">
                    <span className="material-symbols-outlined">verified</span>
                    With TrueCare
                  </div>
                  <div className="timeline">
                    <div className="timeline-item">
                      <span className="time">0 min</span>
                      <span className="material-symbols-outlined icon">emergency_share</span>
                      <span className="event">Emergency occurs</span>
                    </div>
                    <div className="timeline-item">
                      <span className="time">1 min</span>
                      <span className="material-symbols-outlined icon">bolt</span>
                      <span className="event">Open TrueCare → Select need + scheme</span>
                    </div>
                    <div className="timeline-item">
                      <span className="time">2 min</span>
                      <span className="material-symbols-outlined icon">navigation</span>
                      <span className="event">Navigate to verified hospital</span>
                    </div>
                    <div className="timeline-item">
                      <span className="time">3 min</span>
                      <span className="material-symbols-outlined icon">task_alt</span>
                      <span className="event">Admitted with confirmed coverage</span>
                    </div>
                    <div className="timeline-item">
                      <span className="time">After</span>
                      <span className="material-symbols-outlined icon">analytics</span>
                      <span className="event">AI audits bill & catches overcharges</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="final-cta-footer">
              <button className="full-map-btn hero-map-btn" onClick={() => navigate('/dashboard')}>
                <div className="map-icon-circle">
                  <span className="material-symbols-outlined">explore</span>
                </div>
                <div className="map-btn-content">
                  <span className="map-btn-title">Try TrueCare Now</span>
                </div>
                <span className="material-symbols-outlined arrow-move">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 7: FAQ */}
        <section className="faq-section" id="faq">
          <div className="container">
            <div className="faq-header">
              <span className="faq-small-badge">
                <span className="material-symbols-outlined">help_outline</span> FAQ
              </span>
              <h2 className="faq-headline">Frequently Asked <span className="text-highlight-blue">Questions</span></h2>
              <p>Everything you need to know about TrueCare and how it protects your family.</p>
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined faq-chevron">
                      {openFaq === i ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: URGENCY CTA */}
        <section className="urgency-section">
          <div className="container">
            <div className="urgency-banner">
              <h2 className="urgency-headline">Every Second Counts in an Emergency</h2>
              <p>Don't wait until a crisis hits. Bookmark TrueCare now and be prepared to find the right hospital instantly.</p>
              <div className="urgency-btns">
                <button className="btn-primary blue-cta" onClick={() => navigate('/dashboard')}>
                  <span className="material-symbols-outlined">location_on</span>
                  Find Hospital Now
                </button>
                {/* Connection Fix: Changed /bill-ai to /truebill */}
                <button className="btn-secondary outline-white" onClick={() => navigate('/truebill')}>
                  <span className="material-symbols-outlined">qr_code_scanner</span>
                  Scan a Bill
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: LONG-TERM VISION */}
        <section className="vision-section" id="vision">
          <div className="container">
            <div className="vision-card">
              <div className="vision-icon-circle">
                <span className="material-symbols-outlined">favorite</span>
              </div>
              <h2 className="vision-headline">The Long-Term Vision</h2>
              <p>
                A world where no family is financially destroyed by a medical emergency. Where every
                patient — regardless of income, literacy, or location — has instant access to verified
                hospitals and transparent billing. TrueCare is the first step towards that vision.
              </p>
              <button className="btn-primary blue-cta join-mission" onClick={() => navigate('/')}>
                <span className="material-symbols-outlined">favorite</span>
                Join the Mission
                <span className="material-symbols-outlined arrow">north_east</span>
              </button>
            </div>
          </div>
        </section>

        {/* DETAILED FOOTER */}
        <footer className="homepage-main-footer">
          <div className="container">
            <div className="footer-grid">
              {/* Brand Column */}
              <div className="footer-brand">
                <div className="footer-logo">
                  <div className="logo-icon-blue">
                    <span className="material-symbols-outlined">shield_with_heart</span>
                  </div>
                  <span className="logo-text">TrueCare</span>
                </div>
                <p className="footer-desc">
                  An end-to-end medical & financial lifeline platform that protects patients from emergency to discharge.
                </p>
                <div className="social-links">
                  <a href="#" className="social-btn" onClick={(e) => { e.preventDefault(); alert('Twitter: Follow @TrueCareIndia for real-time patient rights updates.'); }}><span className="material-symbols-outlined">code</span></a>
                  <a href="#" className="social-btn" onClick={(e) => { e.preventDefault(); alert('LinkedIn: Join the professional network for medical financial transparency.'); }}><span className="material-symbols-outlined">share</span></a>
                  <a href="#" className="social-btn" onClick={(e) => { e.preventDefault(); alert('Community: Join our Bharat Health Mission on WhatsApp.'); }}><span className="material-symbols-outlined">groups</span></a>
                  <a href="#" className="social-btn" onClick={(e) => { e.preventDefault(); alert('Mail: Reach us at mission@truecare.org.in for partnership queries.'); }}><span className="material-symbols-outlined">mail</span></a>
                </div>
              </div>

              {/* Product Column */}
              <div className="footer-links">
                <h4>Product</h4>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>Emergency Navigator</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/truebill'); }}>TrueBill AI</a></li>
                  <li><a href="#hero" onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); }}>Trust Badges</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); alert('WhatsApp Bot: Launching Q3 2026. Stay tuned for real-time hospital navigation.'); }}>WhatsApp Bot</a></li>
                </ul>
              </div>

              {/* Resources Column */}
              <div className="footer-links">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#hero" onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); }}>How it Works</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.open('https://pmjay.gov.in/', '_blank'); }}>Ayushman Bharat Info</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.open('https://cghs.nic.in/', '_blank'); }}>CGHS Guidelines</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Educational Series: GST on Healthcare. Coming soon to help you understand your billing rights.'); }}>GST on Healthcare</a></li>
                </ul>
              </div>

              {/* Company Column */}
              <div className="footer-links">
                <h4>Company</h4>
                <ul>
                  <li><a href="#vision" onClick={(e) => { e.preventDefault(); document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' }); }}>About Us</a></li>
                  <li><a href="#vision" onClick={(e) => { e.preventDefault(); document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' }); }}>Our Mission</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: Your data is encrypted and handled according to DISHA guidelines. Full policy coming soon.'); }}>Privacy Policy</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Service: By using TrueCare, you agree to our emergency-first usage policy. Full terms coming soon.'); }}>Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2026 TrueCare India. Built with ❤️ for Bharat.</p>
              <div className="footer-legal">
                <span>Verified Data</span>
                <span>•</span>
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;