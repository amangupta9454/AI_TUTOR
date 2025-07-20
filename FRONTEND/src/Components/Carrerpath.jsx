// import { useState } from "react"
// import { GoogleGenerativeAI } from "@google/generative-ai"

// const CareerPath = () => {
//   const [formData, setFormData] = useState({
//     currentClass: "",
//     desiredCareer: "",
//     currentSubjects: "",
//     interests: "",
//     location: "",
//     specificGoals: "",
//     currentAge: "",
//     workingStatus: "student",
//     academicPerformance: "",
//     familyBackground: "",
//     financialConstraints: "",
//   })

//   const [roadmap, setRoadmap] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const genAI = new GoogleGenerativeAI('AIzaSyDgYVIkudqdxLcRBQfOSAluvuZAVqmrK3U')

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const generatePrompt = () => {
//     return `
//     You are an expert career counselor with 20+ years of experience in the Indian education system. You understand CBSE, ICSE, State Boards, entrance exams, and career paths across all fields including Engineering, Medical, Civil Services, Commerce, Arts, Law, Defense, etc.

//     Create a DETAILED, ACTIONABLE, and REALISTIC career roadmap for:

//     STUDENT PROFILE:
//     - Current Status: ${formData.workingStatus === "student" ? `Class ${formData.currentClass}` : "Working Professional"}
//     - Desired Career: ${formData.desiredCareer}
//     - Current Subjects/Stream: ${formData.currentSubjects}
//     - Interests & Strengths: ${formData.interests}
//     - Location: ${formData.location}
//     - Age: ${formData.currentAge}
//     - Academic Performance: ${formData.academicPerformance}
//     - Family Background: ${formData.familyBackground}
//     - Financial Constraints: ${formData.financialConstraints}
//     - Specific Goals/Concerns: ${formData.specificGoals}

//     IMPORTANT INSTRUCTIONS:
//     1. Be SPECIFIC to Indian education system (CBSE/ICSE/State boards)
//     2. Include EXACT exam names, dates, and official websites
//     3. Mention specific colleges/universities for each level
//     4. Include backup plans and alternative paths
//     5. Consider financial aspects and scholarships
//     6. Provide realistic timelines with months/years
//     7. Include skill development and extracurricular activities
//     8. Mention internship opportunities and industry connections

//     Respond ONLY in this JSON format (ensure valid JSON):
//     {
//       "currentStatus": "Detailed assessment of current academic/professional position with strengths and areas to improve",
//       "careerOverview": "Comprehensive overview of the chosen career field including job prospects, salary ranges, growth opportunities in India",
//       "eligibilityRequirements": "Complete eligibility criteria including minimum marks, age limits, physical requirements if any",
//       "timeline": [
//         {
//           "phase": "Specific phase name (e.g., Class 10 Board Preparation, Class 11-12 PCM, Bachelor's Degree, etc.)",
//           "duration": "Exact time period (e.g., April 2024 - March 2025)",
//           "currentAge": "Age during this phase",
//           "subjects": ["Specific subjects with board/university names"],
//           "activities": ["Detailed activities with specific actions to take"],
//           "exams": [
//             {
//               "name": "Full exam name",
//               "website": "Exact official website URL",
//               "tentativeDate": "Specific months/dates when exam is conducted",
//               "eligibility": "Detailed eligibility criteria",
//               "preparationTime": "Recommended preparation duration",
//               "difficulty": "Easy/Medium/Hard",
//               "importance": "Critical/Important/Optional"
//             }
//           ],
//           "skills": ["Specific technical and soft skills to develop"],
//           "certifications": ["Relevant certifications to pursue"],
//           "colleges": ["Specific colleges/universities to target"],
//           "costs": "Estimated costs for this phase",
//           "scholarships": ["Available scholarships and financial aid"],
//           "tips": ["Actionable tips with specific steps"],
//           "milestones": ["Key achievements to target in this phase"]
//         }
//       ],
//       "keyMilestones": ["Major milestones with specific timelines"],
//       "alternativePaths": ["Detailed alternative career options if primary path doesn't work"],
//       "financialPlanning": {
//         "totalCost": "Estimated total cost for entire journey",
//         "scholarships": ["Major scholarships available"],
//         "loanOptions": ["Education loan options"],
//         "earningPotential": "Expected salary ranges at different career stages"
//       },
//       "industryInsights": {
//         "currentTrends": ["Latest trends in the chosen field"],
//         "futureScope": "Future prospects and growth areas",
//         "topCompanies": ["Leading companies/organizations in this field"],
//         "networkingTips": ["How to build professional network"]
//       },
//       "resources": [
//         {
//           "type": "Books/Websites/Apps",
//           "name": "Resource name",
//           "description": "Why this resource is useful",
//           "link": "URL if available"
//         }
//       ],
//       "monthlyActionPlan": "Specific month-by-month action plan for the next 12 months",
//       "successStories": ["Brief inspiring success stories of people in this field"],
//       "commonMistakes": ["Common mistakes to avoid with solutions"]
//     }

//     Make sure all information is:
//     - Accurate and up-to-date for 2024-2025
//     - Specific to Indian context
//     - Actionable with clear next steps
//     - Realistic and achievable
//     - Include exact website URLs for exams and colleges
//     `
//   }

//   const generateRoadmap = async () => {
//     if (!formData.desiredCareer || (!formData.currentClass && !formData.currentAge)) {
//       setError("Please fill in at least your current status and desired career")
//       return
//     }

//     setLoading(true)
//     setError("")

//     try {
//       const model = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//         generationConfig: {
//           temperature: 0.7,
//           topK: 40,
//           topP: 0.95,
//           maxOutputTokens: 8192,
//         },
//       })
//       const prompt = generatePrompt()

//       const result = await model.generateContent(prompt)
//       const response = await result.response
//       const text = response.text()

//       // Clean and extract JSON from the response
//       const cleanedText = text
//         .replace(/```json\n?/g, "")
//         .replace(/```\n?/g, "")
//         .trim()

//       // Find the JSON object
//       const jsonStart = cleanedText.indexOf("{")
//       const jsonEnd = cleanedText.lastIndexOf("}") + 1

//       if (jsonStart !== -1 && jsonEnd > jsonStart) {
//         const jsonText = cleanedText.substring(jsonStart, jsonEnd)
//         const roadmapData = JSON.parse(jsonText)
//         setRoadmap(roadmapData)
//       } else {
//         throw new Error("Invalid response format")
//       }
//     } catch (err) {
//       console.error("Error generating roadmap:", err)
//       setError("Failed to generate roadmap. Please check your inputs and try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const TimelineItem = ({ item, index, isLast }) => (
//     <div className="relative flex items-start mb-12">
//       {/* Timeline line and dot */}
//       <div className="flex flex-col items-center mr-8 relative">
//         <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center">
//           <span className="text-white text-xs font-bold">{index + 1}</span>
//         </div>
//         {!isLast && (
//           <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 mt-2 rounded-full opacity-30"></div>
//         )}
//       </div>

//       {/* Content Card */}
//       <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ">
//             {item.phase}
//           </h3>
//           <div className="flex flex-col items-end">
//             <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
//               {item.duration}
//             </span>
//             {item.currentAge && <span className="text-gray-500 text-sm mt-1">Age: {item.currentAge}</span>}
//           </div>
//         </div>

//         {/* Subjects */}
//         {item.subjects && item.subjects.length > 0 && (
//           <div className="mb-6">
//             <h4 className="font-bold text-gray-700 mb-3 flex items-center">
//               <span className="text-2xl mr-2">📚</span>
//               Recommended Subjects:
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//               {item.subjects.map((subject, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium border border-green-200"
//                 >
//                   {subject}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Activities */}
//         {item.activities && item.activities.length > 0 && (
//           <div className="mb-6">
//             <h4 className="font-bold text-gray-700 mb-3 flex items-center">
//               <span className="text-2xl mr-2">🎯</span>
//               Key Activities:
//             </h4>
//             <div className="space-y-2">
//               {item.activities.map((activity, idx) => (
//                 <div key={idx} className="flex items-start">
//                   <span className="text-blue-500 mr-2 mt-1">▶</span>
//                   <span className="text-gray-700">{activity}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Exams */}
//         {item.exams && item.exams.length > 0 && (
//           <div className="mb-6">
//             <h4 className="font-bold text-gray-700 mb-3 flex items-center">
//               <span className="text-2xl mr-2">📝</span>
//               Important Exams:
//             </h4>
//             <div className="space-y-4">
//               {item.exams.map((exam, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border-l-4 border-yellow-400 shadow-md"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <h5 className="font-bold text-gray-800 text-lg">{exam.name}</h5>
//                     <div className="flex flex-col items-end">
//                       <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">{exam.tentativeDate}</span>
//                       {exam.difficulty && (
//                         <span
//                           className={`text-xs px-2 py-1 rounded mt-1 ${
//                             exam.difficulty === "Hard"
//                               ? "bg-red-100 text-red-800"
//                               : exam.difficulty === "Medium"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-green-100 text-green-800"
//                           }`}
//                         >
//                           {exam.difficulty}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <p className="text-gray-700 mb-2">{exam.eligibility}</p>
//                   {exam.preparationTime && (
//                     <p className="text-sm text-blue-700 mb-2">
//                       <strong>Preparation Time:</strong> {exam.preparationTime}
//                     </p>
//                   )}
//                   {exam.website && (
//                     <a
//                       href={exam.website}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm underline transition-colors"
//                     >
//                       Official Website →
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Skills and Certifications */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {item.skills && item.skills.length > 0 && (
//             <div>
//               <h4 className="font-bold text-gray-700 mb-3 flex items-center">
//                 <span className="text-2xl mr-2">💡</span>
//                 Skills to Develop:
//               </h4>
//               <div className="space-y-2">
//                 {item.skills.map((skill, idx) => (
//                   <span
//                     key={idx}
//                     className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {item.certifications && item.certifications.length > 0 && (
//             <div>
//               <h4 className="font-bold text-gray-700 mb-3 flex items-center">
//                 <span className="text-2xl mr-2">🏆</span>
//                 Certifications:
//               </h4>
//               <div className="space-y-2">
//                 {item.certifications.map((cert, idx) => (
//                   <span
//                     key={idx}
//                     className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
//                   >
//                     {cert}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Colleges and Costs */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {item.colleges && item.colleges.length > 0 && (
//             <div>
//               <h4 className="font-bold text-gray-700 mb-3 flex items-center">
//                 <span className="text-2xl mr-2">🏫</span>
//                 Target Colleges:
//               </h4>
//               <ul className="space-y-1">
//                 {item.colleges.map((college, idx) => (
//                   <li key={idx} className="text-gray-700 text-sm">
//                     • {college}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {item.costs && (
//             <div>
//               <h4 className="font-bold text-gray-700 mb-3 flex items-center">
//                 <span className="text-2xl mr-2">💰</span>
//                 Estimated Costs:
//               </h4>
//               <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{item.costs}</p>
//             </div>
//           )}
//         </div>

//         {/* Tips and Milestones */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {item.tips && item.tips.length > 0 && (
//             <div>
//               <h4 className="font-bold text-gray-700 mb-3 flex items-center">
//                 <span className="text-2xl mr-2">💭</span>
//                 Pro Tips:
//               </h4>
//               <ul className="space-y-2">
//                 {item.tips.map((tip, idx) => (
//                   <li key={idx} className="text-gray-700 italic text-sm flex items-start">
//                     <span className="text-green-500 mr-2 mt-1">✓</span>
//                     {tip}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {item.milestones && item.milestones.length > 0 && (
//             <div>
//               <h4 className="font-bold text-gray-700 mb-3 flex items-center">
//                 <span className="text-2xl mr-2">🎯</span>
//                 Key Milestones:
//               </h4>
//               <ul className="space-y-2">
//                 {item.milestones.map((milestone, idx) => (
//                   <li key={idx} className="text-gray-700 text-sm flex items-start">
//                     <span className="text-blue-500 mr-2 mt-1">★</span>
//                     {milestone}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-950 py-12 px-4 pt-24">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
//             🚀 AI Career Path Generator
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Get a comprehensive, personalized roadmap for your dream career in the Indian education system. Powered by
//             advanced AI to provide detailed guidance from Class 9 to professional success.
//           </p>
//         </div>

//         {/* Enhanced Form */}
//         <div
//   className="bg-gradient-to-br from-white/10 to-green-900/10 backdrop-blur-md rounded-xl shadow-md p-6 mb-8 border border-green-500/70 transition-all duration-300 hover:shadow-lg hover:border-green-600 hover:bg-gradient-to-br hover:from-white/20 hover:to-green-900/20"
// >
//           <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about yourself</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-1">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Current Status</label>
//               <select
//                 name="workingStatus"
//                 value={formData.workingStatus}
//                 onChange={handleInputChange}
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//               >
//                 <option value="student">Student</option>
//                 <option value="working">Working Professional</option>
//                 <option value="graduate">Recent Graduate</option>
//                 <option value="dropout">School/College Dropout</option>
//               </select>
//             </div>

//             <div className="lg:col-span-1">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">
//                 {formData.workingStatus === "student" ? "Current Class" : "Current Age"}
//               </label>
//               {formData.workingStatus === "student" ? (
//                 <select
//                   name="currentClass"
//                   value={formData.currentClass}
//                   onChange={handleInputChange}
//                   className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//                 >
//                   <option value="">Select Class</option>
//                   <option value="8">Class 8</option>
//                   <option value="9">Class 9</option>
//                   <option value="10">Class 10</option>
//                   <option value="11">Class 11</option>
//                   <option value="12">Class 12</option>
//                   <option value="graduation">Graduation (1st-3rd Year)</option>
//                   <option value="final-year">Final Year Graduation</option>
//                   <option value="postgraduation">Post Graduation</option>
//                 </select>
//               ) : (
//                 <input
//                   type="number"
//                   name="currentAge"
//                   value={formData.currentAge}
//                   onChange={handleInputChange}
//                   placeholder="Enter your age"
//                   className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//                 />
//               )}
//             </div>

//             <div className="lg:col-span-1">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Academic Performance</label>
//               <select
//                 name="academicPerformance"
//                 value={formData.academicPerformance}
//                 onChange={handleInputChange}
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//               >
//                 <option value="">Select Performance</option>
//                 <option value="excellent">Excellent (90%+)</option>
//                 <option value="good">Good (75-90%)</option>
//                 <option value="average">Average (60-75%)</option>
//                 <option value="below-average">Below Average (50-60%)</option>
//                 <option value="struggling">Struggling (&lt;50%)</option>
//               </select>
//             </div>

//             <div className="lg:col-span-2">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Desired Career Field</label>
//               <input
//                 type="text"
//                 name="desiredCareer"
//                 value={formData.desiredCareer}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Software Engineer, Doctor, IAS Officer, Data Scientist, Chartered Accountant"
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//               />
//             </div>

//             <div className="lg:col-span-1">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Current Subjects/Stream</label>
//               <input
//                 type="text"
//                 name="currentSubjects"
//                 value={formData.currentSubjects}
//                 onChange={handleInputChange}
//                 placeholder="e.g., PCM, PCB, Commerce, Arts, Computer Science"
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//               />
//             </div>

//             <div className="lg:col-span-1">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Location (State/City)</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Mumbai, Delhi, Bangalore, Chennai"
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//               />
//             </div>

//             <div className="lg:col-span-1">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Family Background</label>
//               <select
//                 name="familyBackground"
//                 value={formData.familyBackground}
//                 onChange={handleInputChange}
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//               >
//                 <option value="">Select Background</option>
//                 <option value="business">Business Family</option>
//                 <option value="service">Service Class</option>
//                 <option value="professional">Professional (Doctor/Engineer/Lawyer)</option>
//                 <option value="farmer">Agricultural Background</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div className="lg:col-span-2">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Interests & Strengths</label>
//               <input
//                 type="text"
//                 name="interests"
//                 value={formData.interests}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Coding, Problem Solving, Public Speaking, Mathematics, Biology, Art"
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//               />
//             </div>

//             <div className="lg:col-span-1">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Financial Constraints</label>
//               <select
//                 name="financialConstraints"
//                 value={formData.financialConstraints}
//                 onChange={handleInputChange}
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//               >
//                 <option value="">Select Budget</option>
//                 <option value="no-constraints">No Major Constraints</option>
//                 <option value="moderate">Moderate Budget (5-15 Lakhs)</option>
//                 <option value="limited">Limited Budget (2-5 Lakhs)</option>
//                 <option value="very-limited">Very Limited Budget (&lt;2 Lakhs)</option>
//                 <option value="scholarship-needed">Need Scholarships/Free Education</option>
//               </select>
//             </div>

//             <div className="lg:col-span-3">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">
//                 Specific Goals, Concerns, or Questions
//               </label>
//               <textarea
//                 name="specificGoals"
//                 value={formData.specificGoals}
//                 onChange={handleInputChange}
//                 placeholder="Share any specific goals, concerns about your career choice, family expectations, or questions you have..."
//                 rows="4"
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
//               ></textarea>
//             </div>
//           </div>

//           {error && (
//             <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl flex items-center">
//               <span className="text-2xl mr-3">⚠️</span>
//               {error}
//             </div>
//           )}

//           <button
//             onClick={generateRoadmap}
//             disabled={loading}
//             className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
//                 Generating Your Personalized Roadmap...
//               </>
//             ) : (
//               <>
//                 <span className="text-2xl mr-3">🚀</span>
//                 Generate My Career Roadmap
//               </>
//             )}
//           </button>
//         </div>

//         {/* Enhanced Roadmap Display */}
//         {roadmap && (
//           <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
//             <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10">
//               Your Personalized Career Roadmap
//             </h2>

//             {/* Current Status */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl mb-8 border-l-4 border-blue-500 shadow-lg">
//               <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
//                 <span className="text-3xl mr-3">📍</span>
//                 Current Status Assessment
//               </h3>
//               <p className="text-gray-700 text-lg leading-relaxed">{roadmap.currentStatus}</p>
//             </div>

//             {/* Career Overview */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl mb-8 border-l-4 border-green-500 shadow-lg">
//               <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
//                 <span className="text-3xl mr-3">🎯</span>
//                 Career Field Overview
//               </h3>
//               <p className="text-gray-700 text-lg leading-relaxed">{roadmap.careerOverview}</p>
//             </div>

//             {/* Eligibility Requirements */}
//             {roadmap.eligibilityRequirements && (
//               <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl mb-8 border-l-4 border-orange-500 shadow-lg">
//                 <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
//                   <span className="text-3xl mr-3">📋</span>
//                   Eligibility Requirements
//                 </h3>
//                 <p className="text-gray-700 text-lg leading-relaxed">{roadmap.eligibilityRequirements}</p>
//               </div>
//             )}

//             {/* Timeline */}
//             <div className="mb-12">
//               <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
//                 <span className="text-4xl mr-3">📅</span>
//                 Your Journey Timeline
//               </h3>
//               <div className="relative">
//                 {roadmap.timeline &&
//                   roadmap.timeline.map((item, index) => (
//                     <TimelineItem
//                       key={index}
//                       item={item}
//                       index={index}
//                       isLast={index === roadmap.timeline.length - 1}
//                     />
//                   ))}
//               </div>
//             </div>

//             {/* Additional Sections */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//               {/* Financial Planning */}
//               {roadmap.financialPlanning && (
//                 <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-500 shadow-lg">
//                   <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
//                     <span className="text-2xl mr-2">💰</span>
//                     Financial Planning
//                   </h3>
//                   <div className="space-y-3 text-gray-700">
//                     <p>
//                       <strong>Total Cost:</strong> {roadmap.financialPlanning.totalCost}
//                     </p>
//                     <p>
//                       <strong>Earning Potential:</strong> {roadmap.financialPlanning.earningPotential}
//                     </p>
//                     {roadmap.financialPlanning.scholarships && (
//                       <div>
//                         <strong>Scholarships:</strong>
//                         <ul className="list-disc list-inside mt-1">
//                           {roadmap.financialPlanning.scholarships.map((scholarship, idx) => (
//                             <li key={idx} className="text-sm">
//                               {scholarship}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Industry Insights */}
//               {roadmap.industryInsights && (
//                 <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-teal-500 shadow-lg">
//                   <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center">
//                     <span className="text-2xl mr-2">🏭</span>
//                     Industry Insights
//                   </h3>
//                   <div className="space-y-3 text-gray-700">
//                     <p>
//                       <strong>Future Scope:</strong> {roadmap.industryInsights.futureScope}
//                     </p>
//                     {roadmap.industryInsights.topCompanies && (
//                       <div>
//                         <strong>Top Companies:</strong>
//                         <ul className="list-disc list-inside mt-1">
//                           {roadmap.industryInsights.topCompanies.map((company, idx) => (
//                             <li key={idx} className="text-sm">
//                               {company}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Monthly Action Plan */}
//             {roadmap.monthlyActionPlan && (
//               <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-2xl mb-8 border-l-4 border-indigo-500 shadow-lg">
//                 <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
//                   <span className="text-3xl mr-3">📅</span>
//                   12-Month Action Plan
//                 </h3>
//                 <p className="text-gray-700 text-lg leading-relaxed">{roadmap.monthlyActionPlan}</p>
//               </div>
//             )}

//             {/* Success Stories and Common Mistakes */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {roadmap.successStories && roadmap.successStories.length > 0 && (
//                 <div className="bg-gradient-to-r from-green-50 to-lime-50 p-6 rounded-2xl border-l-4 border-green-500 shadow-lg">
//                   <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
//                     <span className="text-2xl mr-2">🌟</span>
//                     Success Stories
//                   </h3>
//                   <ul className="space-y-2">
//                     {roadmap.successStories.map((story, idx) => (
//                       <li key={idx} className="text-gray-700 text-sm">
//                         {story}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {roadmap.commonMistakes && roadmap.commonMistakes.length > 0 && (
//                 <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-l-4 border-red-500 shadow-lg">
//                   <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
//                     <span className="text-2xl mr-2">⚠️</span>
//                     Common Mistakes to Avoid
//                   </h3>
//                   <ul className="space-y-2">
//                     {roadmap.commonMistakes.map((mistake, idx) => (
//                       <li key={idx} className="text-gray-700 text-sm">
//                         {mistake}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CareerPath;

// new
import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import "../Styles/CarrerPath.css";

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
  })

  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const genAI = new GoogleGenerativeAI("AIzaSyDgYVIkudqdxLcRBQfOSAluvuZAVqmrK3U")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generatePrompt = () => {
    const userType = formData.workingStatus
    const isStudent = userType === "student"
    const isGraduate =
      userType === "graduate" ||
      formData.currentClass === "graduation" ||
      formData.currentClass === "final-year" ||
      formData.currentClass === "postgraduation"
    const isProfessional = userType === "working"

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
    `
  }

  const generateRoadmap = async () => {
    if (!formData.desiredCareer || (!formData.currentClass && !formData.currentAge)) {
      setError("Please fill in your current status and desired career")
      return
    }

    setLoading(true)
    setError("")

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 4096,
        },
      })
      const prompt = generatePrompt()

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Clean and extract JSON
      const cleanedText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim()
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
      setError("Failed to generate roadmap. Please try again with different inputs.")
    } finally {
      setLoading(false)
    }
  }

  const StepCard = ({ step, index, total }) => (
    <div className="relative mb-12 group">
      {/* Desktop Timeline */}
      <div className="flex items-start">
        <div className="flex flex-col items-center mr-8 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-2xl border-4 border-white/20 backdrop-blur-sm relative overflow-hidden group-hover:scale-110 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            <span className="relative z-10">{step.step}</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/50 to-purple-600/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          {index < total - 1 && (
            <div className="w-1 h-24 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 mt-4 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
            </div>
          )}
        </div>

        <div className="flex-1 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 group-hover:shadow-cyan-500/20 group-hover:shadow-2xl relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          
          <div className="relative z-10">
            <StepContent step={step} />
          </div>
        </div>
      </div>
    </div>
  )

  const StepContent = ({ step }) => (
    <>
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 lg:mb-0">
            {step.title}
          </h3>
          <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-white/20">
            {step.timeframe}
          </span>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <h4 className="font-bold text-white mb-4 flex items-center text-lg">
          <span className="text-2xl mr-3">✨</span>
          Action Steps:
        </h4>
        <div className="space-y-3">
          {step.actions.map((action, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <span className="text-cyan-400 mt-1 text-lg">▶</span>
              <span className="text-gray-200 flex-1">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Layout for Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Subjects */}
        {step.subjects && step.subjects.length > 0 && (
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-2xl border border-blue-400/20">
            <h4 className="font-bold text-blue-300 mb-3 flex items-center">
              <span className="text-xl mr-2">📚</span>
              Subjects:
            </h4>
            <div className="flex flex-wrap gap-2">
              {step.subjects.map((subject, idx) => (
                <span key={idx} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 px-3 py-1 rounded-lg text-sm font-medium border border-blue-400/30">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {step.skills && step.skills.length > 0 && (
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-2xl border border-purple-400/20">
            <h4 className="font-bold text-purple-300 mb-3 flex items-center">
              <span className="text-xl mr-2">💡</span>
              Skills:
            </h4>
            <div className="flex flex-wrap gap-2">
              {step.skills.map((skill, idx) => (
                <span key={idx} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 px-3 py-1 rounded-lg text-sm font-medium border border-purple-400/30">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Exams */}
      {step.exams && step.exams.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-white mb-4 flex items-center text-lg">
            <span className="text-2xl mr-3">📝</span>
            Important Exams:
          </h4>
          <div className="space-y-4">
            {step.exams.map((exam, idx) => (
              <div key={idx} className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-4 rounded-2xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                  <h5 className="font-bold text-yellow-200 text-lg">{exam.name}</h5>
                  <div className="flex flex-col lg:items-end mt-2 lg:mt-0">
                    <span className="text-sm text-yellow-300 bg-yellow-500/20 px-3 py-1 rounded-full">{exam.date}</span>
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
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold text-sm underline transition-colors duration-300"
                  >
                    Official Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Colleges */}
      {step.colleges && step.colleges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-white mb-4 flex items-center text-lg">
            <span className="text-2xl mr-3">🏫</span>
            Recommended Colleges:
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {step.colleges.map((college, idx) => (
              <div key={idx} className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 p-3 rounded-xl text-indigo-200 border border-indigo-400/20 hover:border-indigo-400/40 transition-all duration-300">
                {college}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cost and Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {step.cost && (
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 rounded-2xl border border-green-400/20">
            <h4 className="font-bold text-green-300 mb-3 flex items-center">
              <span className="text-xl mr-2">💰</span>
              Estimated Cost:
            </h4>
            <p className="text-green-200 bg-green-500/10 p-3 rounded-lg border border-green-400/20">{step.cost}</p>
          </div>
        )}

        {step.tips && step.tips.length > 0 && (
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 rounded-2xl border border-cyan-400/20">
            <h4 className="font-bold text-cyan-300 mb-3 flex items-center">
              <span className="text-xl mr-2">💡</span>
              Pro Tips:
            </h4>
            <ul className="space-y-2">
              {step.tips.map((tip, idx) => (
                <li key={idx} className="text-cyan-200 text-sm flex items-start">
                  <span className="text-cyan-400 mr-2 mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20"></div>

      {/* Header */}
      <div className="relative z-10  border-b border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center pt-20">
          <h1 className="text-5xl lg:text-7xl font-bold   text-white mb-6 animate-pulse">
            🚀 AI Career Path Generator
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Get a comprehensive, step-by-step roadmap for your dream career. Powered by advanced AI and designed for the Indian education system.
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Enhanced Form */}
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 mb-12 border border-white/10 relative overflow-hidden">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-xl opacity-50"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8 text-center">
              Tell us about yourself
            </h2>

            <div className="space-y-8">
              {/* Basic Info Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="form-group">
                  <label className="form-label">Current Status</label>
                  <select
                    name="workingStatus"
                    value={formData.workingStatus}
                    onChange={handleInputChange}
                    className="form-input "
                  >
                    <option value="student" className="bg-gray-700 text-white">School Student</option>
                    <option value="graduate" className="bg-gray-700 text-white">College Student/Graduate</option>
                    <option value="working" className="bg-gray-700 text-white">Working Professional</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {formData.workingStatus === "student" ? "Current Class" : "Age"}
                  </label>
                  {formData.workingStatus === "student" ? (
                    <select
                      name="currentClass"
                      value={formData.currentClass}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value=""className="bg-gray-700 text-white">Select Class</option>
                      {/* <option value="8"className="bg-gray-700 text-white">Class 8</option> */}
                      <option value="9"className="bg-gray-700 text-white">Class 9</option>
                      <option value="10"className="bg-gray-700 text-white">Class 10</option>
                      <option value="11"className="bg-gray-700 text-white">Class 11</option>
                      <option value="12"className="bg-gray-700 text-white">Class 12</option>
                    </select>
                  ) : (
                    <input
                      type="number"
                      name="currentAge"
                      value={formData.currentAge}
                      onChange={handleInputChange}
                      placeholder="Enter your age"
                      className="form-input"
                    />
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Academic Performance</label>
                  <select
                    name="academicPerformance"
                    value={formData.academicPerformance}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value=""className="bg-gray-700 text-white">Select Performance</option>
                    <option value="excellent"className="bg-gray-700 text-white">Excellent (90%+)</option>
                    <option value="good"className="bg-gray-700 text-white">Good (75-90%)</option>
                    <option value="average"className="bg-gray-700 text-white">Average (60-75%)</option>
                    <option value="below-average"className="bg-gray-700 text-white">Below Average (50-60%)</option>
                  </select>
                </div>
              </div>

              {/* Career and Location */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Desired Career</label>
                  <input
                    type="text"
                    name="desiredCareer"
                    value={formData.desiredCareer}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer, Doctor, IAS Officer"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Conditional Fields for Graduates/Professionals */}
              {(formData.workingStatus === "graduate" || formData.workingStatus === "working") && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">
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
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
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
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              {/* For Students */}
              {formData.workingStatus === "student" && (
                <div className="form-group">
                  <label className="form-label">Current Subjects/Stream</label>
                  <input
                    type="text"
                    name="currentSubjects"
                    value={formData.currentSubjects}
                    onChange={handleInputChange}
                    placeholder="e.g., PCM, PCB, Commerce, Arts"
                    className="form-input"
                  />
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Interests & Strengths</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleInputChange}
                    placeholder="e.g., Coding, Mathematics, Public Speaking"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Budget</label>
                  <select
                    name="financialConstraints"
                    value={formData.financialConstraints}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value=""className="bg-gray-700 text-white">Select Budget</option>
                    <option value="no-constraints"className="bg-gray-700 text-white">No Budget Issues</option>
                    <option value="moderate"className="bg-gray-700 text-white">Moderate Budget (5-15 Lakhs)</option>
                    <option value="limited"className="bg-gray-700 text-white">Limited Budget (2-5 Lakhs)</option>
                    <option value="very-limited"className="bg-gray-700 text-white">Very Limited (&lt;2 Lakhs)</option>
                  </select>
                </div>
              </div>

              {/* Goals */}
              <div className="form-group">
                <label className="form-label">Specific Goals or Questions</label>
                <textarea
                  name="specificGoals"
                  value={formData.specificGoals}
                  onChange={handleInputChange}
                  placeholder="Any specific goals, concerns, or questions about your career path..."
                  rows="4"
                  className="form-input resize-none"
                ></textarea>
              </div>
            </div>

            {error && (
              <div className="mt-8 p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 text-red-300 rounded-2xl flex items-center backdrop-blur-sm">
                <span className="text-2xl mr-3">⚠️</span>
                {error}
              </div>
            )}

            <button
              onClick={generateRoadmap}
              disabled={loading}
              className="mt-8 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center text-lg shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-1 disabled:transform-none relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  <span className="loading-text">Creating Your Roadmap</span>
                </>
              ) : (
                <>
                  <span className="text-2xl mr-3">🚀</span>
                  Generate My Career Roadmap
                </>
              )}
            </button>
          </div>
        </div>

        {/* Roadmap Display */}
        {roadmap && (
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/10 relative overflow-hidden">
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-12">
                Your Career Roadmap
              </h2>

              {/* Summary */}
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-8 rounded-3xl mb-8 border border-blue-400/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl"></div>
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center relative z-10">
                  <span className="text-3xl mr-3">📋</span>
                  Quick Summary
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed relative z-10">{roadmap.summary}</p>
              </div>

              {/* Current Situation and Target */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-3xl border border-green-400/20 relative overflow-hidden group hover:border-green-400/40 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-xl font-bold text-green-300 mb-3 flex items-center relative z-10">
                    <span className="text-2xl mr-3">📍</span>
                    Where You Are Now
                  </h3>
                  <p className="text-gray-200 relative z-10">{roadmap.currentSituation}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-3xl border border-purple-400/20 relative overflow-hidden group hover:border-purple-400/40 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-xl font-bold text-purple-300 mb-3 flex items-center relative z-10">
                    <span className="text-2xl mr-3">🎯</span>
                    Your Target Career
                  </h3>
                  <p className="text-gray-200 relative z-10">{roadmap.targetCareer}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
                  📅 Step-by-Step Plan ({roadmap.timeline})
                </h3>
                <div className="relative">
                  {roadmap.roadmap.map((step, index) => (
                    <StepCard key={index} step={step} index={index} total={roadmap.roadmap.length} />
                  ))}
                </div>
              </div>

              {/* Quick Wins and Next Steps */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6 rounded-3xl border border-yellow-400/20 relative overflow-hidden group hover:border-yellow-400/40 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center relative z-10">
                    <span className="text-2xl mr-3">⚡</span>
                    Quick Wins (Start Today!)
                  </h3>
                  <ul className="space-y-3 relative z-10">
                    {roadmap.quickWins.map((win, idx) => (
                      <li key={idx} className="text-gray-200 flex items-start">
                        <span className="text-green-400 mr-3 mt-1">✓</span>
                        {win}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 p-6 rounded-3xl border border-indigo-400/20 relative overflow-hidden group hover:border-indigo-400/40 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center relative z-10">
                    <span className="text-2xl mr-3">🚀</span>
                    Immediate Next Steps
                  </h3>
                  <ul className="space-y-3 relative z-10">
                    {roadmap.nextSteps.map((step, idx) => (
                      <li key={idx} className="text-gray-200 flex items-start">
                        <span className="text-blue-400 mr-3 mt-1">▶</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Resources and Alternatives */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 p-6 rounded-3xl border border-teal-400/20 relative overflow-hidden group hover:border-teal-400/40 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-xl font-bold text-teal-300 mb-4 flex items-center relative z-10">
                    <span className="text-2xl mr-3">📚</span>
                    Useful Resources
                  </h3>
                  <div className="space-y-4 relative z-10">
                    {roadmap.resources.map((resource, idx) => (
                      <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-teal-400/30 transition-all duration-300">
                        <h4 className="font-medium text-teal-200 text-sm">{resource.name}</h4>
                        <p className="text-gray-300 text-xs mb-2">{resource.description}</p>
                        {resource.link && (
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 text-xs underline transition-colors duration-300"
                          >
                            Visit →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 p-6 rounded-3xl border border-red-400/20 relative overflow-hidden group hover:border-red-400/40 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center relative z-10">
                    <span className="text-2xl mr-3">🔄</span>
                    Alternative Paths
                  </h3>
                  <ul className="space-y-3 relative z-10">
                    {roadmap.alternatives.map((alt, idx) => (
                      <li key={idx} className="text-gray-200 flex items-start">
                        <span className="text-red-400 mr-3 mt-1">•</span>
                        {alt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareerPath


