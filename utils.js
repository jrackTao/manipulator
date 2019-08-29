const sleep = t => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, t * 1000)
})

module.exports = {
  sleep,
}