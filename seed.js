const mongoose=require('mongoose');
const Student=require("./models/Student")
const students=[
    {
        name:"pulkit",
        address:"kheragarh",
        img:"https://studiolorier.com/wp-content/uploads/2018/10/Profile-Round-Sander-Lorier.jpg",
        course:"b.tech",
        year:3,
        branch:'cs',
        cpi:8,
        core_skills:"dmkmksmkdmmdscmdsmsm",
        coding_link:"www.leetcode.com",
        certifications:"iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system"
    },
    {
        name:"kunal",
        address:"kheragarh",
        img:"https://studiolorier.com/wp-content/uploads/2018/10/Profile-Round-Sander-Lorier.jpg",
        course:"b.tech",
        year:3,
        branch:'cs',
        cpi:8,
        core_skills:"dmkmksmkdmmdscmdsmsm",
        coding_link:"www.leetcode.com",
        certifications:"iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system"
    }
    
]
async function seed(){
    await Student.deleteMany({});
    // await Student.insertMany(students);
    console.log("data seeded");
}
module.exports=seed;