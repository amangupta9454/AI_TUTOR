import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Send, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    try {
      const response = await fetch('https://getform.io/f/bejlpxla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          gender: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit the form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      name="contact" 
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs with Animation */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Starry/Dot Pattern with Heavy Animation */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '15px 15px',
            animation: 'twinkle 4s infinite ease-in-out'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-500 to-white rounded-full mb-6 animate-bounce">
            <Mail className="w-8 h-8 text-black" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-4 transform transition-all duration-700 hover:scale-105">
            Get In Touch
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed transform transition-all duration-700" style={{ animationDelay: '200ms' }}>
            Ready to start your next project? Let's create something amazing together. 
            I'm here to help bring your ideas to life.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Mail,
              title: "Email",
              value: "ag0567688@gmail.com",
              href: "mailto:ag0567688@gmail.com",
              color: "from-gray-500 to-gray-300",
              delay: "0ms"
            },
            {
              icon: Phone,
              title: "Phone",
              value: "+91 9560472926",
              href: "tel:+919560472926",
              color: "from-gray-600 to-gray-400",
              delay: "100ms"
            },
            {
              icon: MessageCircle,
              title: "WhatsApp",
              value: "+91 9560472926",
              href: "https://wa.me/919560472926",
              color: "from-gray-700 to-gray-500",
              delay: "200ms"
            }
          ].map((contact, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 transform"
              style={{ animationDelay: contact.delay }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${contact.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <contact.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{contact.title}</h3>
              
              <a
                href={contact.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 group-hover:underline"
              >
                {contact.value}
              </a>
              
              {/* Hover Effect Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${contact.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-gray-500/25 transition-all duration-500">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Send Message</h2>
                <p className="text-gray-400">Fill out the form below and I'll get back to you soon</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Status Message */}
                {formStatus === 'success' && (
                  <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 animate-fadeInUp">
                    Your message has been sent successfully!
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 animate-fadeInUp">
                    Failed to send message. Please try again later.
                  </div>
                )}

                {/* Name Input */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    />
                  </div>
                </div>

                {/* Mobile and Gender Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mobile Input */}
                  <div className="group">
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'mobile' ? 'text-gray-400' : 'text-gray-500'}`} />
                      <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        required
                        value={formData.mobile}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('mobile')}
                        onBlur={() => setFocusedField('')}
                        placeholder="+91 9560472926"
                        pattern="^[7-9][0-9]{9}$"
                        title="Enter a valid Indian mobile number"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      />
                    </div>
                  </div>

                  {/* Gender Select */}
                  <div className="group">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('gender')}
                      onBlur={() => setFocusedField('')}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    >
                      <option value="" className="bg-gray-800">Select Gender</option>
                      <option value="male" className="bg-gray-800">Male</option>
                      <option value="female" className="bg-gray-800">Female</option>
                      <option value="other" className="bg-gray-800">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute left-3 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'message' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Tell me about your project or ask any questions..."
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-4 px-6 bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Connect Me</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Address and Map Section */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-gray-500/25 transition-all duration-500">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-500 to-white rounded-xl mb-4">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Visit Our Office</h3>
                <p className="text-gray-400">Come say hello at our headquarters</p>
              </div>
              
              <div className="text-center">
                <address className="text-gray-300 not-italic leading-relaxed">
                  Plot No. 766, 26th KM Milestone, NH-9<br />
                  Ghaziabad, Uttar Pradesh – 201015<br />
                  India
                </address>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.545251972305!2d77.49128877566565!3d28.673331882226368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf2c4cac27f99%3A0xd9961659aee6d5b2!2sHi-Tech%20Institute%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v1739723721387!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl filter hover:brightness-110 transition-all duration-300"
                  title="Office Location Map"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style>{`
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
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;