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
  Sliders
} from 'lucide-react';
import { BollywoodTrack } from '../types';
import { INITIAL_CURATED_TRACKS, VIBE_CATEGORIES } from '../data/bollywoodTracks';

type SpeedMode = 0.85 | 1.0 | 1.15;

export default function HearthMusicPlayer() {
  const [playlist, setPlaylist] = useState<BollywoodTrack[]>(INITIAL_CURATED_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(293);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  // Extra Vibe Controls
  const [tapeHiss, setTapeHiss] = useState(true);
  const [fireCrackle, setFireCrackle] = useState(false);
  const [speedMode, setSpeedMode] = useState<SpeedMode>(1.0);
  const [showVibePanel, setShowVibePanel] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BollywoodTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'curated' | 'search'>('curated');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Mixtapes');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const hissGainRef = useRef<GainNode | null>(null);
  const crackleGainRef = useRef<GainNode | null>(null);
  const searchTimeoutRef = useRef<number | null>(null);

  const activeTrack: BollywoodTrack =
    playlist[currentTrackIndex] || INITIAL_CURATED_TRACKS[0];

  // Fetch full curated set from server on mount
  useEffect(() => {
    async function loadCurated() {
      try {
        const res = await fetch('/api/music/curated');
        const data = await res.json();
        if (data.success && data.songs && data.songs.length > 0) {
          const merged = [...data.songs];
          INITIAL_CURATED_TRACKS.forEach((t) => {
            const match = merged.find((m) => m.title.toLowerCase() === t.title.toLowerCase());
            if (match) {
              match.category = t.category;
              match.vibeQuote = t.vibeQuote;
            } else {
              merged.push(t);
            }
          });
          setPlaylist(merged);
        }
      } catch (err) {
        console.warn('Using default curated playlist:', err);
      }
    }
    loadCurated();
  }, []);

  // Web Audio Engine for analog tape hiss & fireplace crackle ambience
  const initWebAudio = () => {
    if (!audioCtxRef.current) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(volume, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // 1. Vintage Cassette Magnetic Tape Noise
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const noiseOutput = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          noiseOutput[i] = (Math.random() * 2 - 1) * 0.012;
        }

        const tapeNoise = ctx.createBufferSource();
        tapeNoise.buffer = noiseBuffer;
        tapeNoise.loop = true;

        const tapeFilter = ctx.createBiquadFilter();
        tapeFilter.type = 'bandpass';
        tapeFilter.frequency.setValueAtTime(1800, ctx.currentTime);
        tapeFilter.Q.setValueAtTime(0.7, ctx.currentTime);

        const hissGain = ctx.createGain();
        hissGain.gain.setValueAtTime(tapeHiss ? 0.03 : 0, ctx.currentTime);

        tapeNoise.connect(tapeFilter);
        tapeFilter.connect(hissGain);
        hissGain.connect(masterGain);
        hissGainRef.current = hissGain;
        tapeNoise.start(0);

        // 2. Warm Hearth Fireplace Crackle Generator
        const crackleBuffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
        const crackleData = crackleBuffer.getChannelData(0);
        for (let i = 0; i < crackleBuffer.length; i++) {
          if (Math.random() > 0.998) {
            crackleData[i] = (Math.random() * 2 - 1) * 0.7;
          } else {
            crackleData[i] = (Math.random() * 2 - 1) * 0.005;
          }
        }

        const crackleSource = ctx.createBufferSource();
        crackleSource.buffer = crackleBuffer;
        crackleSource.loop = true;

        const crackleFilter = ctx.createBiquadFilter();
        crackleFilter.type = 'lowpass';
        crackleFilter.frequency.setValueAtTime(3200, ctx.currentTime);

        const crackleGain = ctx.createGain();
        crackleGain.gain.setValueAtTime(fireCrackle ? 0.06 : 0, ctx.currentTime);

        crackleSource.connect(crackleFilter);
        crackleFilter.connect(crackleGain);
        crackleGain.connect(masterGain);
        crackleGainRef.current = crackleGain;
        crackleSource.start(0);

      } catch (err) {
        console.warn('Web Audio init error:', err);
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Play / Pause Track
  const togglePlay = async () => {
    initWebAudio();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      try {
        if (!audioRef.current.src || audioRef.current.src !== activeTrack.audioUrl) {
          audioRef.current.src = activeTrack.audioUrl;
        }
        audioRef.current.playbackRate = speedMode;
        audioRef.current.volume = isMuted ? 0 : volume;
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Playback error:', err);
        setIsLoading(false);
        setIsPlaying(false);
      }
    }
  };

  // Play specific track
  const playTrack = async (track: BollywoodTrack, newIndex?: number) => {
    initWebAudio();
    setIsLoading(true);
    setCurrentTime(0);
    if (track.durationSeconds) {
      setDuration(track.durationSeconds);
    }

    if (newIndex !== undefined) {
      setCurrentTrackIndex(newIndex);
    } else {
      const existingIdx = playlist.findIndex((t) => t.id === track.id || t.audioUrl === track.audioUrl);
      if (existingIdx !== -1) {
        setCurrentTrackIndex(existingIdx);
      } else {
        const updated = [track, ...playlist];
        setPlaylist(updated);
        setCurrentTrackIndex(0);
      }
    }

    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.playbackRate = speedMode;
      audioRef.current.volume = isMuted ? 0 : volume;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Play error on track:', err);
        setIsLoading(false);
      }
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % playlist.length;
    playTrack(playlist[nextIdx], nextIdx);
  };

  const prevTrack = () => {
    if (currentTime > 4 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const prevIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[prevIdx], prevIdx);
  };

  const seekRelative = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const changeSpeedMode = (newSpeed: SpeedMode) => {
    setSpeedMode(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
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
      const res = await fetch('/api/music/search?q=' + encodeURIComponent(trimmed));
      const data = await res.json();
      if (data.success && data.results) {
        setSearchResults(data.results);
      }
    } catch (err) {
      console.error('Search API error:', err);
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
    return m + ':' + (s < 10 ? '0' : '') + s;
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
  }, [isPlaying, activeTrack]);

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, [playlist, currentTrackIndex, isLooping, speedMode]);

  // Volume & tape hiss updates
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  // Tape Hiss Gain
  useEffect(() => {
    if (hissGainRef.current && audioCtxRef.current) {
      hissGainRef.current.gain.setValueAtTime(
        tapeHiss && !isMuted && isPlaying ? 0.03 : 0,
        audioCtxRef.current.currentTime
      );
    }
  }, [tapeHiss, isMuted, isPlaying]);

  // Fireplace Crackle Gain
  useEffect(() => {
    if (crackleGainRef.current && audioCtxRef.current) {
      crackleGainRef.current.gain.setValueAtTime(
        fireCrackle && !isMuted ? 0.06 : 0,
        audioCtxRef.current.currentTime
      );
    }
  }, [fireCrackle, isMuted]);

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
      {/* HTML5 Audio Streamer */}
      <audio ref={audioRef} preload="metadata" />

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
              <span>LOSSLESS & FREE</span>
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
                  {[20, 40, 60, 75, 85, 95, 100].map((level, idx) => {
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
                  {[25, 45, 65, 80, 90, 95, 100].map((level, idx) => {
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
                  <Play className="w-4 h-4 fill-current" />
                  <span className="text-[10px] font-mono tracking-widest font-bold uppercase">
                    PLAY BOLLYWOOD
                  </span>
                </>
              )}
            </button>

            {/* FAST FORWARD 10s */}
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
          </div>

          {/* Secondary Extra Vibe Controls */}
          <div className="flex items-center space-x-1.5">
            {/* Vibe Ambience Panel Toggle */}
            <button
              onClick={() => setShowVibePanel(!showVibePanel)}
              className={'px-2.5 py-2 rounded-xs border font-mono uppercase tracking-wider text-[8.5px] transition-all cursor-pointer flex items-center space-x-1 ' + (
                fireCrackle || speedMode !== 1.0 || showVibePanel
                  ? 'bg-[#d4a044]/25 border-[#d4a044] text-[#d4a044] shadow-sm'
                  : 'bg-[#1b1209] border-[#3d2714] text-[#f5f0e8]/60 hover:text-[#d4a044]'
              )}
              title="Extra Vibe Settings (Fireplace, Slowed+Reverb, Tape Hiss)"
            >
              <Sparkles className="w-3 h-3 text-[#d4a044]" />
              <span>Vibe FX</span>
            </button>

            {/* Loop Toggle */}
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={'p-2 rounded-xs border transition-colors cursor-pointer ' + (
                isLooping
                  ? 'bg-[#d4a044]/25 border-[#d4a044] text-[#d4a044]'
                  : 'bg-[#1b1209] border-[#3d2714] text-[#f5f0e8]/50 hover:text-[#d4a044]'
              )}
              title={isLooping ? 'Loop Track: ON' : 'Loop Track: OFF'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Mixtape Cassette Vault Drawer Toggle */}
            <button
              onClick={() => setShowDrawer(!showDrawer)}
              className={'px-3 py-2 border font-mono uppercase tracking-wider rounded-xs flex items-center space-x-1.5 transition-all cursor-pointer text-[9px] ' + (
                showDrawer
                  ? 'bg-[#d4a044] text-[#0d0804] font-bold border-[#d4a044]'
                  : 'bg-[#1b1209] hover:bg-[#281b0e] border-[#3d2714] text-[#f5f0e8] hover:border-[#d4a044]'
              )}
            >
              <ListMusic className="w-3.5 h-3.5 text-[#d4a044]" />
              <span>Mixtapes ({playlist.length})</span>
            </button>

            {/* Volume Mute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 bg-[#1b1209] hover:bg-[#281b0e] border border-[#3d2714] text-[#f5f0e8]/70 hover:text-[#d4a044] rounded-xs cursor-pointer transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* EXTRA VIBE & AMBIENCE SETTINGS DRAWER */}
        <AnimatePresence>
          {showVibePanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-[#3d2714] overflow-hidden"
            >
              <div className="bg-[#080402] border border-[#3d2714] rounded-xs p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-[9px] font-mono uppercase text-[#d4a044] font-bold">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>AUDIO VIBE & ATMOSPHERE ENGINE</span>
                  </div>
                  <button
                    onClick={() => setShowVibePanel(false)}
                    className="text-[#f5f0e8]/40 hover:text-[#f5f0e8] text-xs cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {/* 1. Fireplace Crackle Ambience */}
                  <button
                    onClick={() => {
                      initWebAudio();
                      setFireCrackle(!fireCrackle);
                    }}
                    className={'p-2.5 rounded-xs border text-left flex items-center justify-between transition-all cursor-pointer ' + (
                      fireCrackle
                        ? 'bg-[#ff7700]/15 border-[#ff7700] text-[#ffaa44]'
                        : 'bg-[#120a05] border-[#332010] text-[#f5f0e8]/60 hover:border-[#d4a044]/50'
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Flame className={'w-4 h-4 ' + (fireCrackle ? 'text-[#ff7700] animate-bounce' : 'text-[#f5f0e8]/40')} />
                      <div>
                        <div className="text-[10px] font-semibold">Fireplace Crackle</div>
                        <div className="text-[8px] opacity-70">Warm cozy embers ambience</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold">
                      {fireCrackle ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* 2. Analog Cassette Magnetic Hiss */}
                  <button
                    onClick={() => {
                      initWebAudio();
                      setTapeHiss(!tapeHiss);
                    }}
                    className={'p-2.5 rounded-xs border text-left flex items-center justify-between transition-all cursor-pointer ' + (
                      tapeHiss
                        ? 'bg-[#d4a044]/20 border-[#d4a044] text-[#d4a044]'
                        : 'bg-[#120a05] border-[#332010] text-[#f5f0e8]/60 hover:border-[#d4a044]/50'
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Radio className={'w-4 h-4 ' + (tapeHiss ? 'text-[#d4a044]' : 'text-[#f5f0e8]/40')} />
                      <div>
                        <div className="text-[10px] font-semibold">Vintage Tape Hiss</div>
                        <div className="text-[8px] opacity-70">Warm analog magnetic sound</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold">
                      {tapeHiss ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* 3. Tempo / Dreamy Slowed Mode */}
                  <div className="p-2.5 bg-[#120a05] border border-[#332010] rounded-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-semibold text-[#f5f0e8]/90 flex items-center gap-1">
                        <Moon className="w-3.5 h-3.5 text-purple-400" />
                        <span>Tempo & Pitch</span>
                      </span>
                      <span className="text-[8px] font-mono text-[#d4a044]">{speedMode}x</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => changeSpeedMode(0.85)}
                        className={'flex-1 py-1 rounded-xs text-[8px] font-mono uppercase cursor-pointer border ' + (
                          speedMode === 0.85
                            ? 'bg-purple-950 border-purple-500 text-purple-200 font-bold'
                            : 'bg-[#080402] border-[#332010] text-[#f5f0e8]/50'
                        )}
                        title="0.85x Slowed + Reverb Vibe"
                      >
                        🌙 Slowed
                      </button>
                      <button
                        onClick={() => changeSpeedMode(1.0)}
                        className={'flex-1 py-1 rounded-xs text-[8px] font-mono uppercase cursor-pointer border ' + (
                          speedMode === 1.0
                            ? 'bg-[#d4a044] border-[#d4a044] text-[#0d0804] font-bold'
                            : 'bg-[#080402] border-[#332010] text-[#f5f0e8]/50'
                        )}
                      >
                        Original
                      </button>
                      <button
                        onClick={() => changeSpeedMode(1.15)}
                        className={'flex-1 py-1 rounded-xs text-[8px] font-mono uppercase cursor-pointer border ' + (
                          speedMode === 1.15
                            ? 'bg-amber-950 border-amber-500 text-amber-200 font-bold'
                            : 'bg-[#080402] border-[#332010] text-[#f5f0e8]/50'
                        )}
                        title="1.15x Cassette Fast-Tuned"
                      >
                        ⚡ 1.15x
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EXPANDABLE DRAWER: Search Any Bollywood Song & Browse Vibe Mixtapes */}
        <AnimatePresence>
          {showDrawer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3.5 pt-3.5 border-t border-[#3d2714] space-y-2.5 overflow-hidden"
            >
              {/* Search Bar & Mode Switcher */}
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                {/* Search Input */}
                <div className="relative w-full sm:flex-1">
                  <Search className="w-3.5 h-3.5 text-[#d4a044] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      handleSearchChange(e.target.value);
                      if (e.target.value.trim()) setActiveTab('search');
                    }}
                    placeholder="Search any artist, song, movie (e.g., Arijit Singh, Tum Hi Ho, Kesariya)..."
                    className="w-full bg-[#080402] border border-[#3d2714] focus:border-[#d4a044] rounded-xs py-1.5 pl-8 pr-7 text-xs text-[#f5f0e8] placeholder-[#f5f0e8]/40 outline-none font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                        setActiveTab('curated');
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#f5f0e8]/40 hover:text-[#f5f0e8] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center space-x-1 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setActiveTab('curated')}
                    className={'px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-xs cursor-pointer border ' + (
                      activeTab === 'curated'
                        ? 'bg-[#d4a044] text-[#0d0804] font-bold border-[#d4a044]'
                        : 'bg-[#180f08] text-[#f5f0e8]/60 border-[#3d2714]'
                    )}
                  >
                    Curated Mixtapes
                  </button>
                  <button
                    onClick={() => setActiveTab('search')}
                    className={'px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-xs cursor-pointer border ' + (
                      activeTab === 'search'
                        ? 'bg-[#d4a044] text-[#0d0804] font-bold border-[#d4a044]'
                        : 'bg-[#180f08] text-[#f5f0e8]/60 border-[#3d2714]'
                    )}
                  >
                    Search Results ({searchResults.length})
                  </button>
                </div>
              </div>

              {/* Popular Quick-Search Suggestions */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                <span className="text-[8px] font-mono uppercase text-[#d4a044]/60 shrink-0 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#d4a044]" />
                  <span>Popular:</span>
                </span>
                {POPULAR_SEARCH_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => {
                      setSearchQuery(chip);
                      executeSearch(chip);
                    }}
                    className={'px-2 py-0.5 rounded-xs text-[8.5px] font-mono whitespace-nowrap cursor-pointer transition-all border shrink-0 ' + (
                      searchQuery.toLowerCase() === chip.toLowerCase()
                        ? 'bg-[#d4a044] text-[#0d0804] font-bold border-[#d4a044]'
                        : 'bg-[#140c06] text-[#f5f0e8]/70 border-[#3d2714] hover:border-[#d4a044]/60 hover:text-[#f5f0e8]'
                    )}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Vibe Category Pills for Curated Tab */}
              {activeTab === 'curated' && (
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {VIBE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={'px-2 py-0.5 rounded-xs text-[8.5px] font-mono uppercase tracking-wider cursor-pointer transition-colors ' + (
                        selectedCategory === cat
                          ? 'bg-[#d4a044]/25 text-[#d4a044] border border-[#d4a044]'
                          : 'bg-[#080402] text-[#f5f0e8]/50 border border-[#2e1d0f] hover:border-[#d4a044]/40'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Song List Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {activeTab === 'search' ? (
                  isSearching ? (
                    <div className="col-span-full py-6 text-center text-xs text-[#d4a044] font-mono flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SEARCHING HIGH-FIDELITY MUSIC VAULT...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((track) => (
                      <button
                        key={track.id}
                        onClick={() => playTrack(track)}
                        className={'p-2 rounded-xs border text-left flex items-center justify-between transition-all cursor-pointer group ' + (
                          activeTrack.id === track.id || activeTrack.audioUrl === track.audioUrl
                            ? 'bg-[#d4a044]/20 border-[#d4a044] text-[#f5f0e8] shadow-sm'
                            : 'border-[#3d2714] hover:border-[#d4a044] bg-[#080402] hover:bg-[#180f08]'
                        )}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                          {track.imageUrl ? (
                            <img
                              src={track.imageUrl}
                              alt={track.title}
                              className="w-8 h-8 rounded-xs object-cover border border-[#3d2714] shrink-0"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-xs bg-[#180f08] flex items-center justify-center shrink-0">
                              <Disc3 className="w-4 h-4 text-[#d4a044]" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#f5f0e8] truncate group-hover:text-[#d4a044] flex items-center gap-1.5">
                              <span className="truncate">{track.title}</span>
                              {(activeTrack.id === track.id || activeTrack.audioUrl === track.audioUrl) && isPlaying && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                              )}
                            </div>
                            <div className="text-[9px] text-[#f5f0e8]/50 truncate">
                              {track.singers} · {track.movie} {track.year ? `(${track.year})` : ''}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1.5 shrink-0">
                          {(activeTrack.id === track.id || activeTrack.audioUrl === track.audioUrl) && (
                            <Check className="w-3.5 h-3.5 text-[#d4a044]" />
                          )}
                          <span className="text-[8.5px] font-mono text-[#d4a044]">
                            {track.durationFormatted}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full py-6 text-center text-xs text-[#f5f0e8]/50 font-mono">
                      {searchQuery
                        ? `No results found for "${searchQuery}". Tap any popular artist chip above or search another track!`
                        : 'Search any Bollywood song or artist in lossless sound above!'}
                    </div>
                  )
                ) : (
                  filteredPlaylist.map((track, idx) => (
                    <button
                      key={track.id}
                      onClick={() => playTrack(track, idx)}
                      className={'p-2 rounded-xs border text-left flex items-center justify-between transition-all cursor-pointer ' + (
                        currentTrackIndex === idx && activeTrack.id === track.id
                          ? 'bg-[#d4a044]/20 border-[#d4a044] text-[#f5f0e8] shadow-sm'
                          : 'bg-[#080402] border-[#3d2714] hover:border-[#d4a044]/50 text-[#f5f0e8]/75'
                      )}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                        {track.imageUrl ? (
                          <img
                            src={track.imageUrl}
                            alt={track.title}
                            className="w-8 h-8 rounded-xs object-cover border border-[#3d2714] shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-xs bg-[#180f08] flex items-center justify-center shrink-0">
                            <Disc3 className="w-4 h-4 text-[#d4a044]" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
                            <span className="text-[#d4a044]">{idx + 1}.</span>
                            <span className="truncate">{track.title}</span>
                            {currentTrackIndex === idx && isPlaying && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                            )}
                          </div>
                          <div className="text-[9.5px] text-[#f5f0e8]/55 truncate">
                            {track.movie} · {track.singers}
                          </div>
                        </div>
                      </div>
                      {currentTrackIndex === idx && activeTrack.id === track.id ? (
                        <Check className="w-3.5 h-3.5 text-[#d4a044] shrink-0" />
                      ) : (
                        <span className="text-[8.5px] text-[#f5f0e8]/40 font-mono shrink-0">
                          {track.durationFormatted}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Downward Anchor for exploring cocktail menu */}
      <div className="flex items-center justify-center space-x-6 pt-3 text-[10px] uppercase tracking-[0.2em] text-[#f5f0e8]/60">
        <a
          href="#cocktails"
          className="hover:text-[#d4a044] transition-colors flex items-center gap-1.5"
        >
          <span>Explore Cocktails & Bites ↓</span>
        </a>
      </div>
    </div>
  );
}
