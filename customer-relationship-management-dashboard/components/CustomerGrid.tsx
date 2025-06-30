import React from 'react';
import { Customer } from '../types';
import { Edit3, Eye, Check, Phone, MapPin, Calendar, CreditCard, Heart, User } from 'lucide-react';

interface CustomerGridProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onView: (customer: Customer) => void;
  cardClass: string;
  textClass: string;
  isDark: boolean;
}

export const CustomerGrid: React.FC<CustomerGridProps> = ({ customers, onEdit, onView, cardClass, textClass, isDark }) => {
  if (customers.length === 0) {
    return (
      <div className={`text-center py-20 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <User className="h-16 w-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">No customers found</h3>
        <p>Add your first customer to get started!</p>
      </div>
    );
  }

  const memberTypeColors = {
    Platinum: isDark ? 'bg-purple-500/20 text-purple-300 border-purple-400/30' : 'bg-purple-100 text-purple-800 border-purple-200',
    Diamond: isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' : 'bg-cyan-100 text-cyan-800 border-cyan-200',
    Gold: isDark ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' : 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Silver: isDark ? 'bg-gray-500/20 text-gray-300 border-gray-400/30' : 'bg-gray-200 text-gray-800 border-gray-300'
  };

  const memberTypeIcons = {
    Platinum: '💎',
    Diamond: '💍',
    Gold: '🏆',
    Silver: '🥈'
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMaritalStatusIcon = (status: string) => {
    switch (status) {
      case 'Married':
        return '💑';
      case 'Single':
        return '👤';
      case 'Divorced':
        return '💔';
      case 'Widowed':
        return '🖤';
      default:
        return '👤';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {customers.map((customer, index) => (
        <div
          key={customer.id}
          className={`${cardClass} backdrop-blur-md border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 card-animated overflow-hidden`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Header with Member Type Badge */}
          <div
            className={`${
              isDark ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50' : 'bg-gradient-to-r from-gray-50 to-gray-100'
            } p-4 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${textClass} mb-1`}>{customer.name}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} font-mono`}>{customer.memberId}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${memberTypeColors[customer.memberType]} flex items-center gap-1`}
                >
                  <span>{memberTypeIcons[customer.memberType]}</span>
                  {customer.memberType}
                </span>
                {customer.active ? (
                  <span className="text-green-400 font-semibold text-xs flex items-center gap-1">
                    <Check className="h-3 w-3" /> Active
                  </span>
                ) : (
                  <span className="text-red-400 font-semibold text-xs">Inactive</span>
                )}
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="p-4 space-y-3">
            {/* Contact Information */}
            <div className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="font-medium">{customer.mobile}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{customer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>{customer.city}</span>
              </div>
            </div>

            {/* Personal Information */}
            <div className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} pt-3 space-y-2`}>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-purple-500" />
                <span>DOB: {formatDate(customer.dob)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="h-4 w-4 text-pink-500" />
                <span>
                  {getMaritalStatusIcon(customer.maritalStatus)} {customer.maritalStatus}
                </span>
              </div>
              {customer.anniversaryDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Anniversary: {formatDate(customer.anniversaryDate)}</span>
                </div>
              )}
            </div>

            {/* Policy Information */}
            <div className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} pt-3 space-y-2`}>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4 text-indigo-500" />
                <span className="font-medium">{customer.policyName}</span>
              </div>
              <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <span>Policy: {customer.policyNumber}</span>
              </div>
              <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="h-3 w-3" />
                <span>Renewal: {formatDate(customer.policyRenewalDate)}</span>
              </div>
            </div>

            {/* Document Information */}
            <div className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} pt-3`}>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-medium">PAN:</span> {customer.pan}
                </div>
                <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-medium">Aadhaar:</span> {customer.aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`${isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'} px-4 py-3 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} flex justify-between items-center`}>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(customer)}
                className="btn-animated bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg"
              >
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
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>ID: {customer.id}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
