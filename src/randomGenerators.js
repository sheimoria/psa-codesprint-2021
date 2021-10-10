import * as fixtures from './tableFixtures'

const departmentList = ['A', 'B', 'C']
const skillList = ['1', '2', '3']
const backLogList = ['TRUE', 'FALSE']
const criticalityList = [1, 2, 3]
const manpowerList = [2, 3, 4]



export const generateWorkers = (count) => {
    let arrayOfWorkers = []
    for (let x = 1; x <= count; x +=1) {
        let worker = {}
        worker.worker_Id = x
        worker.department_Id = generateDepartmentId()
        worker.skill_Id = generateSkillId()
        worker.name = `Worker${x}`
        worker.deleteKey = "key"
        arrayOfWorkers.push(worker)
    }
    return arrayOfWorkers
}



const generateDepartmentId = () => {
    return departmentList[Math.floor(Math.random() * departmentList.length)]
}

const generateSkillId = () => {
    return skillList[Math.floor(Math.random() * skillList.length)]
}

const generateIsBackLog = () => {
    return backLogList[Math.floor(Math.random() * backLogList.length)]
}

const generateCriticality = () => {
    return criticalityList[Math.floor(Math.random() * criticalityList.length)]
}

const generateManpowerRequired = () => {
    return manpowerList[Math.floor(Math.random() * manpowerList.length)]
}

export const generateTasks = () => {
    const tasksCopy = []
    fixtures.defaultTasks.forEach((task, index) => {
        tasksCopy[index] = {
            ...task,
            manpowerRequired: generateManpowerRequired(),
            isBackLog: "False",
            skillRequired: generateSkillId(),
            criticality: generateCriticality()
        }
    })
    console.log(tasksCopy)
    return tasksCopy
}



