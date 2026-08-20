import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  Flame,
  Check,
  Sparkles,
} from 'lucide-react';

interface VisualDatePickerProps {
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  minDate?: string;
  maxDaysAhead?: number;
}

interface TimeSlotInfo {
  time: string;
  period: 'early' | 'prime' | 'late';
  label: string;
  status: 'available' | 'limited' | 'popular';
  remainingTables: number;
}

export default function VisualDatePicker({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  minDate,
  maxDaysAhead = 45,
}: VisualDatePickerProps) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const dateContainerRef = useRef<HTMLDivElement>(null);
  const timeContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateContainerRef.current &&
        !dateContainerRef.current.contains(event.target as Node)
      ) {
        setIsDateOpen(false);
      }
      if (
        timeContainerRef.current &&
        !timeContainerRef.current.contains(event.target as Node)
      ) {
        setIsTimeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Parse currently selected date or default to tomorrow
  const initialDate = useMemo(() => {
    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      }
    }
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, [selectedDate]);

  const [viewDate, setViewDate] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const minimumDate = useMemo(() => {
    if (minDate) {
      const parts = minDate.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      }
    }
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [minDate]);

  const maximumDate = useMemo(() => {
    const d = new Date(minimumDate);
    d.setDate(d.getDate() + maxDaysAhead);
    return d;
  }, [minimumDate, maxDaysAhead]);

  // Calendar math
  const daysInMonth = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const date = new Date(year, month, 1);
    const days: Array<{
      date: Date;
      dateString: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isDisabled: boolean;
      isToday: boolean;
      isSelected: boolean;
      isWeekend: boolean;
      popularityTag: 'peak' | 'normal' | 'closed';
    }> = [];

    const firstDayIndex = date.getDay();

    // Previous month padding
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, prevMonthLastDate - i);
      const str = prevDate.toISOString().split('T')[0];
      days.push({
        date: prevDate,
        dateString: str,
        dayNumber: prevMonthLastDate - i,
        isCurrentMonth: false,
        isDisabled: true,
        isToday: false,
        isSelected: false,
        isWeekend: prevDate.getDay() === 0 || prevDate.getDay() === 6,
        popularityTag: 'closed',
      });
    }

    // Current month days
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      const currentDate = new Date(year, month, i);
      currentDate.setHours(0, 0, 0, 0);
      const str = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isDisabled = currentDate < minimumDate || currentDate > maximumDate;
      const isWeekend = currentDate.getDay() === 5 || currentDate.getDay() === 6; // Fri or Sat

      days.push({
        date: currentDate,
        dateString: str,
        dayNumber: i,
        isCurrentMonth: true,
        isDisabled,
        isToday: currentDate.getTime() === today.getTime(),
        isSelected: str === selectedDate,
        isWeekend,
        popularityTag: isWeekend ? 'peak' : 'normal',
      });
    }

    // Trailing days
    const remainingCells = 42 - days.length;
    if (remainingCells > 0 && remainingCells < 7) {
      for (let i = 1; i <= remainingCells; i++) {
        const nextDate = new Date(year, month + 1, i);
        const str = nextDate.toISOString().split('T')[0];
        days.push({
          date: nextDate,
          dateString: str,
          dayNumber: i,
          isCurrentMonth: false,
          isDisabled: true,
          isToday: false,
          isSelected: false,
          isWeekend: nextDate.getDay() === 0 || nextDate.getDay() === 6,
          popularityTag: 'closed',
        });
      }
    }

    return days;
  }, [viewDate, minimumDate, maximumDate, selectedDate, today]);

  // Navigate months
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Quick shortcuts
  const selectShortcut = (offsetDays: number) => {
    const target = new Date();
    target.setDate(target.getDate() + offsetDays);
    const dateStr = target.toISOString().split('T')[0];
    onSelectDate(dateStr);
    setViewDate(new Date(target.getFullYear(), target.getMonth(), 1));
    setIsDateOpen(false);
  };

  const selectThisWeekend = (dayOfWeek: 5 | 6) => {
    const now = new Date();
    const currentDay = now.getDay();
    let distance = (dayOfWeek + 7 - currentDay) % 7;
    if (distance === 0) distance = 7;
    const target = new Date();
    target.setDate(now.getDate() + distance);
    const dateStr = target.toISOString().split('T')[0];
    onSelectDate(dateStr);
    setViewDate(new Date(target.getFullYear(), target.getMonth(), 1));
    setIsDateOpen(false);
  };

  // Formatted Selected Date Label
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return 'Select dining date';
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [selectedDate]);

  // Check if selected date is a weekend / prime night
  const isSelectedDatePeak = useMemo(() => {
    if (!selectedDate) return false;
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.getDay() === 5 || dateObj.getDay() === 6;
  }, [selectedDate]);

  // Dynamic slot availability data based on date
  const timeSlots: TimeSlotInfo[] = useMemo(() => {
    const isWeekend = isSelectedDatePeak;
    return [
      { time: '5:00 PM', period: 'early', label: 'Early Hearth', status: 'available', remainingTables: 5 },
      { time: '5:30 PM', period: 'early', label: 'Early Hearth', status: 'available', remainingTables: 4 },
      { time: '6:00 PM', period: 'early', label: 'Sunset Cut', status: isWeekend ? 'limited' : 'available', remainingTables: 3 },
      { time: '6:30 PM', period: 'prime', label: 'Prime Dining', status: 'limited', remainingTables: 2 },
      { time: '7:00 PM', period: 'prime', label: "Chef's Peak", status: 'popular', remainingTables: 1 },
      { time: '7:30 PM', period: 'prime', label: "Chef's Peak", status: 'popular', remainingTables: 2 },
      { time: '8:00 PM', period: 'prime', label: 'Prime Dining', status: isWeekend ? 'limited' : 'available', remainingTables: 3 },
      { time: '8:30 PM', period: 'late', label: 'Late Ember', status: 'available', remainingTables: 4 },
      { time: '9:00 PM', period: 'late', label: 'Late Ember', status: 'available', remainingTables: 6 },
    ];
  }, [isSelectedDatePeak]);

  const activeTimeInfo = useMemo(() => {
    return timeSlots.find((s) => s.time === selectedTime) || timeSlots[4];
  }, [timeSlots, selectedTime]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* 1. Date Dropdown Trigger & Popover */}
      <div ref={dateContainerRef} className="relative space-y-1.5">
        <label className="text-[10px] tracking-[0.18em] uppercase text-[#c9973e] font-medium flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="w-3 h-3 text-[#c9973e]" />
            Dining Date
          </span>
          {isSelectedDatePeak && (
            <span className="text-[9px] text-[#eab308] font-mono tracking-normal flex items-center gap-0.5 lowercase">
              <Flame className="w-2.5 h-2.5 inline" /> prime weekend
            </span>
          )}
        </label>

        {/* Dropdown Button */}
        <button
          type="button"
          onClick={() => {
            setIsDateOpen(!isDateOpen);
            setIsTimeOpen(false);
          }}
          className={`w-full flex items-center justify-between px-3 py-2.5 bg-white/[0.04] border-b rounded-xs transition-all duration-200 cursor-pointer ${
            isDateOpen
              ? 'border-[#c9973e] bg-white/[0.07] shadow-lg shadow-[#c9973e]/10'
              : 'border-[#c9973e]/50 hover:border-[#c9973e]'
          }`}
        >
          <div className="flex items-center gap-2 text-left">
            <CalendarIcon className="w-3.5 h-3.5 text-[#c9973e]" />
            <span className="text-xs text-[#f5f0e8] font-medium">
              {formattedSelectedDate}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#c9973e] transition-transform duration-200 ${
                isDateOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {/* Calendar Dropdown Floating Popover */}
        <AnimatePresence>
          {isDateOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute top-full left-0 mt-2 z-50 w-[300px] sm:w-[330px] p-3.5 bg-[#0f0904] border border-[#c9973e]/60 rounded-sm shadow-2xl shadow-black/90 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(180deg, #140d07 0%, #0c0703 100%)',
              }}
            >
              {/* Header: Shortcuts */}
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#2a1c10]">
                <span className="text-[9px] uppercase tracking-wider text-[#c9973e] font-semibold">
                  Quick Select:
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => selectShortcut(1)}
                    className="px-2 py-0.5 bg-[#1c130b] hover:bg-[#c9973e]/20 border border-[#3a2816] hover:border-[#c9973e] text-[9px] text-[#f5f0e8] rounded-xs transition-colors cursor-pointer"
                  >
                    Tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={() => selectThisWeekend(5)}
                    className="px-2 py-0.5 bg-[#1c130b] hover:bg-[#c9973e]/20 border border-[#3a2816] hover:border-[#c9973e] text-[9px] text-[#f5f0e8] rounded-xs transition-colors cursor-pointer flex items-center gap-0.5"
                  >
                    <Flame className="w-2.5 h-2.5 text-[#c9973e]" />
                    <span>Fri</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectThisWeekend(6)}
                    className="px-2 py-0.5 bg-[#1c130b] hover:bg-[#c9973e]/20 border border-[#3a2816] hover:border-[#c9973e] text-[9px] text-[#f5f0e8] rounded-xs transition-colors cursor-pointer flex items-center gap-0.5"
                  >
                    <Flame className="w-2.5 h-2.5 text-[#c9973e]" />
                    <span>Sat</span>
                  </button>
                </div>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between px-1 mb-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 bg-[#18110a] hover:bg-[#2a1c10] text-[#c9973e] border border-[#3a2816] rounded-xs transition-colors cursor-pointer"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <span className="font-serif text-xs tracking-wider text-[#f5f0e8] font-medium uppercase">
                  {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 bg-[#18110a] hover:bg-[#2a1c10] text-[#c9973e] border border-[#3a2816] rounded-xs transition-colors cursor-pointer"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Weekday Labels */}
              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] tracking-wider text-[#c9973e]/80 uppercase pb-1 mb-1 border-b border-[#2a1c10]">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span className="text-[#c9973e] font-bold">Fr</span>
                <span className="text-[#c9973e] font-bold">Sa</span>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {daysInMonth.map((day, idx) => {
                  const isSelected = day.isSelected;
                  const isDisabled = day.isDisabled;
                  const isPeak = day.popularityTag === 'peak' && !isDisabled;

                  return (
                    <button
                      key={`${day.dateString}-${idx}`}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => {
                        onSelectDate(day.dateString);
                        setIsDateOpen(false);
                      }}
                      className={`relative py-1.5 text-[11px] font-mono rounded-xs transition-all duration-150 flex flex-col items-center justify-center cursor-pointer ${
                        isDisabled
                          ? 'text-[#f5f0e8]/20 cursor-not-allowed bg-transparent'
                          : isSelected
                          ? 'bg-[#c9973e] text-[#0d0905] font-bold shadow-md shadow-[#c9973e]/30 scale-[1.05] z-10'
                          : 'bg-[#18110a] hover:bg-[#251b11] text-[#f5f0e8] hover:text-[#c9973e] border border-transparent hover:border-[#c9973e]/40'
                      } ${day.isToday && !isSelected ? 'border border-[#c9973e]/60' : ''}`}
                    >
                      <span>{day.dayNumber}</span>
                      {!isDisabled && (
                        <span
                          className={`w-1 h-1 rounded-full mt-0.5 ${
                            isSelected
                              ? 'bg-[#0d0905]'
                              : isPeak
                              ? 'bg-[#eab308]'
                              : 'bg-[#22c55e]/80'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend Footer */}
              <div className="flex items-center justify-between text-[8px] text-[#f5f0e8]/60 pt-2 mt-2 border-t border-[#2a1c10]">
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#22c55e]" /> Open
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#eab308]" /> Prime Weekend
                </span>
                <span className="text-[#f5f0e8]/40">30-Day Window</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Seating Time Dropdown Trigger & Popover */}
      <div ref={timeContainerRef} className="relative space-y-1.5">
        <label className="text-[10px] tracking-[0.18em] uppercase text-[#c9973e] font-medium flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#c9973e]" />
            Seating Slot
          </span>
          <span
            className={`text-[9px] font-mono tracking-normal ${
              activeTimeInfo.status === 'popular'
                ? 'text-[#eab308]'
                : activeTimeInfo.status === 'limited'
                ? 'text-[#f97316]'
                : 'text-[#86efac]'
            }`}
          >
            {activeTimeInfo.status === 'popular'
              ? '🔥 Peak Service'
              : activeTimeInfo.status === 'limited'
              ? '⚡ Few Tables Left'
              : '✓ Plentiful Tables'}
          </span>
        </label>

        {/* Dropdown Button */}
        <button
          type="button"
          onClick={() => {
            setIsTimeOpen(!isTimeOpen);
            setIsDateOpen(false);
          }}
          className={`w-full flex items-center justify-between px-3 py-2.5 bg-white/[0.04] border-b rounded-xs transition-all duration-200 cursor-pointer ${
            isTimeOpen
              ? 'border-[#c9973e] bg-white/[0.07] shadow-lg shadow-[#c9973e]/10'
              : 'border-[#c9973e]/50 hover:border-[#c9973e]'
          }`}
        >
          <div className="flex items-center gap-2 text-left">
            <Clock className="w-3.5 h-3.5 text-[#c9973e]" />
            <span className="text-xs text-[#f5f0e8] font-medium">
              {selectedTime || '7:00 PM'}
            </span>
            <span className="text-[10px] text-[#f5f0e8]/50 font-light">
              ({activeTimeInfo.label})
            </span>
          </div>

          <ChevronDown
            className={`w-3.5 h-3.5 text-[#c9973e] transition-transform duration-200 ${
              isTimeOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Time Slots Popover Grid */}
        <AnimatePresence>
          {isTimeOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute top-full right-0 mt-2 z-50 w-[280px] sm:w-[310px] p-3.5 bg-[#0f0904] border border-[#c9973e]/60 rounded-sm shadow-2xl shadow-black/90 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(180deg, #140d07 0%, #0c0703 100%)',
              }}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2a1c10]">
                <span className="text-[9px] uppercase tracking-wider text-[#c9973e] font-semibold">
                  Select Seating Time:
                </span>
                <span className="text-[9px] text-[#f5f0e8]/50 font-mono">
                  {formattedSelectedDate}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 max-h-[220px] overflow-y-auto pr-0.5">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => {
                        onSelectTime(slot.time);
                        setIsTimeOpen(false);
                      }}
                      className={`p-2 rounded-xs border text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-[#c9973e] border-[#c9973e] text-[#0d0905] font-bold shadow-md'
                          : 'bg-[#18110a] border-[#3a2816] hover:border-[#c9973e]/60 text-[#f5f0e8]'
                      }`}
                    >
                      <span className="text-xs font-mono">{slot.time}</span>
                      <span
                        className={`text-[8px] uppercase tracking-wider mt-0.5 truncate ${
                          isSelected
                            ? 'text-[#0d0905]/90 font-semibold'
                            : slot.status === 'popular'
                            ? 'text-[#eab308]'
                            : slot.status === 'limited'
                            ? 'text-[#f97316]'
                            : 'text-[#86efac]'
                        }`}
                      >
                        {slot.status === 'popular'
                          ? '🔥 Peak'
                          : slot.status === 'limited'
                          ? '⚡ Few Left'
                          : '✓ Open'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#2a1c10] flex items-center gap-1.5 text-[9px] text-[#f5f0e8]/60">
                <Sparkles className="w-3 h-3 text-[#c9973e] shrink-0" />
                <span>Wood-fired grill tasting included with all seatings.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
