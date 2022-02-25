/**
 * Convert date string format from mm/dd/yyyy to dd/mm/yyyy
 * @param {string} localeDateString String in localeDate format mm/dd/yyyy
 * @returns {string} String in dd/mm/yyyy format
 */
const toIndianDateString = localeDateString => {
    const comp = localeDateString.split('/')
    return `${comp[1]}/${comp[0]}/${comp[2]}`
}
export default toIndianDateString
