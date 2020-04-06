var fs = require('fs')

fs.writeFile ('file_2', 'w', function (err, file) {
    if (err)
        throw err

    console.log('Savedasss')
  
})