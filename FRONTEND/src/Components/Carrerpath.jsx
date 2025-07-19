import React, { useState, useMemo } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define InputField and TextAreaField outside the CareerPath component to prevent redefinition
const InputField = ({ label, name, placeholder = "", type = "text", value, onChange, required = false }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder || label}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full p-3 bg-white text-black rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
  />
);

const TextAreaField = ({ label, name, placeholder = "", rows = 3, value, onChange, required = false }) => (
  <textarea
    name={name}
    placeholder={placeholder || label}
    value={value}
    rows={rows}
    onChange={onChange}
    required={required}
    className="w-full p-3 bg-white text-black rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
  ></textarea>
);

export default function CareerPath() {
  const [selectedStage, setSelectedStage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    stream: "",
    subject: "",
    dreamJob: "",
    hobbies: "",
    careerGoal: "",
    examTarget: "",
    goal: "",
    course: "",
  });

  const [careerSuggestion, setCareerSuggestion] = useState("");
  const [whyAndImpact, setWhyAndImpact] = useState("");
  const [futureTrends, setFutureTrends] = useState([]);
  const [powerUpTips, setPowerUpTips] = useState([]);
  const [inspirationalQuote, setInspirationalQuote] = useState(null);
  const [callToAction, setCallToAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- IMPORTANT SECURITY NOTE ---
  // Hardcoding the API key in client-side code is insecure for production.
  // For development purposes, as requested, the key is hardcoded.
  // In production, use a backend proxy to securely handle API calls.
  const VITE_APP_GEMINI_API_KEY = "AIzaSyDgYVIkudqdxLcRBQfOSAluvuZAVqmrK3U";

  const genAI = useMemo(() => {
    if (!VITE_APP_GEMINI_API_KEY || VITE_APP_GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      setError("Gemini API Key is missing or not configured.");
      return null;
    }
    return new GoogleGenerativeAI(VITE_APP_GEMINI_API_KEY);
  }, [VITE_APP_GEMINI_API_KEY]);

  const model = useMemo(() => {
    return genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;
  }, [genAI]);

  const resetSuggestions = () => {
    setCareerSuggestion("");
    setWhyAndImpact("");
    setFutureTrends([]);
    setPowerUpTips([]);
    setInspirationalQuote(null);
    setCallToAction("");
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetSuggestions();

    if (!formData.fullName.trim()) {
      setError("Please provide your full name.");
      setLoading(false);
      return;
    }
    if (!selectedStage) {
      setError("Please select your academic level.");
      setLoading(false);
      return;
    }
    if (!model) {
      setError("Gemini API is not initialized. Check your API key or network.");
      setLoading(false);
      return;
    }

    let prompt = `
You are an expert career counselor. Provide a comprehensive career path suggestion for ${formData.fullName} based on the following details. Your response should be structured as a JSON object with the following keys:
{
  "path": "Detailed career path suggestion (as a single string with markdown). Include a recommended path, key steps, and what they should focus on. Use *bold* for key terms, **bold-italic** for important phrases, and list items with numbers (e.g., '1. First step', '2. Second step'). Use bullet points (•) for sub-details.",
  "whyAndImpact": "A concise paragraph explaining why this path is suitable and its potential impact (personal and societal).",
  "futureTrends": ["Array of strings with 3-5 key future trends or emerging roles related to this career path."],
  "powerUpTips": ["Array of strings with 3-5 actionable tips to enhance their journey (e.g., skills to learn, certifications, internships, networking advice)."],
  "inspirationalQuote": {"text": "A relevant inspirational quote.", "author": "Quote author."},
  "callToAction": "A concise call to action for their next step."
}

Ensure the 'path' field is a single string with markdown for formatting.
Provide ONLY the JSON object. Do not include any conversational filler outside the JSON.

Candidate Details:
- Full Name: ${formData.fullName}
- Academic Stage: Grade ${selectedStage}
`;

    if (selectedStage === "9" || selectedStage === "10") {
      if (formData.dreamJob.trim()) prompt += `- Dream Job: ${formData.dreamJob.trim()}\n`;
      if (formData.hobbies.trim()) prompt += `- Hobbies: ${formData.hobbies.trim()}\n`;
      if (formData.subject.trim()) prompt += `- Subject Strengths: ${formData.subject.trim()}\n`;
    } else if (selectedStage === "11" || selectedStage === "12") {
      if (formData.stream.trim()) prompt += `- Stream: ${formData.stream.trim()}\n`;
      if (formData.dreamJob.trim()) prompt += `- Dream Job: ${formData.dreamJob.trim()}\n`;
      if (formData.careerGoal.trim()) prompt += `- Career Goal: ${formData.careerGoal.trim()}\n`;
      if (formData.examTarget.trim()) prompt += `- Exam Target: ${formData.examTarget.trim()}\n`;
      if (formData.subject.trim()) prompt += `- Subject: ${formData.subject.trim()}\n`;
    } else if (selectedStage === "graduation") {
      if (formData.course.trim()) prompt += `- Course: ${formData.course.trim()}\n`;
      if (formData.stream.trim()) prompt += `- Stream: ${formData.stream.trim()}\n`;
      if (formData.careerGoal.trim()) prompt += `- Career Goal: ${formData.careerGoal.trim()}\n`;
      if (formData.goal.trim()) prompt += `- Goal after Graduation: ${formData.goal.trim()}\n`;
    }

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();

      let parsedResponse;
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch && jsonMatch[0]) {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } else {
          console.error("No valid JSON found in AI response:", responseText);
          setError("AI response did not contain valid JSON. Please try again or refine your input.");
          setLoading(false);
          return;
        }
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        console.error('Raw AI response:', responseText);
        setError(`Failed to parse AI response. Please try again. Raw response (start): ${responseText.substring(0, 100)}...`);
        setLoading(false);
        return;
      }

      if (
        typeof parsedResponse.path === 'string' &&
        typeof parsedResponse.whyAndImpact === 'string' &&
        Array.isArray(parsedResponse.futureTrends) &&
        parsedResponse.futureTrends.every(item => typeof item === 'string') &&
        Array.isArray(parsedResponse.powerUpTips) &&
        parsedResponse.powerUpTips.every(item => typeof item === 'string') &&
        (parsedResponse.inspirationalQuote === null ||
         (typeof parsedResponse.inspirationalQuote === 'object' &&
          parsedResponse.inspirationalQuote !== null &&
          typeof parsedResponse.inspirationalQuote.text === 'string' &&
          typeof parsedResponse.inspirationalQuote.author === 'string')) &&
        typeof parsedResponse.callToAction === 'string'
      ) {
        setCareerSuggestion(parsedResponse.path);
        setWhyAndImpact(parsedResponse.whyAndImpact);
        setFutureTrends(parsedResponse.futureTrends);
        setPowerUpTips(parsedResponse.powerUpTips);
        setInspirationalQuote(parsedResponse.inspirationalQuote);
        setCallToAction(parsedResponse.callToAction);
      } else {
        console.error('Invalid or incomplete AI response structure:', parsedResponse);
        setError('AI returned an unexpected or incomplete format. Please try again or provide more specific details.');
      }
    } catch (err) {
      console.error("❌ Gemini API Call Error:", err);
      setError("Failed to get career path from AI. This could be an API issue, incorrect API key, or network problem. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderInputs = () => {
    switch (selectedStage) {
      case "9":
      case "10":
        return (
          <>
            <InputField
              label="Dream Job"
              name="dreamJob"
              placeholder="💭 Dream Job (e.g., AI Engineer, Doctor)"
              value={formData.dreamJob}
              onChange={handleChange}
            />
            <TextAreaField
              label="Hobbies"
              name="hobbies"
              placeholder="🎨 Hobbies (e.g., coding, reading, sports)"
              value={formData.hobbies}
              onChange={handleChange}
            />
            <InputField
              label="Subject Strengths"
              name="subject"
              placeholder="📚 Strong Subjects (e.g., Math, Science, English)"
              value={formData.subject}
              onChange={handleChange}
            />
          </>
        );
      case "11":
      case "12":
        return (
          <>
            <InputField
              label="Stream"
              name="stream"
              placeholder="🔬 Science / Commerce / Arts"
              value={formData.stream}
              onChange={handleChange}
            />
            <InputField
              label="Dream Job"
              name="dreamJob"
              placeholder="💭 Dream Job"
              value={formData.dreamJob}
              onChange={handleChange}
            />
            <TextAreaField
              label="Career Goal"
              name="careerGoal"
              placeholder="🎯 Career Goal (e.g., Research in AI, Start a Tech Company)"
              value={formData.careerGoal}
              onChange={handleChange}
            />
            <InputField
              label="Exam Target"
              name="examTarget"
              placeholder="📘 Target Exam (e.g., JEE, NEET, CLAT)"
              value={formData.examTarget}
              onChange={handleChange}
            />
            <InputField
              label="Subject"
              name="subject"
              placeholder="📚 Main Subjects (e.g., Physics, Accounts, History)"
              value={formData.subject}
              onChange={handleChange}
            />
          </>
        );
      case "graduation":
        return (
          <>
            <InputField
              label="Course"
              name="course"
              placeholder="🎓 Your Course (e.g., B.Tech CSE, B.Com, BA Psychology)"
              value={formData.course}
              onChange={handleChange}
            />
            <InputField
              label="Stream"
              name="stream"
              placeholder="Major Stream (e.g., Engineering, Business, Arts)"
              value={formData.stream}
              onChange={handleChange}
            />
            <TextAreaField
              label="Career Goal"
              name="careerGoal"
              placeholder="🎯 Career Goal (e.g., Data Scientist, Marketing Manager)"
              value={formData.careerGoal}
              onChange={handleChange}
            />
            <TextAreaField
              label="Goal after Graduation"
              name="goal"
              placeholder="🚀 After Graduation Goal (e.g., Higher Studies, Job, Startup)"
              value={formData.goal}
              onChange={handleChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  const formatSuggestion = (text) => {
    if (!text) return null;

    return text.split("\n").map((line, idx) => {
      line = line.trim();
      if (line.match(/^\d+\.\s/)) {
        const parts = line.split('.');
        const num = parts[0] + '.';
        const content = parts.slice(1).join('.').trim();
        return <p key={idx} className="text-white my-1 font-semibold"><span className="text-yellow-300">{num}</span> {content}</p>;
      } else if (line.startsWith('• ')) {
        const content = line.substring(2).trim();
        return <p key={idx} className="text-white my-1">• {content}</p>;
      }
      let formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, "<strong><em>$1</em></strong>")
        .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
        .replace(/_(.*?)_/g, "<em>$1</em>");
      if (formattedLine) {
        return <p key={idx} className="text-white my-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <section className="mt-10 relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 pt-28 pb-16">
      <style>
        {`
          .dot-pattern {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 4px);
            background-size: 20px 20px;
            opacity: 0.7;
            pointer-events: none;
            z-index: 1;
            animation: subtleMove 30s linear infinite;
          }

          @keyframes subtleMove {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }

          @keyframes blobPulse {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
            33% { transform: translate(30px, -20px) scale(1.15); opacity: 0.45; }
            66% { transform: translate(-20px, 30px) scale(0.85); opacity: 0.4; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>

      <div className="absolute top-[-15%] left-[-15%] w-60 h-60 bg-fuchsia-600 rounded-full blur-3xl opacity-35 animate-[blobPulse_10s_infinite] z-0" />
      <div className="absolute bottom-[-20%] right-[-15%] w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-35 animate-[blobPulse_12s_infinite] z-0" />
      <div className="dot-pattern z-0" />

      <div className="relative z-10 w-[80%] max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-300">
          🎓 Discover Your Career Path
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            name="fullName"
            placeholder="👤 Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required={true}
          />

          <select
            value={selectedStage}
            onChange={(e) => {
              setSelectedStage(e.target.value);
              setFormData({
                ...formData,
                stream: "", subject: "", dreamJob: "", hobbies: "",
                careerGoal: "", examTarget: "", goal: "", course: "",
              });
              resetSuggestions();
            }}
            className="w-full px-4 py-2 rounded text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">📘 Select Your Academic Level</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
            <option value="graduation">Graduation</option>
          </select>

          {renderInputs()}

          {selectedStage && (
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Generating..." : "🔎 Show My Career Path"}
            </button>
          )}
        </form>

        {loading && <p className="text-center text-gray-400 mt-4">Generating personalized career path...</p>}
        {error && <p className="text-center text-red-500 mt-4 font-bold animate-pulse">{error}</p>}

        {!loading && careerSuggestion && (
          <div className="mt-6 bg-black/20 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap text-sm shadow-xl">
            <h3 className="text-xl font-semibold mb-2 text-green-300">
              🎯 {formData.fullName}'s Suggested Path
            </h3>
            {formatSuggestion(careerSuggestion)}
          </div>
        )}

        {!loading && whyAndImpact && (
          <div className="mt-8 bg-black/20 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-yellow-200">✨ Why Your Path Matters: Make an Impact!</h3>
            <p className="text-white text-base">{whyAndImpact}</p>
          </div>
        )}

        {!loading && futureTrends?.length > 0 && (
          <div className="mt-6 bg-black/20 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-cyan-300">🚀 Future Trends & Emerging Roles</h3>
            <ul className="list-disc list-inside text-white text-base space-y-1">
              {futureTrends.map((trend, index) => (
                <li key={index}>{trend}</li>
              ))}
            </ul>
          </div>
        )}

        {!loading && powerUpTips?.length > 0 && (
          <div className="mt-6 bg-black/20 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-purple-300">⚡ Power-Up Your Journey</h3>
            <ul className="list-disc list-inside text-white text-base space-y-1">
              {powerUpTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {!loading && inspirationalQuote?.text && (
          <div className="mt-6 bg-black/20 p-6 rounded-xl shadow-lg text-center">
            <p className="text-xl italic font-medium text-green-300">"{inspirationalQuote.text}"</p>
            {inspirationalQuote.author && <p className="mt-2 text-sm text-gray-400">- {inspirationalQuote.author}</p>}
          </div>
        )}

        {!loading && callToAction && (
          <div className="mt-6 bg-yellow-400/90 text-black p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Start?</h3>
            <p className="text-lg">{callToAction}</p>
            <button className="mt-4 px-6 py-3 bg-gray-900 text-yellow-400 font-semibold rounded-lg hover:bg-gray-700 transition">
              Take the First Step!
            </button>
          </div>
        )}
      </div>
    </section>
  );
}