/**
 * Validate the honeypot field. Throws an error object suitable for responding
 * with 400 if the field is non-empty (indicating an automated submission).
 *
 * @param {string|undefined} value - The value of the honeypot field from the request body.
 */
export function validateHoneypot(value) {
  if (value && String(value).trim().length > 0) {
    throw { status: 400, message: 'Invalid submission.' };
  }
}
