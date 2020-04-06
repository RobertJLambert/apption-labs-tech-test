var fs = require('fs')

fs.writeFile ('file_3', '<html><body><h1>My Header</h1><p>My paragraph.</p></body></html>', function (err) {
    if (err)
        throw err

    console.log('Saved iss')
})
