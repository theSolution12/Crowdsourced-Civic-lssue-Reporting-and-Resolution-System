# Crowdsourced Civic Issue Reporting and Resolution System (CCIRRS)

*जनसेतु - Connecting Citizens with Governance*

## 🚀 Smart India Hackathon 2025 Project

A comprehensive digital platform designed for the **Government of Jharkhand** to revolutionize civic issue reporting and resolution. This system empowers citizens to directly report infrastructure problems, track progress, and collaborate with authorities to build better communities.

## 📋 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [SIH Alignment](#sih-alignment)
- [License](#license)

## 🎯 Overview

The **Crowdsourced Civic Issue Reporting and Resolution System (CCIRRS)** addresses the critical gap between citizens and government services in Jharkhand. By leveraging modern web technologies, this platform creates a transparent, efficient, and user-friendly solution for civic issue management.

### Core Objectives

- **Empower Citizens**: Enable easy reporting of civic issues through mobile and web interfaces
- **Enhance Transparency**: Provide real-time tracking and updates on issue resolution
- **Improve Efficiency**: Streamline the workflow for government departments and officials
- **Build Community**: Foster collaborative problem-solving between citizens and authorities
- **Drive Digital Governance**: Support Jharkhand's digital transformation initiatives

## 💡 Problem Statement

Traditional civic issue reporting in Jharkhand faces several challenges:
- Lack of centralized reporting system
- Poor communication between citizens and authorities
- Limited transparency in issue resolution
- Inefficient departmental coordination
- No systematic tracking of civic problems

Our solution addresses these challenges by providing a modern, accessible, and comprehensive digital platform.

## ✨ Key Features

### For Citizens
- **📱 Mobile-First Design**: Optimized for smartphones with offline capability
- **📸 Photo Evidence Support**: Capture and upload images directly from devices
- **📍 GPS Location Integration**: Automatic location detection for precise issue reporting
- **🔔 Real-Time Notifications**: Instant updates on issue status and progress
- **👥 Community Dashboard**: View issues reported in your area
- **🔒 Secure Authentication**: Government-grade security for personal data protection

### For Administrators
- **📊 Comprehensive Dashboard**: Overview of all reported issues with analytics
- **✅ Verification System**: Multi-stage verification process for reported issues
- **👨‍💼 Department Management**: Role-based access for different government departments
- **📈 Analytics & Insights**: Track resolution rates and civic improvements
- **🗺️ Interactive Maps**: Geographic visualization of issues across Jharkhand
- **⏰ SLA Management**: Service Level Agreement tracking and notifications

### Issue Categories Supported
- **🛣️ Road Infrastructure**: Potholes, damaged roads, traffic signals
- **💡 Electricity**: Streetlight failures, power outages
- **💧 Water Supply**: Pipeline issues, water quality problems
- **🗑️ Waste Management**: Garbage collection, illegal dumping
- **🌳 Environmental**: Pollution, tree management
- **🏛️ Public Facilities**: Parks, government buildings maintenance

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js, React Three Fiber
- **Icons**: Tabler Icons, Lucide React

### Development Tools
- **Bundler**: Turbopack (Next.js)
- **Linting**: ESLint 9
- **Package Manager**: npm
- **Version Control**: Git

### Additional Features
- **Fonts**: Geist and Geist Mono (Google Fonts)
- **Responsive Design**: Mobile-first approach
- **Progressive Web App**: Offline functionality
- **Accessibility**: WCAG 2.1 compliant

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm 8+
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/TheRaj71/Crowdsourced-Civic-lssue-Reporting-and-Resolution-System.git
cd Crowdsourced-Civic-lssue-Reporting-and-Resolution-System
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Create environment file (if needed)
cp .env.example .env.local
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📖 Usage

### For Citizens

1. **Registration/Login**
   - Create account with mobile number verification
   - Secure authentication with government standards

2. **Report an Issue**
   - Click "Report New Issue" on homepage
   - Select issue category (Road, Water, Electricity, etc.)
   - Add description and photos
   - Provide precise location
   - Submit with automatic ticket generation

3. **Track Progress**
   - Receive unique ticket number
   - Get real-time notifications
   - View status updates and comments
   - Rate resolution quality

### For Administrators

1. **Dashboard Access**
   - Login with admin credentials
   - Access comprehensive issue overview
   - Monitor department-wise statistics

2. **Issue Management**
   - Review newly reported issues
   - Verify and categorize issues
   - Assign to appropriate departments
   - Track resolution progress
   - Generate reports and analytics

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── login/             # Authentication pages
│   ├── signup/            # User registration
│   └── verify/            # Issue verification
├── components/            # Reusable React components
│   ├── ui/               # UI component library
│   ├── dashboard-*.tsx   # Dashboard components
│   └── *-page.tsx        # Page-specific components
├── demo/                 # Demo components and examples
├── lib/                  # Utility functions
├── public/               # Static assets
└── README.md            # Project documentation
```

## 🤝 Contributing

We welcome contributions from the developer community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Guidelines
- Follow TypeScript best practices
- Use ESLint configuration provided
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

### Issue Categories for Contributors
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🔧 Configuration updates

## 🎯 SIH Alignment

This project directly addresses **Smart India Hackathon 2024** objectives:

### Problem Category: E-Governance
- **Digital India Initiative**: Supporting India's digital transformation
- **Citizen Empowerment**: Direct citizen-government interaction platform
- **Transparent Governance**: Real-time tracking and accountability
- **Scalable Solution**: Designed for statewide deployment in Jharkhand

### Innovation Highlights
- **Cultural Integration**: UI reflects Jharkhand's rich cultural heritage
- **Accessibility**: Multi-language support for local communities
- **Sustainability**: Environmentally conscious issue categorization
- **Social Impact**: Measurable improvement in civic infrastructure

### Evaluation Criteria Met
- ✅ **Technical Innovation**: Modern web technologies and mobile-first approach
- ✅ **Scalability**: Cloud-ready architecture for millions of users
- ✅ **User Experience**: Intuitive design for all age groups
- ✅ **Social Impact**: Direct improvement in quality of life
- ✅ **Feasibility**: Ready for immediate deployment

## 📜 License

This project is part of Smart India Hackathon 2025 and is intended for the Government of Jharkhand. All rights reserved.

---

**Developed with ❤️ for the people of Jharkhand**

*For technical support or queries, please contact the development team.*

**जय हिन्द | जय झारखण्ड**
