import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {  User, Rocket, FileText, TrendingUp,  LogIn, Users, Book,Trophy, ChevronDown, Star, Quote, Building2,MessageCircle,Target,Bot} from "lucide-react";
import st1 from "/st1.jpeg";
import st2 from "/st2.png";
import st3 from "/st3.jpeg";
import st4 from "/st4.jpeg";
const Home = () => {
  const imageRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();
  // Custom intersection observer hook
  const useInView = (options = {}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (options.triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!options.triggerOnce) {
            setInView(false);
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px',
        }
      );

      observer.observe(element);
      return () => observer.unobserve(element);
    }, [options.triggerOnce, options.threshold, options.rootMargin]);

    return { ref, inView };
  };

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElement.style.transform = "translateY(15px) scale(0.98) rotateX(2deg)";
        imageElement.style.filter = "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8))";
      } else {
        imageElement.style.transform = "translateY(0) scale(1) rotateX(0deg)";
        imageElement.style.filter = "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { 
      title: "Ai Career Path", 
      description: "AI-crafted career paths tailored to your unique goals and skills.", 
      icon: <User className="w-6 h-6 text-white" />,
    },
    { 
      title: "Interview Mastery", 
      description: "Real-time feedback and practice to excel in any interview.", 
      icon: <Rocket className="w-6 h-6 text-white" />,
    },
    { 
      title: "Smart Resume Builder", 
      description: "ATS-optimized resumes with intelligent insights and suggestions.", 
      icon: <FileText className="w-6 h-6 text-white" />,
    },
    { 
      title: "Email Generator", 
      description: "Real-time industry trends and insights to stay ahead.", 
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
  ];

  const howItWorks = [
    { 
      title: "Sign Up", 
      description: "Create your profile in minutes with our intuitive setup.", 
      icon: <LogIn className="w-6 h-6 text-white" />,
      step: "01"
    },
    { 
      title: "Get Matched", 
      description: "Receive AI-driven career suggestions based on your profile.", 
      icon: <Users className="w-6 h-6 text-white" />,
      step: "02"
    },
    { 
      title: "Learn & Practice", 
      description: "Master new skills with our comprehensive learning tools.", 
      icon: <Book className="w-6 h-6 text-white" />,
      step: "03"
    },
    { 
      title: "Achieve Success", 
      description: "Land your dream job with confidence and preparation.", 
      icon: <Trophy className="w-6 h-6 text-white" />,
      step: "04"
    },
  ];

  const testimonials = [
    { 
      author: "Anshika Yadav", 
      role: "Frontend Developer", 
      company: "HIET", 
      quote: "This platform completely transformed my career trajectory. The AI insights were spot-on!", 
      image: st1,
      rating: 5
    },
    { 
      author: "Aman Gupta", 
      role: "FULL Stack Developer", 
      company: "HIET", 
      quote: "The interview preparation tools helped me nail my dream job. Highly recommended!", 
      image: st2,
      rating: 5
    },
    { 
      author: "Himanshu Gupta", 
      role: "FULL Stack Developer", 
      company: "HIET", 
      quote: "The market insights and career guidance were invaluable for my career growth.", 
      image: st3,
      rating: 5
    },
    { 
      author: "Sachchidanand Yadav", 
      role: "Frontend Developer", 
      company: "Creative Solutions", 
      quote: "The resume builder is incredible! It helped me showcase my skills perfectly.", 
      image: st4,
      rating: 5
    },
  ];

  const faqs = [
    { 
      question: "What makes AI Career Coach unique from other platforms?", 
      answer: "Our platform combines cutting-edge AI technology with personalized career guidance, offering real-time market insights and tailored recommendations that adapt to your specific goals and industry trends." 
    },
    { 
      question: "How does the AI-powered career matching work?", 
      answer: "Our AI analyzes your skills, experience, preferences, and current market trends to suggest optimal career paths, identify skill gaps, and recommend learning opportunities that align with high-demand roles." 
    },
    { 
      question: "What are the available pricing plans?", 
      answer: "We offer a generous free tier with basic features, and premium plans starting at $29/month that include advanced AI insights, unlimited resume generations, and priority support." 
    },
    { 
      question: "Can I track my career development progress?", 
      answer: "Yes! Our comprehensive analytics dashboard tracks your skill development, application success rates, interview performance, and provides actionable insights to accelerate your career growth." 
    },
    { 
      question: "How secure is my personal and career data?", 
      answer: "We use enterprise-grade encryption and follow strict data privacy standards. Your information is secured with advanced encryption protocols and we never share your data with third parties." 
    },
  ];

  const stats = [
    { value: "50+", label: "Industries", icon: <Building2 className="w-5 h-5" /> },
    { value: "10K+", label: "Questions", icon: <MessageCircle className="w-5 h-5" /> },
    { value: "95%", label: "Success Rate", icon: <Target className="w-5 h-5" /> },
    { value: "24/7", label: "AI Support", icon: <Bot className="w-5 h-5" /> },
  ];

  // Scroll reveal hooks
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: howItWorksRef, inView: howItWorksInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleGetStarted = () => {
      navigate('/register');
  };

 const handleSignIn = () => {
  navigate('/login');
};

  

  return (
    <>
      <style>{`
        /* Enhanced Gradient Animations */
        .gradient-title {
          background: linear-gradient(135deg, #e5e7eb, #6b7280, #1e40af, #3b82f6);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          animation: metallicShift 8s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
        }

        @keyframes metallicShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        /* Enhanced Hero Image with Advanced Parallax */
        .hero-image {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6));
          transform-style: preserve-3d;
          width: 100%;
          height: auto;
          max-width: 100%;
          object-fit: contain;
        }

        /* Advanced Glow Effects */
        .glow-effect {
          position: relative;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glow-effect::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: linear-gradient(45deg, #6b7280, #3b82f6, #1e40af, #6366f1);
          background-size: 400% 400%;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: -1;
          animation: gradientGlow 4s ease-in-out infinite;
        }

        .glow-effect:hover::before {
          opacity: 0.7;
        }

        @keyframes gradientGlow {
          0%, 100% { background-position: 0% 50%; opacity: 0.3; }
          50% { background-position: 100% 50%; opacity: 0.6; }
        }

        /* Dynamic Background Patterns */
        .cosmic-bg {
          background: radial-gradient(ellipse at top, #000000 0%, #111827 50%, #0f172a 100%);
          position: relative;
          overflow-x: hidden;
        }

        .starfield {
          background-image: 
            radial-gradient(circle, rgba(255, 255, 255, 0.8) 1px, transparent 1px),
            radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
          background-size: 50px 50px, 100px 100px, 150px 150px;
          background-position: 0 0, 25px 25px, 50px 50px;
          animation: twinkle 15s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        /* Enhanced Card Styles */
        .glass-card {
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .glass-card:hover {
          transform: translateY(-8px) scale(1.02) rotateX(5deg);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(59, 130, 246, 0.3);
          border-color: rgba(59, 130, 246, 0.4);
        }

        .glass-card:hover::before {
          opacity: 1;
        }

        /* Icon Gradient Backgrounds */
        .icon-gradient {
          background: linear-gradient(135deg, #6b7280, #3b82f6, #1e40af);
          background-size: 200% 200%;
          animation: iconShimmer 3s ease-in-out infinite;
        }

        @keyframes iconShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Step Card Enhancements */
        .step-card {
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .step-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          transition: left 0.8s ease;
        }

        .step-card:hover::after {
          left: 100%;
        }

        .step-number {
          background: linear-gradient(135deg, #6b7280, #3b82f6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
          font-size: 2rem;
          opacity: 0.3;
          transition: all 0.6s ease;
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .step-card:hover .step-number {
          opacity: 0.7;
          transform: scale(1.2) rotate(5deg);
        }

        /* FAQ Accordion Enhancements */
        .faq-item {
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .faq-item:hover {
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          transform: translateY(-2px);
        }

        .faq-trigger {
          transition: all 0.3s ease;
          position: relative;
        }

        .faq-trigger:hover {
          background: rgba(59, 130, 246, 0.1);
        }

        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }

        .faq-content.open {
          max-height: 400px; /* Increased max-height for mobile */
          opacity: 1;
          padding-bottom: 1rem;
        }

        .faq-icon {
          transition: transform 0.3s ease;
        }

        .faq-icon.open {
          transform: rotate(180deg);
        }

        /* Enhanced CTA Buttons */
        .cta-button {
          background: linear-gradient(135deg, #6b7280, #3b82f6, #1e40af);
          background-size: 200% 200%;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3b82f6, #1e40af, #1d4ed8);
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 
            0 12px 24px rgba(0, 0, 0, 0.4),
            0 0 20px rgba(59, 130, 246, 0.3);
          background-position: 100% 0;
        }

        .cta-button:hover::before {
          opacity: 1;
        }

        .cta-button:active {
          transform: translateY(0) scale(1.02);
        }

        /* Testimonial Card Enhancements */
        .testimonial-card {
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .testimonial-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
          border-color: rgba(59, 130, 246, 0.3);
        }

        /* Animation Classes */
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Badge Animations */
        .floating-badge {
          animation: floatBadge 3s ease-in-out infinite;
        }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        /* Enhanced Responsive Design */
        @media (max-width: 1280px) {
          .gradient-title {
            font-size: clamp(2.5rem, 5vw, 5rem);
            line-height: 1.1;
          }
          
          .glass-card:hover,
          .step-card:hover,
          .testimonial-card:hover {
            transform: translateY(-6px) scale(1.015);
          }

          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }

          .how-it-works-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }

          .testimonials-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }

        @media (max-width: 1024px) {
          .gradient-title {
            font-size: clamp(2rem, 4vw, 4rem);
          }
          
          .glass-card,
          .step-card,
          .testimonial-card {
            padding: 1.5rem;
          }
          
          .hero-image {
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
          }
          
          .container {
            max-width: 95%;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
          }

          .how-it-works-grid {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
          }

          .testimonials-grid {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .gradient-title {
            font-size: clamp(1.75rem, 3.5vw, 3rem);
            line-height: 1.2;
          }
          
          .glass-card,
          .step-card,
          .testimonial-card {
            padding: 1.25rem;
          }
          
          .glass-card:hover,
          .step-card:hover,
          .testimonial-card:hover {
            transform: translateY(-4px) scale(1.01);
          }
          
          .step-number {
            font-size: 1.5rem;
            top: 0.75rem;
            right: 0.75rem;
          }
          
          .faq-content.open {
            max-height: 500px;
          }
          
          .hero-image {
            margin-top: 1.5rem;
            max-width: 100%;
          }
          
          .starfield {
            background-size: 30px 30px, 60px 60px, 90px 90px;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .how-it-works-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-button,
          .watch-demo-button {
            width: 100%;
            max-width: 300px;
            font-size: clamp(0.9rem, 2.5vw, 1rem);
            padding: 0.75rem 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .gradient-title {
            font-size: clamp(1.5rem, 3vw, 2.5rem);
            line-height: 1.3;
          }
          
          .glass-card,
          .step-card,
          .testimonial-card {
            padding: 1rem;
          }
          
          .glass-card:hover,
          .step-card:hover,
          .testimonial-card:hover {
            transform: translateY(-3px) scale(1.005);
          }
          
          .step-number {
            font-size: 1.25rem;
            top: 0.5rem;
            right: 0.5rem;
          }
          
          .faq-content.open {
            max-height: 600px;
          }
          
          .icon-gradient {
            width: 3rem;
            height: 3rem;
          }
          
          .icon-gradient .lucide {
            width: 1.25rem;
            height: 1.25rem;
          }

          .hero-image {
            max-width: 100%;
          }

          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        @media (max-width: 480px) {
          .gradient-title {
            font-size: clamp(1.25rem, 2.5vw, 2rem);
            line-height: 1.4;
          }
          
          .glass-card,
          .step-card,
          .testimonial-card {
            padding: 0.75rem;
          }
          
          .step-number {
            font-size: 1rem;
          }
          
          .faq-content.open {
            max-height: 700px;
          }
          
          .starfield {
            background-size: 20px 20px, 40px 40px, 60px 60px;
          }

          .cta-button,
          .watch-demo-button {
            font-size: clamp(0.85rem, 2vw, 0.95rem);
            padding: 0.65rem 1.25rem;
          }
        }

        @media (max-width: 375px) {
          .gradient-title {
            font-size: clamp(1.125rem, 2vw, 1.75rem);
          }
          
          .glass-card,
          .step-card,
          .testimonial-card {
            padding: 0.5rem;
          }
          
          .icon-gradient {
            width: 2.5rem;
            height: 2.5rem;
          }
          
          .icon-gradient .lucide {
            width: 1rem;
            height: 1rem;
          }

          .cta-button,
          .watch-demo-button {
            font-size: clamp(0.8rem, 1.8vw, 0.9rem);
            padding: 0.5rem 1rem;
          }
        }

        /* Ensure no horizontal scroll */
        html, body {
          overflow-x: hidden;
        }

        .container {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        section {
          overflow-x: hidden;
        }
      `}</style>

      {/* Hero Section */}
      <section className="min-h-screen md:min-h-[50vh] w-full  sm:pt-16 pb-8 sm:pb-12 cosmic-bg relative overflow-x-hidden pt-28">
        <div className="absolute inset-0 starfield opacity-40"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8 pt-8">
            {/* Header Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-xs sm:text-sm text-gray-300 floating-badge ">
              <Star className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Trusted by 10,000+ professionals worldwide</span>
              <span className="sm:hidden">10,000+ professionals trust us</span>
            </div>

            {/* Main Title */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-title leading-tight px-2 sm:px-0">
                Your AI Career Coach
                <br />
                
                  for Professional Success
                  
                
              </h1>
              
              <p className="mx-auto max-w-full sm:max-w-2xl text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed px-4 sm:px-0">
                Transform your career with AI-powered insights, personalized guidance, and cutting-edge tools designed for the modern professional.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="cta-buttons flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 px-4 sm:px-0">
              <button 
                onClick={handleGetStarted}
                className="cta-button px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-lg sm:rounded-xl glow-effect relative z-10"
              >
                Start Your Journey
              </button>
              
            </div>

            
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full cosmic-bg relative overflow-x-hidden">
        <div className="absolute inset-0 starfield opacity-20"></div>
        
        <div className="relative z-10">
          {/* Features Section */}
          <div ref={featuresRef} className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 floating-badge">
                  <Rocket className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400 mr-1 sm:mr-2" />
                  Powerful AI Features
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black gradient-title mb-4 sm:mb-6 px-4 sm:px-0">
                  Advanced Tools for Career Success
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                  Elevate your professional journey with our comprehensive suite of AI-powered career development tools.
                </p>
              </div>

              <div className="features-grid grid grid-cols-1 gap-6 sm:gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 group ${
                      featuresInView ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="icon-gradient w-12 sm:w-14 h-12 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className="py-8 sm:py-12 bg-black/30 backdrop-blur-2xl border-y border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="stats-grid grid grid-cols-2 gap-6 sm:gap-8 text-center">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`${
                      statsInView ? "animate-fade-in-scale" : "opacity-0"
                    } group`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-blue-400 mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 sm:mb-2 group-hover:text-blue-300 transition-colors">
                      {stat.value}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div ref={howItWorksRef} className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 floating-badge">
                  <Book className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400 mr-1 sm:mr-2" />
                  Simple 4-Step Process
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black gradient-title mb-4 sm:mb-6 px-4 sm:px-0">
                  How It Works
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                  Transform your career in four simple steps with our AI-powered guidance system.
                </p>
              </div>

              <div className="how-it-works-grid grid grid-cols-1 gap-6 sm:gap-8">
                {howItWorks.map((item, index) => (
                  <div
                    key={index}
                    className={`step-card rounded-xl sm:rounded-2xl p-6 sm:p-8 group relative ${
                      howItWorksInView ? "animate-slide-in-left" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="step-number">{item.step}</div>
                    <div className="icon-gradient w-12 sm:w-14 h-12 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div ref={testimonialsRef} className="py-12 sm:py-16 bg-black/30 backdrop-blur-2xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 floating-badge">
                  <Users className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400 mr-1 sm:mr-2" />
                  Success Stories
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black gradient-title mb-4 sm:mb-6 px-4 sm:px-0">
                  What Our Users Say
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                  Join thousands of professionals who have transformed their careers with our AI-powered platform.
                </p>
              </div>

              <div className="testimonials-grid grid grid-cols-1 gap-6 sm:gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`testimonial-card rounded-xl sm:rounded-2xl p-6 sm:p-8 ${
                      testimonialsInView ? "animate-fade-in-scale" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <Quote className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400 opacity-60 mb-3 sm:mb-4" />
                    
                    <div className="flex items-center mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-white/10 object-cover"
                      />
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-white">{testimonial.author}</p>
                        <p className="text-xs sm:text-sm text-gray-400">{testimonial.role}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div ref={faqRef} className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 floating-badge">
                  <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400 mr-1 sm:mr-2" />
                  Frequently Asked Questions
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black gradient-title mb-4 sm:mb-6 px-4 sm:px-0">
                  Got Questions?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                  Find answers to common questions about our AI Career Coach platform.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`faq-item rounded-xl sm:rounded-2xl overflow-hidden ${
                      faqInView ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <button
                      className="faq-trigger w-full text-left py-4 sm:py-6 px-4 sm:px-8 text-white font-semibold flex justify-between items-center hover:bg-blue-500/5 transition-colors"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      <span className="text-sm sm:text-base pr-3 sm:pr-4">{faq.question}</span>
                      <ChevronDown 
                        className={`w-4 sm:w-5 h-4 sm:h-5 text-blue-400 faq-icon flex-shrink-0 ${
                          openFaq === index ? "open" : ""
                        }`} 
                      />
                    </button>
                    <div className={`faq-content ${openFaq === index ? "open" : ""}`}>
                      <div className="px-4 sm:px-8 pb-4 sm:pb-6">
                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div ref={ctaRef} className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div 
                className={`glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden ${
                  ctaInView ? "animate-fade-in-scale" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 floating-badge">
                    <Trophy className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400 mr-1 sm:mr-2" />
                    Transform Your Career Today
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black gradient-title mb-4 sm:mb-6 px-4 sm:px-0">
                    Ready to Start Your Success Story?
                  </h2>
                  
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
                    Join thousands of professionals who have accelerated their careers with our AI-powered platform. Your dream job is just one click away.
                  </p>
                  
                  <div className="cta-buttons flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4 sm:px-0">
                    <button 
                      onClick={handleGetStarted}
                      className="cta-button px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-lg sm:rounded-xl glow-effect relative z-10"
                    >
                      Begin Your Journey
                    </button>
                    <button 
                      onClick={handleSignIn}
                      className="watch-demo-button px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-300 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-lg sm:rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      Sign In
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <Star className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400 fill-current" />
                      <span>4.9/5 Rating</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" />
                      <span>10,000+ Users</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Trophy className="w-3 sm:w-4 h-3 sm:h-4 text-green-400" />
                      <span>95% Success Rate</span>
                    </div>
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