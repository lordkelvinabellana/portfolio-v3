"use client";

/*
 * On a visitor's first page view the chat bot opens the show: the head script
 * in layout.tsx adds `bot-intro` to <html>, the bot plays its close-up, then
 * releases the page so the hero can make its entrance.
 *
 * The bot has until DEADLINE_MS after navigation to start. If three.js is slow
 * to arrive the page doesn't wait: the hero plays and the bot skips its
 * close-up. Once the bot has started, the hero waits for its release (with a
 * fallback, so content never stays hidden).
 */

const START = "bot:start";
const RELEASE = "bot:release";
const DEADLINE_MS = 3000;
const RELEASE_FALLBACK_MS = 4500;

let started = false;
let released = false;

export function introPlanned() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("bot-intro");
}

/* Runs `start` now, or once the bot's intro lets go of the page. Returns a cancel. */
export function afterIntro(start: () => void) {
  if (!introPlanned() || released) {
    start();
    return () => {};
  }
  let done = false;
  let timer = 0;
  const run = () => {
    if (done) return;
    done = true;
    cleanup();
    start();
  };
  const onStart = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, RELEASE_FALLBACK_MS);
  };
  const cleanup = () => {
    window.clearTimeout(timer);
    window.removeEventListener(START, onStart);
    window.removeEventListener(RELEASE, run);
  };
  // Late arrivals (lazy-loaded pieces) may mount after the bot has started.
  timer = window.setTimeout(run, started ? RELEASE_FALLBACK_MS : Math.max(0, DEADLINE_MS - performance.now()));
  window.addEventListener(START, onStart);
  window.addEventListener(RELEASE, run);
  return () => {
    done = true;
    cleanup();
  };
}

/* The bot calls this when it's ready to perform; false means it's too late. */
export function startIntro() {
  if (released || performance.now() > DEADLINE_MS) return false;
  started = true;
  window.dispatchEvent(new Event(START));
  return true;
}

export function releaseIntro() {
  if (released) return;
  released = true;
  window.dispatchEvent(new Event(RELEASE));
}

export function endIntro() {
  document.documentElement.classList.remove("bot-intro");
}
