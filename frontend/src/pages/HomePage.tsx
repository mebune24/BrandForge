import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { stats, features, serviceData, teamMembers, testimonials, faqs, platformFeatures, contactInfo, type TabType } from '../data';
import { Zap, Palette, ShieldCheck, CreditCard, Rocket, Mail, Phone, MapPin, Printer, PenTool, BadgeCheck, Smartphone, BarChart3, Building2, Globe, Lock, ChevronLeft, ChevronRight, Sparkles, User, Package, ShoppingCart } from 'lucide-react';
import PartnersMarquee from '../components/sections/PartnersMarquee';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';
import { useBlog } from '../hooks/useBlog';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={32} className="text-blue-accent" />,
  Palette: <Palette size={32} className="text-blue-accent" />,
  ShieldCheck: <ShieldCheck size={32} className="text-blue-accent" />,
  CreditCard: <CreditCard size={32} className="text-blue-accent" />,
  Rocket: <Rocket size={20} className="text-blue-accent" />,
  Mail: <Mail size={20} className="text-blue-accent" />,
  Phone: <Phone size={20} className="text-blue-accent" />,
  MapPin: <MapPin size={20} className="text-blue-accent" />,
  Printer: <Printer size={32} className="text-blue-accent" />,
  PenTool: <PenTool size={32} className="text-blue-accent" />,
  BadgeCheck: <BadgeCheck size={32} className="text-blue-accent" />,
  Smartphone: <Smartphone size={32} className="text-blue-accent" />,
  BarChart3: <BarChart3 size={32} className="text-blue-accent" />,
  Building2: <Building2 size={32} className="text-blue-accent" />,
  Globe: <Globe size={32} className="text-blue-accent" />,
  Lock: <Lock size={32} className="text-blue-accent" />,
  Package: <Package size={32} className="text-blue-accent" />,
  Sparkles: <Sparkles size={32} className="text-blue-accent" />,
  User: <User size={32} className="text-blue-accent" />,
  ShoppingCart: <ShoppingCart size={32} className="text-blue-accent" />,
};

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const { posts: blogPosts, loading: blogLoading } = useBlog();

  useEffect(() => {
    const updateItemsPerView = () => {
      let newItemsPerView: number;
      if (window.innerWidth >= 1024) newItemsPerView = 3;
      else if (window.innerWidth >= 768) newItemsPerView = 2;
      else newItemsPerView = 1;
      setItemsPerView(newItemsPerView);
      const maxIndex = Math.max(0, Math.ceil(testimonials.length / newItemsPerView) - 1);
      setCurrentIndex(prev => Math.min(prev, maxIndex));
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  return (
    <div>
      <SectionErrorBoundary sectionName="Hero">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center bg-dark-blue-primary overflow-hidden"
        >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://img.magnific.com/free-vector/dark-polygonal-background_79603-282.jpg?semt=ais_test_b&w=740&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-blue-primary/90 via-dark-blue-primary/80 to-dark-blue-primary/70"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 z-10 text-center">
          <div className="inline-block bg-blue-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 flex items-center gap-2 justify-center">
            {iconMap['Rocket']}
            <span className="text-blue-accent font-semibold text-sm">Innovation in Printing</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto">
            Smart Printing. <br />
            <span className="text-blue-accent">Seamless Workflows.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mt-6 leading-relaxed max-w-3xl mx-auto">
            BrandForge Technologies is an automated e-commerce printing platform bridging custom apparel production with smart digital workflows.
          </p>

          <div className="mt-16 flex flex-col items-center">
            <div className="w-full max-w-3xl overflow-hidden">
              <div className="flex justify-center animate-marquee-frames hover:[animation-play-state:paused]">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className="relative group flex-shrink-0 mx-1"
                    style={{ marginLeft: index === 0 ? 0 : '-12px' }}
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-white/80 p-0.5 bg-white/20 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                      <p className="text-white text-[10px] font-semibold">{testimonial.name}</p>
                      <p className="text-gray-300 text-[8px]">{testimonial.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-24 flex flex-wrap justify-center gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-accent">{stat.number}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Partners">
        <PartnersMarquee />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Features">
        {/* Features Section */}
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Built for Modern Brands</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Experience the perfect blend of quality, speed, and technology.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                  {iconMap[feature.icon] || feature.icon}
                </div>
                <h3 className="text-dark-blue-primary text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Services">
        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Comprehensive Printing Solutions</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From custom apparel to corporate branding, we deliver quality and precision
              with smart digital workflows.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
              {Object.keys(serviceData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as TabType)}
                  className={`px-6 py-2 rounded-md transition capitalize font-semibold ${
                    activeTab === tab
                      ? 'bg-dark-blue-primary text-white'
                      : 'text-dark-blue-primary bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {serviceData[activeTab].map((service, index) => (
                <div
                  key={`${activeTab}-${index}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-center mb-3">
                      {iconMap[service.icon] || service.icon}
                    </div>
                    <h3 className="text-dark-blue-primary text-lg font-semibold">{service.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="About">
        {/* About Section */}
        <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">
                Bridging Custom Apparel with <span className="text-blue-accent">Smart Technology</span>
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                BrandForge Technologies is at the forefront of the printing industry, combining
                traditional craftsmanship with cutting-edge digital workflows. We provide
                high-quality textile printing, embroidery, and corporate branding backed by
                a robust online ordering and tracking system.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-accent">✓</span>
                  <span className="text-gray-700">Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-accent">✓</span>
                  <span className="text-gray-700">Fast Turnaround</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-accent">✓</span>
                  <span className="text-gray-700">Expert Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-accent">✓</span>
                  <span className="text-gray-700">24/7 Support</span>
                </div>
              </div>
              <Link to="/about" className="mt-8 inline-block bg-dark-blue-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-dark-blue-secondary transition shadow-md">
                Learn More About Us
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1544717305-996b815c338c?w=400&h=300&fit=crop"
                  alt="Printing"
                  className="rounded-lg shadow-lg h-48 w-full object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop"
                  alt="Branding"
                  className="rounded-lg shadow-lg h-48 w-full object-cover"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1598623083058-f5b0e52d96f8?w=400&h=300&fit=crop"
                  alt="Textile"
                  className="rounded-lg shadow-lg h-48 w-full object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop"
                  alt="Workflow"
                  className="rounded-lg shadow-lg h-48 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Team">
        {/* Team Section */}
        <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Meet the Experts</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Passionate professionals dedicated to delivering excellence in every project.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden text-center">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-dark-blue-primary text-xl font-bold">{member.name}</h3>
                  <p className="text-blue-accent font-semibold text-sm">{member.role}</p>
                  <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/team" className="text-blue-accent font-semibold hover:text-dark-blue-primary transition">
              View Full Team →
            </Link>
          </div>
        </div>
      </section>
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Testimonials">
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">What Our Clients Say</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Real feedback from businesses that trust BrandForge Technologies.
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                    <div className="bg-white rounded-xl shadow-lg p-6 h-full hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-dark-blue-primary font-bold">{testimonial.name}</h4>
                          <p className="text-gray-500 text-sm">{testimonial.company}</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < testimonial.rating ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm italic">"{testimonial.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition z-10 hidden md:block"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} className="text-dark-blue-primary" />
              </button>
            )}

            {currentIndex < Math.max(0, Math.ceil(testimonials.length / itemsPerView) - 1) && (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition z-10 hidden md:block"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} className="text-dark-blue-primary" />
              </button>
            )}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.max(0, Math.ceil(testimonials.length / itemsPerView)) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-blue-accent w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/testimonials" className="text-blue-accent font-semibold hover:text-dark-blue-primary transition">
              Read More Testimonials →
            </Link>
          </div>
        </div>
      </section>
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="FAQ">
        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-4">
              Find answers to common questions about our printing services and digital workflows.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex justify-between items-center"
                >
                  <span className="font-semibold text-dark-blue-primary">{faq.question}</span>
                  <span
                    className={`text-blue-accent text-2xl transform transition-transform duration-300 ${
                      openFAQ === faq.id ? 'rotate-180' : ''
                    }`}
                  >
                    {openFAQ === faq.id ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === faq.id ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="text-blue-accent font-semibold hover:text-dark-blue-primary transition">
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="CTA">
        {/* CTA Section */}
        <section className="py-20 bg-dark-blue-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-blue-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 flex items-center gap-2">
            {iconMap['Rocket']}
            <span className="text-blue-accent font-semibold text-sm">Get Started Today</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to <span className="text-blue-accent">Transform</span> Your Brand?
          </h2>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
            From custom apparel to corporate branding, BrandForge delivers
            quality and precision with smart digital workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/products" className="bg-blue-accent text-dark-blue-primary px-10 py-3 rounded-md font-semibold hover:bg-blue-400 transition shadow-lg">
              Request a Quote
            </Link>
            <Link to="/subscriptions" className="border-2 border-white/30 text-white px-10 py-3 rounded-md font-semibold hover:bg-white/10 transition">
              View Subscriptions
            </Link>
            <Link to="/ai-assistant" className="border-2 border-white/30 text-white px-10 py-3 rounded-md font-semibold hover:bg-white/10 transition flex items-center gap-2">
              <Sparkles size={18} />
              Try AI Assistant
            </Link>
          </div>
        </div>
      </section>
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Platform Features">
        {/* Platform Features Section */}
        <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Platform</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Everything You Need to Brand Smarter</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">From design to delivery, our platform gives you full control over your branding workflow.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature) => (
              <Link key={feature.title} to={feature.href} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 text-center group">
                <div className="w-16 h-16 bg-blue-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-accent/20 transition">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="text-lg font-bold text-dark-blue-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Blog">
        {/* Blog Section */}
        <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Blog</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Latest Insights</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Stay updated with the latest trends in printing technology and branding.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogLoading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
              ))
            ) : blogPosts.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No articles published yet.</p>
              </div>
            ) : (
              blogPosts.slice(0, 3).map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group block">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-blue-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-500 text-xs mb-2">{post.date}</p>
                    <h3 className="text-dark-blue-primary text-lg font-bold mb-2 group-hover:text-blue-accent transition">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="text-blue-accent font-semibold hover:text-dark-blue-primary transition">
              Read All Articles →
            </Link>
          </div>
        </div>
      </section>
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Contact">
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Contact</span>
              <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Get In Touch</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Have questions? We'd love to hear from you. Our team is ready to help
                with your printing and branding needs.
              </p>
               <div className="mt-8 space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className="bg-blue-accent/10 p-3 rounded-lg">
                      {iconMap[info.icon]}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{info.label}</p>
                      <p className="font-semibold text-dark-blue-primary">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-dark-blue-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-dark-blue-secondary transition shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      </SectionErrorBoundary>
    </div>
  );
};

export default HomePage;
