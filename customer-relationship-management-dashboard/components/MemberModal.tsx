import React, { useState, useEffect } from 'react';
import { Customer, MaritalStatus, MemberType } from '../types';
import { X, Calendar, Camera, FileText } from 'lucide-react';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
  customer: Customer | null;
  isDark: boolean;
  totalCustomers: number;
  readOnly?: boolean;
}

const TABS = ['Basic Info', 'Documents', 'Special Dates', 'Policies'];

const defaultCustomerData: Omit<Customer, 'id'> = {
  memberId: '',
  name: '',
  memberType: MemberType.Silver,
  address: '',
  mobile: '',
  active: true,
  dob: '',
  maritalStatus: MaritalStatus.Single,
  city: 'Mumbai',
  pan: '',
  aadhaar: '',
  anniversaryDate: '',
  policyRenewalDate: '',
  policyName: '',
  policyNumber: '',
  photo: null,
  proofOfAddress: null
};

export const MemberModal: React.FC<MemberModalProps> = ({ isOpen, onClose, onSave, customer, isDark, totalCustomers, readOnly = false }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [formData, setFormData] = useState<Omit<Customer, 'id'> | Customer>(
    customer || defaultCustomerData
  );

  useEffect(() => {
    if (isOpen) {
        if (customer) {
          setFormData(customer);
        } else {
          const nextId = totalCustomers + 1;
          setFormData({ ...defaultCustomerData, memberId: `MBR${String(nextId).padStart(3, '0')}` });
        }
        setActiveTab(TABS[0]); // Reset to first tab on open/re-open
    }
  }, [customer, isOpen, totalCustomers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (readOnly) return;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSaveClick = () => {
    if (readOnly) return;
    const saveData = 'id' in formData ? formData : { ...formData, id: -1 };
    onSave(saveData);
  };

  if (!isOpen) return null;

  const formLabelClass = `block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`;
  const formInputClass = `block w-full border rounded-lg p-2.5 text-sm outline-none transition duration-200 ${
    isDark
      ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
      : 'bg-gray-50 border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
  }`;
  const formInputReadonlyClass = isDark ? 'bg-gray-800 cursor-not-allowed' : 'bg-gray-200 cursor-not-allowed';

const FileInput = ({ name, label, icon: Icon }: { name: keyof (Customer | Omit<Customer, 'id'>); label: string; icon: React.ElementType }) => (
    <div className="form-group">
      <label htmlFor={name} className={formLabelClass}>
        {label}
      </label>
      <div
        className={`relative w-full h-32 border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer ${
          isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50 hover:bg-gray-700' : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
        } transition-colors`}
      >
        <Icon className={`h-8 w-8 mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{formData[name] ? (formData[name] as File).name : `Select ${label} file`}</p>
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Click to upload</p>
        {!readOnly && <input type="file" id={name} name={name} onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Basic Info':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="form-group">
              <label htmlFor="memberId" className={formLabelClass}>
                Member ID
              </label>
              <input type="text" id="memberId" name="memberId" value={formData.memberId} className={`${formInputClass} ${formInputReadonlyClass}`} readOnly />
            </div>
            <div className="form-group relative">
              <label htmlFor="dob" className={formLabelClass}>
                Date of Birth *
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`${formInputClass} pr-10`}
                required
                readOnly={readOnly}
              />
              <Calendar className={`absolute right-3 top-9 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <div className="form-group">
              <label htmlFor="name" className={formLabelClass}>
                Name *
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={formInputClass} required readOnly={readOnly} />
            </div>
            <div className="form-group">
              <label htmlFor="maritalStatus" className={formLabelClass}>
                Marital Status
              </label>
              <select id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className={`${formInputClass} appearance-none`} disabled={readOnly}>
                {Object.values(MaritalStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mobile" className={formLabelClass}>
                Mobile *
              </label>
              <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className={formInputClass} required readOnly={readOnly} />
            </div>
            <div className="form-group">
              <label htmlFor="city" className={formLabelClass}>
                City
              </label>
              <select id="city" name="city" value={formData.city} onChange={handleChange} className={`${formInputClass} appearance-none`} disabled={readOnly}>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>
          </div>
        );
      case 'Documents':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="form-group">
              <label htmlFor="pan" className={formLabelClass}>PAN Card *</label>
              <input type="text" id="pan" name="pan" value={formData.pan} onChange={handleChange} className={formInputClass} required />
            </div>
            <div className="form-group">
              <label htmlFor="aadhaar" className={formLabelClass}>Aadhaar *</label>
              <input type="text" id="aadhaar" name="aadhaar" value={formData.aadhaar} onChange={handleChange} className={formInputClass} required />
            </div>
            <FileInput name="photo" label="Photo" icon={Camera} />
            <FileInput name="proofOfAddress" label="Proof of Address" icon={FileText} />
          </div>
        );
      case 'Special Dates':
         return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="form-group relative">
              <label htmlFor="anniversaryDate" className={formLabelClass}>Anniversary *</label>
              <input type="date" id="anniversaryDate" name="anniversaryDate" value={formData.anniversaryDate} onChange={handleChange} className={`${formInputClass} pr-10`} />
              <Calendar className={`absolute right-3 top-9 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}/>
            </div>
            <div className="form-group relative">
              <label htmlFor="policyRenewalDate" className={formLabelClass}>Policy Renewal</label>
              <input type="date" id="policyRenewalDate" name="policyRenewalDate" value={formData.policyRenewalDate} onChange={handleChange} className={`${formInputClass} pr-10`} />
               <Calendar className={`absolute right-3 top-9 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}/>
            </div>
          </div>
        );
      case 'Policies':
         return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="form-group">
              <label htmlFor="policyName" className={formLabelClass}>Name *</label>
              <input type="text" id="policyName" name="policyName" value={formData.policyName} onChange={handleChange} className={formInputClass} required />
            </div>
            <div className="form-group">
              <label htmlFor="policyNumber" className={formLabelClass}>Number *</label>
              <input type="text" id="policyNumber" name="policyNumber" value={formData.policyNumber} onChange={handleChange} className={formInputClass} required />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const modalBgClass = isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/90 border-gray-200/80';
  const headerBorderClass = isDark ? 'border-gray-700' : 'border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedTextColor = isDark ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300">
      <div className={`${modalBgClass} border rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col bg-gradient-to-r from-purple-700 to-blue-600`}>
        <div className={`flex justify-between items-center p-4 md:p-6 border-b ${headerBorderClass}`}>
          <h2 className={`text-xl md:text-2xl font-bold ${textColor}`}>Member Master</h2>
          <button onClick={onClose} className={`${mutedTextColor} hover:text-white transition-colors`}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className={`flex border-b ${headerBorderClass} px-2 md:px-6`}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-2 md:px-4 text-sm md:text-base font-medium transition-all duration-300 border-b-2 ${
                activeTab === tab ? `border-indigo-500 ${textColor}` : `border-transparent ${mutedTextColor} hover:${textColor} hover:border-gray-500`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto">{renderTabContent()}</div>

        {!readOnly && (
          <div className={`p-4 md:p-6 border-t ${headerBorderClass} mt-auto flex justify-end`}>
            <button
              onClick={handleSaveClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-md"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
