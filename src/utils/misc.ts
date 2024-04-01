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