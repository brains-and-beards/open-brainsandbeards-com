module.exports = {
  slashify: (path = '') => (path.slice(-1) === '/' ? path : path + '/'),
}
