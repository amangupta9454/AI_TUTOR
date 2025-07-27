import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const LinkedIn = () => {
  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI('AIzaSyDgYVIkudqdxLcRBQfOSAluvuZAVqmrK3U');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // State for Profile Optimization Form
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    section: 'header',
    role: '',
    existingContent: '',
  });
  const [profileResult, setProfileResult] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');

  // State for Post Generation Form
  const [postForm, setPostForm] = useState({
    achievement: '',
    description: '',
    source: '',
  });
  const [postResult, setPostResult] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState('');

  // Handle Profile Form Input Changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Post Form Input Changes
  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
  };

  // Enhanced Profile Optimization Prompt
  const generateProfilePrompt = () => `
    You are an expert LinkedIn profile strategist with deep knowledge of personal branding and career storytelling. Optimize the following LinkedIn profile content to create a highly engaging, professional, and impactful section that stands out to recruiters, hiring managers, and industry peers.
    - Name: ${profileForm.name}
    - Email: ${profileForm.email}
    - Desired Role: ${profileForm.role}
    - LinkedIn Section: ${profileForm.section}
    - Existing Content: ${profileForm.existingContent || 'Not provided'}
    Task:
    - Craft a compelling, concise, and authentic narrative tailored to the specified LinkedIn section (e.g., header, about, experience, education, skills).
    - Highlight the user's unique strengths, achievements, and passion for the desired role, incorporating industry-specific keywords and a professional yet approachable tone.
    - For the header, create a punchy, memorable tagline (max 220 characters) that showcases expertise and value.
    - For the about section, weave a story that connects the user's background, skills, and aspirations (max 2600 characters).
    - For experience, focus on quantifiable achievements and impact in 2-3 sentences per role.
    - For education or skills, emphasize relevance to the desired role with concise, impactful descriptions.
    - If existing content is provided, enhance it while preserving its core message, improving clarity, and adding flair.
    - Ensure the tone is confident, authentic, and aligned with LinkedIn's professional audience.
    - Return the optimized content as a plain string, formatted for direct use in LinkedIn (no bullet points, use paragraphs or line breaks as appropriate).
    - Do NOT wrap the response in code fences or JSON.
  `;

  // Enhanced Post Generation Prompt
  const generatePostPrompt = () => `
    You are a world-class LinkedIn content creator specializing in crafting viral, engaging, and professional posts that resonate with a professional audience. Generate a LinkedIn post based on the following details.
    - Achievement: ${postForm.achievement || 'Not provided'}
    - Description: ${postForm.description || 'Not provided'}
    - Source: ${postForm.source || 'Not provided'}
    Task:
    - Create a captivating LinkedIn post (100-150 words) that highlights the achievement and description in a storytelling format, designed to inspire, engage, and spark conversation among professionals.
    - Incorporate a hook in the first sentence to grab attention (e.g., a surprising stat, question, or bold statement).
    - Weave in the source (e.g., project, course, job) to provide context and credibility.
    - Use a professional yet relatable tone, emphasizing lessons learned, personal growth, or industry insights.
    - Include 2-4 relevant hashtags (e.g., #CareerGrowth, #Leadership, #Innovation) to boost visibility.
    - End with a call-to-action (e.g., invite comments, ask a question) to encourage engagement.
    - Ensure the post is concise, polished, and formatted for LinkedIn (use line breaks for readability, no bullet points).
    - Return the post content as a plain string.
    - Do NOT wrap the response in code fences or JSON.
  `;

  // Handle Profile Form Submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError('');
    setProfileResult('');

    if (!profileForm.name || !profileForm.email || !profileForm.role) {
      setProfileError('Please fill in Name, Email, and Desired Role.');
      setProfileLoading(false);
      return;
    }

    try {
      const prompt = generateProfilePrompt();
      const result = await model.generateContent(prompt);
      const optimizedContent = result.response.text().trim();
      setProfileResult(optimizedContent);
    } catch (error) {
      setProfileError('Failed to optimize profile content. Please try again.');
      console.error('Profile optimization error:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle Post Form Submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    setPostError('');
    setPostResult('');

    if (!postForm.achievement && !postForm.description) {
      setPostError('Please provide at least an achievement or description.');
      setPostLoading(false);
      return;
    }

    try {
      const prompt = generatePostPrompt();
      const result = await model.generateContent(prompt);
      const postContent = result.response.text().trim();
      setPostResult(postContent);
    } catch (error) {
      setPostError('Failed to generate post content. Please try again.');
      console.error('Post generation error:', error);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center pt-20 sm:pt-24 lg:pt-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dot Pattern Background with Blink Animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,#a5b4fc_2.5px,transparent_2.5px)] bg-[length:25px_25px] opacity-65 animate-blink"></div>
      </div>

      {/* Custom CSS for Animations and Styling */}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 0.65; }
            50% { opacity: 0.35; }
          }
          .animate-blink {
            animation: blink 3.5s infinite ease-in-out;
          }
          .gradient-border {
            position: relative;
            background: linear-gradient(145deg, #374151, #1f2937);
            border-radius: 1.5rem;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          }
          .gradient-border::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: 1.5rem;
            background: linear-gradient(145deg, #818cf8, #c4b5fd, #e9d5ff);
            z-index: -1;
            filter: blur(3px);
          }
          .input-glow {
            transition: all 0.3s ease;
          }
          .input-glow:focus {
            transform: scale(1.02);
            box-shadow: 0 0 14px rgba(129, 140, 248, 0.6);
          }
          .input-hover:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(129, 140, 248, 0.4);
          }
          .button-glow {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          .button-glow::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
            transition: 0.5s;
          }
          .button-glow:hover::after {
            left: 100%;
          }
          .button-glow:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 24px rgba(129, 140, 248, 0.5);
          }
          .section-enter {
            animation: fadeInUp 0.7s ease-out;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .result-glow {
            transition: all 0.5s ease;
          }
          .result-glow:hover {
            box-shadow: 0 0 20px rgba(129, 140, 248, 0.3);
          }
        `}
      </style>

      <div className="max-w-5xl w-full space-y-16 relative z-10">
        {/* Header */}
        <header className="text-center section-enter">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            LinkedIn Content Studio
          </h1>
          <p className="mt-3 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Elevate your LinkedIn presence with AI-powered profile optimization and captivating posts.
          </p>
        </header>

        {/* Profile Optimization Section */}
        <section className="gradient-border p-6 sm:p-8 lg:p-10 section-enter">
          <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6 text-center">
            Optimize Your LinkedIn Profile
          </h2>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full px-4 py-3 bg-gray-800/85 border border-indigo-500/60 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm input-glow input-hover cursor-text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full px-4 py-3 bg-gray-800/85 border border-indigo-500/60 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm input-glow input-hover cursor-text"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">LinkedIn Section</label>
              <select
                name="section"
                value={profileForm.section}
                onChange={handleProfileChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-800/85 border border-indigo-500/60 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm input-glow input-hover cursor-pointer"
              >
                <option value="header">Header</option>
                <option value="about">About</option>
                <option value="experience">Experience</option>
                <option value="education">Education</option>
                <option value="skills">Skills</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Desired Role</label>
              <input
                type="text"
                name="role"
                value={profileForm.role}
                onChange={handleProfileChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-800/85 border border-indigo-500/60 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm input-glow input-hover cursor-text"
                placeholder="Software Engineer"
                required
                minLength="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Existing Content</label>
              <textarea
                name="existingContent"
                value={profileForm.existingContent}
                onChange={handleProfileChange}
                rows="6"
                className="mt-1 block w-full px-4 py-3 bg-gray-800/85 border border-indigo-500/60 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm input-glow input-hover cursor-text"
                placeholder="Paste your current LinkedIn section content here..."
              />
            </div>
            {profileError && (
              <p className="text-red-400 text-sm font-medium bg-red-900/40 border border-red-500/60 rounded-lg p-3">
                {profileError}
              </p>
            )}
            <button
              type="submit"
              disabled={profileLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 button-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {profileLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
                  </svg>
                  Optimizing...
                </span>
              ) : (
                'Optimize Profile'
              )}
            </button>
          </form>
          {profileResult && (
            <div className="mt-6 p-4 sm:p-6 bg-gray-800/90 rounded-xl border border-indigo-500/60 shadow-lg result-glow section-enter">
              <h3 className="text-lg font-semibold text-indigo-300">Optimized Content:</h3>
              <p className="mt-2 text-gray-200 whitespace-pre-wrap leading-relaxed">{profileResult}</p>
            </div>
          )}
        </section>

        {/* Post Generation Section */}
        <section className="gradient-border p-6 sm:p-8 lg:p-10 section-enter">
          <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6 text-center">
            Generate LinkedIn Post
          </h2>
          <form onSubmit={handlePostSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200">Achievement</label>
              <textarea
                name="achievement"
                value={postForm.achievement}
                onChange={handlePostChange}
                rows="4"
                className="mt-1 block w-full px-4 py-3 bg-gray-800/85 border border-indigo-500/60 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm input-glow input-hover cursor-text"
                placeholder="e.g., Completed a major project..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Description</label>
              <textarea
                name="description"
                value={postForm.description}
                onChange={handlePostChange}
                rows="4"
                className="mt-1 block w-full px-4 py-3 bg-gray-800/85 border border-indigo-500/60 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm input-glow input-hover cursor-text"
                placeholder="e.g., Learned a new skill in React..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Source</label>
              <input
                type="text"
                name="source"
                value={postForm.source}
                onChange={handlePostChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-800/85 border border-indigo-500/60 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm input-glow input-hover cursor-text"
                placeholder="e.g., Online course, Job, Project..."
              />
            </div>
            {postError && (
              <p className="text-red-400 text-sm font-medium bg-red-900/40 border border-red-500/60 rounded-lg p-3">
                {postError}
              </p>
            )}
            <button
              type="submit"
              disabled={postLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 button-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {postLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Post'
              )}
            </button>
          </form>
          {postResult && (
            <div className="mt-6 p-4 sm:p-6 bg-gray-800/90 rounded-xl border border-indigo-500/60 shadow-lg result-glow section-enter">
              <h3 className="text-lg font-semibold text-indigo-300">Generated Post:</h3>
              <p className="mt-2 text-gray-200 whitespace-pre-wrap leading-relaxed">{postResult}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LinkedIn;