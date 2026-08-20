import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Flame, Volume2, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { BAR_SEAT_AREAS, BarSeatArea } from '../../data/barData';

interface BarSeatRadarProps {
  onSelectBooth: () => void;
}

export default function BarSeatRadar({ onSelectBooth }: BarSeatRadarProps) {
  const [selectedArea, setSelectedArea] = useState<BarSeatArea>(BAR_SEAT_AREAS[0]);

  return (
    <section id="bar-seating" className="py-24 sm:py-32 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-b border-[#3a2816]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#c9973e]/10 border border-[#c9973e]/30 rounded-full text-[10px] uppercase tracking-widest text-[#c9973e] mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#c9973e]" />
          <span>Live Bar Floorplan & Atmosphere Radar</span>
        </div>
        <h2
          className="text-3xl sm:text-5xl font-light text-[#f5f0e8] tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Find Your Seat by the Hearth
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#f5f0e8]/75 font-light leading-relaxed">
          The 18-seat solid walnut bar is permanently kept for walk-ins without reservations. Explore seating zones tailored for conversation, vinyl listening, or date night.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 5 Cols: Seating Zone List */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          {BAR_SEAT_AREAS.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area)}
              className={`w-full p-5 text-left rounded-xs border transition-all cursor-pointer relative overflow-hidden ${
                selectedArea.id === area.id
                  ? 'bg-[#181009] border-[#c9973e] shadow-xl shadow-[#c9973e]/10'
                  : 'bg-[#110b06] border-[#3a2816] hover:border-[#c9973e]/40'
              }`}
            >
              {selectedArea.id === area.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9973e]" />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9973e]">
                  {area.vibe}
                </span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase font-semibold ${
                    area.currentStatus.includes('Open')
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  ● {area.currentStatus}
                </span>
              </div>

              <h3
                className="text-xl font-light text-[#f5f0e8] mb-1"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {area.name}
              </h3>

              <div className="flex items-center gap-4 text-xs text-[#f5f0e8]/60 font-light mt-2">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#c9973e]" />
                  {area.capacity}
                </span>
                <span>·</span>
                <span className="text-[#c9973e] font-mono">{area.availableSpots} spots available now</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right 7 Cols: Detailed Area Spotlight */}
        <div className="lg:col-span-7 bg-[#120c07] border border-[#3a2816] rounded-xs p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="space-y-6">
            {/* Visual Photo */}
            <div className="relative h-64 sm:h-72 w-full rounded-xs overflow-hidden border border-[#3a2816]">
              <img
                src={selectedArea.image}
                alt={selectedArea.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0905] via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9973e] bg-black/60 px-2 py-1 rounded-xs backdrop-blur-sm">
                    Zone Perspective
                  </span>
                  <h4
                    className="text-2xl sm:text-3xl font-light text-[#f5f0e8] mt-1"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {selectedArea.name}
                  </h4>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#f5f0e8]/80 font-light leading-relaxed">
              {selectedArea.description}
            </p>

            {/* Spec Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-black/40 border border-[#3a2816] rounded-xs text-xs">
              <div>
                <div className="text-[10px] uppercase font-mono text-[#c9973e] mb-1">🕯️ Lighting</div>
                <div className="text-[#f5f0e8] font-light text-[11px]">{selectedArea.lighting}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-[#c9973e] mb-1">🎶 Acoustics</div>
                <div className="text-[#f5f0e8] font-light text-[11px]">{selectedArea.soundLevel}</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-[10px] uppercase font-mono text-[#c9973e] mb-1">✨ Best Suited For</div>
                <div className="text-[#f5f0e8] font-light text-[11px]">{selectedArea.bestFor}</div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 mt-6 border-t border-[#3a2816] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#f5f0e8]/60 font-light">
              Walk-in seating prioritized at the bar. Booth reservations held for 15 mins.
            </div>

            <button
              onClick={onSelectBooth}
              className="px-6 py-3 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[11px] font-semibold tracking-wider uppercase rounded-xs transition-all shadow-lg shadow-[#c9973e]/20 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Reserve a Booth / Stool</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
