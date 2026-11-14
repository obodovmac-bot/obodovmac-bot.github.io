"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type SyntheticEvent } from "react";
import { Settings } from "lucide-react";

export type VideoQuality = {
  id: string;
  label: string;
  src: string;
};

function clock(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const total = Math.floor(value);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function TransportIcon({ kind }: { kind: "play" | "pause" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      {kind === "play" ? (
        <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      ) : (
        <path d="M8 5.5v13M16 5.5v13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  );
}

function FrameIcon({ exit }: { exit: boolean }) {
  const paths = exit
    ? [
        "M4 9h3.8A1.2 1.2 0 0 0 9 7.8V4",
        "M20 9h-3.8A1.2 1.2 0 0 1 15 7.8V4",
        "M4 15h3.8A1.2 1.2 0 0 1 9 16.2V20",
        "M20 15h-3.8a1.2 1.2 0 0 0-1.2 1.2V20",
      ]
    : [
        "M8 4H5.2A1.2 1.2 0 0 0 4 5.2V8",
        "M16 4h2.8A1.2 1.2 0 0 1 20 5.2V8",
        "M4 16v2.8A1.2 1.2 0 0 0 5.2 20H8",
        "M20 16v2.8a1.2 1.2 0 0 1-1.2 1.2H16",
      ];
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export function VideoPlayer({
  src,
  title,
  qualities,
}: {
  src: string;
  title: string;
  qualities?: VideoQuality[];
}) {
  const levels = qualities?.length ? qualities : [{ id: "source", label: "Исходное", src }];
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const gear = useRef<HTMLDivElement>(null);
  const resume = useRef<{ time: number; play: boolean } | null>(null);
  const pauseTimer = useRef<number | null>(null);
  const uid = useId().replace(/:/g, "");
  const [playing, setPlaying] = useState(false);
  const [centerPause, setCenterPause] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [full, setFull] = useState(false);
  const [qualityId, setQualityId] = useState(levels[0].id);
  const [menu, setMenu] = useState(false);
  const active = levels.find((item) => item.id === qualityId) ?? levels[0];
  const barId = `${uid}-bar`;
  const menuId = `${uid}-quality`;

  useEffect(() => {
    const sync = () => setFull(document.fullscreenElement === box.current);
    document.addEventListener("fullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    };
  }, []);

  const flashed = useRef(false);

  function showPauseMark() {
    if (flashed.current) return;
    flashed.current = true;
    setCenterPause(true);
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(() => setCenterPause(false), 350);
  }

  function hidePauseMark() {
    flashed.current = false;
    setCenterPause(false);
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
  }

  useEffect(() => {
    if (playing && time > 0.45) setCenterPause(false);
  }, [playing, time]);

  useEffect(() => {
    if (!menu) return;
    const close = (event: MouseEvent) => {
      if (!gear.current?.contains(event.target as Node)) setMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menu]);

  function toggle() {
    const node = video.current;
    if (!node) return;
    if (node.paused) void node.play();
    else node.pause();
  }

  function seek(next: number) {
    const node = video.current;
    if (!node) return;
    node.currentTime = Math.min(Math.max(0, next), Number.isFinite(node.duration) ? node.duration : next);
  }

  function setLevel(next: number) {
    const node = video.current;
    if (!node) return;
    node.muted = next === 0;
    node.volume = next;
    setMuted(next === 0);
    setVolume(next);
  }

  async function fullscreen() {
    const node = box.current;
    if (!node) return;
    try {
      if (document.fullscreenElement === node) await document.exitFullscreen();
      else await node.requestFullscreen();
    } catch {
      setFull(false);
    }
  }

  function chooseQuality(next: VideoQuality) {
    const node = video.current;
    if (node && next.src !== active.src) {
      resume.current = { time: node.currentTime, play: !node.paused };
    }
    setQualityId(next.id);
    setMenu(false);
  }

  function onReady(event: SyntheticEvent<HTMLVideoElement>) {
    const node = event.currentTarget;
    setDuration(node.duration);
    const job = resume.current;
    if (!job) return;
    resume.current = null;
    node.currentTime = Math.min(job.time, Number.isFinite(node.duration) ? node.duration : job.time);
    if (job.play) void node.play();
  }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === " " || event.key.toLowerCase() === "k") {
      event.preventDefault();
      toggle();
    }
    if (event.key === "ArrowRight") seek(time + 5);
    if (event.key === "ArrowLeft") seek(time - 5);
    if (event.key.toLowerCase() === "f") void fullscreen();
    if (event.key.toLowerCase() === "m") setLevel(muted || volume === 0 ? 1 : 0);
  }

  const played = duration > 0 ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <div
      ref={box}
      className="site-player card overflow-hidden bg-black text-white outline-none"
      tabIndex={0}
      onKeyDown={onKey}
      aria-label={`Плеер: ${title}`}
    >
      <div className="site-player-stage relative">
        <video
          ref={video}
          src={active.src}
          className="aspect-video w-full bg-black object-contain"
          preload="metadata"
          playsInline
          onPlay={() => {
            setPlaying(true);
            showPauseMark();
          }}
          onPause={() => {
            setPlaying(false);
            hidePauseMark();
          }}
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onLoadedMetadata={onReady}
          onVolumeChange={(event) => {
            setVolume(event.currentTarget.volume);
            setMuted(event.currentTarget.muted);
          }}
        />
        {!playing && time < 0.35 ? (
          <button type="button" className="site-player-icon site-player-float" aria-label="Смотреть" onClick={toggle}>
            <TransportIcon kind="play" />
          </button>
        ) : null}
        <button
          type="button"
          className="site-player-icon site-player-float"
          style={{ opacity: centerPause ? 1 : 0, pointerEvents: centerPause ? "auto" : "none" }}
          aria-label="Пауза"
          aria-hidden={!centerPause}
          tabIndex={centerPause ? 0 : -1}
          onClick={toggle}
        >
          <TransportIcon kind="pause" />
        </button>
      </div>
      <div className="site-player-bar flex flex-wrap items-center gap-2 bg-black/90 p-3">
        <button type="button" className="site-player-icon" aria-label={playing ? "Пауза" : "Смотреть"} onClick={toggle}>
          <TransportIcon kind={playing ? "pause" : "play"} />
        </button>
        <label className="sr-only" htmlFor={barId}>
          Место в ролике
        </label>
        <input
          id={barId}
          className="site-player-range min-w-28 flex-1"
          style={{ background: `linear-gradient(90deg, #fff ${played}%, rgba(255,255,255,.35) ${played}%)` }}
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(time, duration || 0)}
          onChange={(event) => seek(Number(event.target.value))}
        />
        <span className="text-xs tabular-nums text-white/80">
          {clock(time)} / {clock(duration)}
        </span>
        <label className="sr-only" htmlFor={`${uid}-volume`}>
          Громкость
        </label>
        <input
          id={`${uid}-volume`}
          className="site-player-range w-20"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={muted ? 0 : volume}
          onChange={(event) => setLevel(Number(event.target.value))}
        />
        <div className="relative" ref={gear}>
          <button
            type="button"
            className="site-player-icon"
            aria-label="Качество"
            aria-expanded={menu}
            aria-controls={menuId}
            onClick={() => setMenu((open) => !open)}
          >
            <Settings size={20} aria-hidden />
          </button>
          {menu ? (
            <div id={menuId} role="menu" className="absolute right-0 bottom-full z-20 mb-2 min-w-36 rounded-xl border border-white/20 bg-black p-2 shadow-lg">
              <p className="px-2 py-1 text-xs text-white/70">Качество</p>
              {levels.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={item.id === active.id}
                  className={`flex min-h-10 w-full items-center rounded-lg px-2 text-left text-sm ${item.id === active.id ? "bg-white/15 font-semibold" : ""}`}
                  onClick={() => chooseQuality(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <button type="button" className="site-player-icon" aria-label={full ? "Свернуть" : "На весь экран"} onClick={() => void fullscreen()}>
          <FrameIcon exit={full} />
        </button>
      </div>
      <p className="site-player-hint px-3 pb-3 text-xs text-white/70">
        Пробел — пуск и пауза, стрелки — перемотка, M — звук, F — весь экран. Шестерёнка меняет качество. Сначала щёлкните по тёмной рамке плеера.
      </p>
    </div>
  );
}
