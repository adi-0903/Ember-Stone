export interface CountryCode {
  country: string;
  code: string;
  flag: string;
  placeholder: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { country: 'United States', code: '+1', flag: '🇺🇸', placeholder: '(312) 555-0199' },
  { country: 'United Kingdom', code: '+44', flag: '🇬🇧', placeholder: '7911 123456' },
  { country: 'India', code: '+91', flag: '🇮🇳', placeholder: '98765 43210' },
  { country: 'Canada', code: '+1', flag: '🇨🇦', placeholder: '(416) 555-0188' },
  { country: 'United Arab Emirates', code: '+971', flag: '🇦🇪', placeholder: '50 123 4567' },
  { country: 'Australia', code: '+61', flag: '🇦🇺', placeholder: '412 345 678' },
  { country: 'Germany', code: '+49', flag: '🇩🇪', placeholder: '151 23456789' },
  { country: 'France', code: '+33', flag: '🇫🇷', placeholder: '6 12 34 56 78' },
  { country: 'Japan', code: '+81', flag: '🇯🇵', placeholder: '90 1234 5678' },
  { country: 'Singapore', code: '+65', flag: '🇸🇬', placeholder: '9123 4567' },
  { country: 'Italy', code: '+39', flag: '🇮🇹', placeholder: '320 123 4567' },
  { country: 'Spain', code: '+34', flag: '🇪🇸', placeholder: '612 345 678' },
  { country: 'Mexico', code: '+52', flag: '🇲🇽', placeholder: '55 1234 5678' },
  { country: 'Brazil', code: '+55', flag: '🇧🇷', placeholder: '11 91234-5678' },
  { country: 'Switzerland', code: '+41', flag: '🇨🇭', placeholder: '79 123 45 67' },
  { country: 'Saudi Arabia', code: '+966', flag: '🇸🇦', placeholder: '50 123 4567' },
  { country: 'Netherlands', code: '+31', flag: '🇳🇱', placeholder: '6 12345678' },
  { country: 'South Africa', code: '+27', flag: '🇿🇦', placeholder: '82 123 4567' },
  { country: 'Argentina', code: '+54', flag: '🇦🇷', placeholder: '9 11 1234-5678' },
  { country: 'New Zealand', code: '+64', flag: '🇳🇿', placeholder: '21 123 4567' },
  { country: 'Qatar', code: '+974', flag: '🇶🇦', placeholder: '3312 3456' },
  { country: 'Hong Kong', code: '+852', flag: '🇭🇰', placeholder: '9123 4567' },
  { country: 'Ireland', code: '+353', flag: '🇮🇪', placeholder: '87 123 4567' },
  { country: 'Sweden', code: '+46', flag: '🇸🇪', placeholder: '70 123 45 67' },
  { country: 'Norway', code: '+47', flag: '🇳🇴', placeholder: '412 34 567' },
];
