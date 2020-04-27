const parse = require('csv-parse/lib/sync')
const fs = require("fs");

let data = fs.readFileSync("../resource/广陵邑.tab");
let record = parse(data, { delimiter: "\t", quote: null });
let housedata = []
record.forEach((item, i) => {
    let house = {
        style: {
            width: 10,
            height: 10,
            left: 0,
            top: 0,
        },
        name: "",
        link: "#",
        area: 0,
    };
    if (i > 1) {
        house.name = item[2];
        house.area = parseInt(item[4]);
        house.style.left = parseInt(item[7]);
        house.style.top = parseInt(item[8]);

        housedata.push(house)
    }
});
// console.log(housedata)
fs.writeFileSync('./housedata.json',JSON.stringify(housedata))
