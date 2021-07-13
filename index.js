const fs = require('fs');
const fetch = require('node-fetch');

const pokeFile = process.argv[2];

let pokeNames =()=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(pokeFile, 'utf8',(err,data)=>{
            if (err){
                reject(err);
            } else {
                let lines = data.split('\n');
                resolve(lines);
            }
        })   
    }).then(names=>{
        let format = '';
        names.forEach((name,index)=>{
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response=>response.json())
            .then(data=>{
                let pokeTypes = data.types.map(element=>{
                    return element.type.name;
                });
                let nameFormat = name[0].toUpperCase() + name.slice(1);
                format += nameFormat + ': ' + pokeTypes.join(', ') + '\n';
                console.clear();
                console.log(format);
            });
        });
    });
};
pokeNames();

//Promise.all()???