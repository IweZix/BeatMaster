/**
 * Convert a time to a readable format
 * @param {Date} time The time to convert
 * @returns {String} The time in a readable format
 */
const uptime = (time) => {
    const hours = Math.round(time / (1000 * 60 * 60)) + "h"
    const minutes = (Math.round(time / (1000 * 60)) % 60) + "m"
    const seconds = (Math.round(time / 1000) % 60) + "s"
    return `${hours} ${minutes} ${seconds}`
}

module.exports = {
    uptime
}