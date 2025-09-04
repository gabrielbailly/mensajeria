import React from 'react';
import { BellIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
                <BellIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Comunicados Familiares</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;