import React from 'react';

const ResumeEmbed = () => {
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
