/*
Set Up Emotion Cache (for SSR)

Since you're using Next.js with server-side rendering (SSR), you need to set up Emotion's cache to handle styles correctly.
*/
import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
