/**
 * Copies text to the clipboard
 * @param text string
 * @returns Promise<boolean>
 */
export const copyTextToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) {
    console.error('Clipboard API not available');
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

/**
 * Determines of the page was reloaded or not
 * @returns boolean | null
 */
export const pageWasReloaded = (): boolean | null => {
  if (window.performance) {
    const navigation = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;

    if (navigation && navigation.type === "reload") {
      // The page was reloaded
      return true;
    } else {
      // The page was not reloaded
      return false;
    }
  } else {
    // Performance Timing API is not supported
    return null;
  }
}