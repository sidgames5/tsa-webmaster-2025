import React from 'react';

const ReferencePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-4">Reference Page</h1>
      <p>
        Our Documentation Portfolio{' '}
        <a
          href="/TSA-Webmaster%20Doc%20Portfolio.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          is here if needed
        </a>
      </p>
    </main>
  );
};

export default ReferencePage;
