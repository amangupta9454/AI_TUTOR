
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import "../Styles/CareerPath.css";

const CareerPath = () => {
  const [formData, setFormData] = useState({
    currentClass: "",
    desiredCareer: "",
    currentSubjects: "",
    interests: "",
    location: "",
    specificGoals: "",
    currentAge: "",
    workingStatus: "student",
    academicPerformance: "",
    familyBackground: "",
    financialConstraints: "",
    currentCollege: "",
    workExperience: "",
    currentJob: "",
  });

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const genAI = new GoogleGenerativeAI("AIzaSyDgYVIkudqdxLcRBQfOSAluvuZAVqmrK3U");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generatePrompt = () => {
    const userType = formData.workingStatus;
    const isStudent = userType === "student";
    const isGraduate =
      userType === "graduate" ||
      formData.currentClass === "graduation" ||
      formData.currentClass === "final-year" ||
      formData.currentClass === "postgraduation";
    const isProfessional = userType === "working";

    return `
    You are an expert Indian career counselor. Create a SIMPLE, CLEAR, and ACTIONABLE career roadmap.

    USER PROFILE:
    - Status: ${isStudent ? `Student in Class ${formData.currentClass}` : isProfessional ? `Working Professional (${formData.currentJob || "Current Job"})` : `Graduate/College Student`}
    - Target Career: ${formData.desiredCareer}
    - Current Background: ${formData.currentSubjects}
    - Location: ${formData.location}
    - Academic Performance: ${formData.academicPerformance}
    - Financial Budget: ${formData.financialConstraints}
    - Current College: ${formData.currentCollege || "Not specified"}
    - Work Experience: ${formData.workExperience || "None"}
    - Interests: ${formData.interests}
    - Specific Goals: ${formData.specificGoals}

    INSTRUCTIONS:
    1. Create a STEP-BY-STEP roadmap that is EASY TO UNDERSTAND
    2. Use SIMPLE language, avoid jargon
    3. For graduates/professionals: Include college recommendations, skill upgrades, certifications
    4. For working professionals: Focus on career transition, upskilling, networking
    5. Include EXACT exam dates, college names, and website links
    6. Make each step ACTIONABLE with clear next steps
    7. Consider Indian education system (CBSE/ICSE/State boards)

    ${
      isGraduate || isProfessional
        ? `
    SPECIAL FOCUS FOR GRADUATES/PROFESSIONALS:
    - Recommend specific colleges for higher studies
    - Suggest skill development courses
    - Include professional certifications
    - Mention industry connections and networking
    - Consider career change strategies
    - Include online learning platforms
    `
        : ""
    }

    Respond in this EXACT JSON format:
    {
      "summary": "2-3 line simple summary of the career path",
      "currentSituation": "Simple assessment of where they are now",
      "targetCareer": "Clear description of the target career with salary expectations",
      "roadmap": [
        {
          "step": "Step number (1, 2, 3...)",
          "title": "Simple step title (e.g., 'Complete Class 12', 'Get Bachelor Degree')",
          "timeframe": "How long this step takes (e.g., '1 year', '6 months')",
          "description": "Simple explanation of what to do in this step",
          "actions": [
            "Specific action 1",
            "Specific action 2",
            "Specific action 3"
          ],
          "subjects": ["Subject 1", "Subject 2"] or null,
          "exams": [
            {
              "name": "Exam name",
              "date": "Month/Year",
              "website": "Official website",
              "importance": "Must have/Good to have/Optional"
            }
          ] or null,
          "colleges": ["College 1", "College 2"] or null,
          "skills": ["Skill 1", "Skill 2"] or null,
          "cost": "Estimated cost for this step",
          "tips": ["Tip 1", "Tip 2"]
        }
      ],
      "quickWins": ["Quick action 1", "Quick action 2", "Quick action 3"],
      "resources": [
        {
          "name": "Resource name",
          "type": "Website/Book/Course",
          "link": "URL if available",
          "description": "Why useful"
        }
      ],
      "timeline": "Total time needed to reach the goal",
      "alternatives": ["Alternative path 1", "Alternative path 2"],
      "nextSteps": ["Immediate next step 1", "Immediate next step 2"]
    }

    Keep everything SIMPLE and PRACTICAL. Avoid complex terms.
    `;
  };

  const generateRoadmap = async () => {
    if (!formData.desiredCareer || (!formData.currentClass && !formData.currentAge)) {
      setError("Please fill in your current status and desired career");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 4096,
        },
      });
      const prompt = generatePrompt();

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleanedText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      const jsonStart = cleanedText.indexOf("{");
      const jsonEnd = cleanedText.lastIndexOf("}") + 1;

      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        const jsonText = cleanedText.substring(jsonStart, jsonEnd);
        const roadmapData = JSON.parse(jsonText);
        setRoadmap(roadmapData);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError("Failed to generate roadmap. Please try again with different inputs.");
    } finally {
      setLoading(false);
    }
  };

  const StepCard = ({ step, index, total }) => (
    <div className="relative mb-12 group">
      <div className="flex items-start">
        <div className="flex flex-col items-center mr-6 relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border border-white/20 backdrop-blur-sm group-hover:scale-110 transition-all duration-500">
            <span className="relative z-10">{step.step}</span>
          </div>
          {index < total - 1 && (
            <div className="w-1 h-20 bg-white/20 mt-4 rounded-full"></div>
          )}
        </div>

        <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-3xl shadow-lg p-6 border border-white/10 hover:shadow-gray-500/25 transition-all duration-500 group-hover:shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-500/10 to-gray-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <StepContent step={step} />
          </div>
        </div>
      </div>
    </div>
  );

  const StepContent = ({ step }) => (
    <>
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">{step.title}</h3>
          <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
            {step.timeframe}
          </span>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-gray-200 mb-4 flex items-center text-lg">
          <span className="text-xl mr-3">✨</span>
          Action Steps:
        </h4>
        <div className="space-y-3">
          {step.actions.map((action, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <span className="text-gray-400 mt-1 text-lg">▶</span>
              <span className="text-gray-200 flex-1">{action}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {step.subjects && step.subjects.length > 0 && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-gray-200 mb-3 flex items-center">
              <span className="text-xl mr-2">📚</span>
              Subjects:
            </h4>
            <div className="flex flex-wrap gap-2">
              {step.subjects.map((subject, idx) => (
                <span key={idx} className="bg-white/10 text-gray-200 px-3 py-1 rounded-lg text-sm font-medium border border-white/20">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {step.skills && step.skills.length > 0 && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-gray-200 mb-3 flex items-center">
              <span className="text-xl mr-2">💡</span>
              Skills:
            </h4>
            <div className="flex flex-wrap gap-2">
              {step.skills.map((skill, idx) => (
                <span key={idx} className="bg-white/10 text-gray-200 px-3 py-1 rounded-lg text-sm font-medium border border-white/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {step.exams && step.exams.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-200 mb-4 flex items-center text-lg">
            <span className="text-xl mr-3">📝</span>
            Important Exams:
          </h4>
          <div className="space-y-4">
            {step.exams.map((exam, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                  <h5 className="font-bold text-gray-200 text-lg">{exam.name}</h5>
                  <div className="flex flex-col lg:items-end mt-2 lg:mt-0">
                    <span className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">{exam.date}</span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full mt-2 ${
                        exam.importance === "Must have"
                          ? "bg-red-500/20 text-red-300 border border-red-400/30"
                          : exam.importance === "Good to have"
                          ? "bg-orange-500/20 text-orange-300 border border-orange-400/30"
                          : "bg-green-500/20 text-green-300 border border-green-400/30"
                      }`}
                    >
                      {exam.importance}
                    </span>
                  </div>
                </div>
                {exam.website && (
                  <a
                    href={exam.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white text-sm underline transition-colors duration-300"
                  >
                    Official Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {step.colleges && step.colleges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-200 mb-4 flex items-center text-lg">
            <span className="text-xl mr-3">🏫</span>
            Recommended Colleges:
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {step.colleges.map((college, idx) => (
              <div key={idx} className="bg-white/5 p-3 rounded-xl text-gray-200 border border-white/10 hover:border-white/20 transition-all duration-300">
                {college}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {step.cost && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-gray-200 mb-3 flex items-center">
              <span className="text-xl mr-2">💰</span>
              Estimated Cost:
            </h4>
            <p className="text-gray-200 bg-white/10 p-3 rounded-lg border border-white/20">{step.cost}</p>
          </div>
        )}

        {step.tips && step.tips.length > 0 && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-gray-200 mb-3 flex items-center">
              <span className="text-xl mr-2">💡</span>
              Pro Tips:
            </h4>
            <ul className="space-y-2">
              {step.tips.map((tip, idx) => (
                <li key={idx} className="text-gray-200 text-sm flex items-start">
                  <span className="text-gray-400 mr-2 mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex items-center justify-center pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "15px 15px",
            animation: "twinkle 4s infinite ease-in-out",
          }}
        ></div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-20 animate-particle"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className={`relative mt-10 mb-10 z-10 max-w-6xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-gray-500/25 transition-all duration-500 transform ${isMounted ? "animate-formEntrance" : "opacity-0 translate-y-10"}`}>
        <h1 className="text-5xl font-bold text-center text-white mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text animate-fadeInUp">
          AI Career Path Generator
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-4xl mx-auto mb-12 animate-fadeInUp">
          Get a comprehensive, step-by-step roadmap for your dream career. Powered by advanced AI and designed for the Indian education system.
        </p>

        {/* Form */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8 animate-fadeInUp">Tell us about yourself</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Current Status
              </label>
              <select
                name="workingStatus"
                value={formData.workingStatus}
                onChange={handleInputChange}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              >
                <option value="student" className="bg-gray-700 text-white">School Student</option>
                <option value="graduate" className="bg-gray-700 text-white">College Student/Graduate</option>
                <option value="working" className="bg-gray-700 text-white">Working Professional</option>
              </select>
            </div>

            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                {formData.workingStatus === "student" ? "Current Class" : "Age"}
              </label>
              {formData.workingStatus === "student" ? (
                <select
                  name="currentClass"
                  value={formData.currentClass}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                >
                  <option value="" className="bg-gray-700 text-white">Select Class</option>
                  <option value="9" className="bg-gray-700 text-white">Class 9</option>
                  <option value="10" className="bg-gray-700 text-white">Class 10</option>
                  <option value="11" className="bg-gray-700 text-white">Class 11</option>
                  <option value="12" className="bg-gray-700 text-white">Class 12</option>
                </select>
              ) : (
                <input
                  type="number"
                  name="currentAge"
                  value={formData.currentAge}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                />
              )}
            </div>

            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Academic Performance
              </label>
              <select
                name="academicPerformance"
                value={formData.academicPerformance}
                onChange={handleInputChange}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              >
                <option value="" className="bg-gray-700 text-white">Select Performance</option>
                <option value="excellent" className="bg-gray-700 text-white">Excellent (90%+)</option>
                <option value="good" className="bg-gray-700 text-white">Good (75-90%)</option>
                <option value="average" className="bg-gray-700 text-white">Average (60-75%)</option>
                <option value="below-average" className="bg-gray-700 text-white">Below Average (50-60%)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Desired Career
              </label>
              <input
                type="text"
                name="desiredCareer"
                value={formData.desiredCareer}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer, Doctor, IAS Officer"
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              />
            </div>

            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Mumbai, Delhi, Bangalore"
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              />
            </div>
          </div>

          {(formData.workingStatus === "graduate" || formData.workingStatus === "working") && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group relative">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                  {formData.workingStatus === "graduate" ? "Current College/University" : "Current Job/Company"}
                </label>
                <input
                  type="text"
                  name={formData.workingStatus === "graduate" ? "currentCollege" : "currentJob"}
                  value={formData.workingStatus === "graduate" ? formData.currentCollege : formData.currentJob}
                  onChange={handleInputChange}
                  placeholder={
                    formData.workingStatus === "graduate"
                      ? "e.g., Delhi University, IIT Delhi"
                      : "e.g., Software Developer at TCS"
                  }
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                />
              </div>

              <div className="group relative">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                  {formData.workingStatus === "graduate" ? "Current Course/Stream" : "Work Experience"}
                </label>
                <input
                  type="text"
                  name={formData.workingStatus === "graduate" ? "currentSubjects" : "workExperience"}
                  value={formData.workingStatus === "graduate" ? formData.currentSubjects : formData.workExperience}
                  onChange={handleInputChange}
                  placeholder={
                    formData.workingStatus === "graduate"
                      ? "e.g., B.Tech CSE, B.Com, BA Economics"
                      : "e.g., 2 years in IT, 5 years in Marketing"
                  }
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                />
              </div>
            </div>
          )}

          {formData.workingStatus === "student" && (
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Current Subjects/Stream
              </label>
              <input
                type="text"
                name="currentSubjects"
                value={formData.currentSubjects}
                onChange={handleInputChange}
                placeholder="e.g., PCM, PCB, Commerce, Arts"
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Interests & Strengths
              </label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="e.g., Coding, Mathematics, Public Speaking"
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              />
            </div>

            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Budget
              </label>
              <select
                name="financialConstraints"
                value={formData.financialConstraints}
                onChange={handleInputChange}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              >
                <option value="" className="bg-gray-700 text-white">Select Budget</option>
                <option value="no-constraints" className="bg-gray-700 text-white">No Budget Issues</option>
                <option value="moderate" className="bg-gray-700 text-white">Moderate Budget (5-15 Lakhs)</option>
                <option value="limited" className="bg-gray-700 text-white">Limited Budget (2-5 Lakhs)</option>
                <option value="very-limited" className="bg-gray-700 text-white">Very Limited (2 Lakhs)</option>
              </select>
            </div>
          </div>

          <div className="group relative">
            <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
              Specific Goals or Questions
            </label>
            <textarea
              name="specificGoals"
              value={formData.specificGoals}
              onChange={handleInputChange}
              placeholder="Any specific goals, concerns, or questions about your career path..."
              rows="4"
              className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10 resize-none"
            ></textarea>
          </div>

          {error && (
            <p className="text-red-400 text-center font-medium animate-fadeInUp">{error}</p>
          )}

          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="group relative w-full py-4 px-6 bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)' }}></div>
            <div className="relative flex items-center justify-center space-x-2">
              {loading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Creating Your Roadmap...</span>
                </>
              ) : (
                <span>Generate My Career Roadmap</span>
              )}
            </div>
          </button>
        </div>

        {/* Roadmap Display */}
        {roadmap && (
          <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:shadow-gray-500/25 transition-all duration-500">
            <h2 className="text-4xl font-bold text-center text-white mb-12 animate-fadeInUp">
              Your Career Roadmap
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-3 flex items-center">
                  <span className="text-2xl mr-3">📍</span>
                  Where You Are Now
                </h3>
                <p className="text-gray-300">{roadmap.currentSituation}</p>
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-3 flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Your Target Career
                </h3>
                <p className="text-gray-300">{roadmap.targetCareer}</p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center text-white mb-8 animate-fadeInUp">
                📅 Step-by-Step Plan ({roadmap.timeline})
              </h3>
              <div className="relative">
                {roadmap.roadmap.map((step, index) => (
                  <StepCard key={index} step={step} index={index} total={roadmap.roadmap.length} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
                  <span className="text-2xl mr-3">⚡</span>
                  Quick Wins (Start Today!)
                </h3>
                <ul className="space-y-3">
                  {roadmap.quickWins.map((win, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">✓</span>
                      {win}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🚀</span>
                  Immediate Next Steps
                </h3>
                <ul className="space-y-3">
                  {roadmap.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">▶</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  Useful Resources
                </h3>
                <div className="space-y-4">
                  {roadmap.resources.map((resource, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                      <h4 className="font-medium text-gray-200 text-sm">{resource.name}</h4>
                      <p className="text-gray-300 text-xs mb-2">{resource.description}</p>
                      {resource.link && (
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white text-xs underline transition-colors duration-300"
                        >
                          Visit →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🔄</span>
                  Alternative Paths
                </h3>
                <ul className="space-y-3">
                  {roadmap.alternatives.map((alt, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">•</span>
                      {alt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
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

        @keyframes particle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-200vh) scale(1);
            opacity: 0;
          }
        }

        @keyframes formEntrance {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(50px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-particle {
          animation: particle linear infinite;
        }

        .animate-formEntrance {
          animation: formEntrance 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default CareerPath;