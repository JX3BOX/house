// 广陵邑
const W = 3495;
const H = 3072;

let housedata = [
    {
        style: { width: 90, height: 64, left: 1130, top: 968 },
        name: "句容里一保",
        link: "#",
        area: 7000,
    },
    {
        style: { width: 54, height: 54, left: 1004, top: 1215 },
        name: "挂剑里一邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 46, height: 58, left: 906, top: 1439 },
        name: "挂剑里二保",
        link: "#",
        area: 3640,
    },
    {
        style: { width: 48, height: 32, left: 1092, top: 1579 },
        name: "挂剑里三邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 33, height: 35, left: 1209, top: 1415 },
        name: "挂剑里四邻",
        link: "#",
        area: 1200,
    },
    {
        style: { width: 52, height: 65, left: 1519, top: 1176 },
        name: "通寰里一保",
        link: "#",
        area: 3640,
    },
    {
        style: { width: 47, height: 40, left: 1547, top: 1424 },
        name: "通寰里二邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 45, height: 41, left: 1713, top: 1094 },
        name: "通寰里三邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 40, height: 50, left: 1802, top: 1234 },
        name: "通寰里四邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 50, height: 40, left: 1799, top: 1490 },
        name: "通寰里五邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 50, height: 60, left: 2019, top: 1014 },
        name: "观桥里一保",
        link: "#",
        area: 3640,
    },
    {
        style: { width: 40, height: 50, left: 2279, top: 977 },
        name: "观桥里二邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 41, height: 44, left: 2056, top: 1244 },
        name: "观桥里三邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 38, height: 51, left: 2258, top: 1210 },
        name: "观桥里四邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 38, height: 32, left: 1298, top: 1857 },
        name: "清茨里一邻",
        link: "#",
        area: 1200,
    },
    {
        style: { width: 46, height: 46, left: 1412, top: 1972 },
        name: "清茨里二邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 40, height: 64, left: 1775, top: 1809 },
        name: "鱼雁里一邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 50, height: 45, left: 1914, top: 1727 },
        name: "鱼雁里二邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 64, height: 48, left: 2143, top: 1631 },
        name: "鱼雁里三保",
        link: "#",
        area: 3640,
    },
    {
        style: { width: 48, height: 50, left: 779, top: 2124 },
        name: "吴亭里一邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 52, height: 65, left: 826, top: 2370 },
        name: "吴亭里二保",
        link: "#",
        area: 3640,
    },
    {
        style: { width: 54, height: 53, left: 1093, top: 2116 },
        name: "吴亭里三邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 51, height: 40, left: 1093, top: 2472 },
        name: "吴亭里四邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 40, height: 40, left: 1294, top: 2188 },
        name: "吴亭里五邻",
        link: "#",
        area: 1200,
    },
    {
        style: { width: 38, height: 48, left: 1280, top: 2437 },
        name: "吴亭里六邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 35, height: 45, left: 1453, top: 2388 },
        name: "吴亭里七邻",
        link: "#",
        area: 1200,
    },
    {
        style: { width: 38, height: 30, left: 1769, top: 2341 },
        name: "襟江里一邻",
        link: "#",
        area: 1200,
    },
    {
        style: { width: 46, height: 42, left: 1864, top: 2071 },
        name: "襟江里二邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 44, height: 56, left: 1908, top: 2280 },
        name: "襟江里三保",
        link: "#",
        area: 3640,
    },
    {
        style: { width: 42, height: 58, left: 2048, top: 1974 },
        name: "襟江里四邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 46, height: 38, left: 2103, top: 2284 },
        name: "襟江里五邻",
        link: "#",
        area: 2080,
    },
    {
        style: { width: 32, height: 42, left: 2298, top: 1876 },
        name: "襟江里六邻",
        link: "#",
        area: 1200,
    },
    {
        style: { width: 36, height: 46, left: 2298, top: 2036 },
        name: "襟江里七邻",
        link: "#",
        area: 2080,
    },
];

housedata.forEach((house) => {
    house.style.width = (house.style.width / 1000) * 100 + "%";
    house.style.height = (house.style.height / 1000) * 100 + "%";
    house.style.left = (house.style.left / W) * 100 + "%";
    house.style.top = (house.style.top / H) * 100 + "%";
});

module.exports = housedata;