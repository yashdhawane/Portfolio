"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Narrates trailer lines with the browser's built-in speech synthesis —
 * no external TTS API/keys, and no licensing questions since nothing is
 * pre-recorded. Quality depends on the voices installed on the visitor's
 * device/browser, so this is a "nice premium touch," not guaranteed
 * broadcast-quality narration.
 */
export function useSpeech() {
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const mutedRef = useRef(true);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!supported) return;
    function pickVoice() {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      const preferred =
        voices.find((v) => /Natural|Google US English|Microsoft.*Online/i.test(v.name) && v.lang.startsWith("en")) ??
        voices.find((v) => v.lang === "en-US") ??
        voices.find((v) => v.lang.startsWith("en")) ??
        voices[0];
      voiceRef.current = preferred ?? null;
    }
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }, [supported]);

  const setMuted = useCallback(
    (m: boolean) => {
      mutedRef.current = m;
      if (m && supported) window.speechSynthesis.cancel();
    },
    [supported]
  );

  const speak = useCallback(
    (text: string, opts?: { rate?: number; pitch?: number }) => {
      if (!supported || mutedRef.current) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      if (voiceRef.current) utter.voice = voiceRef.current;
      utter.rate = opts?.rate ?? 0.98;
      utter.pitch = opts?.pitch ?? 1;
      utter.volume = 1;
      window.speechSynthesis.speak(utter);
    },
    [supported]
  );

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  return { speak, stop, setMuted, supported };
}
