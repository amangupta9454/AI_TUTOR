

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaRocket, FaFileAlt, FaChartLine, FaSignInAlt, FaUsers, FaBook, FaTrophy, FaChevronDown, FaStar, FaQuoteLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const imageRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample data with relevant icons
  const features = [
    { 
      title: "Personalized Plans", 
      description: "AI-crafted paths for your career goals.", 
      icon: <FaUser className="w-6 h-6" />,
      gradient: "from-gray-700 to-blue-950"
    },
    { 
      title: "Interview Mastery", 
      description: "Real-time feedback to excel in interviews.", 
      icon: <FaRocket className="w-6 h-6" />,
      gradient: "from-gray-700 to-blue-950"
    },
    { 
      title: "Smart Resume Builder", 
      description: "ATS-optimized resumes with AI insights.", 
      icon: <FaFileAlt className="w-6 h-6" />,
      gradient: "from-gray-700 to-blue-950"
    },
    { 
      title: "Market Intelligence", 
      description: "Real-time trends to stay ahead.", 
      icon: <FaChartLine className="w-6 h-6" />,
      gradient: "from-gray-700 to-blue-950"
    },
  ];

  const howItWorks = [
    { 
      title: "Sign Up", 
      description: "Quick profile setup.", 
      icon: <FaSignInAlt className="w-6 h-6" />,
      step: "01"
    },
    { 
      title: "Get Matched", 
      description: "AI-driven career suggestions.", 
      icon: <FaUsers className="w-6 h-6" />,
      step: "02"
    },
    { 
      title: "Learn & Practice", 
      description: "Master skills with tools.", 
      icon: <FaBook className="w-6 h-6" />,
      step: "03"
    },
    { 
      title: "Achieve Success", 
      description: "Secure your dream role.", 
      icon: <FaTrophy className="w-6 h-6" />,
      step: "04"
    },
  ];

  const testimonials = [
    { 
      author: "Anshika Yadav", 
      role: "Senior Software Engineer", 
      company: "Tech Corp", 
      quote: "Transformed my career path!", 
      image: "/st1.jpg",
      rating: 5
    },
    { 
      author: "Aman Gupta", 
      role: "Product Manager", 
      company: "Innovate Inc", 
      quote: "Nailed my dream job!", 
      image: "/st2.png",
      rating: 5
    },
    { 
      author: "Himanshu Gupta", 
      role: "Data Scientist", 
      company: "DataWorks", 
      quote: "Insights drove my success.", 
      image: "/st3.jpeg",
      rating: 5
    },
    { 
      author: "Sachchidanand Yadav", 
      role: "UX Designer", 
      company: "Creative Solutions", 
      quote: "Resume builder changed everything!", 
      image: "/st1.jpg",
      rating: 5
    },
  ];

  const faqs = [
    { 
      question: "What makes AI Career Coach unique?", 
      answer: "AI-driven insights with personalized guidance." 
    },
    { 
      question: "How does career matching work?", 
      answer: "Analyzes skills and trends for tailored paths." 
    },
    { 
      question: "What are the pricing plans?", 
      answer: "Free tier and premium from $29/month." 
    },
    { 
      question: "Can I track my progress?", 
      answer: "Detailed analytics dashboard included." 
    },
    { 
      question: "Is my data secure?", 
      answer: "Secured with top-tier encryption." 
    },
  ];

  // Scroll reveal hooks
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: howItWorksRef, inView: howItWorksInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <style>
        {`
          /* Darker Gradient Styling */
          .gradient-title {
            background: linear-gradient(135deg, #e5e7eb, #6b7280, #1e40af);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
            animation: metallicShift 8s ease-in-out infinite;
            filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.8));
          }

          @keyframes metallicShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          /* Hero Image Parallax Effect */
          .hero-image {
            transition: transform 0.7s ease, filter 0.7s ease;
            filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.9));
          }

          .hero-image.scrolled {
            transform: translateY(12px) scale(0.97) rotate(0.4deg);
            filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.95));
          }

          /* Glowing Hover Effects */
          .glow-effect {
            position: relative;
            transition: all 0.5s ease;
          }

          .glow-effect::before {
            content: '';
            position: absolute;
            inset: -4px;
            background: linear-gradient(45deg, #6b7280, #1e40af);
            border-radius: inherit;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: -1;
            animation: pulseGlow 3s ease-in-out infinite;
          }

          .glow-effect:hover::before {
            opacity: 0.8;
          }

          @keyframes pulseGlow {
            0%, 100% { opacity: 0; }
            50% { opacity: 0.4; }
          }

          /* Dynamic Background with Particles */
          .dark-bg {
            background: linear-gradient(135deg, #000000, #111827, #0a0f1c);
          }

          .starry-pattern {
            background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0.5px, transparent 0.5px),
                             radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                             radial-gradient(circle, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px);
            background-size: 15px 15px, 25px 25px, 35px 35px;
            background-position: 0 0, 5px 5px, 10px 10px;
            opacity: 0.35;
            animation: sparkle 4s ease-in-out infinite;
          }

          .dot-pattern {
            background-image: radial-gradient(circle, rgba(59, 130, 246, 0.2) 1px, transparent 1px);
            background-size: 30px 30px;
            opacity: 0.25;
            animation: floatDots 10s ease-in-out infinite;
          }

          .rain-pattern {
            background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 2px 20px;
            opacity: 0.2;
            animation: rainFall 2s linear infinite;
          }

          @keyframes sparkle {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 0.55; }
          }

          @keyframes floatDots {
            0%, 100% { background-position: 0 0; transform: translateY(0); }
            50% { background-position: 10px 10px; transform: translateY(5px); }
          }

          @keyframes rainFall {
            0% { background-position: 0 0; }
            100% { background-position: 0 20px; }
          }

          /* Feature Cards */
          .feature-card {
            background: rgba(17, 24, 39, 0.98);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.5s ease;
          }

          .feature-card:hover {
            transform: translateY(-5px) scale(1.03) rotate(0.5deg);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.9);
            border-color: rgba(59, 130, 246, 0.3);
          }

          /* Step Cards */
          .step-card {
            background: rgba(17, 24, 39, 0.98);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.5s ease;
            position: relative;
          }

          .step-card:hover {
            transform: translateY(-4px) scale(1.03) rotate(0.5deg);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
            border-color: rgba(59, 130, 246, 0.3);
          }

          .step-number {
            background: linear-gradient(135deg, #6b7280, #1e40af);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 900;
            font-size: 1.6rem;
            opacity: 0.35;
            transition: all 0.5s ease;
          }

          .step-card:hover .step-number {
            opacity: 0.6;
            transform: scale(1.15);
          }

          /* Testimonial Cards */
          .testimonial-card {
            background: rgba(17, 24, 39, 0.98);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.5s ease;
          }

          .testimonial-card:hover {
            transform: translateY(-4px) scale(1.03) rotate(0.5deg);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
            border-color: rgba(59, 130, 246, 0.3);
          }

          /* FAQ Accordion */
          .faq-item {
            background: rgba(17, 24, 39, 0.98);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.5s ease;
          }

          .faq-item:hover {
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
          }

          .faq-trigger {
            transition: all 0.5s ease;
          }

          .faq-trigger:hover {
            background: rgba(59, 130, 246, 0.08);
          }

          .faq-content {
            max-height: 0;
            overflow: hidden;
            transition: all 0.5s ease;
            opacity: 0;
          }

          .faq-content.open {
            max-height: 220px;
            opacity: 1;
            padding-bottom: 1rem;
          }

          .faq-icon {
            transition: transform 0.5s ease;
          }

          .faq-icon.open {
            transform: rotate(180deg);
          }

          /* CTA Section */
          .cta-section {
            background: linear-gradient(135deg, rgba(17, 24, 39, 0.99), rgba(17, 24, 39, 0.99));
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            position: relative;
          }

          /* Button Styles */
          .cta-button {
            background: linear-gradient(135deg, #6b7280, #1e40af);
            transition: all 0.5s ease;
            position: relative;
            overflow: hidden;
          }

          .cta-button::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            opacity: 0;
            transition: opacity 0.5s ease;
          }

          .cta-button:hover::after {
            opacity: 1;
          }

          .cta-button:hover {
            transform: scale(1.06);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
            animation: pulseButton 1.5s ease-in-out infinite;
          }

          @keyframes pulseButton {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.07); }
          }

          /* Animations */
          @keyframes staggerFadeIn {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-staggerFadeIn {
            animation: staggerFadeIn 0.7s ease forwards;
          }

          @keyframes staggerScale {
            from { opacity: 0; transform: scale(0.94); }
            to { opacity: 1; transform: scale(1); }
          }

          .animate-staggerScale {
            animation: staggerScale 0.7s ease forwards;
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .gradient-title {
              font-size: 1.7rem;
              line-height: 1.2;
            }
            .feature-card:hover, .step-card:hover, .testimonial-card:hover {
              transform: translateY(-3px) scale(1.02) rotate(0.3deg);
            }
            .faq-content.open {
              max-height: 320px;
            }
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="w-full pt-24 pb-12 dark-bg relative overflow-hidden">
        <div className="absolute inset-0 starry-pattern"></div>
        <div className="absolute inset-0 dot-pattern"></div>
        <div className="absolute inset-0 rain-pattern"></div>
        <div className="relative z-10 container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4 animate-staggerFadeIn">
            <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/05 rounded-full text-xs text-gray-300 mb-2">
              <FaStar className="w-3 h-3 text-gray-400 mr-1" />
              Trusted by 10,000+ professionals
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold gradient-title leading-tight">
  Your AI Career Coach
  <br />
  <span className="relative gradient-title">
    for Professional Success
    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-gray-700 to-blue-950 rounded-full animate-staggerFadeIn" style={{ animationDelay: "0.3s" }}></div>
  </span>
</h1>
            <p className="mx-auto max-w-xl text-sm text-gray-400">
              Unleash your potential with AI-driven career tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <Link to="/register">
                <button className="cta-button px-6 py-2 text-sm font-semibold text-white rounded-lg glow-effect">
                  Start Your Journey
                </button>
              </Link>
              <button className="px-6 py-2 text-sm font-semibold text-gray-300 bg-white/5 backdrop-blur-2xl border border-white/05 rounded-lg hover:bg-white/08 transition-all">
                Watch Demo
              </button>
            </div>
            <div className="mt-8">
              <div ref={imageRef} className="hero-image">
                <img
                  src="/banner.jpeg"
                  width={1000}
                  height={562}
                  alt="AI Career Coach Dashboard"
                  className="rounded-lg border border-white/05 mx-auto glow-effect max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full dark-bg relative">
        <div className="absolute inset-0 starry-pattern opacity-25"></div>
        <div className="absolute inset-0 dot-pattern opacity-20"></div>
        <div className="absolute inset-0 rain-pattern opacity-15"></div>
        <div className="relative z-10">
          {/* Features Section */}
          <div ref={featuresRef} className={`py-12 ${featuresInView ? "animate-staggerFadeIn" : "opacity-0"}`}>
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/05 rounded-full text-xs text-gray-300 mb-2">
                  <FaRocket className="w-3 h-3 text-gray-400 mr-1" />
                  Powerful Features
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold gradient-title">
                  Tools for Success
                </h2>
                <p className="text-sm text-gray-400 max-w-xl mx-auto">
                  Elevate your career with cutting-edge AI.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`feature-card rounded-lg p-4 ${featuresInView ? "animate-staggerFadeIn" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${feature.gradient} rounded-md mb-3`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className={`py-10 bg-black/50 backdrop-blur-2xl ${statsInView ? "animate-staggerScale" : "opacity-0"}`}>
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { value: "50+", label: "Industries", icon: "🏢" },
                  { value: "10K+", label: "Questions", icon: "💬" },
                  { value: "95%", label: "Success Rate", icon: "🎯" },
                  { value: "24/7", label: "AI Support", icon: "🤖" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`text-gray-300 ${statsInView ? "animate-staggerScale" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="text-xl mb-1">{stat.icon}</div>
                    <h3 className="text-xl font-bold text-white">{stat.value}</h3>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div ref={howItWorksRef} className={`py-12 ${howItWorksInView ? "animate-staggerFadeIn" : "opacity-0"}`}>
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/05 rounded-full text-xs text-gray-300 mb-2">
                  <FaBook className="w-3 h-3 text-gray-400 mr-1" />
                  Simple Process
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold gradient-title">
                  How It Works
                </h2>
                <p className="text-sm text-gray-400 max-w-xl mx-auto">
                  Transform your career in four steps.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {howItWorks.map((item, index) => (
                  <div
                    key={index}
                    className={`step-card rounded-lg p-4 relative ${howItWorksInView ? "animate-staggerFadeIn" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="absolute top-2 right-2 step-number">{item.step}</div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-gray-700 to-blue-950 rounded-md mb-3">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div ref={testimonialsRef} className={`py-12 bg-black/50 backdrop-blur-2xl ${testimonialsInView ? "animate-staggerScale" : "opacity-0"}`}>
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/05 rounded-full text-xs text-gray-300 mb-2">
                  <FaUsers className="w-3 h-3 text-gray-400 mr-1" />
                  Success Stories
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold gradient-title">
                  What Our Users Say
                </h2>
                <p className="text-sm text-gray-400 max-w-xl mx-auto">
                  Stories from transformed careers.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`testimonial-card rounded-lg p-4 ${testimonialsInView ? "animate-staggerScale" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <FaQuoteLeft className="w-4 h-4 text-gray-400 opacity-50 mb-2" />
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="w-3 h-3 text-gray-400" />
                      ))}
                    </div>
                    <blockquote className="text-xs text-gray-300 mb-2">{testimonial.quote}</blockquote>
                    <div className="flex items-center space-x-2">
                      <img
                        src={testimonial.image}
                        width={32}
                        height={32}
                        alt={testimonial.author}
                        className="rounded-full border border-white/05 glow-effect"
                      />
                      <div>
                        <p className="text-xs font-semibold text-white">{testimonial.author}</p>
                        <p className="text-xs text-gray-400">{testimonial.role}</p>
                        <p className="text-xs text-gray-400">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div ref={faqRef} className={`py-12 ${faqInView ? "animate-staggerFadeIn" : "opacity-0"}`}>
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/05 rounded-full text-xs text-gray-300 mb-2">
                  <FaChevronDown className="w-3 h-3 text-gray-400 mr-1" />
                  FAQ
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold gradient-title">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-gray-400 max-w-xl mx-auto">
                  Answers to common questions.
                </p>
              </div>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`faq-item rounded-lg overflow-hidden ${faqInView ? "animate-staggerFadeIn" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <button
                      className="faq-trigger w-full text-left py-3 px-4 text-white font-semibold flex justify-between items-center"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      <span className="text-xs">{faq.question}</span>
                      <FaChevronDown 
                        className={`w-4 h-4 text-gray-400 faq-icon ${openFaq === index ? "open" : ""}`} 
                      />
                    </button>
                    <div className={`faq-content ${openFaq === index ? "open" : ""}`}>
                      <div className="px-4 pb-3">
                        <p className="text-xs text-gray-400">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div ref={ctaRef} className={`py-12 ${ctaInView ? "animate-staggerScale" : "opacity-0"}`}>
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="cta-section rounded-2xl p-8 text-center">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/05 rounded-full text-xs text-gray-300 mb-2">
                  <FaTrophy className="w-3 h-3 text-gray-400 mr-1" />
                  Transform Your Career
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold gradient-title mb-3">
                  Start Your Success Story
                </h2>
                <p className="text-sm text-gray-400 max-w-xl mx-auto mb-4">
                  Join professionals thriving with AI insights.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link to="/register">
                    <button className="cta-button px-6 py-2 text-sm font-semibold text-white rounded-lg glow-effect">
                      Begin Your Journey
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="px-6 py-2 text-sm font-semibold text-gray-300 bg-white/5 backdrop-blur-2xl border border-white/05 rounded-lg hover:bg-white/08 transition-all">
                      Sign In
                    </button>
                  </Link>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 text-xs text-gray-400">
                  <div className="flex items-center">
                    <FaStar className="w-3 h-3 text-gray-400 mr-1" />
                    4.9/5 Rating
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="w-3 h-3 text-gray-400 mr-1" />
                    10,000+ Users
                  </div>
                  <div className="flex items-center">
                    <FaTrophy className="w-3 h-3 text-gray-400 mr-1" />
                    95% Success Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;