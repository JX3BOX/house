import data from "@jx3box/jx3box-data/data/house/area.json";
const W = 1024;
const H = 896;

let housedata = data
for(let name in housedata){
    let singlemap = housedata[name]
    singlemap.forEach((house) => {
        house.style.width = (house.style.width / 1024) * 100 + "%";
        house.style.height = (house.style.height / 896) * 100 + "%";
        house.style.left = (house.style.left / W) * 100 + "%";
        house.style.top = (house.style.top / H) * 100 + "%";
    });
}

export default housedata
