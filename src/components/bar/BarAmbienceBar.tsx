import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Flame, GlassWater, Sparkles, Music, Moon, Sun } from 'lucide-react';
import { barAudio } from '../../utils/barAudio';

interface BarAmbienceBarProps {
  barMood: 'candlelight' | 'golden' | 'midnight';
  onMoodChange: (mood: 'candlelight' | 'golden' | 'midnight') => void;
}

export default function BarAmbienceBar({ barMood, onMoodChange }: BarAmbienceBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(65);
  const [currentPreset, setCurrentPreset] = useState<'hearth' | 'speakeasy' | 'aperitivo'>('hearth');
  const [showToastFeedback, setShowToastFeedback] = useState(false);

  useEffect(() => {
    barAudio.setMasterVolume(volume / 100);
  }, [volume]);

  useEffect(() => {
    return () => {
      barAudio.stopAtmosphere();
    };
  }, []);

  const handleTogglePlay = (preset = currentPreset) => {
    if (isPlaying && preset === currentPreset) {
      barAudio.stopAtmosphere();
      setIsPlaying(false);
    } else {
      barAudio.startAtmosphere(preset);
      setCurrentPreset(preset);
      setIsPlaying(true);
    }
  };

  const handleCheers = () => {
    barAudio.playGlassToast(0.4);
    setShowToastFeedback(true);
    setTimeout(() => setShowToastFeedback(false), 2000);
  };

  return (
    <div className="sticky top-20 z-40 w-full bg-[#0d0905]/90 backdrop-blur-md border-y border-[#3a2816]/80 shadow-2xl py-2.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Atmospheric Soundscape Engine */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleTogglePlay()}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border cursor-pointer ${
              isPlaying
                ? 'bg-[#c9973e] text-[#0d0905] border-[#c9973e] font-semibold shadow-lg shadow-[#c9973e]/20'
                : 'bg-[#140e08] text-[#f5f0e8]/80 border-[#3a2816] hover:border-[#c9973e]/50'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#0d0905]" />
                <span className="text-[11px] tracking-wider uppercase font-mono">Bar Soundscape Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#c9973e]" />
                <span className="text-[11px] tracking-wider uppercase font-mono">Enable Bar Audio</span>
              </>
            )}
          </button>

          {/* Sound Presets */}
          <div className="hidden sm:flex items-center gap-1.5 bg-black/40 p-0.5 rounded-full border border-[#3a2816]">
            <button
              onClick={() => handleTogglePlay('hearth')}
              className={`px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                isPlaying && currentPreset === 'hearth'
                  ? 'bg-[#c9973e]/20 text-[#c9973e] border border-[#c9973e]/40 font-medium'
                  : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
              }`}
            >
              🔥 Hearth Fire
            </button>
            <button
              onClick={() => handleTogglePlay('speakeasy')}
              className={`px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                isPlaying && currentPreset === 'speakeasy'
                  ? 'bg-[#c9973e]/20 text-[#c9973e] border border-[#c9973e]/40 font-medium'
                  : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
              }`}
            >
              🍸 Speakeasy Drone
            </button>
            <button
              onClick={() => handleTogglePlay('aperitivo')}
              className={`px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                isPlaying && currentPreset === 'aperitivo'
                  ? 'bg-[#c9973e]/20 text-[#c9973e] border border-[#c9973e]/40 font-medium'
                  : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
              }`}
            >
              ✨ Soft Clinks
            </button>
          </div>

          {/* Volume Slider */}
          {isPlaying && (
            <div className="hidden md:flex items-center gap-2 text-[#c9973e]">
              <input
                type="range"
                min="10"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 sm:w-20 accent-[#c9973e] h-1 bg-[#3a2816] rounded-lg cursor-pointer"
                aria-label="Bar ambience volume"
              />
              <span className="text-[10px] font-mono text-[#f5f0e8]/60">{volume}%</span>
            </div>
          )}
        </div>

        {/* Center: Live Bar Radar Indicator */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-[#f5f0e8]/75 font-light">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[#c9973e]">4 Bar Stools Open</span>
          </span>
          <span className="text-[#3a2816]">|</span>
          <span>Room Temp: <strong className="text-[#f5f0e8] font-normal">71°F by the Fire</strong></span>
          <span className="text-[#3a2816]">|</span>
          <span>Aroma: <strong className="text-[#f5f0e8] font-normal">Roasted Hickory & Saffron</strong></span>
        </div>

        {/* Right: Lighting Mood & Interactive Toast */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cheers / Glass Clink Button */}
          <button
            onClick={handleCheers}
            className="relative px-3 py-1 bg-[#18110a] hover:bg-[#20160d] border border-[#c9973e]/40 rounded-full text-[#c9973e] text-[10px] sm:text-[11px] tracking-wider uppercase flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            title="Clink a crystal glass at the Hearth Bar!"
          >
            <Sparkles className="w-3 h-3 text-[#c9973e]" />
            <span>Clink Glass (Cheers!)</span>
            {showToastFeedback && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#c9973e] text-[#0d0905] text-[9px] font-bold rounded-full shadow-lg whitespace-nowrap animate-bounce">
                🥂 Clink!
              </span>
            )}
          </button>

          {/* Bar Lighting Mood Selector */}
          <div className="flex items-center bg-[#140e08] border border-[#3a2816] rounded-full p-0.5">
            <button
              onClick={() => onMoodChange('candlelight')}
              title="1800K Warm Candlelight Mood"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                barMood === 'candlelight'
                  ? 'bg-[#c9973e] text-[#0d0905]'
                  : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onMoodChange('golden')}
              title="Golden Hour Sunset Mood"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                barMood === 'golden'
                  ? 'bg-[#c9973e] text-[#0d0905]'
                  : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onMoodChange('midnight')}
              title="Midnight Speakeasy Velvet Mood"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                barMood === 'midnight'
                  ? 'bg-[#c9973e] text-[#0d0905]'
                  : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
