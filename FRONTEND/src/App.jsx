import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import Contact from './Components/Contact'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'
import InterviewPrep from './Components/InterviewPrep'
import CareerPath from './Components/Carrerpath'
import EmailGenerator from './Components/EmailGenerator'
import ResumeEmbed from './Components/ResumeEmbed'
import Footer from './Components/Footer'
import JobOpportunitiesAnalyzer from './Components/JobOpportunitiesAnalyzer'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/career" element={<CareerPath />} />
          <Route path="/email" element={<EmailGenerator />} />
          <Route path="/resume" element={<ResumeEmbed />} />
        <Route path="/carreranalyzer" element={<JobOpportunitiesAnalyzer />} />
        
        </Routes>
        <Footer />
      
    </BrowserRouter>
  )
}

export default App
