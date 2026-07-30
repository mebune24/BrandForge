export interface ServiceCardProps {
  icon: string;
  title: string;
  desc: string;
  image: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  image: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
}

export type TabType = 'services' | 'workflows' | 'solutions';

export interface Stat {
  number: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
  dropdown?: {
    title: string;
    items: {
      label: string;
      href: string;
      description?: string;
      icon?: string;
      badge?: string;
      onClick?: () => void;
    }[];
  };
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export const navLinks: NavLink[] = [
  {
    label: 'Products',
    href: '/products',
    dropdown: {
      title: 'Our Products',
      items: [
        { label: 'All Products', href: '/products', description: 'Browse complete catalog', icon: 'Package' },
        { label: 'Apparel', href: '/products?category=apparel', description: 'T-shirts, polos, hoodies, caps', icon: 'Shirt' },
        { label: 'Corporate Merchandise', href: '/products?category=merchandise', description: 'Mugs, pens, bags, notebooks', icon: 'Gift' },
        { label: 'Uniforms', href: '/products?category=uniform', description: 'School & corporate uniforms', icon: 'Users' },
        { label: 'Safety Wear', href: '/products?category=safety_wear', description: 'Safety vests, overalls, lab coats', icon: 'ShieldCheck' },
        { label: 'Custom Design', href: '/ai-assistant', description: 'AI-powered design tools', icon: 'Sparkles', badge: 'New' },
      ],
    },
  },
  {
    label: 'Services',
    href: '/services',
    dropdown: {
      title: 'Printing Services',
      items: [
        { label: 'Textile Printing', href: '/services', description: 'DTG, screen printing, heat transfer', icon: 'Printer' },
        { label: 'Embroidery', href: '/services', description: 'Precision embroidery for logos', icon: 'PenTool' },
        { label: 'Corporate Branding', href: '/services', description: 'Complete brand identity solutions', icon: 'Building2' },
        { label: 'Digital Workflows', href: '/services', description: 'Online ordering & tracking', icon: 'Smartphone' },
        { label: 'Artwork Upload', href: '/artwork-upload', description: 'Upload & optimize your designs', icon: 'Upload' },
        { label: '3D Mockup Preview', href: '/products', description: 'Preview before you order', icon: 'Box' },
      ],
    },
  },
  {
    label: 'Solutions',
    href: '/services',
    dropdown: {
      title: 'Solutions',
      items: [
        { label: 'Schools & Universities', href: '/subscriptions', description: 'Bulk uniform ordering', icon: 'GraduationCap' },
        { label: 'Corporate Clients', href: '/subscriptions', description: 'Employee branding packages', icon: 'Building2' },
        { label: 'NGOs & Events', href: '/subscriptions', description: 'Event merchandise solutions', icon: 'Heart' },
        { label: 'Sports Teams', href: '/products?category=apparel', description: 'Custom jerseys & sportswear', icon: 'Trophy' },
        { label: 'Print-on-Demand', href: '/subscriptions', description: 'Creator marketplace', icon: 'Globe', badge: 'Coming Soon' },
        { label: 'Delivery Tracking', href: '/track', description: 'Real-time order tracking', icon: 'Truck' },
      ],
    },
  },
  {
    label: 'Resources',
    href: '/blog',
    dropdown: {
      title: 'Resources',
      items: [
        { label: 'Blog', href: '/blog', description: 'Latest insights & news', icon: 'FileText' },
        { label: 'FAQ', href: '/faq', description: 'Frequently asked questions', icon: 'HelpCircle' },
        { label: 'Reviews', href: '/reviews', description: 'Customer testimonials', icon: 'Star' },
        { label: 'Support Center', href: '/contact', description: 'Get help from our team', icon: 'MessageCircle' },
        { label: 'Size Guide', href: '/contact', description: 'Find your perfect fit', icon: 'Ruler' },
        { label: 'Design Templates', href: '/ai-assistant', description: 'Free design resources', icon: 'Layout' },
      ],
    },
  },
  {
    label: 'Company',
    href: '/about',
    dropdown: {
      title: 'Company',
      items: [
        { label: 'About Us', href: '/about', description: 'Our story & mission', icon: 'Info' },
        { label: 'Our Team', href: '/team', description: 'Meet the experts', icon: 'Users' },
        { label: 'Careers', href: '/contact', description: 'Join our team', icon: 'Briefcase', badge: 'Hiring' },
        { label: 'Partners', href: '/about', description: 'Our partners & integrations', icon: 'Handshake' },
        { label: 'Contact', href: '/contact', description: 'Get in touch', icon: 'Mail' },
        { label: 'Admin Access', href: '#', description: 'Admin dashboard', icon: 'Shield', onClick: () => window.dispatchEvent(new CustomEvent('open-admin-login')) },
      ],
    },
  },
];

export const serviceData: Record<TabType, ServiceCardProps[]> = {
  services: [
    {
      icon: 'Printer',
      title: 'Textile Printing',
      desc: 'High-quality DTG and screen printing on a wide range of fabrics with vibrant colors.',
      image: 'https://images.unsplash.com/photo-1598623083058-f5b0e52d96f8?w=800&h=400&fit=crop',
    },
    {
      icon: 'PenTool',
      title: 'Embroidery',
      desc: 'Precision embroidery for logos, names, and custom designs with premium thread quality.',
      image: 'https://images.unsplash.com/photo-1544717305-996b815c338c?w=800&h=400&fit=crop',
    },
    {
      icon: 'BadgeCheck',
      title: 'Corporate Branding',
      desc: 'Full-service branding for businesses, events, and teams with custom apparel solutions.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop',
    },
  ],
  workflows: [
    {
      icon: 'Smartphone',
      title: 'Smart Ordering',
      desc: 'Automated online ordering with real-time design previews and instant quotes.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    },
    {
      icon: 'Zap',
      title: 'Digital Production',
      desc: 'Streamlined digital workflows from upload to fulfillment with automation.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=400&fit=crop',
    },
    {
      icon: 'BarChart3',
      title: 'Analytics Dashboard',
      desc: 'Track orders, inventory, and production metrics in one comprehensive dashboard.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    },
  ],
  solutions: [
    {
      icon: 'Building2',
      title: 'Enterprise Branding',
      desc: 'Scalable solutions for large corporate branding needs with dedicated account management.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
    },
    {
      icon: 'Globe',
      title: 'E-commerce Integration',
      desc: 'Connect your store with our printing and fulfillment API for seamless operations.',
      image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=800&h=400&fit=crop',
    },
    {
      icon: 'Lock',
      title: 'Secure Asset Management',
      desc: 'Cloud-based storage for your brand assets and designs with enterprise-grade security.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    },
  ],
};

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: '15+ years in textile innovation and digital printing technology.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Expert in supply chain optimization and smart manufacturing.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: 'Award-winning designer with a passion for sustainable fashion.',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Technology Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Specialist in AI-driven printing and digital workflow automation.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'James Wilson',
    company: 'Urban Threads Co.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    text: 'BrandForge transformed our custom apparel business. The quality is unmatched and the digital workflow is incredibly efficient.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Lisa Thompson',
    company: 'Creative Marketing Group',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    text: 'The corporate branding solutions have been game-changing for our clients. Fast turnaround and exceptional quality every time.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Robert Martinez',
    company: 'SportsPro Athletics',
    image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=200&h=200&fit=crop',
    text: 'We\'ve been using BrandForge for our team uniforms and the embroidery quality is outstanding. The tracking system is also top-notch.',
    rating: 4,
  },
  {
    id: 4,
    name: 'Sarah Chen',
    company: 'TechWear Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    text: 'The e-commerce integration is seamless. Our online store syncs perfectly with BrandForge\'s production system.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Michael Brown',
    company: 'Event Solutions',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    text: 'We ordered 500+ shirts for a corporate event and every single one was perfect. The attention to detail is remarkable.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Emily Davis',
    company: 'Design Studio Pro',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    text: 'As a design agency, quality is everything. BrandForge delivers consistently excellent results with quick turnaround.',
    rating: 5,
  },
  {
    id: 7,
    name: 'David Kim',
    company: 'StartupHub',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    text: 'The automated ordering system saved us countless hours. Real-time previews and instant quotes make the process smooth.',
    rating: 4,
  },
  {
    id: 8,
    name: 'Jessica Lee',
    company: 'Fashion Forward',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
    text: 'Sustainable printing options that don\'t compromise on quality. Exactly what our eco-conscious customers demand.',
    rating: 5,
  },
  {
    id: 9,
    name: 'Alex Turner',
    company: 'Sports Gear Co.',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop',
    text: 'The durability of the prints is impressive. Our team uniforms have held up through intense training sessions and matches.',
    rating: 5,
  },
  {
    id: 10,
    name: 'Rachel Green',
    company: 'Marketing Plus',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    text: 'From design to delivery, the entire experience is professional. BrandForge is now our go-to for all branded merchandise.',
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Sustainable Textile Printing',
    excerpt: 'Exploring eco-friendly printing technologies and their impact on the fashion industry.',
    image: 'https://images.unsplash.com/photo-1544449792-416fc8ed6a4f?w=800&h=400&fit=crop',
    date: 'July 15, 2026',
    category: 'Sustainability',
  },
  {
    id: 2,
    title: 'How Digital Workflows Are Revolutionizing Production',
    excerpt: 'Automation and AI are transforming the way we approach custom apparel manufacturing.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=400&fit=crop',
    date: 'July 22, 2026',
    category: 'Technology',
  },
  {
    id: 3,
    title: 'Building a Strong Brand Identity Through Custom Apparel',
    excerpt: 'Why corporate branding matters and how custom apparel can elevate your business presence.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop',
    date: 'July 29, 2026',
    category: 'Branding',
  },
];

export const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What types of printing services do you offer?',
    answer: 'We offer a comprehensive range of printing services including DTG (Direct to Garment) printing, screen printing, embroidery, heat transfer, and sublimation printing. We also provide full-service corporate branding solutions including custom apparel, promotional items, and merchandise.',
  },
  {
    id: 2,
    question: 'How long does it take to complete an order?',
    answer: 'Standard production time is 5-7 business days for most orders. Rush orders can be completed in 2-3 business days for an additional fee. Turnaround times may vary based on order volume and complexity of designs. You can track your order status in real-time through our online portal.',
  },
  {
    id: 3,
    question: 'What is the minimum order quantity?',
    answer: 'We offer low minimum order quantities to accommodate businesses of all sizes. For custom printing, the minimum is typically 5 pieces per design. Embroidery projects require a minimum of 10 pieces. Corporate branding packages start at 25 pieces. Contact us for specific requirements based on your project.',
  },
  {
    id: 4,
    question: 'How does the digital workflow system work?',
    answer: 'Our digital workflow system provides a seamless experience from design to delivery. You can upload your designs, get instant quotes, approve proofs online, track production progress, and manage your orders - all through our integrated platform. This automation ensures accuracy and efficiency at every step.',
  },
  {
    id: 5,
    question: 'Do you offer design services if I don\'t have a design?',
    answer: 'Yes! Our in-house design team can help you create custom designs for your apparel and branding needs. We offer professional graphic design services including logo creation, artwork modification, and custom illustrations. Our designers will work with you to bring your vision to life.',
  },
  {
    id: 6,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and corporate purchase orders for qualified businesses. We also offer payment plans for large orders. All transactions are processed through our secure payment gateway with enterprise-grade encryption.',
  },
];

export const partners: Partner[] = [
  {
    id: 1,
    name: 'Shopify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
  },
  {
    id: 2,
    name: 'Google Cloud',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg',
  },
  {
    id: 3,
    name: 'Adobe',
    logo: 'https://companieslogo.com/img/orig/ADBE_BIG-8a9da911.svg?t=1740130206&download=true',
  },
  {
    id: 4,
    name: 'FedEx',
    logo: 'https://static.cdnlogo.com/logos/f/65/fedex.svg',
  },
  {
    id: 5,
    name: 'Printful',
    logo: 'https://www.printful.com/static/images/layout/printful_logo.svg',
  },
  {
    id: 6,
    name: 'AWS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/AmazonWebservices_Logo.svg',
  },
  {
    id: 7,
    name: 'Stripe',
    logo: 'https://simpleicons.org/icons/stripe.svg',
  },
  {
    id: 8,
    name: 'PayPal',
    logo: 'https://simpleicons.org/icons/paypal.svg',
  },
  {
    id: 9,
    name: 'UPS',
    logo: 'https://simpleicons.org/icons/ups.svg',
  },
  {
    id: 10,
    name: 'DHL',
    logo: 'https://simpleicons.org/icons/dhl.svg',
  },
  {
    id: 11,
    name: 'Mastercard',
    logo: 'https://simpleicons.org/icons/mastercard.svg',
  },
  {
    id: 12,
    name: 'Visa',
    logo: 'https://simpleicons.org/icons/visa.svg',
  },
];

export const stats: Stat[] = [
  { number: '50K+', label: 'Orders Completed' },
  { number: '98%', label: 'Customer Satisfaction' },
  { number: '24/7', label: 'Support Available' },
  { number: '120+', label: 'Countries Served' },
];

export const features: Feature[] = [
  {
    icon: 'Zap',
    title: 'Fast Turnaround',
    desc: 'Rapid production and delivery with real-time tracking.',
  },
  {
    icon: 'Palette',
    title: 'Custom Design Tools',
    desc: 'Intuitive online design studio for creating custom apparel.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Quality Assurance',
    desc: 'Rigorous quality control at every stage of production.',
  },
  {
    icon: 'CreditCard',
    title: 'Secure Payments',
    desc: 'Multiple payment options with enterprise-grade security.',
  },
];
