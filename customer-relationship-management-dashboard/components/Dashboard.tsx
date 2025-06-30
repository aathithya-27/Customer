import React from 'react';
import { Card } from './Card';
import { BACKGROUND_OPTIONS } from '../constants';

export interface DashboardProps {
  backgroundTheme: keyof typeof BACKGROUND_OPTIONS;
}

export const Dashboard: React.FC<DashboardProps> = ({ backgroundTheme }) => {
  const background = BACKGROUND_OPTIONS[backgroundTheme];
  const textColor = background.isDark ? 'white' : 'gray-900';

  // Material Design colors for bars and icons
  const tierColors = {
    Silver: 'bg-gray-400',
    Gold: 'bg-yellow-500',
    Diamond: 'bg-cyan-400',
    Platinum: 'bg-purple-400',
  };

  return (
    <div className={`${background.class} min-h-screen p-6 text-${textColor}`}>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-6">An overview of your membership data.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="flex items-center space-x-4">
          <div className="bg-blue-500 rounded-full p-3">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/><path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/></svg>
          </div>
          <div>
            <p className="text-sm font-semibold">Total Members</p>
            <p className="text-lg font-bold">5</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="bg-green-500 rounded-full p-3">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3v10h5v-2h-3v-8z"/><path d="M3 13h2v8h14v-8h2v10H3z"/></svg>
          </div>
          <div>
            <p className="text-sm font-semibold">Active Members</p>
            <p className="text-lg font-bold">4</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="bg-indigo-500 rounded-full p-3">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17h18v2H3z"/><path d="M3 7h18v2H3z"/></svg>
          </div>
          <div>
            <p className="text-sm font-semibold">New This Month</p>
            <p className="text-lg font-bold">0</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="bg-pink-500 rounded-full p-3">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v18m9-9H3"/></svg>
          </div>
          <div>
            <p className="text-sm font-semibold">Avg. Policy Value</p>
            <p className="text-lg font-bold">$214,000</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Membership by Tier</h3>
          <div className="space-y-3">
            {Object.entries(tierColors).map(([tier, color]) => (
              <div key={tier} className="flex items-center justify-between">
                <span>{tier}</span>
                <div className="w-3/4 bg-gray-700 rounded-full h-6 relative">
                  <div className={`${color} rounded-full h-6`} style={{ width: tier === 'Gold' ? '50%' : '25%' }}></div>
                  <span className="absolute right-2 top-1 text-sm font-semibold">{tier === 'Gold' ? 2 : 1}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Member Status</h3>
          <div className="flex justify-center items-center h-40">
            {/* Placeholder for pie chart */}
            <svg viewBox="0 0 36 36" className="w-32 h-32">
              <circle className="text-gray-700" strokeWidth="3" stroke="currentColor" fill="transparent" r="16" cx="18" cy="18" />
              <circle className="text-green-500" strokeWidth="3" strokeDasharray="80 20" strokeLinecap="round" stroke="currentColor" fill="transparent" r="16" cx="18" cy="18" />
              <text x="18" y="22" textAnchor="middle" className="text-white font-bold text-lg">5</text>
            </svg>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="flex items-center space-x-2"><span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span><span>Active: 4</span></span>
            <span className="flex items-center space-x-2"><span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span><span>Inactive: 1</span></span>
          </div>
        </Card>
      </div>
    </div>
  );
};
