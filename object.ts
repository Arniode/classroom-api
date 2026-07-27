const oope = {
    name: "oop",
    id: 103,
    grades: [80,90,55,90,89,80,90,98]
}
//ARRAY OF OBJECTS(you use[])

const students =[
    {name:"Alice", id: 101, average: 80 },
    {name: "Ola",  id: 102, average: 90 }
];

const gradess = [80, 90, 85, 60, 75];
const names = ["Alice", "Bob", "Tolu"];

//push(to add)
const grades = [80,86]
    grades.push(90)
console.log(grades)

//pop(to remove)
grades.pop()
console.log(grades);

//forEach(to do something with each item)

const gradeo = [80,70,60];
gradeo.forEach((gradeo) => {
    console.log(gradeo)
});

//filter:keep only items that pass a test
const grase = [80,55,90,66,90]
const passing = grase.filter((grase) => {
    return grase >= 70
});
console.log(passing)

//map
const omo = [70,90,80];
const doubled = omo.map((omo) => {
    return omo*2 ;
});
console.log(doubled);

const studenths = [
    { name: "Alice", average: 85 },
    { name: "Bob",   average: 60 },
];

const namesh = studenths.map((studenths) => {
    return studenths.name;
});

console.log(names);  

//reduce:combines everything into one value
const lor = [80,90,70];
const total = lor.reduce((acc,cur) => {
    return acc+cur
},0);
console.log(total);

//find:get the first item that matches
const studentss = [
    { name: "Alice", id: 101 },
    { name: "Bob",   id: 102 },
    { name: "Tolu",  id: 103 }
];

const found = studentss.find((studentss) => {
    return studentss.id === 102;
});

console.log(found); 

//findIndex:get position of an item
const joi = [88,8,88];
const index = joi.findIndex((joi) => {
    return joi === 8
})
console.log(index)

//includes:check if something exists
const idk =[79,54,78];
console.log(idk.includes(79));

 //splice: removes items at a specific location
 const louy = [56,90,43,96]
 louy.splice(0,1)
 console.log(louy)



