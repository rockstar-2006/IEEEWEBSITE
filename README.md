# IEEE Student Branch Website

A modern, professional React-based website for IEEE Student Branch with complete admin and student management functionality.

## 🚀 Features

### Student Features
- **Account Management**: Sign up and login with IEEE credentials
- **Event Registration**: Browse and register for upcoming events
- **Dashboard**: View registered events, volunteer assignments, and past activities
- **Society Filtering**: Filter events by IEEE societies (Computer, Communication, SIGHT, WIE)

### Admin Features
- **Event Management**: Create, edit, and manage events with rich descriptions
- **Student Management**: View all registered students and their activities
- **Volunteer Assignment**: Assign students as volunteers for specific events
- **Analytics Dashboard**: Track registrations, attendance, and society performance
- **Export Functionality**: Export participant lists and reports

### Design & UX
- **IEEE Branding**: Official color scheme (#0057B7) and professional design
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Smooth Animations**: Framer Motion powered animations throughout
- **Modern Typography**: Google Fonts (Inter/Roboto) for optimal readability
- **Accessibility**: WCAG compliant with proper contrast ratios and semantic HTML

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks + Context API
- **Data**: JSON-based dummy data with localStorage persistence

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Demo Credentials

### Student Login
- **IEEE ID**: std001@ieee.local
- **Password**: Use the same as IEEE ID

### Admin Login
- **IEEE ID**: admin@ieee.local
- **Password**: Admin@2025

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Navbar, Footer, Loading screens
│   ├── ui/             # UI elements (buttons, inputs, cards)
│   ├── forms/          # Form components
│   └── admin/          # Admin-specific components
├── pages/              # Page components
│   ├── public/         # Public pages (Home, About, Events, etc.)
│   ├── student/        # Student authentication and dashboard
│   └── admin/          # Admin panel pages
├── data/               # JSON data files
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## 🎨 Design System

### Colors
- **Primary**: #0057B7 (IEEE Blue)
- **Background**: #F5F5F5
- **Success**: Green variants
- **Warning**: Orange variants
- **Error**: Red variants

### Typography
- **Headings**: Zilla Slab (serif)
- **Body**: Inter (sans-serif)
- **UI Elements**: System fonts with Inter fallback

### Spacing
- **Base unit**: 8px
- **Consistent grid system**: 8px multiples
- **Responsive breakpoints**: Mobile (< 768px), Tablet (768px-1024px), Desktop (> 1024px)

## 🎭 Key Features

### Authentication
- Client-side authentication simulation
- Route protection for admin and student areas
- Persistent sessions via localStorage

### Event Management
- Full CRUD operations for events
- Society-based categorization
- Capacity management and waitlists
- Volunteer assignment system

### Data Management
- JSON-based dummy data
- Client-side state management
- Data persistence simulation
- Export functionality (CSV format)

### Animations
- Page transitions with Framer Motion
- Loading screens with animated IEEE logo
- Micro-interactions on hover/click
- Smooth component animations

## 🔧 Customization

### Adding New Societies
Update the societies array in relevant components and data files:

```typescript
const societies = [
  'Computer Society',
  'Communication Society', 
  'SIGHT',
  'WIE',
  'Your New Society' // Add here
];
```

### Modifying Event Fields
Update the Event interface in `src/types/index.ts` and corresponding forms.

### Changing Color Scheme
Update Tailwind config and CSS custom properties for brand colors.

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoint system**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Collapsible navigation** for mobile devices
- **Touch-friendly interfaces** with appropriate sizing
- **Optimized images** with lazy loading

## 🚀 Deployment

The application is ready for deployment on any static hosting platform:

```bash
# Build the application
npm run build

# Deploy the dist/ folder to your hosting platform
```

Recommended platforms:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🎯 Future Enhancements

- Real backend API integration
- Email notifications for events
- Payment gateway for paid events
- Mobile app using React Native
- Advanced analytics and reporting
- Social media integration
- Calendar synchronization (Google Calendar, Outlook)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for the IEEE Student Community**



WEBSITE LINK  :  https://ieee-student-branch-bd1y.bolt.host
