import * as getRequests from '../apis/getRequests'
import * as postRequests from '../apis/postRequests'

//Intra Assignment
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

export const intraAssign = async () => {
  //list of Departments
  const departments = ['A', 'B', 'C']

  //Get all tasks available
  const allTasks = await getRequests.getTasks()

  //get All Workers
  const allWorkers = await getRequests.getWorkers()

  // Get all worker-tasks
  const allWorkerTasks = await getRequests.getWorkerTasks()

  //for each of deparmtment
  departments.forEach((department) => {
    const tasksInDepartment = allTasks.filter(
      (task) => task.department_Id === department
    )

    const sortedTasksByCriticality = tasksInDepartment.sort(function (a, b) {
      if (a.criticality < b.criticality) return -1
      if (a.criticality > b.criticality) return 1
      return 0
    })
    const workersInDepartment = allWorkers.filter(
      (worker) => worker.department_Id === department
    )
    const addedWorkers = []
    sortedTasksByCriticality.forEach(async (task) => {
      const eligibleWorkers = workersInDepartment.filter(
        (worker) => worker.skill_Id === task.skillRequired
      )
      let count = 0
      while (
        task.currentManpower !== task.manpowerRequired &&
        count < eligibleWorkers.length
      ) {
        const currentWorker = eligibleWorkers[count]
        console.log(addedWorkers)
        console.log(currentWorker.worker_Id)
        if (!addedWorkers.includes(currentWorker.worker_Id)) {
          addedWorkers.push(currentWorker.worker_Id)
          await postRequests.addWorkerTaskPair(
            currentWorker.worker_Id,
            task.task_Id
          )
          const row = await getRequests.getTask(task.task_Id)
          const newManpowerCount = parseInt(row[0].currentManpower) + 1
          await postRequests.updateTask(row[0].task_Id, newManpowerCount)
          task.currentManpower += 1
        }
        count += 1
      }
    })
  })
}

export const interAssign = async () => {
  const workers = await getRequests.getWorkers()
  const workerTasks = await getRequests.getWorkerTasks()
  const tasks = await getRequests.getTasks()

  const commonPool = workers.filter(
    (worker) =>
      !workerTasks.some(
        (workerTask) => workerTask.worker_Id == worker.worker_Id
      )
  )
  const criticalities = ['1', '2', '3']
  for (let criticality of criticalities) {
    const departments =
      departmentsAccordingToHighestBacklogofCriticality(criticality)
    for (let department of departments) {
      const backlogs = tasks.filter(
        (task) =>
          task.department_Id === department &&
          task.criticality == criticality &&
          task.isBackLog
      )
      for (let backlog of backlogs) {
        if (commonPool.length > 0) {
          commonPool.forEach(async (worker) => {
            if (backlog.skillRequired == worker.skills_Id) {
              await postRequests.addWorkerTaskPair(
                currentWorker.worker_Id,
                backlog.task_Id
              )
              const row = await getRequests.getTask(backlog.task_Id)
              const newManpowerCount = parseInt(row[0].currentManpower) + 1
              await postRequests.updateTask(row[0].task_Id, newManpowerCount)
              commonPool = commonPool.filter(
                (worker_) => worker_.worker_Id !== worker.worker_Id
              )
            }
          })
        }
      }
    }
  }
}

const departmentsAccordingToHighestBacklogofCriticality = (criticality) => {
  const departmentCount = [
    { department_Id: A, count: 0 },
    { department_Id: B, count: 0 },
    { department_Id: C, count: 0 }
  ]
  tasks.forEach((task) => {
    if (task.criticality == criticality && !task.isBackLog) {
      departmentCount.find(
        (department) => department.department_Id === task.department_Id
      ).count += 1
    }
  })
  departmentCount.sort((a, b) => a.count - b.count)
  return departmentCount.map((departmentCount) => departmentCount.department_Id)
}

// Inter Assignment

// Get workers
// Get workerTasks
// Filter workers whose workedIds are not inside getWorkerTasks
// For each criticality:
//   Sort department with the most backlog of that criticality
//     For each department:
//       For each backlog (task):
//         If pool is not empty:
//           For each worker:
//             If backlog skillsrequired == worker skill id, insert workerid and taskid into workertask and remove worker from common pool
