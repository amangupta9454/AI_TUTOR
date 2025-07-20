// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [sessions, setSessions] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [visibleQuestions, setVisibleQuestions] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Please log in to access the dashboard');
//         setLoading(false);
//         navigate('/login');
//         return;
//       }

//       try {
//         const [userResponse, sessionsResponse] = await Promise.all([
//           axios.get(`${import.meta.env.VITE_BACKEND_URL}api/auth/user`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${import.meta.env.VITE_BACKEND_URL}api/sessions/my-sessions`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         setUser(userResponse.data);
//         setSessions(sessionsResponse.data.sessions);
//         setLoading(false);
//       } catch (err) {
//         console.error('Fetch data error:', err.response?.data, err.response?.status);
//         setError(err.response?.data?.message || 'Failed to fetch data');
//         setLoading(false);
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const toggleQuestions = (sessionId) => {
//     setVisibleQuestions((prev) => ({
//       ...prev,
//       [sessionId]: !prev[sessionId],
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-blue-200">
//         <p className="text-xl text-gray-800">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-md w-full bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-xl text-center mx-4">
//         <p className="text-red-600 mb-4">{error}</p>
//         <a href="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
//           Go to Login
//         </a>
//       </div>
//     );
//   }

//   return (
//     <section className="relative min-h-screen md:min-h-[60vh] bg-gradient-to-br from-blue-100 via-teal-100 to-blue-200 overflow-hidden flex items-center justify-center pt-20">
//       <div className="absolute inset-0">
//         <div className="absolute top-10 left-20 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-10 right-20 w-80 h-80 bg-teal-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
//         <div
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.5) 1px, transparent 1px)`,
//             backgroundSize: '15px 15px',
//             animation: 'twinkle 4s infinite ease-in-out',
//           }}
//         ></div>
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(15)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute bg-white rounded-full opacity-30 animate-swirl"
//               style={{
//                 width: `${Math.random() * 4 + 2}px`,
//                 height: `${Math.random() * 4 + 2}px`,
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDuration: `${Math.random() * 8 + 4}s`,
//                 animationDelay: `${Math.random() * 3}s`,
//               }}
//             ></div>
//           ))}
//         </div>
//       </div>

//       <div className="relative z-10 max-w-5xl w-full mx-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-xl transition-all duration-500">
//         <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 via-teal-500 to-blue-700 bg-clip-text  animate-fadeInUp">
//           Welcome, {user?.name}!
//         </h2>
//         <div className="space-y-8">
//           <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 animate-fadeInUp">
//             {user?.image ? (
//               <img
//                 src={user.image}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover border border-gray-200 shadow-md"
//                 onError={(e) => {
//                   console.error('Image failed to load:', user.image);
//                   e.target.src = 'https://via.placeholder.com/96';
//                 }}
//                 onLoad={() => console.log('Image loaded successfully:', user.image)}
//               />
//             ) : (
//               <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
//                 <span className="text-gray-500">No Image</span>
//               </div>
//             )}
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800">Profile Details</h3>
//               <p className="text-gray-600"><strong>Name:</strong> {user?.name}</p>
//               <p className="text-gray-600"><strong>Email:</strong> {user?.email}</p>
//               <p className="text-gray-600"><strong>Mobile:</strong> {user?.mobile}</p>
//               <p className="text-gray-600"><strong>Course:</strong> {user?.course}</p>
//               <p className="text-gray-600"><strong>Year/Class:</strong> {user?.year}</p>
//               <p className="text-gray-600"><strong>Roll Number:</strong> {user?.rollNumber}</p>
//               <p className="text-gray-600">
//                 <strong>Address:</strong> {user?.address?.street}, {user?.address?.city},{' '}
//                 {user?.address?.state}, {user?.address?.pincode}
//               </p>
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6 animate-fadeInUp">Your Interview Prep Sessions</h3>
//             {sessions.length === 0 ? (
//               <p className="text-gray-500 text-center">No sessions found. Create one in Interview Prep!</p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {sessions.map((session, index) => (
//                   <div
//                     key={session._id}
//                     className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fadeInUp"
//                     style={{ animationDelay: `${0.1 * (index + 1)}s` }}
//                   >
//                     <h4 className="text-2xl font-bold text-gray-800 mb-2">{session.role}</h4>
//                     <p className="text-gray-600 text-sm">
//                       <strong>Experience:</strong> {session.experience} Years
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       <strong>Skills:</strong> {session.topicsToFocus}
//                     </p>
//                     <button
//                       onClick={() => toggleQuestions(session._id)}
//                       className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow hover:shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
//                     >
//                       {visibleQuestions[session._id] ? 'Hide Questions' : 'View Questions'}
//                     </button>
//                     {visibleQuestions[session._id] && (
//                       <div className="mt-4 space-y-4 animate-slideDown">
//                         <h5 className="text-md font-semibold text-gray-800">Questions</h5>
//                         {session.questions.length === 0 ? (
//                           <p className="text-gray-500">No questions in this session.</p>
//                         ) : (
//                           <div className="space-y-4">
//                             {session.questions.map((q) => (
//                               <div key={q._id} className="bg-white/50 p-4 rounded-lg border border-gray-100">
//                                 <h6 className="text-gray-800 font-medium">{q.question}</h6>
//                                 <div className="text-gray-600 prose prose-invert max-w-none">
//                                   <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.answer}</ReactMarkdown>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleLogout}
//             className="group relative w-full mt-8 py-4 px-6 bg-gradient-to-r from-red-500 to-red-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-red-400/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-blue-100"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="relative">Logout</div>
//           </button>
//           <p className="mt-4 text-center text-gray-600">
//             <a href="/interview-prep" className="text-blue-600 hover:text-blue-800 hover:underline">
//               Go to Interview Prep
//             </a>
//           </p>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes swirl {
//           0% {
//             transform: translate(0, 0) rotate(0deg) scale(1);
//             opacity: 0.3;
//           }
//           50% {
//             transform: translate(50px, -50px) rotate(180deg) scale(1.3);
//             opacity: 0.6;
//           }
//           100% {
//             transform: translate(0, 0) rotate(360deg) scale(1);
//             opacity: 0.3;
//           }
//         }

//         @keyframes twinkle {
//           0%, 100% {
//             opacity: 0.2;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 0.5;
//             transform: scale(1.2);
//           }
//         }

//         .animate-fadeInUp {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }

//         .animate-slideDown {
//           animation: slideDown 0.5s ease-out forwards;
//         }

//         .animate-swirl {
//           animation: swirl linear infinite;
//         }

//         .prose pre {
//           background-color: rgba(0, 0, 0, 0.1);
//           padding: 1rem;
//           border-radius: 0.5rem;
//           overflow-x: auto;
//         }

//         .prose code {
//           background-color: rgba(0, 0, 0, 0.05);
//           padding: 0.2rem 0.4rem;
//           border-radius: 0.25rem;
//         }

//         .prose ul, .prose ol {
//           margin-left: 1.5rem;
//         }

//         @media (max-width: 640px) {
//           .max-w-5xl {
//             margin-left: 1rem;
//             margin-right: 1rem;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Dashboard;


// new
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [visibleQuestions, setVisibleQuestions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to access the dashboard');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const [userResponse, sessionsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}api/auth/user`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}api/sessions/my-sessions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userResponse.data);
        setSessions(sessionsResponse.data.sessions);
        setLoading(false);
      } catch (err) {
        console.error('Fetch data error:', err.response?.data, err.response?.status);
        setError(err.response?.data?.message || 'Failed to fetch data');
        setLoading(false);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleQuestions = (sessionId) => {
    setVisibleQuestions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-400"></div>
          <div className="absolute inset-0 animate-pulse rounded-full h-16 w-16 bg-indigo-400/20"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-md w-full bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 shadow-2xl shadow-indigo-500/10 text-center">
          <p className="text-red-400 text-lg font-medium mb-6">{error}</p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden flex items-center justify-center py-12 sm:py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_1px,transparent_1px)] bg-[length:25px_25px] animate-twinkle"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-5 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-5 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-4 sm:mx-6 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl shadow-indigo-500/10 transition-all duration-700">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-8 text-center animate-gradientText">
          Welcome, {user?.name}!
        </h2>
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 animate-fadeInUp">
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-indigo-500/50 shadow-xl transition-transform duration-500 hover:scale-110 hover:shadow-indigo-500/30"
                onError={(e) => {
                  console.error('Image failed to load:', user.image);
                  e.target.src = 'https://via.placeholder.com/96';
                }}
                onLoad={() => console.log('Image loaded successfully:', user.image)}
              />
            ) : (
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gray-800 flex items-center justify-center border-4 border-gray-700/50 shadow-xl">
                <span className="text-gray-400 text-sm font-medium">No Image</span>
              </div>
            )}
            <div className="text-white">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Profile Details</h3>
              <p className="text-gray-300 text-sm sm:text-base"><strong>Name:</strong> {user?.name}</p>
              <p className="text-gray-300 text-sm sm:text-base"><strong>Email:</strong> {user?.email}</p>
              <p className="text-gray-300 text-sm sm:text-base"><strong>Mobile:</strong> {user?.mobile}</p>
              <p className="text-gray-300 text-sm sm:text-base"><strong>Course:</strong> {user?.course}</p>
              <p className="text-gray-300 text-sm sm:text-base"><strong>Year/Class:</strong> {user?.year}</p>
              <p className="text-gray-300 text-sm sm:text-base"><strong>Roll Number:</strong> {user?.rollNumber}</p>
              <p className="text-gray-300 text-sm sm:text-base">
                <strong>Address:</strong> {user?.address?.street}, {user?.address?.city},{' '}
                {user?.address?.state}, {user?.address?.pincode}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-8 animate-fadeInUp">Your Interview Prep Sessions</h3>
            {sessions.length === 0 ? (
              <p className="text-gray-400 text-center text-lg sm:text-xl font-medium">No sessions found. Create one in Interview Prep!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {sessions.map((session, index) => (
                  <div
                    key={session._id}
                    className="relative bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-500 animate-fadeInUp"
                    style={{ animationDelay: `${0.15 * (index + 1)}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-4">{session.role}</h4>
                      <p className="text-gray-300 text-sm">
                        <strong>Experience:</strong> {session.experience} Years
                      </p>
                      <p className="text-gray-300 text-sm">
                        <strong>Skills:</strong> {session.topicsToFocus}
                      </p>
                      <button
                        onClick={() => toggleQuestions(session._id)}
                        className="mt-5 w-full py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        {visibleQuestions[session._id] ? 'Hide Questions' : 'View Questions'}
                      </button>
                      {visibleQuestions[session._id] && (
                        <div className="mt-6 space-y-5 animate-slideDown">
                          <h5 className="text-md sm:text-lg font-semibold text-white">Questions</h5>
                          {session.questions.length === 0 ? (
                            <p className="text-gray-400 text-sm">No questions in this session.</p>
                          ) : (
                            <div className="space-y-5">
                              {session.questions.map((q) => (
                                <div
                                  key={q._id}
                                  className="bg-gray-700/50 p-5 rounded-lg border border-gray-600/50 transition-all duration-300 hover:border-indigo-400/50 hover:shadow-md"
                                >
                                  <h6 className="text-white font-medium text-sm sm:text-base">{q.question}</h6>
                                  <div className="text-gray-300 prose prose-invert max-w-none text-sm sm:text-base">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.answer}</ReactMarkdown>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="group relative w-full mt-10 py-3.5 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <div className="relative">Logout</div>
          </button>
          <p className="mt-6 text-center text-gray-400">
            <a href="/interview-prep" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300">
              Go to Interview Prep
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes gradientText {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradientText {
          background-size: 200% 200%;
          animation: gradientText 6s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }

        .prose pre {
          background-color: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .prose code {
          background-color: rgba(255, 255, 255, 0.03);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
        }

        .prose ul, .prose ol {
          margin-left: 1.5rem;
        }

        @media (max-width: 640px) {
          .max-w-7xl {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Dashboard;