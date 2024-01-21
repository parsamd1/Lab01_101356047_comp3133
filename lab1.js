const fs = require('fs')
const csv=require('csv-parser')

// erasing canada.txt if exists
fs.unlink('canada.txt',(err)=>{
    if (err){
        return console.log(err)
    }
    console.log('canada.txt deleted')
})
// erasing usa.txt if exists
fs.unlink('usa.txt', (err)=>{
    if (err) {
        return console.log(err)
    }
    console.log("usa.txt deleted")
})

result=[]

fs.createReadStream('input_countries.csv')
.on('data', data=>{
    result=data.toString().split('\r\n')
})
    .on('end',  ()=> {
        // console.log(result)
        fs.writeFileSync('canada.txt', result[0]+'\n')
        fs.writeFileSync('usa.txt', result[0]+'\n')
        for (const element of result){
            if (element.includes('Canada')){
                fs.open('canada.txt', 'a', (err,fd)=>{
                    if (err){
                        console.log('error opening file')
                    }
                    fs.writeSync(fd, element+'\n')
                })
            }
            if (element.includes('United States')){
                fs.open('usa.txt', 'a', (err, fd)=>{
                    if (err){
                        console.log('error opening file')
                    }
                    fs.writeSync(fd, element+'\n')
                })
            }
        }
    })

