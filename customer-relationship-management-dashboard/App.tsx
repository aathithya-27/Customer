import React, { useState, useMemo } from 'react';
import { Customer, BackgroundTheme } from './types';
import { MOCK_CUSTOMERS, BACKGROUND_OPTIONS } from './constants';
import { MemberModal } from './components/MemberModal';
import { CustomerTable } from './components/CustomerTable';
import { CustomerGrid } from './components/CustomerGrid';
import { AnimatedBackground } from './components/AnimatedBackground';
import { BackgroundSelector } from './components/BackgroundSelector';
import { Search, Plus, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { MemberDetail } from './components/MemberDetail';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');
  const [readOnly, setReadOnly] = useState(false);

  // Search state
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchFromDate, setSearchFromDate] = useState('');
  const [searchToDate, setSearchToDate] = useState('');

  // Theme state
  const [theme, setTheme] = useState<BackgroundTheme>('dark');
  const selectedTheme = BACKGROUND_OPTIONS[theme];

  // Text color state
  const [textColor, setTextColor] = useState<string>(selectedTheme.isDark ? 'gray-200' : 'gray-800');

  // Navigation state
  const [activeScreen, setActiveScreen] = useState<'members' | 'dashboard' | 'profile' | 'memberDetail'>('members');
  const [detailCustomer, setDetailCustomer] = useState<Customer | null>(null);

  const handleCreateNew = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
    setReadOnly(false);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
    setReadOnly(false);
  };

  const handleView = (customer: Customer) => {
    setDetailCustomer(customer);
    setActiveScreen('memberDetail');
  };

  const handleSave = (customerData: Customer) => {
    if (selectedCustomer) {
      setCustomers(customers.map(c => (c.id === customerData.id ? customerData : c)));
    } else {
      const nextId = customers.length + 1;
      const newCustomer = {
        ...customerData,
        id: nextId,
        memberId: `MBR${String(nextId).padStart(3, '0')}`
      };
      setCustomers([...customers, newCustomer]);
    }
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
    setReadOnly(false);
  };

  const handleBackFromDetail = () => {
    setDetailCustomer(null);
    setActiveScreen('members');
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const nameMatch = customer.name.toLowerCase().includes(searchName.toLowerCase());
      const idMatch = customer.memberId.toLowerCase().includes(searchId.toLowerCase());
      // Date filtering logic would go here if we were using real date objects
      return nameMatch && idMatch;
    });
  }, [customers, searchName, searchId]);

  const { textClass, cardClass, inputClass, isDark } = useMemo(() => {
    const isDark = selectedTheme.isDark;
    // Update textColor state when theme changes
    setTextColor(isDark ? 'gray-200' : 'gray-800');
    return {
      isDark,
      textClass: isDark ? 'text-gray-200' : 'text-gray-800',
      cardClass: isDark ? 'bg-gray-900/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50',
      inputClass: isDark
        ? 'bg-gray-800/80 border-gray-600/80 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-600 focus:border-indigo-600'
    };
  }, [theme]);


  const renderMembersScreen = () => (
    <>
      {/* Search and Actions Bar */}
      <div className={`${cardClass} backdrop-blur-md border rounded-xl p-4 sm:p-6 mb-6 shadow-lg`}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <h2 className={`text-xl font-semibold ${textClass}`}>Customer Overview</h2>
          <div className="flex gap-3">
            <div className={`flex ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`btn-animated px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-md'
                    : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-300'}`
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`btn-animated px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white shadow-md'
                    : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-300'}`
                }`}
              >
                <List className="w-4 h-4" />
                Table
              </button>
            </div>
            <button
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className="btn-animated btn-secondary bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showAdvancedSearch ? 'Hide Search' : 'Advanced Search'}
            </button>
            <button
              onClick={handleCreateNew}
              className="btn-animated btn-primary bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Customer
            </button>
          </div>
        </div>

        {/* Search Filters */}
        <div className={`transition-all duration-500 ease-in-out ${showAdvancedSearch ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-gray-500/30">
            <input type="text" placeholder="Memb ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} className={`${inputClass} rounded-md px-3 py-2 outline-none transition w-full`} />
            <input type="text" placeholder="Member Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} className={`${inputClass} rounded-md px-3 py-2 outline-none transition w-full`} />
            <input type="text" placeholder="From Date" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} value={searchFromDate} onChange={(e) => setSearchFromDate(e.target.value)} className={`${inputClass} rounded-md px-3 py-2 outline-none transition w-full`} />
            <input type="text" placeholder="To Date" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} value={searchToDate} onChange={(e) => setSearchToDate(e.target.value)} className={`${inputClass} rounded-md px-3 py-2 outline-none transition w-full`} />
            <button className={`btn-animated btn-secondary bg-gray-600 hover:bg-gray-500 ${isDark ? 'text-white' : 'text-gray-100'} font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full`}>
              <Search className="h-5 w-5" /> Go
            </button>
          </div>
        </div>
      </div>

      {/* Search Result */}
      <div className={`${cardClass} backdrop-blur-md border rounded-xl shadow-lg`}>
        <div className="p-4 sm:p-6 border-b border-gray-200/20">
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-semibold ${textClass}`}>
              Search Results ({filteredCustomers.length} {filteredCustomers.length === 1 ? 'customer' : 'customers'})
            </h2>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {viewMode === 'grid' ? 'Grid View' : 'Table View'}
            </div>
          </div>
        </div>
        {viewMode === 'grid' ? (
              <CustomerGrid
                customers={filteredCustomers}
                onEdit={handleEdit}
                onView={handleView}
                cardClass={cardClass}
                textClass={textClass}
                isDark={isDark}
              />
        ) : (
              <CustomerTable
                customers={filteredCustomers}
                onEdit={handleEdit}
                onView={handleView}
                cardClass={cardClass}
                textClass={textClass}
                isDark={isDark}
              />
        )}
      </div>
    </>
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard backgroundTheme={theme} />;
      case 'profile':
        return <Profile textColor={textColor} />;
      case 'memberDetail':
        return detailCustomer ? (
          <MemberDetail
            customer={detailCustomer}
            onBack={handleBackFromDetail}
            onEdit={(customer) => {
              setSelectedCustomer(customer);
              setIsModalOpen(true);
              setReadOnly(false);
              setActiveScreen('members');
            }}
            onSendMessage={(customer) => {
              alert(`Send message to ${customer.name} (not implemented)`);
            }}
            isDark={isDark}
          />
        ) : null;
      case 'members':
      default:
        return renderMembersScreen();
    }
  };

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-500 ${selectedTheme.class}`}>
      <AnimatedBackground theme={theme} />
      <BackgroundSelector selectedTheme={theme} onThemeChange={setTheme} />

      <nav className={`relative z-20 p-4 sm:p-6 lg:p-8 flex flex-wrap justify-center gap-3 bg-opacity-70 backdrop-blur-md border-b rounded-b-xl max-w-7xl mx-auto ${isDark ? 'bg-gray-900/70 border-gray-700/50 text-gray-200' : 'bg-white/70 border-gray-200/50 text-gray-800'}`}>
        <button
          onClick={() => setActiveScreen('dashboard')}
          className={`btn-animated px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
            activeScreen === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-100'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveScreen('profile')}
          className={`btn-animated px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
            activeScreen === 'profile' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-100'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveScreen('members')}
          className={`btn-animated px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
            activeScreen === 'members' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-100'
          }`}
        >
          Members
        </button>
      </nav>

      <main className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderScreen()}
      </main>

      <MemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        customer={selectedCustomer}
        isDark={isDark}
      totalCustomers={customers.length}
      readOnly={readOnly}
      />
    </div>
  );
};

export default App;
