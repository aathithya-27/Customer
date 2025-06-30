import React from 'react';
import { Customer } from '../types';
import { Edit3, Eye, Check, Phone } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onView: (customer: Customer) => void;
  cardClass: string;
  textClass: string;
  isDark: boolean;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ customers, onEdit, onView, cardClass, textClass, isDark }) => {
  if (customers.length === 0) {
    return <div className={`text-center py-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No customers found.</div>;
  }
  
  const memberTypeColors = {
    Platinum: isDark ? 'bg-purple-300/20 text-purple-300 border-purple-400/30' : 'bg-purple-100 text-purple-800 border-purple-200',
    Diamond: isDark ? 'bg-cyan-300/20 text-cyan-300 border-cyan-400/30' : 'bg-cyan-100 text-cyan-800 border-cyan-200',
    Gold: isDark ? 'bg-yellow-300/20 text-yellow-300 border-yellow-400/30' : 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Silver: isDark ? 'bg-gray-300/20 text-gray-300 border-gray-400/30' : 'bg-gray-200 text-gray-800 border-gray-300'
  };

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full">
          <thead className={`${isDark ? 'bg-gray-500/10' : 'bg-gray-500/5'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Member ID</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Member Name</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Member Type</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Address</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Mobile No</th>
              <th className={`px-6 py-3 text-center text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Active</th>
              <th className={`px-6 py-3 text-right text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Action</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-gray-700/50' : 'divide-gray-200/50'}`}>
            {customers.map(customer => (
              <tr key={customer.id} className={`hover:${isDark ? 'bg-gray-500/10' : 'bg-gray-500/5'} transition-colors duration-200`}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{customer.memberId}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${textClass}`}>{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${memberTypeColors[customer.memberType]}`}>
                        {customer.memberType}
                    </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{customer.address}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{customer.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {customer.active && <Check className="h-5 w-5 text-green-400 mx-auto" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end items-center gap-2">
                    <button onClick={() => onEdit(customer)} className="btn-animated bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md">
                      <Edit3 className="h-3 w-3" />
                      Edit
                    </button>
                <button
                  onClick={() => onView(customer)}
                  className="btn-animated bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Eye className="h-3 w-3" />
                  View
                </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {customers.map(customer => (
          <div key={customer.id} className={`${isDark ? 'bg-gray-500/10' : 'bg-gray-500/5'} rounded-lg p-4 shadow-md border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`font-bold text-lg ${textClass}`}>{customer.name}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{customer.memberId}</p>
              </div>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${memberTypeColors[customer.memberType]}`}>
                  {customer.memberType}
              </span>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{customer.address}</p>
              <div className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <Phone className="h-4 w-4" />
                <span>{customer.mobile}</span>
              </div>
            </div>
            <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} flex justify-between items-center`}>
              <div>
                {customer.active ? (
                  <span className="text-green-400 font-semibold text-sm flex items-center gap-1"><Check className="h-5 w-5"/> Active</span>
                ) : (
                  <span className="text-red-400 font-semibold text-sm">Inactive</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onEdit(customer)} className="btn-animated bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => onView(customer)}
                  className="btn-animated bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};