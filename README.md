<div align="center">

# 🛡️ TrueCare

### **Healthcare Trust & Financial Lifeline Platform**

*From finding the right emergency hospital to exposing fraudulent medical bills — TrueCare protects your family, physically and financially.*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-client--lyart--six--47.vercel.app-2563eb?style=for-the-badge)](https://client-lyart-six-47.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/svmbhardwaj/TrueCare)
[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

<br/>

> **India Innovates '26 — Hackathon Project**

</div>

---

## 📌 The Problem

Every year in India:

- **55 million+ families** face financial hardship due to medical costs
- **68% of hospital bills** in private hospitals contain overcharges or errors
- Patients in emergencies have **no way to verify** if a hospital accepts their insurance scheme
- Medical billing fraud costs the system **₹12,000+ crores** annually
- Rural & low-income families are disproportionately affected with **zero transparency**

There is no unified platform that handles the **complete patient journey** — from emergency hospital discovery to billing verification.

---

## 💡 The Idea

**TrueCare** is an end-to-end medical and financial lifeline platform that protects patients across two critical phases:

| Phase | Problem | TrueCare Solution |
|-------|---------|-------------------|
| **🏥 Emergency** | Don't know which hospital accepts your scheme | **Emergency Navigator** — finds nearby hospitals matching your medical need AND insurance/scheme |
| **💰 Post-Treatment** | Inflated, fraudulent, or incorrect bills | **TrueBill AI** — scans bills using OCR + NLP to detect overcharges, missing GST, and inflated pricing |

---

## 🔄 How It Works

### Phase 1: Emergency Hospital Navigator

```
📍 User in Emergency
        │
        ▼
┌─────────────────────┐
│  Select Medical Need │ ── Cardiac, Trauma, Maternity, Pediatric, etc.
└─────────┬───────────┘
          │
          ▼
┌─────────────────────────┐
│  Select Insurance/Scheme │ ── Ayushman Bharat, CGHS, ESIC, Star Health, etc.
└─────────┬───────────────┘
          │
          ▼
┌──────────────────────────────┐
│  Matched Hospital Results     │
│  • Distance & Navigation      │
│  • Trust Badge (Gold/Silver)  │
│  • Available Specialties      │
│  • Scheme Verification ✅     │
└──────────────────────────────┘
```

### Phase 2: TrueBill AI Scanner

```
📄 Upload Hospital Bill (Photo/PDF)
        │
        ▼
┌─────────────────┐
│  OCR Extraction  │ ── Extracts text & line items from bill
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│  NLP Item Detection  │ ── Identifies medicines, procedures, fees
└────────┬────────────┘
         │
         ▼
┌──────────────────────────┐
│  Tax & Compliance Check   │ ── Validates GST rates (5%/12%/18%)
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Market Price Comparison      │
│  • Billed vs True Price       │
│  • Overcharge Detection       │
│  • Total Savings Calculation  │
│  • Downloadable PDF Report    │
└──────────────────────────────┘
```

---

## 🌟 Key Features

| Feature | Description |
|---------|-------------|
| 🏥 **Emergency Navigator** | Find the nearest hospital that matches your medical need AND accepts your insurance/government scheme |
| 🔍 **TrueBill AI Scanner** | Upload a hospital bill — AI detects overcharges, verifies GST, compares market rates line-by-line |
| 🏅 **Trust Badges** | Community-verified hospital ratings (Platinum / Gold / Silver) based on real patient experiences |
| 📊 **Transparent Billing** | Side-by-side comparison of billed amount vs. true market price for every item |
| 🛡️ **Scheme Verification** | Real-time verification of Ayushman Bharat, CGHS, ESIC, and 30+ private insurance providers |
| 👥 **Community Trust Network** | Crowdsourced hospital reviews and trust scores from real patients |
| 📱 **Responsive Design** | Works seamlessly on mobile, tablet, and desktop |

---

## 🏗️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| **UI/UX** | Glassmorphism, Particle animations, Lucide icons |
| **Styling** | Custom CSS animations, Gradient effects, Dark theme |
| **Deployment** | Vercel |
| **Version Control** | Git, GitHub |

---

## 📂 Project Structure

```
TrueCare/
├── client/                     # Frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx        # Home page (12 sections)
│   │   │   ├── layout.tsx      # Root layout with Navbar, Particles
│   │   │   ├── globals.css     # Custom styles & animations
│   │   │   ├── about/          # About page
│   │   │   ├── navigator/      # Dedicated Navigator page
│   │   │   └── truebill/       # Dedicated TrueBill page
│   │   └── components/
│   │       ├── Hero.tsx              # Landing hero section
│   │       ├── Marquee.tsx           # Scrolling trust badges
│   │       ├── Features.tsx          # 6 feature cards
│   │       ├── HowItWorks.tsx        # Step-by-step flow
│   │       ├── EmergencyNavigator.tsx # Interactive hospital finder
│   │       ├── TrueBillAI.tsx        # Bill scanning interface
│   │       ├── StatsCounter.tsx      # Animated impact numbers
│   │       ├── TrustCommunity.tsx    # Trust badges & leaderboard
│   │       ├── TestimonialSlider.tsx  # User testimonials carousel
│   │       ├── WhyUs.tsx             # Competitor comparison
│   │       ├── FAQ.tsx               # Collapsible FAQ section
│   │       ├── Footer.tsx            # Footer with mission statement
│   │       ├── Navbar.tsx            # Fixed glass navigation
│   │       ├── ParticleField.tsx     # Canvas particle background
│   │       └── ScrollToTop.tsx       # Scroll-to-top button
│   ├── tailwind.config.ts      # Custom theme configuration
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/svmbhardwaj/TrueCare.git
cd TrueCare/client

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

---

## 🗺️ Roadmap & Future Goals

| Phase | Feature | Status |
|-------|---------|--------|
| ✅ Phase 1 | Emergency Hospital Navigator | **Live** |
| ✅ Phase 1 | TrueBill AI Scanner UI | **Live** |
| ✅ Phase 1 | Trust Badge System | **Live** |
| 🔄 Phase 2 | WhatsApp Emergency Bot — share location, get hospitals via chat | **Beta** |
| 🔄 Phase 2 | OCR + NLP Backend Pipeline (Python/FastAPI) | **In Development** |
| 📋 Phase 3 | Direct Insurance API Integration — real-time policy verification | **Planned** |
| 📋 Phase 3 | B2B Hospital Auditing SaaS — sell ML pipeline to insurers | **Planned** |
| 📋 Phase 4 | Offline-First Emergency Mode — pre-cached hospital data | **Planned** |
| 📋 Phase 4 | Multi-language Support — Hindi, Tamil, Bengali, Marathi | **Planned** |
| 📋 Phase 5 | Government Dashboard — anonymized fraud analytics for regulators | **Planned** |

---

## 🎯 Our Mission

> *A world where no family is financially destroyed by a medical emergency. Where every patient — regardless of income, literacy, or location — has instant access to verified hospitals and transparent billing. TrueCare is the first step towards that vision.*

---

## 👥 Team

<div align="center">

<table>
  <tr>
    <td align="center" width="180">
      <img src="https://img.shields.io/badge/M1-Team_Lead-2563eb?style=for-the-badge&logo=github&logoColor=white" /><br/>
      <b>Member 1 (You)</b><br/>
      <sub>Role / Title</sub><br/><br/>
      <a href="#">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
      <a href="#">
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
    </td>
    <td align="center" width="180">
      <img src="https://img.shields.io/badge/M2-Team_Member-2563eb?style=for-the-badge&logo=github&logoColor=white" /><br/>
      <b>Member 2</b><br/>
      <sub>Role / Title</sub><br/><br/>
      <a href="#">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
      <a href="#">
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
    </td>
    <td align="center" width="180">
      <img src="https://img.shields.io/badge/M3-Team_Member-2563eb?style=for-the-badge&logo=github&logoColor=white" /><br/>
      <b>Member 3</b><br/>
      <sub>Role / Title</sub><br/><br/>
      <a href="#">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
      <a href="#">
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
    </td>
    <td align="center" width="180">
      <img src="https://img.shields.io/badge/M4-Team_Member-2563eb?style=for-the-badge&logo=github&logoColor=white" /><br/>
      <b>Member 4</b><br/>
      <sub>Role / Title</sub><br/><br/>
      <a href="#">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
      <a href="#">
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
    </td>
    <td align="center" width="180">
      <img src="https://img.shields.io/badge/M5-Team_Member-2563eb?style=for-the-badge&logo=github&logoColor=white" /><br/>
      <b>Member 5</b><br/>
      <sub>Role / Title</sub><br/><br/>
      <a href="#">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
      <a href="#">
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

</div>

> 💡 *Replace `#` in the href links above with your actual GitHub and LinkedIn profile URLs, and update the names and roles.*

---

## 📄 License

This project is built for **India Innovates '26** hackathon.

---

<div align="center">

**Built with ❤️ for a healthier, fairer India**

[![Deploy](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://client-lyart-six-47.vercel.app)

⭐ Star this repo if you believe in transparent healthcare!

</div>
