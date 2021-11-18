var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync("AAAA", salt)

console.log(bcrypt.compareSync("AAAA",hash))

console.log(hash)