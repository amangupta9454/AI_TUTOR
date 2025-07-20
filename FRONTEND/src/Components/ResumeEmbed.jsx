// import React from 'react';

// const ResumeEmbed = () => {
  // return (
  //   <div className="w-full h-screen pt-16">
  //     <iframe
  //       src="https://resumebuild.lovable.app/"
  //       title="Resume Builder"
  //       width="100%"
  //       height="100%"
  //       style={{ border: 'none' }}
  //     ></iframe>
  //   </div>
  // );
// };

// export default ResumeEmbed;

// new
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumeEmbed = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to access the resume builder');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false);
      } catch (err) {
        console.error('Authentication error:', err.response?.data, err.response?.status);
        setError(err.response?.data?.message || 'Failed to authenticate');
        setLoading(false);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="w-full h-screen pt-16">
      <iframe
        src="https://resumebuild.lovable.app/"
        title="Resume Builder"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
};

export default ResumeEmbed;