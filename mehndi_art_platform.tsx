import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Phone,
  MessageCircle,
  Search,
  Filter,
  User,
  Heart,
  Eye,
  Award,
  CreditCard,
  Download,
  Printer,
  X,
  Menu,
  SlidersHorizontal,
  ChevronDown,
  Info,
  Layers,
  ArrowRight,
  Briefcase,
  TrendingUp,
  DollarSign,
  AlertCircle,
  FileText,
  Settings,
  HelpCircle,
  Share2,
  Lock,
  RefreshCw,
  Plus
} from 'lucide-react';

const INITIAL_SERVICES = [
  {
    id: 'srv-1',
    name: 'Royal Bridal Maharani Package',
    tagline: 'Intricate bridal storytelling with figures & royal motifs',
    coverage: 'Both hands up to elbows (palms + back) & feet up to mid-calf',
    price: 15000,
    advancePercentage: 30,
    durationHours: 6,
    category: 'Bridal',
    badge: 'Most Popular',
    includes: ['Organic triple-filtered Sojat henna', 'Clove & eucalyptus post-care oil', 'Custom Dulha-Dulhan portrait motifs', 'Bridal squad 1 guest hand included'],
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-2',
    name: 'Classic Engagement & Chic Henna',
    tagline: 'Modern symmetry with jaali work and delicate mandala accents',
    coverage: 'Palms & backs up to wrists, light matching feet mandalas',
    price: 6500,
    advancePercentage: 30,
    durationHours: 3.5,
    category: 'Engagement',
    badge: 'Trending',
    includes: ['Pure chemical-free henna paste', 'Sealant spray with lemon & sugar', 'Geometric cuff detailing', 'Photo-ready finish'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-3',
    name: 'Sangeet & Bridal Party Squad (Up to 10)',
    tagline: 'Fast-paced exquisite patterns for bridesmaids & family',
    coverage: 'Single side palms or backs for 8-10 family guests',
    price: 12500,
    advancePercentage: 30,
    durationHours: 4,
    category: 'Party',
    badge: 'Best Value',
    includes: ['Two visiting senior mehndi artists', 'High stain organic cones', 'Custom speed-art catalogs for guests', 'Touchup kit included'],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-4',
    name: 'Arabic Fusion & Floral Silhouette',
    tagline: 'Bold shading, fluid vines and negative space elegance',
    coverage: 'One full hand palm & back flowing seamlessly',
    price: 3200,
    advancePercentage: 30,
    durationHours: 2,
    category: 'Arabic',
    badge: 'Minimal Luxury',
    includes: ['Deep burgundy stain profile', 'Crystal sparkle embellishment', 'Post-application sealant', '20-min express drying solution'],
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80'
  }
];

const INITIAL_ARTISTS = [
  {
    id: 'art-1',
    name: 'Master Sunita Rawat',
    title: 'Heritage Marwari & Portrait Specialist',
    location: 'Jaipur, Rajasthan',
    serviceCities: ['Jaipur', 'Udaipur', 'Delhi NCR', 'Jodhpur'],
    experience: '14+ Years',
    rating: 4.98,
    reviewsCount: 342,
    travelReady: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Pioneered signature royal portrait henna for palace weddings across Rajasthan. Master in hand-blended organic Sojat leaves with dark mahogany guarantees.',
    specialties: ['Marwari Motifs', 'Dulha-Dulhan Figurines', 'Symmetrical Jaal'],
    minBudget: 12000,
    bookedDates: ['2026-10-12', '2026-10-14', '2026-10-18']
  },
  {
    id: 'art-2',
    name: 'Ayesha Henna Atelier',
    title: 'Contemporary Indo-Arabic & Mandala Artisan',
    location: 'Mumbai, Maharashtra',
    serviceCities: ['Mumbai', 'Pune', 'Goa'],
    experience: '9 Years',
    rating: 4.95,
    reviewsCount: 218,
    travelReady: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Renowned for razor-sharp micro lines, floral lace motifs, and modern aesthetic negative-space compositions preferred by celebrity brides.',
    specialties: ['Gulf Arabic', 'Lace Wrist Cuffs', 'Minimalist Feet Mandalas'],
    minBudget: 6000,
    bookedDates: ['2026-10-11', '2026-10-16']
  },
  {
    id: 'art-3',
    name: 'Rajesh Sharma & Team',
    title: 'Royal Bridal & Destination Wedding Ensemble',
    location: 'Delhi NCR',
    serviceCities: ['Delhi NCR', 'Jaipur', 'Agra', 'Chandigarh'],
    experience: '16 Years',
    rating: 4.99,
    reviewsCount: 480,
    travelReady: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Specialist in large-scale luxury Sangeet gatherings and intricate Mughal heritage bridal designs with zero chemical blends.',
    specialties: ['Mughal Architecture Motifs', 'Speed Sangeet Squads', 'Full Leg Extents'],
    minBudget: 15000,
    bookedDates: ['2026-10-15', '2026-10-20']
  },
  {
    id: 'art-4',
    name: 'Priya Bridal Mehndi',
    title: 'Organic Henna & Rajasthani Folk Artist',
    location: 'Bangalore, Karnataka',
    serviceCities: ['Bangalore', 'Hyderabad', 'Chennai'],
    experience: '8 Years',
    rating: 4.92,
    reviewsCount: 165,
    travelReady: false,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Passionate about traditional peacock, doli, and kalash iconography blended with ergonomic speed and warm hospitable care for brides.',
    specialties: ['Doli & Baarat Motifs', 'Lotus Mandalas', 'Organic Sojat Mix'],
    minBudget: 5000,
    bookedDates: ['2026-10-13']
  }
];

const INITIAL_DESIGNS = [
  {
    id: 'des-1',
    title: 'The Jodhpur Royal Jharokha',
    category: 'Bridal Full Hands',
    artist: 'Master Sunita Rawat',
    timeEst: '5.5 hrs',
    tag: 'Palace Heritage',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    description: 'Detailed palace arches, lotus fountains, and miniature portrait cutouts on both forearms.'
  },
  {
    id: 'des-2',
    title: 'Minimalist Arabian Bel Vine',
    category: 'Arabic Minimal',
    artist: 'Ayesha Henna Atelier',
    timeEst: '2 hrs',
    tag: 'Chic Minimal',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp floral vines with deliberate breathing spaces, ending in delicate finger cuffs.'
  },
  {
    id: 'des-3',
    title: 'Shahi Shehnai & Doli Baarat',
    category: 'Traditional Rajasthani',
    artist: 'Rajesh Sharma & Team',
    timeEst: '6 hrs',
    tag: 'Classic Royal',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Complete Indian wedding ritual depicted sequentially across elbows, palms, and feet.'
  },
  {
    id: 'des-4',
    title: 'Lotus Petal Feet Ensemble',
    category: 'Mandala & Feet',
    artist: 'Priya Bridal Mehndi',
    timeEst: '3 hrs',
    tag: 'Feet Heritage',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    description: 'Concentric lotus mandalas framing the ankles with intricate mesh jaali along the sides.'
  },
  {
    id: 'des-5',
    title: 'Devoted Radha-Krishna Portrait',
    category: 'Bridal Full Hands',
    artist: 'Master Sunita Rawat',
    timeEst: '7 hrs',
    tag: 'Bespoke Portrait',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    description: 'Hyper-detailed deity portraits surrounded by forest vines, peacocks, and temple bells.'
  },
  {
    id: 'des-6',
    title: 'Dubai Lace Contemporary Cuff',
    category: 'Arabic Minimal',
    artist: 'Ayesha Henna Atelier',
    timeEst: '2.5 hrs',
    tag: 'Modern Lace',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Geometric mesh inspired by bridal lace gloves, accentuated with subtle shading.'
  }
];

const INITIAL_BOOKINGS = [
  {
    id: 'MHA-2026-9214',
    customerName: 'Ananya Singhania',
    phone: '+91 98201 44521',
    email: 'ananya.s@example.com',
    service: 'Royal Bridal Maharani Package',
    artist: 'Master Sunita Rawat',
    city: 'Jaipur',
    venue: 'Rambagh Palace, Suite 204',
    date: '2026-10-24',
    slot: '10:00 AM - 04:00 PM',
    totalAmount: 15000,
    advancePaid: 4500,
    balanceAmount: 10500,
    status: 'Confirmed',
    paymentMethod: 'Razorpay UPI (Verified)',
    razorpayPaymentId: 'pay_OMsK8219HqLk21',
    createdAt: '2026-10-06'
  },
  {
    id: 'MHA-2026-8832',
    customerName: 'Kareena Kapoor',
    phone: '+91 98112 90345',
    email: 'kareena.k@example.com',
    service: 'Sangeet & Bridal Party Squad (Up to 10)',
    artist: 'Rajesh Sharma & Team',
    city: 'Delhi NCR',
    venue: 'The Leela Palace, Chanakyapuri',
    date: '2026-10-28',
    slot: '02:00 PM - 06:00 PM',
    totalAmount: 12500,
    advancePaid: 3750,
    balanceAmount: 8750,
    status: 'Confirmed',
    paymentMethod: 'Razorpay NetBanking',
    razorpayPaymentId: 'pay_NLpT7710JpPx99',
    createdAt: '2026-10-07'
  },
  {
    id: 'MHA-2026-7641',
    customerName: 'Rhea Deshmukh',
    phone: '+91 97654 32109',
    email: 'rhea.d@example.com',
    service: 'Classic Engagement & Chic Henna',
    artist: 'Ayesha Henna Atelier',
    city: 'Mumbai',
    venue: 'Bandra West, Sea Face Apt',
    date: '2026-11-02',
    slot: '11:00 AM - 02:30 PM',
    totalAmount: 6500,
    advancePaid: 1950,
    balanceAmount: 4550,
    status: 'Pending Advance',
    paymentMethod: 'Pending Gateway',
    razorpayPaymentId: null,
    createdAt: '2026-10-08'
  }
];

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    bride: 'Radhika Merchant-Mehta',
    city: 'Udaipur Wedding',
    quote: 'Sunita ji was extraordinary! The color deepened into the richest royal mahogany on my wedding day. Booking through Mehndi Art made the date reservation totally stress-free.',
    stars: 5,
    tag: 'Bridal Maharani'
  },
  {
    id: 2,
    bride: 'Tanvi Sehgal',
    city: 'Delhi NCR',
    quote: 'Transparent advance payment with instant Razorpay confirmation gave my family immense peace of mind. The artist arrived 15 mins early with pristine organic cones.',
    stars: 5,
    tag: 'Sangeet Squad'
  },
  {
    id: 3,
    bride: 'Meera Iyer',
    city: 'Bangalore',
    quote: 'The symmetrical mandala work and neatness was sheer poetry. Not a single drop of chemical, fresh eucalyptus scent that stayed throughout the ceremonies.',
    stars: 5,
    tag: 'Engagement Chic'
  }
];

export default function MehndiArtApp() {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState('home'); // home, designs, artists, services, booking, admin
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Entities & Persistent State
  const [services] = useState(INITIAL_SERVICES);
  const [artists, setArtists] = useState(INITIAL_ARTISTS);
  const [designs] = useState(INITIAL_DESIGNS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [testimonials] = useState(INITIAL_TESTIMONIALS);

  // Platform Config
  const [platformConfig, setPlatformConfig] = useState({
    businessPhone: '+919876543210',
    businessEmail: 'concierge@mehndiart.in',
    advancePercentage: 30,
    razorpayKeyId: 'rzp_test_MehndiArt2026Key',
    brandName: 'Mehndi Art'
  });

  // Filter States
  const [designCategoryFilter, setDesignCategoryFilter] = useState('All');
  const [artistCityFilter, setArtistCityFilter] = useState('All');
  const [activeModalDesign, setActiveModalDesign] = useState(null);
  const [activeModalArtist, setActiveModalArtist] = useState(null);

  // Toast System
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // WhatsApp Floating Assistant State
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [customWhatsAppMsg, setCustomWhatsAppMsg] = useState('');

  const [bookingStep, setBookingStep] = useState(1);
  const [bookingFormData, setBookingFormData] = useState({
    serviceId: 'srv-1',
    artistId: 'art-1',
    date: '2026-10-25',
    slot: '10:00 AM - 04:00 PM',
    customerName: '',
    phone: '',
    email: '',
    city: 'Jaipur',
    venue: '',
    notes: ''
  });

  // Payment Processing Simulation State
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState(null);
  const [paymentMethodChoice, setPaymentMethodChoice] = useState('upi'); // upi, card, netbanking

  // Helper Calculations for Selected Booking
  const selectedService = useMemo(() => {
    return services.find(s => s.id === bookingFormData.serviceId) || services[0];
  }, [services, bookingFormData.serviceId]);

  const selectedArtist = useMemo(() => {
    if (bookingFormData.artistId === 'any') {
      return { name: 'Assigned Master Artist', location: bookingFormData.city || 'Pan-India', rating: 4.95 };
    }
    return artists.find(a => a.id === bookingFormData.artistId) || artists[0];
  }, [artists, bookingFormData.artistId, bookingFormData.city]);

  const bookingCalculations = useMemo(() => {
    const total = selectedService.price;
    const advance = Math.round(total * (platformConfig.advancePercentage / 100));
    const balance = total - advance;
    return { total, advance, balance };
  }, [selectedService, platformConfig.advancePercentage]);

  // Prevent Double Booking Check
  const isDateBookedForArtist = useMemo(() => {
    if (bookingFormData.artistId === 'any') return false;
    const artist = artists.find(a => a.id === bookingFormData.artistId);
    if (!artist) return false;
    // Check built-in booked dates + confirmed bookings in state
    const matchesConfirmedBookings = bookings.some(
      b => b.artist === artist.name && b.date === bookingFormData.date && b.status === 'Confirmed'
    );
    return (artist.bookedDates && artist.bookedDates.includes(bookingFormData.date)) || matchesConfirmedBookings;
  }, [artists, bookings, bookingFormData.artistId, bookingFormData.date]);

  const handleInitiateBookingForService = (srvId) => {
    setBookingFormData(prev => ({ ...prev, serviceId: srvId }));
    setActiveTab('booking');
    setBookingStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitiateBookingForArtist = (artId) => {
    setBookingFormData(prev => ({ ...prev, artistId: artId }));
    setActiveTab('booking');
    setBookingStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDesignForBooking = (design) => {
    // Match best corresponding service
    let srvId = 'srv-1';
    if (design.category.includes('Arabic')) srvId = 'srv-4';
    else if (design.category.includes('Engagement')) srvId = 'srv-2';
    else if (design.category.includes('Mandala')) srvId = 'srv-2';

    // Match artist if found
    const artistMatch = artists.find(a => a.name === design.artist);

    setBookingFormData(prev => ({
      ...prev,
      serviceId: srvId,
      artistId: artistMatch ? artistMatch.id : prev.artistId,
      notes: `Referred design style: "${design.title}" (${design.category})`
    }));

    setActiveModalDesign(null);
    setActiveTab('booking');
    setBookingStep(2);
    showToast(`Loaded "${design.title}" into your custom booking!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simulate Razorpay Server-side Order Verification & Instant Confirmed Booking
  const handleProcessRazorpayPayment = () => {
    if (!bookingFormData.customerName.trim() || !bookingFormData.phone.trim()) {
      showToast('Please provide your name and contact phone number', 'error');
      setBookingStep(4);
      return;
    }

    if (isDateBookedForArtist) {
      showToast('Selected date was just reserved. Please pick another date.', 'error');
      setBookingStep(3);
      return;
    }

    setIsProcessingPayment(true);

    // Simulate Server-side Razorpay Order generation & Webhook Signature Verification
    setTimeout(() => {
      const generatedRefId = `MHA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const generatedRzpPaymentId = `pay_rzp_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

      const newBookingRecord = {
        id: generatedRefId,
        customerName: bookingFormData.customerName,
        phone: bookingFormData.phone,
        email: bookingFormData.email || `${bookingFormData.customerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        service: selectedService.name,
        artist: selectedArtist.name,
        city: bookingFormData.city,
        venue: bookingFormData.venue || 'Client Residence / Wedding Venue',
        date: bookingFormData.date,
        slot: bookingFormData.slot,
        totalAmount: bookingCalculations.total,
        advancePaid: bookingCalculations.advance,
        balanceAmount: bookingCalculations.balance,
        status: 'Confirmed',
        paymentMethod: `Razorpay (${paymentMethodChoice.toUpperCase()}) - Signature Verified`,
        razorpayPaymentId: generatedRzpPaymentId,
        createdAt: new Date().toISOString().split('T')[0],
        notes: bookingFormData.notes
      };

      // Atomic Update
      setBookings(prev => [newBookingRecord, ...prev]);
      setPaymentSuccessData(newBookingRecord);
      setIsProcessingPayment(false);
      setBookingStep(6); // Confirmation screen
      showToast(`Reservation Secured! Booking Reference ${generatedRefId}`);
    }, 2200);
  };

  const triggerWhatsAppChat = (customSubject = '') => {
    const basePhone = platformConfig.businessPhone.replace(/[^0-9]/g, '');
    let text = `Hello Mehndi Art Concierge, I would like to inquire regarding bridal booking.`;
    if (customSubject) {
      text = customSubject;
    } else if (bookingFormData.serviceId) {
      text = `Hello Mehndi Art, I am planning a wedding in ${bookingFormData.city || 'India'} on ${bookingFormData.date}. I would love to check availability for ${selectedService.name} with ${selectedArtist.name}.`;
    }
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${basePhone}?text=${encoded}`, '_blank');
  };

  const filteredDesigns = useMemo(() => {
    if (designCategoryFilter === 'All') return designs;
    return designs.filter(d => d.category.toLowerCase().includes(designCategoryFilter.toLowerCase()));
  }, [designs, designCategoryFilter]);

  const filteredArtists = useMemo(() => {
    if (artistCityFilter === 'All') return artists;
    return artists.filter(a => a.serviceCities.includes(artistCityFilter) || a.location.includes(artistCityFilter));
  }, [artists, artistCityFilter]);

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    showToast(`Booking ${bookingId} status updated to: ${newStatus}`);
  };

  const handleToggleArtistStatus = (artistId) => {
    setArtists(prev => prev.map(a => {
      if (a.id === artistId) {
        const nextState = !a.travelReady;
        showToast(`${a.name} travel availability set to ${nextState ? 'Available' : 'Paused'}`);
        return { ...a, travelReady: nextState };
      }
      return a;
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F2E8] text-[#12382D] font-sans antialiased selection:bg-[#D4B16A] selection:text-white flex flex-col justify-between">
      
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce flex items-center gap-3 bg-[#12382D] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#D4B16A]/50">
          <Sparkles className="w-5 h-5 text-[#D4B16A]" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* LUXURY TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#0D2921] text-[#D4B16A] text-xs py-2 px-4 border-b border-[#D4B16A]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Now Reserving 2026-2027 Royal Weddings & Sangeet Ceremonies Across India & Worldwide</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#D4B16A]" /> 100% Pure Chemical-Free Henna</span>
            <span className="hidden sm:inline">|</span>
            <button 
              onClick={() => setActiveTab('admin')} 
              className={`text-xs hover:text-[#D4B16A] transition-colors flex items-center gap-1 ${activeTab === 'admin' ? 'text-[#D4B16A] font-bold underline' : ''}`}
            >
              <Lock className="w-3 h-3" /> Partner & Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-[#12382D]/95 backdrop-blur-md border-b border-[#D4B16A]/30 text-white shadow-lg transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with Intricate Henna Mandala Motif */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4B16A] to-[#997935] p-0.5 shadow-md flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-700">
              <div className="w-full h-full bg-[#12382D] rounded-full flex items-center justify-center">
                {/* Custom Mandala SVG */}
                <svg className="w-7 h-7 text-[#D4B16A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
                  <path d="m4.93 4.93 2.12 2.12m9.9 9.9 2.12 2.12M4.93 19.07l2.12-2.12m9.9-9.9 2.12-2.12" />
                  <circle cx="12" cy="12" r="8" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>
            <div>
              <span className="font-serif text-2xl tracking-widest text-[#D4B16A] uppercase font-bold block leading-none">
                Mehndi Art
              </span>
              <span className="text-[10px] tracking-widest text-stone-300 uppercase font-light mt-0.5 block">
                Bespoke Royal Henna
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-stone-200">
            {[
              { id: 'home', label: 'Home' },
              { id: 'designs', label: 'Explore Designs' },
              { id: 'artists', label: 'Master Artists' },
              { id: 'services', label: 'Services & Pricing' },
              { id: 'admin', label: 'Admin Portal' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`relative py-1 transition-colors duration-200 hover:text-[#D4B16A] ${
                  activeTab === link.id ? 'text-[#D4B16A] font-semibold' : ''
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4B16A] rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => triggerWhatsAppChat()}
              className="p-2.5 rounded-full bg-[#1e483b] text-[#D4B16A] hover:bg-[#285b4c] transition border border-[#D4B16A]/30 flex items-center justify-center shadow-sm"
              title="Quick WhatsApp Concierge"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setActiveTab('booking');
                setBookingStep(1);
              }}
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wide text-[#12382D] transition-all bg-gradient-to-r from-[#D4B16A] via-[#E8CF96] to-[#D4B16A] rounded-full shadow-lg hover:shadow-[#D4B16A]/40 hover:scale-[1.02] active:scale-95 border border-[#F8F2E8]/40"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Book an Artist
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#D4B16A] hover:bg-[#1a473a]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D2921] border-b border-[#D4B16A]/30 px-4 pt-3 pb-6 space-y-3">
            {[
              { id: 'home', label: 'Home' },
              { id: 'designs', label: 'Explore Designs' },
              { id: 'artists', label: 'Master Artists' },
              { id: 'services', label: 'Services & Pricing' },
              { id: 'booking', label: 'Book an Artist (Reserve Date)' },
              { id: 'admin', label: 'Admin Portal' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-3 rounded-md text-base ${
                  activeTab === item.id ? 'bg-[#12382D] text-[#D4B16A] font-semibold' : 'text-stone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  triggerWhatsAppChat();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-lg font-medium shadow-md"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </button>
            </div>
          </div>
        )}
      </header>

      {}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeView
            onBookService={handleInitiateBookingForService}
            onBookArtist={handleInitiateBookingForArtist}
            onViewDesigns={() => setActiveTab('designs')}
            onViewArtists={() => setActiveTab('artists')}
            onSelectDesignModal={setActiveModalDesign}
            services={services}
            artists={artists}
            designs={designs}
            testimonials={testimonials}
            triggerWhatsApp={triggerWhatsAppChat}
          />
        )}

        {activeTab === 'designs' && (
          <DesignsView
            designs={filteredDesigns}
            activeFilter={designCategoryFilter}
            setFilter={setDesignCategoryFilter}
            onSelectDesignModal={setActiveModalDesign}
            onBookDesign={handleSelectDesignForBooking}
          />
        )}

        {activeTab === 'artists' && (
          <ArtistsView
            artists={filteredArtists}
            cityFilter={artistCityFilter}
            setCityFilter={setArtistCityFilter}
            onSelectArtistModal={setActiveModalArtist}
            onBookArtist={handleInitiateBookingForArtist}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView
            services={services}
            onSelectPackage={handleInitiateBookingForService}
          />
        )}

        {activeTab === 'booking' && (
          <BookingEngineView
            step={bookingStep}
            setStep={setBookingStep}
            formData={bookingFormData}
            setFormData={setBookingFormData}
            services={services}
            artists={artists}
            selectedService={selectedService}
            selectedArtist={selectedArtist}
            calculations={bookingCalculations}
            isDateBooked={isDateBookedForArtist}
            isProcessingPayment={isProcessingPayment}
            onProcessPayment={handleProcessRazorpayPayment}
            paymentSuccessData={paymentSuccessData}
            paymentMethodChoice={paymentMethodChoice}
            setPaymentMethodChoice={setPaymentMethodChoice}
            platformConfig={platformConfig}
            triggerWhatsApp={triggerWhatsAppChat}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboardView
            bookings={bookings}
            artists={artists}
            services={services}
            platformConfig={platformConfig}
            setPlatformConfig={setPlatformConfig}
            onUpdateStatus={handleUpdateBookingStatus}
            onToggleArtist={handleToggleArtistStatus}
            showToast={showToast}
          />
        )}
      </main>

      {}
      {activeModalDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#D4B16A]/40 flex flex-col md:flex-row">
            <div className="md:w-1/2 h-72 md:h-auto relative bg-stone-900">
              <img
                src={activeModalDesign.image}
                alt={activeModalDesign.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#12382D]/90 text-[#D4B16A] text-xs px-3 py-1 rounded-full font-serif font-semibold border border-[#D4B16A]/40">
                {activeModalDesign.category}
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-2xl font-bold text-[#12382D]">{activeModalDesign.title}</h3>
                  <button 
                    onClick={() => setActiveModalDesign(null)}
                    className="p-1 rounded-full hover:bg-stone-200 text-stone-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-4 text-xs font-medium text-stone-600">
                  <span className="flex items-center text-amber-600"><Star className="w-3.5 h-3.5 fill-current mr-1" /> {activeModalDesign.rating}</span>
                  <span>•</span>
                  <span>Artist: <strong className="text-[#12382D]">{activeModalDesign.artist}</strong></span>
                  <span>•</span>
                  <span>Est: {activeModalDesign.timeEst}</span>
                </div>
                <p className="text-stone-700 text-sm leading-relaxed mb-6 font-light">
                  {activeModalDesign.description}
                </p>
                <div className="bg-[#12382D]/5 rounded-xl p-4 border border-[#12382D]/10 space-y-2 mb-6 text-xs text-stone-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Hand-blended Sojat organic henna guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Includes personalized initial and bridal portrait touches</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSelectDesignForBooking(activeModalDesign)}
                  className="flex-1 py-3 bg-[#12382D] hover:bg-[#1a4a3c] text-[#D4B16A] font-semibold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Book This Style
                </button>
                <button
                  onClick={() => {
                    triggerWhatsAppChat(`Hi, I am interested in booking design "${activeModalDesign.title}" by ${activeModalDesign.artist}.`);
                  }}
                  className="p-3 bg-[#25D366] text-white rounded-xl hover:opacity-90 transition"
                  title="Inquire via WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {activeModalArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#F8F2E8] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4B16A]/50 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalArtist(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-stone-600"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left mb-6">
              <img
                src={activeModalArtist.avatar}
                alt={activeModalArtist.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-[#D4B16A] shadow-md"
              />
              <div>
                <span className="text-xs uppercase tracking-widest text-[#997935] font-semibold">{activeModalArtist.title}</span>
                <h3 className="font-serif text-3xl font-bold text-[#12382D] mt-1">{activeModalArtist.name}</h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-stone-600">
                  <span className="flex items-center text-amber-700 font-bold"><Star className="w-4 h-4 fill-current mr-1 text-amber-500" /> {activeModalArtist.rating} ({activeModalArtist.reviewsCount} verified reviews)</span>
                  <span>•</span>
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-[#12382D]" /> {activeModalArtist.location}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {activeModalArtist.serviceCities.map(c => (
                    <span key={c} className="bg-[#12382D]/10 text-[#12382D] text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                      Travels to {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 text-stone-700 text-sm leading-relaxed mb-6">
              <p>{activeModalArtist.bio}</p>
              <div>
                <h4 className="font-serif font-bold text-[#12382D] text-base mb-2">Signature Masteries:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalArtist.specialties.map(spec => (
                    <span key={spec} className="px-3 py-1 bg-[#D4B16A]/20 text-[#12382D] font-medium text-xs rounded-lg border border-[#D4B16A]/40">
                      ✨ {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#D4B16A]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-stone-500 block">Starting Bridal Reservation from</span>
                <span className="font-serif text-2xl font-bold text-[#12382D]">₹{activeModalArtist.minBudget.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={() => {
                  handleInitiateBookingForArtist(activeModalArtist.id);
                  setActiveModalArtist(null);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#12382D] text-[#D4B16A] hover:bg-[#1c4d3e] font-semibold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Book {activeModalArtist.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <aside aria-label="Customer Support" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {whatsAppModalOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-[#D4B16A]/50 p-4 w-72 mb-2 animate-fade-in text-stone-800">
            <div className="flex justify-between items-center pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                <span className="font-serif font-bold text-[#12382D] text-sm">Mehndi Concierge</span>
              </div>
              <button onClick={() => setWhatsAppModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-stone-600 my-2">
              Have questions regarding artist travel, dates, or custom portrait motifs? Chat instantly with our bridal coordinator.
            </p>
            <input
              type="text"
              placeholder="Your city or event date..."
              value={customWhatsAppMsg}
              onChange={(e) => setCustomWhatsAppMsg(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-stone-200 mb-2 focus:outline-none focus:border-[#D4B16A]"
            />
            <button
              onClick={() => {
                const message = customWhatsAppMsg 
                  ? `Hello Mehndi Art, I am inquiring about: ${customWhatsAppMsg}` 
                  : undefined;
                triggerWhatsAppChat(message);
                setWhatsAppModalOpen(false);
              }}
              className="w-full py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" /> Open WhatsApp Chat
            </button>
          </div>
        )}

        <button
          onClick={() => setWhatsAppModalOpen(!whatsAppModalOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#1ebf5b] text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/80"
          aria-label="Direct WhatsApp Concierge"
        >
          <MessageCircle className="w-6 h-6 fill-current text-white" />
          <span className="hidden sm:inline font-medium text-sm tracking-wide">Inquire on WhatsApp</span>
        </button>
      </aside>

      {}
      <footer className="bg-[#0A221B] text-stone-300 pt-16 pb-12 border-t border-[#D4B16A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Col 1: Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D4B16A] flex items-center justify-center text-[#12382D] font-serif font-bold text-lg">
                  M
                </div>
                <span className="font-serif text-2xl font-bold tracking-widest text-[#D4B16A]">MEHNDI ART</span>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed mb-4">
                India's premier verified bridal mehndi artist collective. We honor heritage craftsmanship through 100% natural, certified chemical-free Sojat henna and seamless, transparent reservations.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#D4B16A]">
                <ShieldCheck className="w-4 h-4" /> Secured with Razorpay PCI-DSS Level 1 Gateway
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-[#D4B16A]/20 pb-2">Art & Collections</h4>
              <ul className="space-y-2.5 text-sm">
                <li><button onClick={() => { setActiveTab('designs'); setDesignCategoryFilter('Bridal'); }} className="hover:text-[#D4B16A] transition">Bridal Full Arm Portfolios</button></li>
                <li><button onClick={() => { setActiveTab('designs'); setDesignCategoryFilter('Arabic'); }} className="hover:text-[#D4B16A] transition">Indo-Arabic & Negative Space</button></li>
                <li><button onClick={() => { setActiveTab('designs'); setDesignCategoryFilter('Rajasthani'); }} className="hover:text-[#D4B16A] transition">Traditional Marwari Motifs</button></li>
                <li><button onClick={() => { setActiveTab('services'); }} className="hover:text-[#D4B16A] transition">Sangeet Squad Packages</button></li>
                <li><button onClick={() => { setActiveTab('artists'); }} className="hover:text-[#D4B16A] transition">Destination Wedding Artists</button></li>
              </ul>
            </div>

            {/* Col 3: Service Cities */}
            <div>
              <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-[#D4B16A]/20 pb-2">Destinations Covered</h4>
              <p className="text-xs text-stone-400 mb-3">Our master artists regularly travel for luxury destination weddings across:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4B16A]" /> Jaipur</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4B16A]" /> Udaipur</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4B16A]" /> Delhi NCR</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4B16A]" /> Mumbai</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4B16A]" /> Bangalore</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4B16A]" /> Goa & Int'l</span>
              </div>
            </div>

            {/* Col 4: Concierge & Policies */}
            <div>
              <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-[#D4B16A]/20 pb-2">Direct Concierge</h4>
              <p className="text-xs text-stone-400 mb-3">Questions on package customization or group rates?</p>
              <div className="space-y-2 text-sm text-stone-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4B16A]" />
                  <span>{platformConfig.businessPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <button onClick={() => triggerWhatsAppChat()} className="underline hover:text-white">
                    Direct WhatsApp Support
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-stone-400">
                Rescheduling permitted up to 72 hours prior to the booked event slot.
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-[#D4B16A]/20 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-400 gap-4">
            <p>© {new Date().getFullYear()} Mehndi Art India Ltd. All Rights Reserved. Where Art Meets Tradition.</p>
            <div className="flex gap-4">
              <span className="hover:text-[#D4B16A] cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-[#D4B16A] cursor-pointer">Privacy & Data Security</span>
              <span>•</span>
              <span className="hover:text-[#D4B16A] cursor-pointer">Cancellation Policy</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

function HomeView({ onBookService, onBookArtist, onViewDesigns, onViewArtists, onSelectDesignModal, services, artists, designs, testimonials, triggerWhatsApp }) {
  const [heroCity, setHeroCity] = useState('Jaipur');
  const [heroDate, setHeroDate] = useState('2026-11-15');
  const [heroService, setHeroService] = useState('srv-1');

  return (
    <div className="space-y-24">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#12382D] via-[#103228] to-[#0A221B] text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#D4B16A]/30">
        
        {/* Subtle decorative background mandala pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg className="w-[800px] h-[800px] text-[#D4B16A] animate-spin" style={{ animationDuration: '140s' }} viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50 0, 60 40, 100 50, 60 60, 50 100, 40 60, 0 50, 40 40" />
            <circle cx="50" cy="50" r="30" stroke="#D4B16A" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4B16A]/15 border border-[#D4B16A]/40 text-[#D4B16A] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> India's Curated Bridal Henna Collective
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Where Art Meets <span className="italic text-[#D4B16A] underline decoration-[#D4B16A]/40">Tradition</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-stone-200 font-light leading-relaxed mb-10">
            Discover handcrafted bridal mehndi designs and book verified master artists across India with instant date lock-in and 100% natural, chemical-free henna.
          </p>

          {/* Quick interactive booking pill filter */}
          <div className="max-w-4xl mx-auto bg-[#F8F2E8] p-3 sm:p-4 rounded-3xl shadow-2xl border-2 border-[#D4B16A] text-[#12382D]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              
              <div className="text-left px-3 py-2 border-b sm:border-b-0 sm:border-r border-stone-300">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">Select City</label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-[#D4B16A]" />
                  <select 
                    value={heroCity} 
                    onChange={e => setHeroCity(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="Jaipur">Jaipur (Royal Weddings)</option>
                    <option value="Udaipur">Udaipur (Palace Events)</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>
              </div>

              <div className="text-left px-3 py-2 border-b sm:border-b-0 sm:border-r border-stone-300">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">Event Date</label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-[#D4B16A]" />
                  <input
                    type="date"
                    value={heroDate}
                    onChange={e => setHeroDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="text-left px-3 py-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">Mehndi Style</label>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4 text-[#D4B16A]" />
                  <select
                    value={heroService}
                    onChange={e => setHeroService(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="srv-1">Royal Bridal Full Arm</option>
                    <option value="srv-2">Engagement Chic</option>
                    <option value="srv-3">Sangeet Squad (10 Guests)</option>
                    <option value="srv-4">Arabic Minimalist</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="mt-3 pt-3 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs text-stone-600 font-medium">
                ⚡ Only 3 master slots remaining for auspicious wedding dates in November 2026
              </span>
              <button
                onClick={() => onBookService(heroService)}
                className="w-full sm:w-auto px-8 py-3 bg-[#12382D] hover:bg-[#1a4e3f] text-[#D4B16A] font-bold text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
              >
                Reserve Date Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 text-left">
            {[
              { icon: ShieldCheck, title: '100% Organic Henna', desc: 'Triple-filtered pure Sojat leaves' },
              { icon: Award, title: 'Master Certified', desc: 'Handpicked verified artisans' },
              { icon: Lock, title: 'Razorpay Protected', desc: '30% deposit with receipt' },
              { icon: Star, title: '4.98/5 Rating', desc: 'Over 1,200+ blissful brides' }
            ].map((badge, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                <badge.icon className="w-5 h-5 text-[#D4B16A] mb-1.5" />
                <h4 className="font-semibold text-xs text-white">{badge.title}</h4>
                <p className="text-[11px] text-stone-300 font-light">{badge.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED SERVICES & PRICING TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#997935]">Curated Packages</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12382D] mt-1">
            Bridal & Celebration Ceremonies
          </h2>
          <div className="w-16 h-1 bg-[#D4B16A] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#D4B16A]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={srv.image}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-[#12382D] text-[#D4B16A] text-[11px] font-bold px-3 py-1 rounded-full border border-[#D4B16A]/30">
                  {srv.badge}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#12382D] mb-1">{srv.name}</h3>
                  <p className="text-xs text-stone-600 mb-4">{srv.tagline}</p>
                  
                  <div className="bg-[#FAF7F2] p-3 rounded-xl mb-4 border border-stone-200">
                    <span className="text-[11px] font-bold uppercase text-stone-500 block">Coverage</span>
                    <span className="text-xs text-[#12382D] font-medium">{srv.coverage}</span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-stone-600 mb-6">
                    {srv.includes.slice(0, 3).map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-4 pt-3 border-t border-stone-100">
                    <div>
                      <span className="text-xs text-stone-500">Package Total</span>
                      <div className="font-serif text-2xl font-bold text-[#12382D]">
                        ₹{srv.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <span className="text-[11px] text-stone-500">
                      Reserve with 30% advance
                    </span>
                  </div>
                  <button
                    onClick={() => onBookService(srv.id)}
                    className="w-full py-3 bg-[#12382D] hover:bg-[#1a4a3c] text-[#D4B16A] font-semibold text-xs tracking-wider uppercase rounded-xl transition shadow"
                  >
                    Select & Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED ARTISTS SHOWCASE */}
      <section className="bg-[#12382D] text-white py-20 px-4 sm:px-6 lg:px-8 border-y border-[#D4B16A]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#D4B16A]">Verified Masters</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                Meet Our Renowned Artists
              </h2>
              <p className="text-stone-300 text-sm mt-2 max-w-xl">
                Trained in historic Marwari, Mughal, and contemporary styles. Zero compromise on hygiene, precision, and natural henna staining.
              </p>
            </div>
            <button
              onClick={onViewArtists}
              className="mt-4 md:mt-0 text-sm font-semibold text-[#D4B16A] hover:underline flex items-center gap-1"
            >
              View All Master Profiles <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="bg-[#0e2c23] border border-[#D4B16A]/30 rounded-3xl p-6 flex flex-col justify-between hover:border-[#D4B16A] transition-all duration-300 group"
              >
                <div>
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-full h-full rounded-full object-cover border-2 border-[#D4B16A] shadow-md group-hover:scale-105 transition"
                    />
                    <div className="absolute bottom-0 right-0 bg-[#D4B16A] text-[#12382D] rounded-full p-1 shadow">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-center text-white">{artist.name}</h3>
                  <p className="text-center text-xs text-[#D4B16A] font-medium mb-3">{artist.title}</p>
                  
                  <div className="flex items-center justify-center gap-3 text-xs text-stone-300 mb-4">
                    <span className="flex items-center"><Star className="w-3.5 h-3.5 fill-current text-amber-400 mr-1" /> {artist.rating}</span>
                    <span>•</span>
                    <span className="flex items-center"><MapPin className="w-3 h-3 text-[#D4B16A] mr-1" /> {artist.location.split(',')[0]}</span>
                  </div>

                  <div className="space-y-1 mb-6 text-[11px] text-stone-300">
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span>Experience:</span>
                      <strong className="text-white">{artist.experience}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span>Travel Destination:</span>
                      <strong className="text-emerald-400">Available</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onBookArtist(artist.id)}
                  className="w-full py-2.5 bg-[#D4B16A] hover:bg-[#c49f57] text-[#12382D] font-bold text-xs uppercase tracking-wider rounded-xl transition"
                >
                  Book This Artist
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGNS INSPIRATION GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#997935]">Lookbook</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12382D] mt-1">
              Signature Henna Designs
            </h2>
          </div>
          <button
            onClick={onViewDesigns}
            className="mt-4 md:mt-0 px-6 py-2.5 bg-[#12382D] text-[#D4B16A] text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#1c4d3e] transition"
          >
            Explore Complete Gallery
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectDesignModal(item)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-stone-200 shadow hover:shadow-2xl transition duration-300 relative"
            >
              <div className="h-72 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#12382D] text-[11px] font-bold px-3 py-1 rounded-full">
                  {item.category}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-xl font-bold mb-1">{item.title}</h3>
                  <div className="flex items-center justify-between text-xs text-stone-200">
                    <span>By {item.artist}</span>
                    <span className="flex items-center gap-1 font-semibold text-[#D4B16A]">
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-[#FAF7F2] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#D4B16A]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#997935]">Seamless Experience</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12382D] mt-1">How It Works</h2>
            <div className="w-12 h-1 bg-[#D4B16A] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { num: '01', title: 'Pick Service & Style', desc: 'Select Bridal, Engagement, or Sangeet group packages based on your bridal vision.' },
              { num: '02', title: 'Choose Master Artist', desc: 'Select your preferred artist or opt for our verified matching concierge based on location.' },
              { num: '03', title: 'Reserve with 30% Advance', desc: 'Secure the wedding calendar slot instantly using Razorpay UPI, NetBanking, or Cards.' },
              { num: '04', title: 'Glow on Event Day', desc: 'Artist arrives at your venue with fresh Sojat cones, aftercare oil, and dedicated royal care.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm relative text-center group hover:border-[#D4B16A] transition">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-[#12382D] text-[#D4B16A] font-serif font-bold text-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  {step.num}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#12382D] mb-2">{step.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERIFIED CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#997935]">Client Praises</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12382D] mt-1">Cherished Wedding Memories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-3xl border border-[#D4B16A]/30 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 italic text-sm leading-relaxed mb-6 font-serif">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-[#12382D]">{t.bride}</h4>
                  <span className="text-xs text-stone-500">{t.city}</span>
                </div>
                <span className="text-[11px] bg-[#D4B16A]/20 text-[#12382D] font-semibold px-2.5 py-1 rounded-full">
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#12382D] to-[#0A221B] rounded-3xl p-8 sm:p-12 text-white border-2 border-[#D4B16A] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
              Ready to Lock Your Wedding Date?
            </h2>
            <p className="text-stone-300 text-sm max-w-xl">
              Dates during auspicious Muhurats fill up fast. Reserve with a verified 30% advance deposit or consult our bridal team directly on WhatsApp.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={() => onBookService('srv-1')}
              className="px-8 py-3.5 bg-[#D4B16A] hover:bg-[#c9a356] text-[#12382D] font-bold text-sm rounded-2xl shadow-lg transition text-center"
            >
              Start Instant Reservation
            </button>
            <button
              onClick={() => triggerWhatsApp()}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-2xl border border-white/20 transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Concierge
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

function DesignsView({ designs, activeFilter, setFilter, onSelectDesignModal, onBookDesign }) {
  const categories = ['All', 'Bridal Full Hands', 'Arabic Minimal', 'Traditional Rajasthani', 'Mandala & Feet'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#997935]">Lookbook Gallery</span>
        <h1 className="font-serif text-4xl font-bold text-[#12382D] mt-1">Exquisite Mehndi Portfolio</h1>
        <p className="text-stone-600 text-sm mt-2">
          Filter and select handcrafted patterns. You can directly book any design to transfer style requirements into your bridal reservation.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition ${
              activeFilter === cat
                ? 'bg-[#12382D] text-[#D4B16A] shadow-md border border-[#D4B16A]'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {designs.map((design) => (
          <div
            key={design.id}
            className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div 
              className="relative h-72 cursor-pointer overflow-hidden"
              onClick={() => onSelectDesignModal(design)}
            >
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#12382D]/90 text-[#D4B16A] text-[11px] font-bold px-3 py-1 rounded-full border border-[#D4B16A]/40">
                {design.category}
              </div>
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white gap-2 font-medium text-xs">
                <Eye className="w-5 h-5 text-[#D4B16A]" /> Click to Inspect Details
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-serif text-xl font-bold text-[#12382D]">{design.title}</h3>
                <span className="text-xs font-semibold text-amber-700 flex items-center">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-500 mr-1" /> {design.rating}
                </span>
              </div>
              <p className="text-xs text-stone-500 mb-3">Artisan: <strong className="text-[#12382D]">{design.artist}</strong> • Est: {design.timeEst}</p>
              <p className="text-stone-700 text-xs leading-relaxed mb-6 font-light line-clamp-2">
                {design.description}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => onSelectDesignModal(design)}
                  className="w-1/2 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#12382D] text-xs font-semibold rounded-xl transition"
                >
                  Quick View
                </button>
                <button
                  onClick={() => onBookDesign(design)}
                  className="w-1/2 py-2.5 bg-[#12382D] hover:bg-[#1a4a3c] text-[#D4B16A] text-xs font-semibold rounded-xl transition shadow flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Book Style
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtistsView({ artists, cityFilter, setCityFilter, onSelectArtistModal, onBookArtist }) {
  const cities = ['All', 'Jaipur', 'Udaipur', 'Delhi NCR', 'Mumbai', 'Bangalore'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#997935]">Master Craftsmen</span>
        <h1 className="font-serif text-4xl font-bold text-[#12382D] mt-1">Verified Mehndi Artists</h1>
        <p className="text-stone-600 text-sm mt-2">
          Each artist is peer-audited for organic cone purity, line symmetry, and punctuality across palace and luxury venues.
        </p>
      </div>

      {/* City Filters */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-stone-500 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter by City:
        </span>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setCityFilter(city)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              cityFilter === city
                ? 'bg-[#12382D] text-[#D4B16A] shadow'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Artist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4B16A]/30 shadow hover:shadow-xl transition flex flex-col sm:flex-row gap-6 items-center sm:items-start"
          >
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-32 h-32 rounded-2xl object-cover border-2 border-[#D4B16A] shadow-md flex-shrink-0"
            />
            <div className="flex-grow flex flex-col justify-between h-full text-center sm:text-left">
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#997935]">{artist.title}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    {artist.experience}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#12382D] mb-1">{artist.name}</h3>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-stone-600 mb-3">
                  <span className="flex items-center text-amber-700 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500 mr-1" /> {artist.rating} ({artist.reviewsCount})
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <MapPin className="w-3 h-3 text-[#12382D] mr-1" /> {artist.location}
                  </span>
                </div>
                <p className="text-stone-700 text-xs leading-relaxed mb-4 line-clamp-2">
                  {artist.bio}
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start mb-4">
                  {artist.specialties.map(s => (
                    <span key={s} className="bg-stone-100 text-stone-700 text-[10px] px-2 py-0.5 rounded font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectArtistModal(artist)}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-[#12382D] underline"
                >
                  View Full Bio
                </button>
                <button
                  onClick={() => onBookArtist(artist.id)}
                  className="px-5 py-2.5 bg-[#12382D] hover:bg-[#1b4b3e] text-[#D4B16A] text-xs font-bold rounded-xl shadow transition"
                >
                  Book Artist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesView({ services, onSelectPackage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#997935]">Transparent Offerings</span>
        <h1 className="font-serif text-4xl font-bold text-[#12382D] mt-1">Bridal & Event Packages</h1>
        <p className="text-stone-600 text-sm mt-2">
          All packages include pure triple-filtered Sojat henna paste, clove-eucalyptus sealant oil, and on-time venue service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-3xl p-8 border-2 border-[#D4B16A]/30 hover:border-[#D4B16A] transition-all shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-serif font-bold uppercase px-3 py-1 rounded-full bg-[#12382D] text-[#D4B16A]">
                  {srv.category}
                </span>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Approx {srv.durationHours} Hours
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#12382D] mb-1">{srv.name}</h2>
              <p className="text-xs text-stone-600 mb-4">{srv.tagline}</p>
              
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 mb-6">
                <span className="text-xs font-bold uppercase text-stone-500 block mb-1">Scope of Hand/Foot Art</span>
                <p className="text-sm font-medium text-[#12382D]">{srv.coverage}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Package Inclusions:</h3>
                <ul className="space-y-2 text-xs text-stone-700">
                  {srv.includes.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-stone-500 block">Total Investment</span>
                <span className="font-serif text-3xl font-bold text-[#12382D]">₹{srv.price.toLocaleString('en-IN')}</span>
                <span className="text-[11px] text-stone-500 block">30% booking advance required</span>
              </div>
              <button
                onClick={() => onSelectPackage(srv.id)}
                className="w-full sm:w-auto px-8 py-3 bg-[#12382D] hover:bg-[#1a4a3c] text-[#D4B16A] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition"
              >
                Reserve Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison FAQ snippet */}
      <div className="bg-[#12382D] text-white rounded-3xl p-8 border border-[#D4B16A]/40">
        <h3 className="font-serif text-2xl font-bold text-[#D4B16A] mb-4 text-center">Henna Purity & Booking FAQ</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-300">
          <div>
            <h4 className="font-bold text-white mb-1">Does the paste contain chemical dye?</h4>
            <p>Never. Our henna is strictly sourced from Sojat, Rajasthan, crushed fresh with Nilgiri eucalyptus oil and tea tree extracts. Safe for sensitive skin.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">What is the 30% advance for?</h4>
            <p>The advance reserves the master artist on our centralized calendar, preventing double-bookings. The remaining 70% is settled at the event venue.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">What if my wedding schedule changes?</h4>
            <p>You can reschedule to any available date up to 72 hours before the appointment through our concierge team without penalty.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingEngineView({
  step,
  setStep,
  formData,
  setFormData,
  services,
  artists,
  selectedService,
  selectedArtist,
  calculations,
  isDateBooked,
  isProcessingPayment,
  onProcessPayment,
  paymentSuccessData,
  paymentMethodChoice,
  setPaymentMethodChoice,
  platformConfig,
  triggerWhatsApp
}) {
  const stepsList = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Artist' },
    { num: 3, label: 'Date & Slot' },
    { num: 4, label: 'Venue Details' },
    { num: 5, label: 'Secure Deposit' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#997935]">Official Reservation</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12382D] mt-1">Book Your Mehndi Artist</h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-1">Guaranteed slot reservation backed by instant Razorpay verification</p>
      </div>

      {/* Progress Steps Header */}
      {step <= 5 && (
        <div className="flex items-center justify-between mb-8 relative max-w-2xl mx-auto">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-300 -translate-y-1/2 z-0"></div>
          {stepsList.map((s) => (
            <div
              key={s.num}
              onClick={() => {
                if (s.num < step) setStep(s.num);
              }}
              className={`relative z-10 flex flex-col items-center cursor-pointer ${
                s.num < step ? 'cursor-pointer' : s.num === step ? 'cursor-default' : 'pointer-events-none'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow ${
                  step === s.num
                    ? 'bg-[#12382D] text-[#D4B16A] ring-4 ring-[#D4B16A]/40'
                    : s.num < step
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-stone-500 border border-stone-300'
                }`}
              >
                {s.num < step ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span className={`text-[10px] mt-1.5 font-medium ${step === s.num ? 'text-[#12382D] font-bold' : 'text-stone-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* STEP CONTAINER CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4B16A]/40 shadow-xl">
        
        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#12382D] pb-3 border-b border-stone-200">
              Step 1: Choose Your Mehndi Package
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((srv) => {
                const isSelected = formData.serviceId === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setFormData({ ...formData, serviceId: srv.id })}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#12382D] bg-[#12382D]/5 shadow-md'
                        : 'border-stone-200 hover:border-stone-300 bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#D4B16A]/20 text-[#12382D]">
                        {srv.category}
                      </span>
                      <span className="font-serif text-lg font-bold text-[#12382D]">
                        ₹{srv.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#12382D]">{srv.name}</h3>
                    <p className="text-xs text-stone-600 mt-1 mb-3">{srv.tagline}</p>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4B16A]" /> {srv.durationHours} Hours Dedicated Service
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-[#12382D] hover:bg-[#1a4a3c] text-[#D4B16A] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-2"
              >
                Proceed to Artist Selection <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT ARTIST */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-stone-200">
              <h2 className="font-serif text-2xl font-bold text-[#12382D]">
                Step 2: Choose Your Mehndi Artist
              </h2>
              <span className="text-xs text-stone-500">Selected Package: <strong>{selectedService.name}</strong></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option to let the studio assign the best master */}
              <div
                onClick={() => setFormData({ ...formData, artistId: 'any' })}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition ${
                  formData.artistId === 'any'
                    ? 'border-[#12382D] bg-[#12382D]/5 shadow-md'
                    : 'border-stone-200 bg-[#FAF7F2]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#12382D] text-[#D4B16A] flex items-center justify-center font-bold text-sm">
                    ✨
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#12382D] text-base">Best Available Master Artist</h3>
                    <p className="text-xs text-stone-500">Platform automatically allocates the highest-rated senior artist in your city.</p>
                  </div>
                </div>
              </div>

              {artists.map((artist) => {
                const isSelected = formData.artistId === artist.id;
                return (
                  <div
                    key={artist.id}
                    onClick={() => setFormData({ ...formData, artistId: artist.id })}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-center gap-4 ${
                      isSelected
                        ? 'border-[#12382D] bg-[#12382D]/5 shadow-md'
                        : 'border-stone-200 hover:border-stone-300 bg-[#FAF7F2]'
                    }`}
                  >
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-14 h-14 rounded-full object-cover border border-[#D4B16A]"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <h3 className="font-serif font-bold text-sm text-[#12382D]">{artist.name}</h3>
                        <span className="text-[11px] text-amber-700 font-bold flex items-center">
                          <Star className="w-3 h-3 fill-current mr-0.5 text-amber-500" /> {artist.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#997935] font-medium">{artist.title}</p>
                      <p className="text-[11px] text-stone-500 mt-1">{artist.location}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-8 py-3 bg-[#12382D] hover:bg-[#1a4a3c] text-[#D4B16A] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-2"
              >
                Set Date & Time Slot <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME SLOT WITH AVAILABILITY VERIFICATION */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#12382D] pb-3 border-b border-stone-200">
              Step 3: Select Event Date & Slot
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Event Ceremony Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#12382D] font-medium text-sm text-[#12382D]"
                />
                
                {isDateBooked && (
                  <div className="mt-3 p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-start gap-2 text-rose-800 text-xs">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Notice: <strong>{selectedArtist.name}</strong> is already booked for a royal bridal ceremony on {formData.date}. Please pick an alternative date or choose "Best Available Master Artist".
                    </span>
                  </div>
                )}

                {!isDateBooked && (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Slot is open! Date reservation is currently available.</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Preferred Arrival Time Slot
                </label>
                <div className="space-y-2">
                  {[
                    { slot: '09:00 AM - 03:00 PM', desc: 'Ideal for Day Ceremonies & Haldi' },
                    { slot: '10:00 AM - 04:00 PM', desc: 'Most popular for Bridal Staining' },
                    { slot: '02:00 PM - 08:00 PM', desc: 'Evening Sangeet & Reception setup' },
                    { slot: '04:00 PM - 10:00 PM', desc: 'Night Bridal Squad Celebrations' }
                  ].map((s) => (
                    <div
                      key={s.slot}
                      onClick={() => setFormData({ ...formData, slot: s.slot })}
                      className={`p-3 rounded-xl border cursor-pointer text-xs transition flex justify-between items-center ${
                        formData.slot === s.slot
                          ? 'border-[#12382D] bg-[#12382D]/5 font-semibold text-[#12382D]'
                          : 'border-stone-200 hover:border-stone-300 text-stone-600'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{s.slot}</div>
                        <div className="text-[11px] text-stone-500">{s.desc}</div>
                      </div>
                      {formData.slot === s.slot && <CheckCircle2 className="w-4 h-4 text-[#12382D]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Back
              </button>
              <button
                disabled={isDateBooked}
                onClick={() => setStep(4)}
                className={`px-8 py-3 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-2 ${
                  isDateBooked
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-[#12382D] hover:bg-[#1a4a3c] text-[#D4B16A] shadow'
                }`}
              >
                Confirm Slot & Enter Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CUSTOMER DETAILS & VENUE */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#12382D] pb-3 border-b border-stone-200">
              Step 4: Bride / Client Information & Venue
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Full Name (Bride or Organizer) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Radhika Sharma"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#12382D]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#12382D]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Email Address (For Invoicing)
                </label>
                <input
                  type="email"
                  placeholder="name@weddingemail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#12382D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  City
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#12382D]"
                >
                  <option value="Jaipur">Jaipur</option>
                  <option value="Udaipur">Udaipur</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Goa">Goa</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Exact Venue Address or Hotel / Suite #
                </label>
                <input
                  type="text"
                  placeholder="e.g. Taj Lake Palace, Suite 102 or Residence Address"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#12382D]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Custom Requests (Dulha Portrait, Initials, Storyline)
                </label>
                <textarea
                  rows="2"
                  placeholder="Mention special story elements, Dulha initials, or specific motifs you wish to incorporate..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#12382D]"
                ></textarea>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (!formData.customerName || !formData.phone) {
                    alert('Please enter your name and contact phone number');
                    return;
                  }
                  setStep(5);
                }}
                className="px-8 py-3 bg-[#12382D] hover:bg-[#1a4a3c] text-[#D4B16A] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-2"
              >
                Review & Proceed to Deposit <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: BREAKDOWN & SECURE PAYMENT SIMULATION */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#12382D] pb-3 border-b border-stone-200">
              Step 5: Review Summary & Secure Advance Payment
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Summary Breakdown */}
              <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#D4B16A]/40 space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#12382D]">Reservation Overview</h3>
                
                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Service Package:</span>
                    <strong className="text-[#12382D]">{selectedService.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Master Artist:</span>
                    <strong className="text-[#12382D]">{selectedArtist.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Event Date & Slot:</span>
                    <strong className="text-[#12382D]">{formData.date} ({formData.slot})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Client / Bride:</span>
                    <strong className="text-[#12382D]">{formData.customerName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Destination:</span>
                    <strong className="text-[#12382D]">{formData.city}</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-300 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Total Package Investment:</span>
                    <span className="font-semibold text-stone-900">₹{calculations.total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-800 font-bold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    <span>Advance Deposit Due Now ({platformConfig.advancePercentage}%):</span>
                    <span>₹{calculations.advance.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Balance Due on Event Day:</span>
                    <span>₹{calculations.balance.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 pt-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Razorpay test credentials active • No card info retained</span>
                </div>
              </div>

              {/* Payment Gateway Mock */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border-2 border-[#12382D] shadow">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-serif font-bold text-sm text-[#12382D] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#D4B16A]" /> Razorpay Checkout
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold uppercase">
                      Test Mode
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <label className="block text-xs font-bold uppercase text-stone-500">Choose Payment Method</label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'upi', label: 'UPI / QR' },
                        { id: 'card', label: 'Cards' },
                        { id: 'netbanking', label: 'NetBanking' }
                      ].map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethodChoice(m.id)}
                          className={`py-2 rounded-lg border text-center font-medium transition ${
                            paymentMethodChoice === m.id
                              ? 'border-[#12382D] bg-[#12382D] text-white'
                              : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 mb-5">
                    {paymentMethodChoice === 'upi' && 'Instant simulation with Google Pay, PhonePe, Paytm, or BHIM.'}
                    {paymentMethodChoice === 'card' && 'Simulated Visa, Mastercard, RuPay & Amex processing.'}
                    {paymentMethodChoice === 'netbanking' && 'Simulated HDFC, ICICI, SBI, Axis direct authorization.'}
                  </div>

                  <button
                    disabled={isProcessingPayment}
                    onClick={onProcessPayment}
                    className="w-full py-3.5 bg-gradient-to-r from-[#D4B16A] via-[#E8CF96] to-[#D4B16A] text-[#12382D] font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Razorpay Webhook Signature...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Pay Advance ₹{calculations.advance.toLocaleString('en-IN')}
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-xs text-stone-500">
                  Prefer direct assistance?{' '}
                  <button onClick={() => triggerWhatsApp()} className="text-[#12382D] font-bold underline">
                    Chat with Concierge
                  </button>
                </div>
              </div>

            </div>

            <div className="pt-4 flex justify-start">
              <button
                disabled={isProcessingPayment}
                onClick={() => setStep(4)}
                className="px-6 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Back to Edit Info
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: BOOKING CONFIRMATION & RECEIPT */}
        {step === 6 && paymentSuccessData && (
          <div className="space-y-6 text-center py-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#997935]">
                Reservation Guaranteed & Paid
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#12382D] mt-1">
                Booking Confirmed!
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Reference ID: <strong className="text-[#12382D] font-mono text-sm">{paymentSuccessData.id}</strong>
              </p>
            </div>

            {/* Official Booking Voucher */}
            <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#D4B16A]/50 text-left max-w-lg mx-auto shadow-md space-y-4">
              <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                <span className="font-serif font-bold text-base text-[#12382D]">Mehndi Art Official Pass</span>
                <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded">
                  {paymentSuccessData.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-stone-700">
                <div>
                  <span className="text-stone-500 block">Bride / Customer:</span>
                  <strong>{paymentSuccessData.customerName}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Contact Phone:</span>
                  <strong>{paymentSuccessData.phone}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Event Date:</span>
                  <strong>{paymentSuccessData.date}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Time Slot:</span>
                  <strong>{paymentSuccessData.slot}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Master Artist:</span>
                  <strong>{paymentSuccessData.artist}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Package:</span>
                  <strong>{paymentSuccessData.service}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-500 block">Venue:</span>
                  <strong>{paymentSuccessData.venue} ({paymentSuccessData.city})</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 text-xs flex justify-between items-center">
                <div>
                  <span className="text-stone-500 block">Advance Deposit Paid:</span>
                  <strong className="text-emerald-800 text-sm font-bold">₹{paymentSuccessData.advancePaid.toLocaleString('en-IN')}</strong>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 block">Balance on Event:</span>
                  <strong className="text-stone-900 text-sm">₹{paymentSuccessData.balanceAmount.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div className="text-[10px] text-stone-500 border-t border-stone-200 pt-2 flex justify-between">
                <span>Razorpay ID: {paymentSuccessData.razorpayPaymentId}</span>
                <span>Date: {paymentSuccessData.createdAt}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print / Save Voucher
              </button>
              <button
                onClick={() => triggerWhatsApp(`Hello Mehndi Art, I just completed booking ${paymentSuccessData.id} for ${paymentSuccessData.date}. Please connect me with the artist coordinator.`)}
                className="px-6 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" /> Share on WhatsApp
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

function AdminDashboardView({ bookings, artists, services, platformConfig, setPlatformConfig, onUpdateStatus, onToggleArtist, showToast }) {
  const [adminTab, setAdminTab] = useState('bookings'); // bookings, artists, calendar, settings
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // KPI Computations
  const totalRevenue = useMemo(() => {
    return bookings.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.advancePaid : 0), 0);
  }, [bookings]);

  const confirmedCount = useMemo(() => {
    return bookings.filter(b => b.status === 'Confirmed').length;
  }, [bookings]);

  const pendingCount = useMemo(() => {
    return bookings.filter(b => b.status === 'Pending Advance').length;
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'All' || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-stone-200 mb-8 gap-4">
        <div>
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#997935]">Admin Portal</span>
          <h1 className="font-serif text-3xl font-bold text-[#12382D]">Studio Operations & Bookings</h1>
        </div>
        <div className="flex items-center gap-2">
          {['bookings', 'artists', 'calendar', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setAdminTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                adminTab === tab
                  ? 'bg-[#12382D] text-[#D4B16A] shadow'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 font-medium">Total Advance Collected</span>
            <div className="font-serif text-2xl font-bold text-[#12382D] mt-1">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">Razorpay Verified</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 font-medium">Confirmed Reservations</span>
            <div className="font-serif text-2xl font-bold text-[#12382D] mt-1">
              {confirmedCount}
            </div>
            <span className="text-[11px] text-stone-500">Live on calendar</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#12382D]/10 text-[#12382D] flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 font-medium">Pending Advance</span>
            <div className="font-serif text-2xl font-bold text-[#12382D] mt-1">
              {pendingCount}
            </div>
            <span className="text-[11px] text-amber-600">Awaiting customer action</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 font-medium">Active Master Artists</span>
            <div className="font-serif text-2xl font-bold text-[#12382D] mt-1">
              {artists.length}
            </div>
            <span className="text-[11px] text-stone-500">Pan-India coverage</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#D4B16A]/20 text-[#12382D] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* TAB 1: BOOKINGS MANAGEMENT TABLE */}
      {adminTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          
          {/* Table Filters */}
          <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by client, ID, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#12382D]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium">Status:</span>
              {['All', 'Confirmed', 'Pending Advance', 'Completed', 'Cancelled'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    statusFilter === st
                      ? 'bg-[#12382D] text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Records Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F2] text-stone-600 border-b border-stone-200 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 font-bold">Booking Ref</th>
                  <th className="py-3.5 px-4 font-bold">Client & City</th>
                  <th className="py-3.5 px-4 font-bold">Date & Slot</th>
                  <th className="py-3.5 px-4 font-bold">Package & Artist</th>
                  <th className="py-3.5 px-4 font-bold">Advance / Total</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#12382D]">
                      {b.id}
                      <span className="block text-[10px] text-stone-400 font-normal">{b.createdAt}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-900">{b.customerName}</div>
                      <div className="text-stone-500 text-[11px]">{b.phone} • {b.city}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-stone-900">{b.date}</div>
                      <div className="text-stone-500 text-[11px]">{b.slot}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-stone-900">{b.service}</div>
                      <div className="text-[#997935] font-semibold text-[11px]">Artisan: {b.artist}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-emerald-700 font-bold">₹{b.advancePaid.toLocaleString('en-IN')} paid</div>
                      <div className="text-stone-400 text-[11px]">Total: ₹{b.totalAmount.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'Pending Advance'
                          ? 'bg-amber-100 text-amber-800'
                          : b.status === 'Completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex gap-1">
                        {b.status !== 'Confirmed' && (
                          <button
                            onClick={() => onUpdateStatus(b.id, 'Confirmed')}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px]"
                            title="Confirm"
                          >
                            Confirm
                          </button>
                        )}
                        {b.status !== 'Completed' && (
                          <button
                            onClick={() => onUpdateStatus(b.id, 'Completed')}
                            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px]"
                            title="Mark Done"
                          >
                            Done
                          </button>
                        )}
                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => onUpdateStatus(b.id, 'Cancelled')}
                            className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded text-[10px]"
                            title="Cancel / Refund"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: ARTISTS MANAGEMENT */}
      {adminTab === 'artists' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif font-bold text-xl text-[#12382D]">Master Artist Registry</h3>
            <button
              onClick={() => showToast('Artist invitation workflow is active')}
              className="px-4 py-2 bg-[#12382D] text-[#D4B16A] text-xs font-semibold rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Invite Senior Artist
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artists.map((art) => (
              <div key={art.id} className="p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={art.avatar} alt={art.name} className="w-12 h-12 rounded-full object-cover border" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#12382D]">{art.name}</h4>
                    <p className="text-xs text-stone-500">{art.title} • {art.location}</p>
                    <span className="text-[10px] text-amber-700 font-semibold">★ {art.rating} Rating</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleArtist(art.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      art.travelReady
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {art.travelReady ? 'Active & Travelling' : 'Dates Paused'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CALENDAR OVERVIEW */}
      {adminTab === 'calendar' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
          <h3 className="font-serif font-bold text-xl text-[#12382D] mb-4">Master Calendar & Conflict Checker</h3>
          <p className="text-xs text-stone-500 mb-6">
            Real-time visual schedule preventing duplicate artist assignments on high-demand wedding dates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookings.filter(b => b.status === 'Confirmed').map(b => (
              <div key={b.id} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D4B16A]/40">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold text-[#12382D]">{b.date}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold">Reserved</span>
                </div>
                <h4 className="font-bold text-sm text-stone-900">{b.artist}</h4>
                <p className="text-xs text-stone-600">Client: {b.customerName}</p>
                <p className="text-xs text-stone-500">{b.venue}, {b.city}</p>
                <div className="mt-2 text-[11px] text-[#997935] font-semibold">{b.slot}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PLATFORM CONFIGURATION */}
      {adminTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 max-w-2xl">
          <h3 className="font-serif font-bold text-xl text-[#12382D] mb-4">Platform Configuration</h3>
          
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-stone-600 mb-1">Configured WhatsApp Concierge Number</label>
              <input
                type="text"
                value={platformConfig.businessPhone}
                onChange={(e) => setPlatformConfig({ ...platformConfig, businessPhone: e.target.value })}
                className="w-full p-3 rounded-xl border border-stone-300 font-mono text-sm"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">Floating WhatsApp widget triggers directly to this phone.</span>
            </div>

            <div>
              <label className="block font-bold uppercase text-stone-600 mb-1">Required Booking Advance Percentage (%)</label>
              <input
                type="number"
                value={platformConfig.advancePercentage}
                onChange={(e) => setPlatformConfig({ ...platformConfig, advancePercentage: Number(e.target.value) })}
                className="w-full p-3 rounded-xl border border-stone-300 font-mono text-sm"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">Default is 30% advance on all services.</span>
            </div>

            <div>
              <label className="block font-bold uppercase text-stone-600 mb-1">Razorpay Key ID (Client-side identifier)</label>
              <input
                type="text"
                value={platformConfig.razorpayKeyId}
                onChange={(e) => setPlatformConfig({ ...platformConfig, razorpayKeyId: e.target.value })}
                className="w-full p-3 rounded-xl border border-stone-300 font-mono text-sm"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={() => showToast('Platform settings saved successfully!')}
                className="px-6 py-2.5 bg-[#12382D] text-[#D4B16A] font-bold text-xs rounded-xl shadow"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}