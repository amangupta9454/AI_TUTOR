import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

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
  })

  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_GEMINI_API_KEY)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generatePrompt = () => {
    return `
    You are an expert career counselor with 20+ years of experience in the Indian education system. You understand CBSE, ICSE, State Boards, entrance exams, and career paths across all fields including Engineering, Medical, Civil Services, Commerce, Arts, Law, Defense, etc.

    Create a DETAILED, ACTIONABLE, and REALISTIC career roadmap for:

    STUDENT PROFILE:
    - Current Status: ${formData.workingStatus === "student" ? `Class ${formData.currentClass}` : "Working Professional"}
    - Desired Career: ${formData.desiredCareer}
    - Current Subjects/Stream: ${formData.currentSubjects}
    - Interests & Strengths: ${formData.interests}
    - Location: ${formData.location}
    - Age: ${formData.currentAge}
    - Academic Performance: ${formData.academicPerformance}
    - Family Background: ${formData.familyBackground}
    - Financial Constraints: ${formData.financialConstraints}
    - Specific Goals/Concerns: ${formData.specificGoals}

    IMPORTANT INSTRUCTIONS:
    1. Be SPECIFIC to Indian education system (CBSE/ICSE/State boards)
    2. Include EXACT exam names, dates, and official websites
    3. Mention specific colleges/universities for each level
    4. Include backup plans and alternative paths
    5. Consider financial aspects and scholarships
    6. Provide realistic timelines with months/years
    7. Include skill development and extracurricular activities
    8. Mention internship opportunities and industry connections

    Respond ONLY in this JSON format (ensure valid JSON):
    {
      "currentStatus": "Detailed assessment of current academic/professional position with strengths and areas to improve",
      "careerOverview": "Comprehensive overview of the chosen career field including job prospects, salary ranges, growth opportunities in India",
      "eligibilityRequirements": "Complete eligibility criteria including minimum marks, age limits, physical requirements if any",
      "timeline": [
        {
          "phase": "Specific phase name (e.g., Class 10 Board Preparation, Class 11-12 PCM, Bachelor's Degree, etc.)",
          "duration": "Exact time period (e.g., April 2024 - March 2025)",
          "currentAge": "Age during this phase",
          "subjects": ["Specific subjects with board/university names"],
          "activities": ["Detailed activities with specific actions to take"],
          "exams": [
            {
              "name": "Full exam name",
              "website": "Exact official website URL",
              "tentativeDate": "Specific months/dates when exam is conducted",
              "eligibility": "Detailed eligibility criteria",
              "preparationTime": "Recommended preparation duration",
              "difficulty": "Easy/Medium/Hard",
              "importance": "Critical/Important/Optional"
            }
          ],
          "skills": ["Specific technical and soft skills to develop"],
          "certifications": ["Relevant certifications to pursue"],
          "colleges": ["Specific colleges/universities to target"],
          "costs": "Estimated costs for this phase",
          "scholarships": ["Available scholarships and financial aid"],
          "tips": ["Actionable tips with specific steps"],
          "milestones": ["Key achievements to target in this phase"]
        }
      ],
      "keyMilestones": ["Major milestones with specific timelines"],
      "alternativePaths": ["Detailed alternative career options if primary path doesn't work"],
      "financialPlanning": {
        "totalCost": "Estimated total cost for entire journey",
        "scholarships": ["Major scholarships available"],
        "loanOptions": ["Education loan options"],
        "earningPotential": "Expected salary ranges at different career stages"
      },
      "industryInsights": {
        "currentTrends": ["Latest trends in the chosen field"],
        "futureScope": "Future prospects and growth areas",
        "topCompanies": ["Leading companies/organizations in this field"],
        "networkingTips": ["How to build professional network"]
      },
      "resources": [
        {
          "type": "Books/Websites/Apps",
          "name": "Resource name",
          "description": "Why this resource is useful",
          "link": "URL if available"
        }
      ],
      "monthlyActionPlan": "Specific month-by-month action plan for the next 12 months",
      "successStories": ["Brief inspiring success stories of people in this field"],
      "commonMistakes": ["Common mistakes to avoid with solutions"]
    }

    Make sure all information is:
    - Accurate and up-to-date for 2024-2025
    - Specific to Indian context
    - Actionable with clear next steps
    - Realistic and achievable
    - Include exact website URLs for exams and colleges
    `
  }

  const generateRoadmap = async () => {
    if (!formData.desiredCareer || (!formData.currentClass && !formData.currentAge)) {
      setError("Please fill in at least your current status and desired career")
      return
    }

    setLoading(true)
    setError("")

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      })
      const prompt = generatePrompt()

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Clean and extract JSON from the response
      const cleanedText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim()

      // Find the JSON object
      const jsonStart = cleanedText.indexOf("{")
      const jsonEnd = cleanedText.lastIndexOf("}") + 1

      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        const jsonText = cleanedText.substring(jsonStart, jsonEnd)
        const roadmapData = JSON.parse(jsonText)
        setRoadmap(roadmapData)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (err) {
      console.error("Error generating roadmap:", err)
      setError("Failed to generate roadmap. Please check your inputs and try again.")
    } finally {
      setLoading(false)
    }
  }

  const TimelineItem = ({ item, index, isLast }) => (
    <div className="relative flex items-start mb-12">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center mr-8 relative">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center">
          <span className="text-white text-xs font-bold">{index + 1}</span>
        </div>
        {!isLast && (
          <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 mt-2 rounded-full opacity-30"></div>
        )}
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ">
            {item.phase}
          </h3>
          <div className="flex flex-col items-end">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {item.duration}
            </span>
            {item.currentAge && <span className="text-gray-500 text-sm mt-1">Age: {item.currentAge}</span>}
          </div>
        </div>

        {/* Subjects */}
        {item.subjects && item.subjects.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-3 flex items-center">
              <span className="text-2xl mr-2">📚</span>
              Recommended Subjects:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {item.subjects.map((subject, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium border border-green-200"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        {item.activities && item.activities.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-3 flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              Key Activities:
            </h4>
            <div className="space-y-2">
              {item.activities.map((activity, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">▶</span>
                  <span className="text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exams */}
        {item.exams && item.exams.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-3 flex items-center">
              <span className="text-2xl mr-2">📝</span>
              Important Exams:
            </h4>
            <div className="space-y-4">
              {item.exams.map((exam, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border-l-4 border-yellow-400 shadow-md"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-bold text-gray-800 text-lg">{exam.name}</h5>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">{exam.tentativeDate}</span>
                      {exam.difficulty && (
                        <span
                          className={`text-xs px-2 py-1 rounded mt-1 ${
                            exam.difficulty === "Hard"
                              ? "bg-red-100 text-red-800"
                              : exam.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {exam.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{exam.eligibility}</p>
                  {exam.preparationTime && (
                    <p className="text-sm text-blue-700 mb-2">
                      <strong>Preparation Time:</strong> {exam.preparationTime}
                    </p>
                  )}
                  {exam.website && (
                    <a
                      href={exam.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm underline transition-colors"
                    >
                      Official Website →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills and Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {item.skills && item.skills.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                <span className="text-2xl mr-2">💡</span>
                Skills to Develop:
              </h4>
              <div className="space-y-2">
                {item.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.certifications && item.certifications.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                <span className="text-2xl mr-2">🏆</span>
                Certifications:
              </h4>
              <div className="space-y-2">
                {item.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Colleges and Costs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {item.colleges && item.colleges.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                <span className="text-2xl mr-2">🏫</span>
                Target Colleges:
              </h4>
              <ul className="space-y-1">
                {item.colleges.map((college, idx) => (
                  <li key={idx} className="text-gray-700 text-sm">
                    • {college}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.costs && (
            <div>
              <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                <span className="text-2xl mr-2">💰</span>
                Estimated Costs:
              </h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{item.costs}</p>
            </div>
          )}
        </div>

        {/* Tips and Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {item.tips && item.tips.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                <span className="text-2xl mr-2">💭</span>
                Pro Tips:
              </h4>
              <ul className="space-y-2">
                {item.tips.map((tip, idx) => (
                  <li key={idx} className="text-gray-700 italic text-sm flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.milestones && item.milestones.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Key Milestones:
              </h4>
              <ul className="space-y-2">
                {item.milestones.map((milestone, idx) => (
                  <li key={idx} className="text-gray-700 text-sm flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">★</span>
                    {milestone}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-950 py-12 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            🚀 AI Career Path Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get a comprehensive, personalized roadmap for your dream career in the Indian education system. Powered by
            advanced AI to provide detailed guidance from Class 9 to professional success.
          </p>
        </div>

        {/* Enhanced Form */}
        <div
  className="bg-gradient-to-br from-white/10 to-green-900/10 backdrop-blur-md rounded-xl shadow-md p-6 mb-8 border border-green-500/70 transition-all duration-300 hover:shadow-lg hover:border-green-600 hover:bg-gradient-to-br hover:from-white/20 hover:to-green-900/20"
>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about yourself</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Current Status</label>
              <select
                name="workingStatus"
                value={formData.workingStatus}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <option value="student">Student</option>
                <option value="working">Working Professional</option>
                <option value="graduate">Recent Graduate</option>
                <option value="dropout">School/College Dropout</option>
              </select>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {formData.workingStatus === "student" ? "Current Class" : "Current Age"}
              </label>
              {formData.workingStatus === "student" ? (
                <select
                  name="currentClass"
                  value={formData.currentClass}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                >
                  <option value="">Select Class</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="graduation">Graduation (1st-3rd Year)</option>
                  <option value="final-year">Final Year Graduation</option>
                  <option value="postgraduation">Post Graduation</option>
                </select>
              ) : (
                <input
                  type="number"
                  name="currentAge"
                  value={formData.currentAge}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              )}
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Academic Performance</label>
              <select
                name="academicPerformance"
                value={formData.academicPerformance}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <option value="">Select Performance</option>
                <option value="excellent">Excellent (90%+)</option>
                <option value="good">Good (75-90%)</option>
                <option value="average">Average (60-75%)</option>
                <option value="below-average">Below Average (50-60%)</option>
                <option value="struggling">Struggling (&lt;50%)</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Desired Career Field</label>
              <input
                type="text"
                name="desiredCareer"
                value={formData.desiredCareer}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer, Doctor, IAS Officer, Data Scientist, Chartered Accountant"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Current Subjects/Stream</label>
              <input
                type="text"
                name="currentSubjects"
                value={formData.currentSubjects}
                onChange={handleInputChange}
                placeholder="e.g., PCM, PCB, Commerce, Arts, Computer Science"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Location (State/City)</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Mumbai, Delhi, Bangalore, Chennai"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Family Background</label>
              <select
                name="familyBackground"
                value={formData.familyBackground}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <option value="">Select Background</option>
                <option value="business">Business Family</option>
                <option value="service">Service Class</option>
                <option value="professional">Professional (Doctor/Engineer/Lawyer)</option>
                <option value="farmer">Agricultural Background</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Interests & Strengths</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="e.g., Coding, Problem Solving, Public Speaking, Mathematics, Biology, Art"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Financial Constraints</label>
              <select
                name="financialConstraints"
                value={formData.financialConstraints}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <option value="">Select Budget</option>
                <option value="no-constraints">No Major Constraints</option>
                <option value="moderate">Moderate Budget (5-15 Lakhs)</option>
                <option value="limited">Limited Budget (2-5 Lakhs)</option>
                <option value="very-limited">Very Limited Budget (&lt;2 Lakhs)</option>
                <option value="scholarship-needed">Need Scholarships/Free Education</option>
              </select>
            </div>

            <div className="lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Specific Goals, Concerns, or Questions
              </label>
              <textarea
                name="specificGoals"
                value={formData.specificGoals}
                onChange={handleInputChange}
                placeholder="Share any specific goals, concerns about your career choice, family expectations, or questions you have..."
                rows="4"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
              ></textarea>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              {error}
            </div>
          )}

          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Generating Your Personalized Roadmap...
              </>
            ) : (
              <>
                <span className="text-2xl mr-3">🚀</span>
                Generate My Career Roadmap
              </>
            )}
          </button>
        </div>

        {/* Enhanced Roadmap Display */}
        {roadmap && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10">
              Your Personalized Career Roadmap
            </h2>

            {/* Current Status */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl mb-8 border-l-4 border-blue-500 shadow-lg">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="text-3xl mr-3">📍</span>
                Current Status Assessment
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">{roadmap.currentStatus}</p>
            </div>

            {/* Career Overview */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl mb-8 border-l-4 border-green-500 shadow-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <span className="text-3xl mr-3">🎯</span>
                Career Field Overview
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">{roadmap.careerOverview}</p>
            </div>

            {/* Eligibility Requirements */}
            {roadmap.eligibilityRequirements && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl mb-8 border-l-4 border-orange-500 shadow-lg">
                <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                  <span className="text-3xl mr-3">📋</span>
                  Eligibility Requirements
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">{roadmap.eligibilityRequirements}</p>
              </div>
            )}

            {/* Timeline */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
                <span className="text-4xl mr-3">📅</span>
                Your Journey Timeline
              </h3>
              <div className="relative">
                {roadmap.timeline &&
                  roadmap.timeline.map((item, index) => (
                    <TimelineItem
                      key={index}
                      item={item}
                      index={index}
                      isLast={index === roadmap.timeline.length - 1}
                    />
                  ))}
              </div>
            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Financial Planning */}
              {roadmap.financialPlanning && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-500 shadow-lg">
                  <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">💰</span>
                    Financial Planning
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>Total Cost:</strong> {roadmap.financialPlanning.totalCost}
                    </p>
                    <p>
                      <strong>Earning Potential:</strong> {roadmap.financialPlanning.earningPotential}
                    </p>
                    {roadmap.financialPlanning.scholarships && (
                      <div>
                        <strong>Scholarships:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {roadmap.financialPlanning.scholarships.map((scholarship, idx) => (
                            <li key={idx} className="text-sm">
                              {scholarship}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Industry Insights */}
              {roadmap.industryInsights && (
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-teal-500 shadow-lg">
                  <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🏭</span>
                    Industry Insights
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>Future Scope:</strong> {roadmap.industryInsights.futureScope}
                    </p>
                    {roadmap.industryInsights.topCompanies && (
                      <div>
                        <strong>Top Companies:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {roadmap.industryInsights.topCompanies.map((company, idx) => (
                            <li key={idx} className="text-sm">
                              {company}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Monthly Action Plan */}
            {roadmap.monthlyActionPlan && (
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-2xl mb-8 border-l-4 border-indigo-500 shadow-lg">
                <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
                  <span className="text-3xl mr-3">📅</span>
                  12-Month Action Plan
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">{roadmap.monthlyActionPlan}</p>
              </div>
            )}

            {/* Success Stories and Common Mistakes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {roadmap.successStories && roadmap.successStories.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-lime-50 p-6 rounded-2xl border-l-4 border-green-500 shadow-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🌟</span>
                    Success Stories
                  </h3>
                  <ul className="space-y-2">
                    {roadmap.successStories.map((story, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">
                        {story}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {roadmap.commonMistakes && roadmap.commonMistakes.length > 0 && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-l-4 border-red-500 shadow-lg">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">⚠️</span>
                    Common Mistakes to Avoid
                  </h3>
                  <ul className="space-y-2">
                    {roadmap.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareerPath;


