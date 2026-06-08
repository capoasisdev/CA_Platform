⸻

Project Overview

Build a modern web platform called CA Connect Global (temporary name).

The platform’s purpose is to create the world’s largest network of Chartered Accountants, Certified Public Accountants, Tax Consultants, Auditors, Corporate Advisors, and Financial Professionals while allowing businesses and clients to connect with them for professional services.

This platform acts as a professional marketplace and networking ecosystem.

Core Concept

Two types of users:

1. Financial Professionals

Includes:

* Chartered Accountants
* CPAs
* Tax Consultants
* Auditors
* Financial Advisors
* Compliance Experts
* Corporate Secretaries
* M&A Advisors
* Business Valuation Experts

Professionals can:

* Create profiles
* Showcase expertise
* Add certifications
* Add countries served
* Add industries served
* Receive client inquiries
* Build professional networks
* Receive ratings and reviews
* Offer consultation services

2. Business Clients

Includes:

* Startups
* SMEs
* Enterprises
* Investors
* Entrepreneurs
* Business Owners

Clients can:

* Search professionals globally
* Find experts by country
* Find experts by specialization
* Post requirements
* Request consultations
* Send inquiries
* Compare professionals
* Build long-term professional relationships

⸻

Example Use Cases

Company Expansion

A business owner wants to open operations in another country.

The platform helps them find verified professionals in that country who can assist with:

* Company registration
* Tax planning
* Compliance
* Banking setup
* Legal coordination

Business Sale

A company owner wants to sell their business.

The platform helps them find:

* Valuation experts
* M&A advisors
* Due diligence specialists

Tax and Compliance

Businesses can connect with specialists for:

* Corporate tax
* GST/VAT
* International taxation
* Transfer pricing
* Audits
* Financial reporting

⸻

Long-Term Vision

The platform should evolve into a global ecosystem that combines:

* Professional networking
* Service marketplace
* Knowledge sharing
* Consultation booking
* Business advisory services
* International collaboration

Think of it as a combination of:

* LinkedIn for accounting professionals
* Upwork for financial services
* Clutch for advisory firms

but built specifically for the accounting, finance, compliance, and business advisory industry.

⸻

Technology Stack

* React
* React Router
* JavaScript
* Vite
* Standard CSS only
* Future Supabase integration

Do NOT integrate Supabase yet, but structure the codebase so it can be plugged in later.

⸻

Design Requirements

Create a premium, professional, enterprise-grade UI.

Style should feel trustworthy because users may make important business and financial decisions through the platform.

Characteristics:

* Minimal
* Professional
* Modern
* Clean
* Corporate
* Light theme
* Spacious layouts
* Consistent design system

Avoid:

* Overly colorful designs
* Gaming-style UI
* Excessive gradients
* Fancy animations
* Glassmorphism

Color System:

Primary: #2563EB
Secondary: #64748B
Background: #F8FAFC
Surface: #FFFFFF
Border: #E2E8F0
Text Primary: #0F172A
Text Secondary: #64748B

⸻

Architecture Requirements

Create a scalable enterprise-level folder structure.

src/
├── assets/
├── components/
├── pages/
├── layouts/
├── routes/
├── services/
├── hooks/
├── utils/
├── constants/
├── styles/
├── context/
├── data/

Every feature must be modular and reusable.

⸻

CSS Rules

Do NOT use:

* Tailwind
* Bootstrap
* Material UI
* Chakra UI
* Styled Components

Use standard CSS files only.

Create:

styles/
├── global.css
├── variables.css
├── utilities.css

All colors, spacing, shadows, border radii, typography sizes, transitions, z-index values, and container widths must be stored as CSS variables.

Never hardcode values throughout the application.

Use variables everywhere.

Example:

Bad: color: #2563EB;
Good - color: var(--primary-color);


Reusable Components

Create reusable components for:

* Button
* Input
* Select
* TextArea
* Card
* Modal
* Badge
* Avatar
* Table
* Loader
* Empty State

Avoid duplicate code.

⸻

Layout System

Create:

* MainLayout
* AuthLayout
* DashboardLayout

Pages must use layouts instead of duplicating structure.

⸻

Initial Pages

Create responsive starter pages:

* Home
* About
* Contact
* Login
* Register
* Dashboard

Include professional placeholder content relevant to the CA networking platform.

⸻

Coding Standards

* Clean architecture
* Reusable components
* Meaningful naming
* Scalable folder structure
* No dead code
* No inline styling
* Modular design
* Future-ready for Supabase

⸻

Deliverables

Generate:

1. Complete project folder structure
2. Routing architecture
3. Layout architecture
4. Global CSS system
5. Variables CSS system
6. Utility CSS system
7. Reusable UI components
8. Responsive Homepage
9. Responsive Navbar
10. Responsive Footer

Create all files and boilerplate code required for a scalable foundation. Do not skip files. Think like this project will eventually serve millions of users globally.