import QRCode from 'qrcode';
import { ReservationFormData } from '../types';

/**
 * Formats a luxury, highly structured WhatsApp message for Ember & Stone table reservations.
 */
export function formatWhatsAppReservationMessage(
  formData: ReservationFormData,
  confirmationCode: string
): string {
  const dietaryText =
    formData.dietaryPreference === 'veg'
      ? '🌱 Pure Vegetarian Experience'
      : formData.dietaryPreference === 'non-veg'
      ? '🥩 Non-Vegetarian / Prime Cuts Focus'
      : '🌍 Omnivore / Mixed Party';

  const seatingText =
    formData.seatingPreference === 'chefs_counter'
      ? "Chef's Hearth Counter"
      : formData.seatingPreference === 'bar_lounge'
      ? 'Cocktail Lounge Booth'
      : formData.seatingPreference === 'outdoor_patio'
      ? 'Outdoor Heated Terrace'
      : 'Main Dining Room';

  const messageLines = [
    `🔥 *EMBER & STONE STEAKHOUSE* 🔥`,
    `_Official Table Reservation & Digital Dining Pass_`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🎟️ *PASS REF:* \`${confirmationCode}\``,
    `👤 *GUEST NAME:* ${formData.name}`,
    `👥 *PARTY SIZE:* ${formData.partySize}`,
    `📅 *DATE:* ${formData.date}`,
    `⏰ *TIME:* ${formData.time}`,
    `🪑 *SEATING:* ${seatingText}`,
    `🍽️ *DIETARY FOCUS:* ${dietaryText}`,
    formData.specialRequests ? `📝 *SPECIAL REQUESTS:* "${formData.specialRequests}"` : '',
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `📍 *LOCATION & DIRECTIONS:*`,
    `742 W Randolph St, West Loop, Chicago, IL 60661`,
    `Google Maps: https://maps.google.com/?q=742+W+Randolph+St+Chicago+IL`,
    ``,
    `📞 *VIP CONCIERGE & SOMMELIER:*`,
    `Phone: +1 (312) 555-0182`,
    `Email: reservations@emberandstonechicago.com`,
    ``,
    `_Please present this digital pass or mention code *${confirmationCode}* upon arrival at the host stand. We look forward to hosting you at the hearth._`
  ].filter(Boolean);

  return messageLines.join('\n');
}

/**
 * Creates a WhatsApp Web / Mobile redirect URL with support for international country codes.
 */
export function createWhatsAppUrl(
  phoneNumber: string,
  message: string,
  countryCode?: string
): string {
  // Strip non-digit characters from the phone number
  let cleanNumber = phoneNumber.replace(/\D/g, '');
  let fullNumber = cleanNumber;

  if (countryCode) {
    const cleanCode = countryCode.replace(/\D/g, '');
    // If user already typed the country code into the input, avoid duplicating
    if (cleanNumber.startsWith(cleanCode)) {
      fullNumber = cleanNumber;
    } else {
      fullNumber = cleanCode + cleanNumber;
    }
  } else if (cleanNumber.length === 10) {
    // Default fallback to US (+1) if 10 digits without code
    fullNumber = '1' + cleanNumber;
  }

  const encodedText = encodeURIComponent(message);
  
  if (fullNumber) {
    return `https://api.whatsapp.com/send?phone=${fullNumber}&text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}

/**
 * Generates a high-quality QR code Data URL (PNG) encoding the reservation verification URL or message.
 */
export async function generateReservationQRCode(
  confirmationCode: string,
  formData: ReservationFormData
): Promise<string> {
  // Construct a live host checkin link that works with standard camera scanners
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const checkinParams = new URLSearchParams({
    checkin: 'true',
    ref: confirmationCode,
    name: formData.name || 'VIP Guest',
    party: formData.partySize || '2 Guests',
    date: formData.date || '',
    time: formData.time || '',
    seating: formData.seatingPreference || 'main_dining',
    diet: formData.dietaryPreference || 'all',
    requests: formData.specialRequests || '',
  });

  const checkinUrl = `${baseUrl}/?${checkinParams.toString()}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(checkinUrl, {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#0d0905',
        light: '#f5f0e8',
      },
      errorCorrectionLevel: 'M',
    });
    return qrDataUrl;
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
}
