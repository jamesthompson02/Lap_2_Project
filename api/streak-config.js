const Habit = require("./models/habit");
const dayjs = require("dayjs")

function setUpTimer(){
    let midnight = new Date().setHours(23,59,59,0);
    let time = new Date()
    const timeToMidnight = (midnight - time)
    setTimeout(checkStreaks, timeToMidnight );
}

async function checkStreaks(){
    let today = dayjs().format('ddd')
    try{
        const habitList = await Habit.find();
        habitList.forEach(async each => {
            let met = [];
            Object.entries(each.habits).forEach(habit => {
                if (habit[1].met){
                    met.push(habit[0])
                } else{
                    habit[1].streak = 0;
                }
            })
            each.data.push({
                date: today,
                met: met,
                habits: each.habits
            })
            Object.entries(each.habits).forEach(habit => {
                habit[1].current = 0;
                habit[1].met = 0;
            })
            const res = await Habit.updateOne({_id: each._id}, {data: each.data, habits: each.habits})
        });
        console.log("Database updated")
    } catch(err){
        console.log(err)
    }
    setTimeout(checkStreaks, 24*60*60*1000);
}

module.exports = setUpTimer;
