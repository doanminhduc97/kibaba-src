/**
 * VERY simple email validation
 *
 * @param {String} text - email to be validated
 * @return {Boolean}
 */
export function validateEmail(text: string) {
  return text?.indexOf("@") !== -1;
}

/**
 * Ensures password is of at least a certain length
 *
 * @param {String} password - password to be validated
 * @param {Integer} length - length password must be as long as
 * @return {Boolean}
 */
export function validatePassword(password: string, length = 7) {
  return password?.length >= length;
}

/**
 * Ensures a username consists of only letters, numbers, underscores, and dashes
 *
 * @param {String} username - username to be validated
 * @return {Boolean}
 */
export function validateUsername(username: string) {
  return /^[a-zA-Z0-9_-]+$/.test(username);
}

const validation = {
  email: validateEmail,
  password: validatePassword,
  username: validateUsername,
};

export default validation;
