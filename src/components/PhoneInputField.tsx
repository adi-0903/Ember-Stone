import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, Check, Phone } from 'lucide-react';
import { COUNTRY_CODES, CountryCode } from '../data/countryCodes';

interface PhoneInputFieldProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneChange: (phone: string) => void;
  required?: boolean;
}

export default function PhoneInputField({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneChange,
  required = true,
}: PhoneInputFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Active selected country
  const currentCountry =
    COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  // Filtered country list
  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery)
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleSelectCountry = (code: string) => {
    onCountryCodeChange(code);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Unified Input Container */}
      <div className="flex items-center w-full bg-white/[0.04] border-b border-[#c9973e]/50 focus-within:border-[#c9973e] transition-colors">
        {/* Country Code Trigger Button (Compact Fixed Width) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Select Country Code"
          className="flex items-center justify-between space-x-1.5 px-3 py-2.5 bg-transparent hover:bg-white/[0.03] text-[#f5f0e8] text-xs font-mono shrink-0 cursor-pointer select-none transition-colors border-r border-[#3a2816]"
        >
          <span className="text-sm leading-none">{currentCountry.flag}</span>
          <span className="text-xs font-medium text-[#c9973e]">{currentCountry.code}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#c9973e]/80 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#c9973e]' : ''
            }`}
          />
        </button>

        {/* Real Phone Input Field */}
        <input
          required={required}
          type="tel"
          placeholder={currentCountry.placeholder || '555-0199'}
          value={phoneNumber}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="flex-1 bg-transparent text-[#f5f0e8] placeholder-[#f5f0e8]/30 px-3.5 py-2.5 text-xs outline-none min-w-0"
        />
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full mt-1 z-50 w-72 sm:w-80 bg-[#120c07] border border-[#3a2816] shadow-2xl shadow-black/90 rounded-sm overflow-hidden"
          >
            {/* Search Country Input */}
            <div className="p-2 border-b border-[#3a2816] bg-[#18110a] relative">
              <Search className="w-3.5 h-3.5 text-[#c9973e] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search country or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d0905] border border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] placeholder-[#f5f0e8]/40 pl-8 pr-3 py-1.5 text-xs rounded-xs outline-none font-sans"
              />
            </div>

            {/* Country List */}
            <div className="max-h-56 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-[#3a2816]">
              {filteredCountries.length === 0 ? (
                <div className="px-4 py-3 text-xs text-[#f5f0e8]/50 text-center font-serif italic">
                  No matching countries found
                </div>
              ) : (
                filteredCountries.map((c) => {
                  const isSelected = c.code === countryCode;
                  return (
                    <button
                      key={`${c.country}-${c.code}`}
                      type="button"
                      onClick={() => handleSelectCountry(c.code)}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#c9973e]/15 text-[#c9973e]'
                          : 'text-[#f5f0e8]/85 hover:bg-[#1a120b] hover:text-[#f5f0e8]'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="text-sm leading-none shrink-0">{c.flag}</span>
                        <span className="truncate font-light">{c.country}</span>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0 ml-2">
                        <span className="font-mono text-[#c9973e] text-[11px]">{c.code}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#c9973e]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
