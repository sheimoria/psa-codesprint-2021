import * as getRequests from '../apis/getRequests'

//Intra Assignment

export const intraAssign = async () => {
    //list of Departments
const departments = ["A", "B", "C"]

//Get all tasks available
const allTasks = await getRequests.useGetTasks()

//get All Workers
const allWorkers = await getRequests.useGetWorkers()

//for each of deparmtment
    departments.forEach((department, index) => {
        const tasksInDepartment = allTasks.filter(task => {
            task.department_Id === department
        })
        const sortedTasksByCriticality = tasksInDepartment.sort(function(a, b) {
            if (a.criticality < b.criticality) return -1;
            if (a.criticality > b.criticality) return 1;
            return 0;
        })
        const workersInDepartment = allWorkers.filter(worker => {
            worker.department_Id === department
        })

    })
    //filter the tasks by department - e.g. list of 3 tasks in department A
        //for each department, sort by criticality
    //Get all workers
        //filter workers by department -e.g. list of 10 workers in department A 
    

    // at this point we have set of tasks with criticality as priority
    // for each task
        //filter worker based on its skill that match current task's skill
        //-- at this point we have alist of workers with matched skills

        //while manpower of task is not full
            //If worker is not present in Worker-Task Table
            //POST request to Worker-Task Table
            //PUT manpower of task 
        
}








const sorted_data = data.sort(function(a, b) {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  }).filter((x) => x[1]== "A").sort(function(a, b) {
    if (a[7] < b[7]) return -1;
    if (a[7] > b[7]) return 1;
    return 0;
  })
