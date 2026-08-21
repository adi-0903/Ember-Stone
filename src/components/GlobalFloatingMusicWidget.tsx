import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc3,
  Flame,
  ChevronUp,
  ChevronDown,
  X,
  Radio,
  Search,
  Sliders,
  ListMusic,
  ExternalLink,
  Repeat
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useMusicContext, SpeedMode } from '../context/MusicContext';
import { VIBE_CATEGORIES } from '../data/bollywoodTracks';

export default function GlobalFloatingMusicWidget() {
  const {
    activeTrack,
    playlist,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLooping,
    speedMode,
    tapeHiss,
    fireCrackle,
    isExpanded,
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
    setIsExpanded,
    searchSongs,
  } = useMusicContext();

  const [activeCategory, setActiveCategory] = useState<string>('All Mixtapes');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof playlist>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showVibeControls, setShowVibeControls] = useState(false);
  const [showSearchVault, setShowSearchVault] = useState(false);

  const searchTimeoutRef = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!val.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = window.setTimeout(async () => {
      const res = await searchSongs(val);
      setSearchResults(res);
      setIsSearching(false);
    }, 250);
  };

  const toggleSearchVault = () => {
    const nextState = !showSearchVault;
    setShowSearchVault(nextState);
    if (nextState) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  };

  const displayedList = searchQuery.trim()
    ? searchResults
    : activeCategory === 'All Mixtapes'
    ? playlist
    : playlist.filter((t) => t.category === activeCategory);

  return (
    <div className="fixed bottom-5 left-5 z-40 select-none print:hidden max-w-[calc(100vw-2.5rem)] sm:max-w-md">
      {/* EXPANDED MINI LOUNGE PLAYER MODAL */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-3 w-[330px] sm:w-[360px] bg-[#110b06]/98 border border-[#c9973e]/60 rounded-xl shadow-2xl shadow-black/90 backdrop-blur-xl overflow-hidden flex flex-col max-h-[580px] text-[#f5f0e8]"
          >
            {/* Header */}
            <div className="p-3 bg-gradient-to-r from-[#180f08] via-[#120a05] to-[#180f08] border-b border-[#3a2816] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#c9973e]/20 border border-[#c9973e]/50 flex items-center justify-center text-[#c9973e]">
                  <Flame className="w-3 h-3 text-[#d4a044] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-[11px] font-medium tracking-widest uppercase text-[#f5f0e8] font-mono leading-tight">
                    Hearth Lounge Audio
                  </h4>
                  <p className="text-[8.5px] tracking-wider text-[#c9973e] uppercase leading-tight">
                    Lossless Bollywood & Vinyl Warmth
                  </p>
                </div>
              </div>

              {/* Action Icons in Header: Search Toggle, Vibe Sliders, Minimize */}
              <div className="flex items-center gap-1.5">
                {/* Search / Cassette Library Toggle Button */}
                <button
                  onClick={toggleSearchVault}
                  className={`p-1.5 rounded-md border text-[10px] transition-all cursor-pointer flex items-center gap-1 ${
                    showSearchVault
                      ? 'bg-[#c9973e] text-[#0d0905] border-[#c9973e] font-bold shadow-sm'
                      : 'bg-[#18110a] text-[#f5f0e8]/70 border-[#3a2816] hover:text-[#c9973e] hover:border-[#c9973e]/60'
                  }`}
                  title={showSearchVault ? 'Hide Search Library' : 'Search Songs & Playlists'}
                >
                  <Search className="w-3 h-3" />
                  <span className="text-[9px] font-mono uppercase hidden xs:inline">
                    {showSearchVault ? 'Close' : 'Search'}
                  </span>
                </button>

                {/* Vibe / Ambience Controls */}
                <button
                  onClick={() => setShowVibeControls(!showVibeControls)}
                  className={`p-1.5 rounded-md border text-[10px] transition-colors cursor-pointer ${
                    showVibeControls
                      ? 'bg-[#c9973e] text-[#0d0905] border-[#c9973e]'
                      : 'bg-[#18110a] text-[#f5f0e8]/70 border-[#3a2816] hover:text-[#c9973e] hover:border-[#c9973e]/60'
                  }`}
                  title="Ambiance & Speed Controls"
                >
                  <Sliders className="w-3 h-3" />
                </button>

                {/* Minimize Modal */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-md bg-[#18110a] text-[#f5f0e8]/60 hover:text-[#c9973e] border border-[#3a2816] hover:border-[#c9973e]/60 transition-colors cursor-pointer"
                  title="Minimize Player"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Vibe & Sound FX Panel (Collapsible) */}
            <AnimatePresence>
              {showVibeControls && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-[#0e0703] border-b border-[#3a2816] p-3 space-y-2 text-xs overflow-hidden"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#c9973e]">
                    <span>ANALOG VINYL TEXTURES</span>
                    <span>432Hz HARMONICS</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTapeHiss((prev) => !prev)}
                      className={`p-1.5 rounded-xs border text-[10px] uppercase font-mono tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                        tapeHiss
                          ? 'bg-[#c9973e]/20 border-[#c9973e] text-[#c9973e]'
                          : 'bg-[#140e08] border-[#3a2816] text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
                      }`}
                    >
                      <span>📼 Tape Hiss</span>
                      <span className="text-[9px] font-bold">{tapeHiss ? 'ON' : 'OFF'}</span>
                    </button>

                    <button
                      onClick={() => setFireCrackle((prev) => !prev)}
                      className={`p-1.5 rounded-xs border text-[10px] uppercase font-mono tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                        fireCrackle
                          ? 'bg-[#c9973e]/20 border-[#c9973e] text-[#c9973e]'
                          : 'bg-[#140e08] border-[#3a2816] text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
                      }`}
                    >
                      <span>🔥 Wood Fire</span>
                      <span className="text-[9px] font-bold">{fireCrackle ? 'ON' : 'OFF'}</span>
                    </button>
                  </div>

                  {/* Playback Pitch/Speed */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9.5px] text-[#f5f0e8]/60 font-mono">Speed Preset:</span>
                    <div className="flex gap-1">
                      {([0.85, 1.0, 1.15] as SpeedMode[]).map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setSpeedMode(spd)}
                          className={`px-2 py-0.5 text-[9px] font-mono rounded-xs border transition-all cursor-pointer ${
                            speedMode === spd
                              ? 'bg-[#c9973e] text-[#0d0905] border-[#c9973e] font-bold'
                              : 'bg-[#140e08] border-[#3a2816] text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
                          }`}
                        >
                          {spd === 0.85 ? 'Slowed' : spd === 1.0 ? '1.0x' : '1.15x'}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Currently Playing Card */}
            <div className="p-3 bg-[#140c07] border-b border-[#3a2816]/70 flex items-center gap-3">
              {/* Cover Art / Spinning Disc */}
              <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden border border-[#c9973e]/40 bg-black shadow-md">
                <img
                  src={activeTrack.imageUrl}
                  alt={activeTrack.title}
                  className={`w-full h-full object-cover ${
                    isPlaying ? 'scale-105' : 'opacity-80'
                  } transition-transform duration-500`}
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border border-[#c9973e] bg-black/60 flex items-center justify-center">
                      <Disc3 className="w-3.5 h-3.5 text-[#d4a044] animate-spin" style={{ animationDuration: '4s' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[13px] font-medium text-[#f5f0e8] truncate">
                    {activeTrack.title}
                  </h4>
                  {activeTrack.year && (
                    <span className="text-[8.5px] px-1 py-0.2 bg-[#c9973e]/20 text-[#c9973e] rounded-xs font-mono shrink-0">
                      {activeTrack.year}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#c9973e] truncate font-serif italic">
                  {activeTrack.movie}
                </p>
                <p className="text-[9.5px] text-[#f5f0e8]/50 truncate">
                  {activeTrack.singers}
                </p>
              </div>
            </div>

            {/* Progress Bar & Main Transport Controls */}
            <div className="p-3 bg-[#0f0905] space-y-2">
              {/* Seek Bar */}
              <div className="space-y-1">
                <div className="relative flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => seekTo(parseFloat(e.target.value))}
                    className="w-full h-1 bg-[#2b1c10] rounded-lg appearance-none cursor-pointer accent-[#c9973e]"
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-[#f5f0e8]/50">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Buttons */}
              <div className="flex items-center justify-between">
                {/* Loop */}
                <button
                  onClick={toggleLoop}
                  className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                    isLooping ? 'text-[#c9973e]' : 'text-[#f5f0e8]/40 hover:text-[#f5f0e8]'
                  }`}
                  title="Loop Track"
                >
                  <Repeat className="w-3.5 h-3.5" />
                </button>

                {/* Center transport */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevTrack}
                    className="p-1.5 text-[#f5f0e8]/70 hover:text-[#c9973e] transition-colors cursor-pointer"
                    title="Previous"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] flex items-center justify-center shadow-lg shadow-[#c9973e]/25 transition-transform hover:scale-105 cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={nextTrack}
                    className="p-1.5 text-[#f5f0e8]/70 hover:text-[#c9973e] transition-colors cursor-pointer"
                    title="Next"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* Volume & Mute */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleMute}
                    className="p-1 text-[#f5f0e8]/60 hover:text-[#c9973e] transition-colors cursor-pointer"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-3.5 h-3.5 text-[#c9973e]" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-14 h-1 bg-[#2b1c10] rounded-lg appearance-none cursor-pointer accent-[#c9973e]"
                  />
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS BAR (Opens Search or opens Bar Page) */}
            {!showSearchVault && (
              <div className="px-3 py-2 bg-[#120a05] border-t border-[#3a2816] flex items-center justify-between">
                <button
                  onClick={toggleSearchVault}
                  className="text-[10px] uppercase font-mono tracking-wider text-[#c9973e] hover:text-[#e5b252] flex items-center gap-1.5 py-0.5 transition-colors cursor-pointer"
                >
                  <Search className="w-3 h-3" />
                  <span>Search & Cassette Library ({playlist.length})</span>
                </button>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-[9.5px] font-mono text-[#f5f0e8]/40 hover:text-[#f5f0e8] uppercase"
                >
                  Close
                </button>
              </div>
            )}

            {/* =========================================================
                COLLAPSIBLE SEARCH & CASSETTE VAULT (ONLY OPENS ON CLICK)
            ========================================================= */}
            <AnimatePresence>
              {showSearchVault && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-[#3a2816] flex flex-col overflow-hidden bg-[#0c0704]"
                >
                  {/* Search Header */}
                  <div className="p-2.5 bg-[#120a05] border-b border-[#3a2816]/70 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#c9973e] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                        <ListMusic className="w-3 h-3" />
                        <span>Search Cassette Vault</span>
                      </span>
                      <button
                        onClick={() => setShowSearchVault(false)}
                        className="text-[9.5px] font-mono text-[#f5f0e8]/50 hover:text-[#c9973e] uppercase flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                        <span>Close Search</span>
                      </button>
                    </div>

                    {/* Search Input */}
                    <div className="relative">
                      <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#c9973e]/70" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search songs, movies, artists (Arijit, KK...)"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full bg-[#070402] border border-[#3a2816] rounded-xs pl-7 pr-7 py-1.5 text-xs text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-[#c9973e]"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => handleSearch('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#f5f0e8]/50 hover:text-[#f5f0e8]"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Vibe Category Chips */}
                    {!searchQuery && (
                      <div className="flex gap-1 overflow-x-auto pb-1 custom-scrollbar">
                        {VIBE_CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider rounded-xs whitespace-nowrap transition-all cursor-pointer ${
                              activeCategory === cat
                                ? 'bg-[#c9973e] text-[#0d0905] font-bold'
                                : 'bg-[#181009] border border-[#3a2816] text-[#f5f0e8]/60 hover:text-[#f5f0e8]'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Scrollable Track List */}
                  <div className="overflow-y-auto max-h-44 p-2 space-y-1 bg-[#070402] custom-scrollbar">
                    {isSearching ? (
                      <div className="py-5 text-center text-xs text-[#c9973e] font-mono animate-pulse">
                        Searching lossless library...
                      </div>
                    ) : displayedList.length === 0 ? (
                      <div className="py-5 text-center text-xs text-[#f5f0e8]/40">
                        No tracks found. Try searching another artist or film.
                      </div>
                    ) : (
                      displayedList.map((track, idx) => {
                        const isCurrent = activeTrack.id === track.id || activeTrack.audioUrl === track.audioUrl;
                        return (
                          <button
                            key={track.id || idx}
                            onClick={() => playTrack(track)}
                            className={`w-full text-left p-1.5 rounded-xs flex items-center justify-between gap-2 transition-all group cursor-pointer ${
                              isCurrent
                                ? 'bg-[#c9973e]/15 border border-[#c9973e]/50 text-[#c9973e]'
                                : 'hover:bg-[#181009] border border-transparent text-[#f5f0e8]/80'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="w-4 text-[9.5px] font-mono text-[#f5f0e8]/40 text-center">
                                {isCurrent && isPlaying ? (
                                  <span className="flex gap-0.5 items-end justify-center h-2.5">
                                    <span className="w-0.5 bg-[#c9973e] h-full animate-bounce" />
                                    <span className="w-0.5 bg-[#c9973e] h-2/3 animate-bounce" style={{ animationDelay: '0.15s' }} />
                                    <span className="w-0.5 bg-[#c9973e] h-4/5 animate-bounce" style={{ animationDelay: '0.3s' }} />
                                  </span>
                                ) : (
                                  idx + 1
                                )}
                              </span>
                              <div className="min-w-0">
                                <p className={`text-[11.5px] truncate font-medium ${isCurrent ? 'text-[#c9973e]' : 'text-[#f5f0e8]'}`}>
                                  {track.title}
                                </p>
                                <p className="text-[9px] text-[#f5f0e8]/50 truncate">
                                  {track.movie} • {track.singers}
                                </p>
                              </div>
                            </div>

                            <span className="text-[9.5px] font-mono text-[#f5f0e8]/40 shrink-0">
                              {track.durationFormatted || '4:30'}
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Direct Link to Hearth Bar */}
            {location.pathname !== '/bar' && (
              <div className="p-2.5 bg-[#120a05] border-t border-[#3a2816] flex items-center justify-between">
                <Link
                  to="/bar"
                  onClick={() => setIsExpanded(false)}
                  className="text-[10px] uppercase font-mono tracking-wider text-[#c9973e] hover:underline flex items-center gap-1.5"
                >
                  <Radio className="w-3 h-3" />
                  <span>Open Saloon Cassette Deck in Bar</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </Link>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-[9px] text-[#f5f0e8]/40 hover:text-[#f5f0e8] uppercase tracking-wider"
                >
                  Minimize
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPACT FLOATING MUSIC BADGE / PILL */}
      <motion.div
        id="floating-music-pill"
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group relative flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#110b06]/95 hover:bg-[#180f08] border border-[#c9973e]/50 hover:border-[#c9973e] shadow-2xl shadow-black/80 backdrop-blur-md transition-all duration-300"
        style={{
          boxShadow: isPlaying
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.9), 0 0 20px rgba(201, 151, 62, 0.25)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.9)',
        }}
      >
        {/* Vinyl Disc / Ember Icon (Rotates when playing) */}
        <button
          onClick={togglePlay}
          className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#1a1109] to-[#2a1b0e] border border-[#c9973e]/70 flex items-center justify-center text-[#c9973e] shrink-0 shadow-inner cursor-pointer group-hover:border-[#c9973e]"
          title={isPlaying ? 'Pause Song' : 'Play Song'}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              className="flex items-center justify-center"
            >
              <Disc3 className="w-4.5 h-4.5 text-[#d4a044]" />
            </motion.div>
          ) : (
            <Play className="w-3.5 h-3.5 fill-[#c9973e] text-[#c9973e] ml-0.5" />
          )}

          {/* Glowing pulse ring when playing */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-[#c9973e]/30 animate-ping pointer-events-none" />
          )}
        </button>

        {/* Track Details & Sound Waves */}
        <div
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex flex-col justify-center cursor-pointer min-w-0 pr-1 max-w-[140px] sm:max-w-[190px]"
          title="Click to expand music player"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-[#f5f0e8] group-hover:text-[#c9973e] truncate transition-colors leading-tight">
              {activeTrack.title}
            </span>

            {/* Equalizer Waveform Bars */}
            {isPlaying && (
              <span className="flex gap-0.5 items-end h-2.5 shrink-0">
                <span className="w-0.5 bg-[#c9973e] h-full animate-bounce" />
                <span className="w-0.5 bg-[#c9973e] h-2/3 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 bg-[#c9973e] h-4/5 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </span>
            )}
          </div>

          <span className="text-[9.5px] text-[#c9973e]/85 font-serif italic truncate leading-tight">
            {activeTrack.movie}
          </span>
        </div>

        {/* Controls: Play/Pause, Next Track, Expand */}
        <div className="flex items-center gap-1 border-l border-[#3a2816] pl-1.5">
          <button
            onClick={togglePlay}
            className="p-1 rounded-full text-[#f5f0e8]/80 hover:text-[#c9973e] hover:bg-white/5 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={nextTrack}
            className="p-1 rounded-full text-[#f5f0e8]/80 hover:text-[#c9973e] hover:bg-white/5 transition-colors cursor-pointer"
            title="Next Song"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="p-1 rounded-full text-[#c9973e] hover:text-[#d4a044] hover:bg-[#c9973e]/10 transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse Player' : 'Open Playlist & Controls'}
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

