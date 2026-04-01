/* ─── Site constants ─────────────────────────────────────────
 * Edit this file to update links, names, and social handles
 * across the whole site without hunting through components.
 * ─────────────────────────────────────────────────────────── */

/** Instagram profile URL — change to your real handle */
export const INSTAGRAM_URL = "https://www.instagram.com/kiriaz__3?igsh=c3Uyc3ExdnB3dTlh&utm_source=qr";

/** Path to the background video (place the file in /public) */
export const BG_VIDEO_SRC = "/vdbckgrd.mov";

/** Artist name displayed as the hero title */
export const ARTIST_NAME = "KIRIAAAZ";

/** Secondary tag / alias displayed at the bottom */
export const ALIAS = "KAZ";

/**
 * KAZ animation timing (Framer Motion)
 * - duration : total cycle length in seconds (fade-in + hold + fade-out + pause)
 * - fadeIn   : how long the fade-in takes (seconds)
 * - hold     : how long KAZ stays fully visible (seconds)
 * - fadeOut  : how long the fade-out takes (seconds)
 * The pause between cycles = duration - fadeIn - hold - fadeOut
 */
export const KAZ_TIMING = {
  duration: 5,   // total loop in seconds
  fadeIn:   0.8, // seconds
  hold:     2.0, // seconds
  fadeOut:  0.8, // seconds
} as const;
