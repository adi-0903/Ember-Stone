import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Radio,
  ListMusic,
  Check,
  Heart,
  Loader2,
  ShieldCheck,
  Search,
  RotateCcw,
  Sparkles,
  Flame,
  Moon,
  Disc3,
  X,
  Sliders,
  Repeat
} from 'lucide-react';
import { BollywoodTrack } from '../types';
import { VIBE_CATEGORIES } from '../data/bollywoodTracks';
import { useMusicContext, SpeedMode } from '../context/MusicContext';

export default function HearthMusicPlayer() {
  const {
    playlist,
    currentTrackIndex,
    activeTrack,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    isLooping,
    speedMode,
    tapeHiss,
    fireCrackle,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    seekTo,
    setVolume,
    toggleMute,
    toggleLoop,
    setSpeedMode,
    setTapeHiss,
    setFireCrackle,
    searchSongs,
  } = useMusicContext();

  const [showDrawer, setShowDrawer] = useState(false);
  const [showVibePanel, setShowVibePanel] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BollywoodTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'curated' | 'search'>('curated');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Mixtapes');

  const searchTimeoutRef = useRef<number | null>(null);

  const seekRelative = (seconds: number) => {
    seekTo(currentTime + seconds);
  };

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    seekTo(parseFloat(e.target.value));
  };

  const POPULAR_SEARCH_CHIPS = [
    'Arijit Singh',
    'Tum Hi Ho',
    'Kesariya',
    'Atif Aslam',
    'Shreya Ghoshal',
    'Diljit Dosanjh',
    'Channa Mereya',
    'Mohit Chauhan',
  ];

  // Direct instant search trigger
  const executeSearch = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    setActiveTab('search');
    try {
      const results = await searchSongs(trimmed);
      setSearchResults(results);
    } finally {
      setIsSearching(false);
    }
  };

  // Search handler with debounce
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!val.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = window.setTimeout(async () => {
      executeSearch(val);
    }, 250);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekRelative(10);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekRelative(-10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, activeTrack, togglePlay, currentTime]);

  // Dynamic spool fullness calculation
  const progressRatio = duration > 0 ? currentTime / duration : 0;
  const leftSpoolRadius = 24 - progressRatio * 10;
  const rightSpoolRadius = 14 + progressRatio * 10;
  const tapeCounterVal = Math.floor(currentTime) % 1000;

  // Filtered playlist by category
  const filteredPlaylist =
    selectedCategory === 'All Mixtapes'
      ? playlist
      : playlist.filter((t) => t.category === selectedCategory);

  return (
    <div className="w-full max-w-2xl lg:max-w-3xl mx-auto text-left relative select-none">
      {/* AMBIENT HEARTH FIREPLACE GLOW AURA */}
      <div
        className={'absolute -inset-2 sm:-inset-4 rounded-2xl transition-all duration-1000 pointer-events-none ' + (
          isPlaying
            ? 'opacity-85 blur-2xl bg-radial from-[#c9973e]/28 via-[#ff7700]/12 to-transparent'
            : 'opacity-20 blur-xl bg-[#c9973e]/10'
        )}
      />

      {/* AUTHENTIC VINTAGE 90s CASSETTE DECK CHASSIS */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-gradient-to-b from-[#140c06] via-[#0d0804] to-[#070402] border-2 border-[#d4a044]/80 rounded-lg p-4 sm:p-5 shadow-2xl backdrop-blur-md overflow-hidden text-left"
        style={{
          boxShadow:
            '0 25px 50px -12px rgba(0,0,0,0.95), 0 0 35px rgba(212,160,68,0.22), inset 0 1px 1px rgba(255,230,170,0.25)',
        }}
      >
        {/* 4 Corner Metallic Screw Rivets */}
        <div className="absolute top-2 left-2 text-[#d4a044]/30 font-mono text-[9px] select-none">✛</div>
        <div className="absolute top-2 right-2 text-[#d4a044]/30 font-mono text-[9px] select-none">✛</div>
        <div className="absolute bottom-2 left-2 text-[#d4a044]/30 font-mono text-[9px] select-none">✛</div>
        <div className="absolute bottom-2 right-2 text-[#d4a044]/30 font-mono text-[9px] select-none">✛</div>

        {/* Top Deck Header: Brushed Gold Label, Vibe Badges & LED Counter */}
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#3d2714]/80">
          <div className="flex items-center space-x-2">
            <Radio className="w-3.5 h-3.5 text-[#d4a044] animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4a044] font-mono font-bold">
              SALOON CASSETTE DECK · 320KBPS BOLLYWOOD
            </span>
            <span className="hidden sm:inline-flex items-center space-x-1 px-1.5 py-0.2 text-[8px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 rounded-xs">
              <ShieldCheck className="w-2.5 h-2.5" />
              <span>LOSSLESS AUDIO</span>
            </span>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Playback Status Light */}
            <div className="flex items-center space-x-1.5 bg-black/80 px-2 py-0.5 border border-[#3d2714] rounded-xs">
              <span
                className={'w-1.5 h-1.5 rounded-full ' + (
                  isLoading
                    ? 'bg-amber-400 animate-ping'
                    : isPlaying
                    ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]'
                    : 'bg-[#d4a044]/40'
                )}
              />
              <span className="text-[8.5px] font-mono tracking-widest text-[#d4a044] uppercase font-semibold">
                {isLoading ? 'BUFFERING...' : isPlaying ? '● TAPE RUNNING' : 'STANDBY'}
              </span>
            </div>

            {/* Vintage Mechanical LED Tape Counter */}
            <div className="flex items-center space-x-1 bg-black px-2 py-0.5 border border-[#4a3118] rounded-xs shadow-inner">
              <span className="text-[7.5px] font-mono text-[#d4a044]/60 tracking-wider">TAPE</span>
              <span className="text-[10px] font-mono text-[#f5ba50] font-bold tracking-widest">
                {tapeCounterVal < 10 ? '00' + tapeCounterVal : tapeCounterVal < 100 ? '0' + tapeCounterVal : tapeCounterVal}
              </span>
            </div>
          </div>
        </div>

        {/* CASSETTE CHAMBER: Realistic Magnetic Spools, Album Art & Dynamic VU Meters */}
        <div className="bg-[#080402] border border-[#3d2714] rounded-xs p-3.5 sm:p-4 mb-3 flex flex-col sm:flex-row items-center gap-4 shadow-inner relative overflow-hidden">
          
          {/* Transparent Cassette Window with Realistic Dual Cog Spools & Magnetic Tape */}
          <div className="relative bg-gradient-to-b from-[#180f08] via-[#100905] to-[#0a0502] border-2 border-[#52371c] rounded-xs p-2.5 flex items-center space-x-2.5 shrink-0 shadow-lg group">
            
            {/* High-res Album Art Thumbnail with Gold Bevel */}
            {activeTrack.imageUrl ? (
              <div className="relative shrink-0">
                <img
                  src={activeTrack.imageUrl}
                  alt={activeTrack.title}
                  className="w-13 h-13 rounded-xs object-cover border border-[#6b4723] shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="w-13 h-13 rounded-xs bg-[#20140a] border border-[#52371c] flex items-center justify-center shrink-0">
                <Disc3 className="w-7 h-7 text-[#d4a044]/70" />
              </div>
            )}

            {/* Cassette Tape Reel Window with Left & Right Cog Wheels */}
            <div className="flex items-center space-x-1.5 bg-[#050301]/90 border border-[#422c16] px-2 py-1 rounded-xs">
              {/* Left Spool: Shrinks as song progresses */}
              <div className="relative flex items-center justify-center" style={{ width: '42px', height: '42px' }}>
                <div
                  className="absolute rounded-full bg-[#241407] border border-[#3d240d] transition-all duration-300"
                  style={{ width: (leftSpoolRadius * 1.5) + 'px', height: (leftSpoolRadius * 1.5) + 'px' }}
                />
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ repeat: Infinity, duration: 2.2 / speedMode, ease: 'linear' }}
                  className="relative w-7 h-7 rounded-full bg-[#d4a044] border-2 border-[#1c1107] flex items-center justify-center shadow-inner"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#0d0703] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#d4a044]" />
                  </div>
                  <div className="absolute w-full h-0.5 bg-[#1c1107]" />
                  <div className="absolute w-full h-0.5 bg-[#1c1107] rotate-60" />
                  <div className="absolute w-full h-0.5 bg-[#1c1107] -rotate-60" />
                </motion.div>
              </div>

              {/* Center Magnetic Tape Viewing Bridge */}
              <div className="w-6 h-3 bg-[#170e06] border-y border-[#3d2714] relative overflow-hidden flex items-center justify-center">
                <motion.div
                  animate={isPlaying ? { x: ['-60%', '60%', '-60%'] } : {}}
                  transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                  className="h-1 w-full bg-[#d4a044]/80 rounded-full"
                />
              </div>

              {/* Right Spool: Grows as song progresses */}
              <div className="relative flex items-center justify-center" style={{ width: '42px', height: '42px' }}>
                <div
                  className="absolute rounded-full bg-[#241407] border border-[#3d240d] transition-all duration-300"
                  style={{ width: (rightSpoolRadius * 1.5) + 'px', height: (rightSpoolRadius * 1.5) + 'px' }}
                />
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ repeat: Infinity, duration: 2.2 / speedMode, ease: 'linear' }}
                  className="relative w-7 h-7 rounded-full bg-[#d4a044] border-2 border-[#1c1107] flex items-center justify-center shadow-inner"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#0d0703] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#d4a044]" />
                  </div>
                  <div className="absolute w-full h-0.5 bg-[#1c1107]" />
                  <div className="absolute w-full h-0.5 bg-[#1c1107] rotate-60" />
                  <div className="absolute w-full h-0.5 bg-[#1c1107] -rotate-60" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Song Metadata + Cinematic Nostalgia Quote */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            {/* Movie Badge & Vibe Tag */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[#d4a044] mb-1">
              <Heart className="w-3 h-3 fill-current text-rose-400 shrink-0" />
              <span className="font-bold text-[#d4a044] truncate max-w-[240px]">
                {activeTrack.movie}
              </span>
              <span className="text-[#f5f0e8]/30">·</span>
              <span className="text-emerald-400 font-semibold">{activeTrack.year}</span>
              {speedMode !== 1.0 && (
                <span className="px-1 py-0.2 text-[8px] bg-purple-950/80 text-purple-300 border border-purple-800/80 rounded-xs">
                  {speedMode === 0.85 ? '🌙 SLOWED+REVERB' : '⚡ 1.15X SPEED'}
                </span>
              )}
            </div>

            {/* Song Title (Cormorant Garamond Serif Display) */}
            <h3
              className="text-xl sm:text-2xl lg:text-3xl font-normal text-[#fbf7ee] tracking-tight leading-snug mb-1 truncate"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {activeTrack.title}
            </h3>

            {/* Singers & Vocalists */}
            <p className="text-xs sm:text-sm text-[#f5f0e8]/85 font-light truncate mb-1">
              <span className="text-[#d4a044]/90 font-mono text-[10px] tracking-wider uppercase mr-1.5">
                ARTISTS:
              </span>
              {activeTrack.singers}
            </p>

            {/* Nostalgic Bollywood Quote Ticker */}
            {activeTrack.vibeQuote && (
              <p className="text-[11px] italic text-[#d4a044]/80 font-serif truncate">
                {activeTrack.vibeQuote}
              </p>
            )}
          </div>

          {/* Dual Stereo VU Meters */}
          <div className="hidden lg:flex flex-col items-end justify-center space-y-1.5 shrink-0 pl-2">
            <div className="bg-[#050301] border border-[#3d2714] p-1.5 rounded-xs space-y-1">
              {/* L Channel */}
              <div className="flex items-center space-x-1">
                <span className="text-[7.5px] font-mono text-[#d4a044]/70 w-2.5">L</span>
                <div className="flex items-center space-x-0.5 h-2.5">
                  {[20, 40, 60, 75, 85, 95, 100].map((_, idx) => {
                    const isPeak = idx >= 5;
                    return (
                      <motion.div
                        key={idx}
                        animate={
                          isPlaying
                            ? {
                                opacity: [0.3, Math.random() > 0.3 ? 1 : 0.4, 0.3],
                              }
                            : { opacity: 0.2 }
                        }
                        transition={{ repeat: Infinity, duration: 0.2 + idx * 0.05 }}
                        className={'w-1.5 h-2 rounded-xs ' + (isPeak ? 'bg-rose-500 shadow-[0_0_4px_#f43f5e]' : 'bg-[#d4a044]')}
                      />
                    );
                  })}
                </div>
              </div>

              {/* R Channel */}
              <div className="flex items-center space-x-1">
                <span className="text-[7.5px] font-mono text-[#d4a044]/70 w-2.5">R</span>
                <div className="flex items-center space-x-0.5 h-2.5">
                  {[25, 45, 65, 80, 90, 95, 100].map((_, idx) => {
                    const isPeak = idx >= 5;
                    return (
                      <motion.div
                        key={idx}
                        animate={
                          isPlaying
                            ? {
                                opacity: [0.3, Math.random() > 0.35 ? 1 : 0.4, 0.3],
                              }
                            : { opacity: 0.2 }
                        }
                        transition={{ repeat: Infinity, duration: 0.22 + idx * 0.04 }}
                        className={'w-1.5 h-2 rounded-xs ' + (isPeak ? 'bg-rose-500 shadow-[0_0_4px_#f43f5e]' : 'bg-[#d4a044]')}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <span className="text-[8px] font-mono text-[#d4a044]/70 tracking-wider">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* SCRUBBABLE MAGNETIC TIMELINE TRACKER */}
        <div className="bg-[#0a0603] border border-[#332010] rounded-xs px-3 py-2 mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-mono text-[#d4a044] min-w-[34px] font-semibold">
              {formatTime(currentTime)}
            </span>

            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="1"
                value={currentTime}
                onChange={handleSeekChange}
                className="w-full h-2 bg-[#26170c] rounded-lg appearance-none cursor-pointer accent-[#d4a044] focus:outline-none"
                aria-label="Track progress"
              />
            </div>

            <span className="text-[10px] font-mono text-[#f5f0e8]/50 min-w-[34px] text-right">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* TACTILE RETRO BUTTONS & VIBE CONTROLS TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          {/* Main Transport Mechanical Controls */}
          <div className="flex items-center space-x-1.5">
            {/* PREV TRACK */}
            <button
              onClick={prevTrack}
              className="p-2 sm:px-2.5 sm:py-2 bg-[#1b1209] hover:bg-[#281b0e] active:bg-[#0c0804] border border-[#4d3319] text-[#d4a044] hover:text-[#fbf7ee] rounded-xs transition-all cursor-pointer shadow-sm active:scale-95"
              title="Previous Track"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {/* REWIND 10s */}
            <button
              onClick={() => seekRelative(-10)}
              className="px-2.5 py-2 bg-[#1b1209] hover:bg-[#281b0e] active:bg-[#0c0804] border border-[#4d3319] text-[#d4a044] hover:text-[#fbf7ee] rounded-xs font-mono text-[9px] transition-all cursor-pointer shadow-sm active:scale-95"
              title="Rewind 10 Seconds"
            >
              -10s
            </button>

            {/* BIG VINTAGE PLAY / PAUSE BUTTON */}
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className={'px-4 sm:px-5 py-2.5 rounded-xs flex items-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-95 ' + (
                isPlaying
                  ? 'bg-[#e5b252] text-[#0d0804] shadow-[0_0_15px_rgba(229,178,82,0.4)]'
                  : 'bg-[#d4a044] hover:bg-[#e5b252] text-[#0d0804]'
              ) + (isLoading ? ' opacity-80' : '')}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0d0804]" />
                  <span className="text-[10px] font-mono tracking-widest font-bold uppercase">
                    BUFFERING...
                  </span>
                </>
              ) : isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span className="text-[10px] font-mono tracking-widest font-bold uppercase">
                    PAUSE TAPE
                  </span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span className="text-[10px] font-mono tracking-widest font-bold uppercase">
                    PLAY CASSETTE
                  </span>
                </>
              )}
            </button>

            {/* FORWARD 10s */}
            <button
              onClick={() => seekRelative(10)}
              className="px-2.5 py-2 bg-[#1b1209] hover:bg-[#281b0e] active:bg-[#0c0804] border border-[#4d3319] text-[#d4a044] hover:text-[#fbf7ee] rounded-xs font-mono text-[9px] transition-all cursor-pointer shadow-sm active:scale-95"
              title="Forward 10 Seconds"
            >
              +10s
            </button>

            {/* NEXT TRACK */}
            <button
              onClick={nextTrack}
              className="p-2 sm:px-2.5 sm:py-2 bg-[#1b1209] hover:bg-[#281b0e] active:bg-[#0c0804] border border-[#4d3319] text-[#d4a044] hover:text-[#fbf7ee] rounded-xs transition-all cursor-pointer shadow-sm active:scale-95"
              title="Next Track"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {/* LOOP TOGGLE */}
            <button
              onClick={toggleLoop}
              className={'p-2 rounded-xs border transition-all cursor-pointer shadow-sm ' + (
                isLooping
                  ? 'bg-[#d4a044]/20 border-[#d4a044] text-[#d4a044]'
                  : 'bg-[#1b1209] border-[#4d3319] text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
              )}
              title={isLooping ? 'Auto-Repeat Active' : 'Enable Repeat Track'}
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Toolbar: Volume, Analog Tone FX & Mixtape Drawer Button */}
          <div className="flex items-center space-x-2">
            {/* Master Volume Slider & Mute Toggle */}
            <div className="flex items-center space-x-1.5 bg-[#0a0502] border border-[#3d2714] px-2 py-1.5 rounded-xs">
              <button
                onClick={toggleMute}
                className="text-[#d4a044] hover:text-[#fbf7ee] transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-14 sm:w-20 h-1 bg-[#2b1c10] rounded-lg appearance-none cursor-pointer accent-[#d4a044]"
                aria-label="Volume slider"
              />
            </div>

            {/* Vibe & Tone Controls Toggle */}
            <button
              onClick={() => setShowVibePanel(!showVibePanel)}
              className={'px-2.5 py-1.5 rounded-xs border text-[9.5px] font-mono tracking-wider uppercase flex items-center space-x-1.5 transition-all cursor-pointer ' + (
                showVibePanel || tapeHiss || fireCrackle || speedMode !== 1.0
                  ? 'bg-[#d4a044]/20 border-[#d4a044] text-[#d4a044]'
                  : 'bg-[#1b1209] border-[#4d3319] text-[#f5f0e8]/80 hover:text-[#fbf7ee]'
              )}
            >
              <Sliders className="w-3 h-3" />
              <span className="hidden sm:inline">ANALOG VIBE</span>
            </button>

            {/* OPEN MIXTAPE & SEARCH DRAWER BUTTON */}
            <button
              onClick={() => setShowDrawer(!showDrawer)}
              className={'px-3 py-1.5 rounded-xs border text-[9.5px] font-mono tracking-wider uppercase flex items-center space-x-1.5 transition-all cursor-pointer ' + (
                showDrawer
                  ? 'bg-[#d4a044] text-[#0d0804] border-[#d4a044] font-bold'
                  : 'bg-[#2a1a0d] hover:bg-[#3d2714] border-[#59391b] text-[#f5ba50]'
              )}
            >
              <ListMusic className="w-3.5 h-3.5" />
              <span>CASSETTE VAULT</span>
            </button>
          </div>
        </div>

        {/* EXPANDABLE ANALOG TEXTURE & ACOUSTIC MODULATION PANEL */}
        <AnimatePresence>
          {showVibePanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 pt-3 border-t border-[#3d2714]/80 overflow-hidden"
            >
              <div className="bg-[#080402] border border-[#3d2714] p-3 rounded-xs flex flex-wrap items-center justify-between gap-3 text-[10px]">
                {/* 1. Vintage Magnetic Tape Hiss */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setTapeHiss((prev) => !prev)}
                    className={'px-2.5 py-1 rounded-xs border font-mono tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer ' + (
                      tapeHiss
                        ? 'bg-[#d4a044]/20 border-[#d4a044] text-[#d4a044]'
                        : 'bg-[#140c06] border-[#3d2714] text-[#f5f0e8]/40 hover:text-[#f5f0e8]'
                    )}
                  >
                    <Disc3 className={'w-3 h-3 ' + (tapeHiss && isPlaying ? 'animate-spin' : '')} />
                    <span>📼 TAPE HISS NOISE: {tapeHiss ? 'ACTIVE (3%)' : 'MUTED'}</span>
                  </button>
                </div>

                {/* 2. Hearth Wood-Fire Crackle Noise */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setFireCrackle((prev) => !prev)}
                    className={'px-2.5 py-1 rounded-xs border font-mono tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer ' + (
                      fireCrackle
                        ? 'bg-[#ff6a00]/20 border-[#ff6a00] text-[#ff9040]'
                        : 'bg-[#140c06] border-[#3d2714] text-[#f5f0e8]/40 hover:text-[#f5f0e8]'
                    )}
                  >
                    <Flame className={'w-3 h-3 ' + (fireCrackle ? 'animate-pulse text-[#ff9040]' : '')} />
                    <span>🔥 WOOD FIRE CRACKLE: {fireCrackle ? 'BURNING (6%)' : 'OFF'}</span>
                  </button>
                </div>

                {/* 3. Tape Speed Modulation Preset */}
                <div className="flex items-center space-x-1.5">
                  <span className="font-mono text-[#d4a044]/70 uppercase">SPEED PRESET:</span>
                  <div className="flex items-center space-x-1 bg-[#100904] p-0.5 border border-[#3d2714] rounded-xs">
                    <button
                      onClick={() => setSpeedMode(0.85)}
                      className={'px-2 py-0.5 rounded-xs font-mono text-[9px] transition-all cursor-pointer ' + (
                        speedMode === 0.85
                          ? 'bg-purple-900/80 border border-purple-500 text-purple-200'
                          : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
                      )}
                    >
                      🌙 SLOWED (0.85x)
                    </button>
                    <button
                      onClick={() => setSpeedMode(1.0)}
                      className={'px-2 py-0.5 rounded-xs font-mono text-[9px] transition-all cursor-pointer ' + (
                        speedMode === 1.0
                          ? 'bg-[#d4a044] text-[#0d0804] font-bold'
                          : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
                      )}
                    >
                      ✦ 1.0x STUDIO
                    </button>
                    <button
                      onClick={() => setSpeedMode(1.15)}
                      className={'px-2 py-0.5 rounded-xs font-mono text-[9px] transition-all cursor-pointer ' + (
                        speedMode === 1.15
                          ? 'bg-emerald-900/80 border border-emerald-500 text-emerald-200'
                          : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
                      )}
                    >
                      ⚡ 1.15x FAST
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            SLIDE-DOWN CASSETTE VAULT & SEARCH DRAWER
        ========================================================================= */}
        <AnimatePresence>
          {showDrawer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 pt-4 border-t-2 border-[#4d3319] overflow-hidden"
            >
              <div className="bg-[#090502] border border-[#3d2714] rounded-xs p-3.5 sm:p-4">
                {/* Search Bar & Drawer Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3.5 pb-3 border-b border-[#301e10]">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveTab('curated')}
                      className={'px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded-xs transition-all cursor-pointer ' + (
                        activeTab === 'curated'
                          ? 'bg-[#d4a044] text-[#0d0804] font-bold'
                          : 'bg-[#180f08] text-[#f5f0e8]/60 hover:text-[#fbf7ee] border border-[#3d2714]'
                      )}
                    >
                      ✦ Curated Cassettes ({playlist.length})
                    </button>

                    <button
                      onClick={() => setActiveTab('search')}
                      className={'px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded-xs transition-all cursor-pointer ' + (
                        activeTab === 'search'
                          ? 'bg-[#d4a044] text-[#0d0804] font-bold'
                          : 'bg-[#180f08] text-[#f5f0e8]/60 hover:text-[#fbf7ee] border border-[#3d2714]'
                      )}
                    >
                      🔍 Search Song Library
                    </button>
                  </div>

                  {/* Instant Song Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#d4a044]/60" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search Arijit, KK, Kishore..."
                      className="w-full bg-[#140c06] border border-[#4d3319] focus:border-[#d4a044] text-[#fbf7ee] placeholder-[#f5f0e8]/30 text-xs pl-8 pr-7 py-1.5 rounded-xs outline-none transition-colors"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => handleSearchChange('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#d4a044]/60 hover:text-[#fbf7ee]"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Popular Quick-Search Suggestions */}
                {activeTab === 'search' && (
                  <div className="mb-3 flex flex-wrap items-center gap-1.5 text-[9px] font-mono">
                    <span className="text-[#d4a044]/60 mr-1">POPULAR:</span>
                    {POPULAR_SEARCH_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => {
                          setSearchQuery(chip);
                          executeSearch(chip);
                        }}
                        className="px-2 py-0.5 bg-[#140c06] hover:bg-[#28180c] border border-[#3d2714] text-[#d4a044] rounded-xs transition-colors cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}

                {/* Curated Vibe Categories Tabs */}
                {activeTab === 'curated' && !searchQuery && (
                  <div className="mb-3 flex flex-wrap gap-1.5 pb-1 overflow-x-auto">
                    {VIBE_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={'px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase rounded-xs transition-all whitespace-nowrap cursor-pointer ' + (
                          selectedCategory === cat
                            ? 'bg-[#d4a044]/20 border border-[#d4a044] text-[#d4a044] font-semibold'
                            : 'bg-[#140c06] border border-[#2d1c0f] text-[#f5f0e8]/50 hover:text-[#fbf7ee]'
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}

                {/* Cassette Tape Track List */}
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  {isSearching ? (
                    <div className="py-8 text-center text-xs font-mono text-[#d4a044] flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Scanning Lossless Indian Audio Archive...</span>
                    </div>
                  ) : activeTab === 'search' && searchResults.length === 0 && searchQuery ? (
                    <div className="py-8 text-center text-xs text-[#f5f0e8]/50 font-mono">
                      No recordings found for "{searchQuery}". Try searching artist names like Arijit, Sonu Nigam, or Alka Yagnik.
                    </div>
                  ) : (
                    (activeTab === 'search' ? searchResults : filteredPlaylist).map((track, idx) => {
                      const isCurrent =
                        activeTrack.id === track.id || activeTrack.audioUrl === track.audioUrl;
                      return (
                        <div
                          key={track.id || idx}
                          onClick={() => playTrack(track)}
                          className={'p-2 rounded-xs border flex items-center justify-between transition-all cursor-pointer group ' + (
                            isCurrent
                              ? 'bg-[#2d1c0e] border-[#d4a044] text-[#fbf7ee] shadow-sm'
                              : 'bg-[#120b06] border-[#291b0f] hover:border-[#4d3319] hover:bg-[#1c120a] text-[#f5f0e8]/80'
                          )}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            {/* Track Index or Playing Indicator */}
                            <span className="text-[10px] font-mono text-[#d4a044]/60 w-5 text-center shrink-0">
                              {isCurrent && isPlaying ? (
                                <Disc3 className="w-3.5 h-3.5 animate-spin text-[#d4a044] mx-auto" />
                              ) : (
                                idx + 1
                              )}
                            </span>

                            {/* Mini Album Cover */}
                            {track.imageUrl && (
                              <img
                                src={track.imageUrl}
                                alt={track.title}
                                className="w-8 h-8 rounded-xs object-cover border border-[#422c16] shrink-0"
                                referrerPolicy="no-referrer"
                              />
                            )}

                            {/* Title, Movie & Artists */}
                            <div className="min-w-0">
                              <div className="flex items-center space-x-2">
                                <p className={'text-xs font-medium truncate ' + (isCurrent ? 'text-[#d4a044]' : 'text-[#fbf7ee]')}>
                                  {track.title}
                                </p>
                                {track.year && (
                                  <span className="text-[8.5px] font-mono text-[#f5f0e8]/40 shrink-0">
                                    ({track.year})
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-[#f5f0e8]/50 truncate">
                                {track.movie} · {track.singers}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 shrink-0">
                            {track.category && (
                              <span className="hidden sm:inline-block px-1.5 py-0.2 text-[8px] font-mono uppercase bg-[#1e130a] text-[#d4a044]/80 border border-[#3d2714] rounded-xs">
                                {track.category}
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-[#f5f0e8]/40">
                              {track.durationFormatted || '4:30'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playTrack(track);
                              }}
                              className="p-1 text-[#d4a044] opacity-0 group-hover:opacity-100 hover:text-[#fbf7ee] transition-all"
                            >
                              <Play className="w-3 h-3 fill-current" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
