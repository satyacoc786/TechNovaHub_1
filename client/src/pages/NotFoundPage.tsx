import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[#15171C] border border-[#272B35] flex items-center justify-center text-4xl font-extrabold text-[#FF7900] shadow-2xl">
        404
      </div>
      <h1 className="text-3xl font-extrabold text-white">Page Not Found</h1>
      <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
        The route you are trying to access does not exist or may have been relocated across the Technova ecosystem.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-[#FF7900] text-black font-bold text-xs hover:bg-[#E06A00] flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
        <Link
          to="/opportunities"
          className="px-5 py-2.5 rounded-xl bg-[#15171C] border border-[#272B35] text-white font-semibold text-xs hover:border-[#168BFF]"
        >
          Explore Opportunities
        </Link>
      </div>
    </div>
  );
};
