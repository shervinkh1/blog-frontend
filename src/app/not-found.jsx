import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          href="/blog"
        >
          Go Back Blog page
        </Button>
      </div>
    </div>
  );
};

export default Custom404;
