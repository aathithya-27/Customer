import React from 'react';
import { Customer } from '../types';
import { Calendar, Heart, Check, Edit3, Mail, ArrowLeft } from 'lucide-react';

interface MemberDetailProps {
  customer: Customer;
  onBack: () => void;
  onEdit: (customer: Customer) => void;
  onSendMessage: (customer: Customer) => void;
  isDark: boolean;
}

export const MemberDetail: React.FC<MemberDetailProps> = ({ customer, onBack, onEdit, onSendMessage, isDark }) => {
  if (!customer) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 text-white' : 'bg-gradient-to-br from-purple-300 via-purple-200 to-indigo-300 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Customers
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="bg-purple-800 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-lg">
            <div className="relative">
              <img
                src={customer.photo ? URL.createObjectURL(customer.photo) : 'https://via.placeholder.com/150'}
                alt={customer.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-400"
              />
              {customer.active && (
                <span className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1 border-2 border-white">
                  <Check className="w-5 h-5 text-white" />
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold">{customer.name}</h2>
            <p className="text-sm">ID: {customer.memberId}</p>
            <p className="text-sm font-semibold">{customer.memberType} Member</p>
            <p className="text-sm">{customer.address}</p>
            <p className="text-sm">{customer.mobile}</p>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-2 bg-purple-700 rounded-lg p-6 shadow-lg space-y-6">
            <h3 className="text-xl font-bold mb-4">Member Information</h3>

            <section>
              <h4 className="text-lg font-semibold mb-2">Personal Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Calendar className="inline w-5 h-5 mr-2" />
                  <strong>Date of Birth:</strong> {formatDate(customer.dob)}
                </div>
                <div>
                  <Heart className="inline w-5 h-5 mr-2" />
                  <strong>Marital Status:</strong> {customer.maritalStatus}
                </div>
                <div>
                  <Calendar className="inline w-5 h-5 mr-2" />
                  <strong>Anniversary:</strong> {customer.anniversaryDate ? formatDate(customer.anniversaryDate) : 'N/A'}
                </div>
                <div>
                  <Calendar className="inline w-5 h-5 mr-2" />
                  <strong>Joined Date:</strong> {formatDate(customer.policyRenewalDate)}
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-lg font-semibold mb-2">Policy Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Policy Name:</strong> {customer.policyName}
                </div>
                <div>
                  <strong>Policy ID:</strong> {customer.policyNumber}
                </div>
                <div>
                  <Calendar className="inline w-4 h-4 mr-2" />
                  <strong>Policy Renewal:</strong> {formatDate(customer.policyRenewalDate)}
                </div>
                <div>
                  <strong>Policy Value:</strong> ${customer.policyNumber ? '250,000.00' : 'N/A'}
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-lg font-semibold mb-2">Identification</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>PAN Card:</strong> {customer.pan}
                </div>
                <div>
                  <strong>Aadhaar No.:</strong> {customer.aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')}
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => onEdit(customer)}
                className="btn-animated bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <Edit3 className="w-5 h-5" />
                Edit Member
              </button>
              <button
                onClick={() => onSendMessage(customer)}
                className="btn-animated bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
