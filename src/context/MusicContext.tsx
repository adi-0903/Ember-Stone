import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { BollywoodTrack } from '../types';
import { INITIAL_CURATED_TRACKS } from '../data/bollywoodTracks';

export type SpeedMode = 0.85 | 1.0 | 1.15;

/**
 * Resolves audio URL through the local streaming proxy when needed to bypass CORS / hotlink blockers
 */
function resolveAudioSource(url: string | undefined): string {
  if (!url) return '';
  if (url.startsWith('/api/') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return `/api/music/stream?url=${encodeURIComponent(url)}`;
  }
  return url;
}

interface MusicContextType {
  playlist: BollywoodTrack[];
  currentTrackIndex: number;
  activeTrack: BollywoodTrack;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
  speedMode: SpeedMode;
  tapeHiss: boolean;
  fireCrackle: boolean;
  isExpanded: boolean;
  hasUserInteracted: boolean;
  togglePlay: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => void;
  playTrack: (track: BollywoodTrack, newIndex?: number) => Promise<void>;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleLoop: () => void;
  setSpeedMode: (speed: SpeedMode) => void;
  setTapeHiss: (val: boolean | ((prev: boolean) => boolean)) => void;
  setFireCrackle: (val: boolean | ((prev: boolean) => boolean)) => void;
  setIsExpanded: (val: boolean | ((prev: boolean) => boolean)) => void;
  searchSongs: (query: string) => Promise<BollywoodTrack[]>;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [playlist, setPlaylist] = useState<BollywoodTrack[]>(INITIAL_CURATED_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(293);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [speedMode, setSpeedModeState] = useState<SpeedMode>(1.0);
  const [tapeHiss, setTapeHiss] = useState(false);
  const [fireCrackle, setFireCrackle] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const hissGainRef = useRef<GainNode | null>(null);
  const crackleGainRef = useRef<GainNode | null>(null);
  const currentTrackIndexRef = useRef(0);
  const playlistRef = useRef(playlist);

  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);

  useEffect(() => {
    playlistRef.current = playlist;
  }, [playlist]);

  const activeTrack: BollywoodTrack = playlist[currentTrackIndex] || INITIAL_CURATED_TRACKS[0];

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

  // Initialize Web Audio Engine for analog ambiance and effects
  const initWebAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // Vintage Cassette Magnetic Tape Noise
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

        // Warm Hearth Fireplace Crackle Generator
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
      audioCtxRef.current.resume().catch(() => {});
    }
  }, [volume, isMuted, tapeHiss, fireCrackle]);

  // Audio Playback Actions
  const play = useCallback(async () => {
    initWebAudio();
    if (!audioRef.current) return;
    setIsLoading(true);
    try {
      const targetSrc = resolveAudioSource(activeTrack.audioUrl);
      if (!audioRef.current.src || !audioRef.current.src.includes(encodeURIComponent(activeTrack.audioUrl).substring(0, 20))) {
        audioRef.current.src = targetSrc;
      }
      audioRef.current.playbackRate = speedMode;
      audioRef.current.volume = isMuted ? 0 : volume;
      await audioRef.current.play();
      setIsPlaying(true);
      setIsLoading(false);
      setHasUserInteracted(true);
    } catch {
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [activeTrack, speedMode, isMuted, volume, initWebAudio]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, pause, play]);

  const playTrack = useCallback(
    async (track: BollywoodTrack, newIndex?: number) => {
      initWebAudio();
      setIsLoading(true);
      setCurrentTime(0);
      if (track.durationSeconds) {
        setDuration(track.durationSeconds);
      }

      let targetIdx = newIndex;
      if (targetIdx !== undefined) {
        setCurrentTrackIndex(targetIdx);
        currentTrackIndexRef.current = targetIdx;
      } else {
        const currentList = playlistRef.current;
        const existingIdx = currentList.findIndex((t) => t.id === track.id || t.audioUrl === track.audioUrl);
        if (existingIdx !== -1) {
          targetIdx = existingIdx;
          setCurrentTrackIndex(existingIdx);
          currentTrackIndexRef.current = existingIdx;
        } else {
          targetIdx = 0;
          setPlaylist((prev) => [track, ...prev]);
          setCurrentTrackIndex(0);
          currentTrackIndexRef.current = 0;
        }
      }

      if (audioRef.current) {
        const targetSrc = resolveAudioSource(track.audioUrl);
        audioRef.current.src = targetSrc;
        audioRef.current.playbackRate = speedMode;
        audioRef.current.volume = isMuted ? 0 : volume;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setIsLoading(false);
          setHasUserInteracted(true);
        } catch {
          setIsLoading(false);
        }
      }
    },
    [initWebAudio, speedMode, isMuted, volume]
  );

  const nextTrack = useCallback(() => {
    const list = playlistRef.current;
    if (list.length === 0) return;
    const curIdx = currentTrackIndexRef.current;
    const nextIdx = (curIdx + 1) % list.length;
    const targetTrack = list[nextIdx];
    if (targetTrack) {
      playTrack(targetTrack, nextIdx);
    }
  }, [playTrack]);

  const prevTrack = useCallback(() => {
    if (currentTime > 4 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const list = playlistRef.current;
    if (list.length === 0) return;
    const curIdx = currentTrackIndexRef.current;
    const prevIdx = (curIdx - 1 + list.length) % list.length;
    const targetTrack = list[prevIdx];
    if (targetTrack) {
      playTrack(targetTrack, prevIdx);
    }
  }, [currentTime, playTrack]);

  const seekTo = useCallback(
    (seconds: number) => {
      if (!audioRef.current) return;
      const target = Math.max(0, Math.min(duration, seconds));
      audioRef.current.currentTime = target;
      setCurrentTime(target);
    },
    [duration]
  );

  const setVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping((prev) => !prev);
  }, []);

  const setSpeedMode = useCallback((newSpeed: SpeedMode) => {
    setSpeedModeState(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  }, []);

  const searchSongs = useCallback(async (query: string): Promise<BollywoodTrack[]> => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    try {
      const res = await fetch('/api/music/search?q=' + encodeURIComponent(trimmed));
      const data = await res.json();
      if (data.success && data.results) {
        return data.results;
      }
      return [];
    } catch (err) {
      console.error('Search API error:', err);
      return [];
    }
  }, []);

  // HTML5 Audio Event Listeners
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
        audio.play().catch(() => {});
      } else {
        nextTrack();
      }
    };
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onPlaying = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, [isLooping, nextTrack]);

  // Volume & effects updates
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

  useEffect(() => {
    if (hissGainRef.current && audioCtxRef.current) {
      hissGainRef.current.gain.setValueAtTime(
        tapeHiss && !isMuted && isPlaying ? 0.03 : 0,
        audioCtxRef.current.currentTime
      );
    }
  }, [tapeHiss, isMuted, isPlaying]);

  useEffect(() => {
    if (crackleGainRef.current && audioCtxRef.current) {
      crackleGainRef.current.gain.setValueAtTime(
        fireCrackle && !isMuted ? 0.06 : 0,
        audioCtxRef.current.currentTime
      );
    }
  }, [fireCrackle, isMuted]);

  // AUTOPLAY ON SITE LOAD & FIRST USER INTERACTION
  useEffect(() => {
    let autoplayTriggered = false;

    const attemptAutoplay = async () => {
      if (autoplayTriggered || !audioRef.current) return;
      if (!audioRef.current.src) {
        audioRef.current.src = resolveAudioSource(activeTrack.audioUrl);
      }
      audioRef.current.volume = isMuted ? 0 : volume;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setHasUserInteracted(true);
        autoplayTriggered = true;
      } catch {
        // Autoplay policy prevented immediate playback without interaction.
        // We catch this cleanly and wait for the first click/touch.
      }
    };

    // Attempt direct start on mount
    attemptAutoplay();

    // Fallback: trigger playback on the first user interaction anywhere on the website
    const handleFirstInteraction = () => {
      if (!autoplayTriggered) {
        initWebAudio();
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            setHasUserInteracted(true);
            autoplayTriggered = true;
          }).catch(() => {});
        }
      }
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [activeTrack, isMuted, volume, initWebAudio]);

  return (
    <MusicContext.Provider
      value={{
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
        isExpanded,
        hasUserInteracted,
        togglePlay,
        play,
        pause,
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
      }}
    >
      {/* Persistent Root Audio Stream Element */}
      <audio ref={audioRef} preload="auto" />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
}
