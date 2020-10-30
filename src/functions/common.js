import HTMLReactParser from 'html-react-parser'

/**
 * Show an alert if required input is blank
 * @param args Required input values
 * @returns {boolean}
 */
export const isValidRequiredInput = (...args) => {
  let validator = true

  for (let i = 0; i < args.length; i=(i+1)|0) {
    if (args[i] === "") {
      validator = false
    }
  }

  return validator
}

/**
 * Validate input email
 * @param email
 * @returns {boolean}
 */
export const isValidEmailFormat = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return regex.test(email)
}

/**
 * Convert Carriage Return and Line Feed into <br> tag.
 * @param {string} text The row text
 * @returns {void | string | never} The formatted text
 * */
export const returnCodeToBr = (text) => {
  if (text === '') {
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
  }
}

/**
 * Convert datetime into the String.
 * @param {Date} date 
 * @returns {string} "YYYY-MM-DD"
 */
export const dateToString = (date) => {
  return date.getFullYear() + '-' 
    + ('00' + (date.getMonth()+1)).slice(-2) + '-'
    + ('00' + date.getDate()).slice(-2)
}

/**
 * Convert datetime into the String.
 * @param {Date} date 
 * @returns {string} "YYYY-MM-DDThh:mm:ss"
 */
export const datetimeToString = (date) => {
  return date.getFullYear() + '-' 
    + ('00' + (date.getMonth()+1)).slice(-2) + '-'
    + ('00' + date.getDate()).slice(-2) + ' '
    + ('00' + date.getHours()).slice(-2) + ':'
    + ('00' + date.getMinutes()).slice(-2) + ':'
    + ('00' + date.getSeconds()).slice(-2)
}