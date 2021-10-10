import * as getRequests from '../apis/getRequests'

import axios from 'axios'
import postRequests from '../apis/postRequests'

//Intra Assignment

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
  departments.forEach((department, index) => {
    const tasksInDepartment = allTasks.filter((task) => {
      task.department_Id === department
    })
    const sortedTasksByCriticality = tasksInDepartment.sort(function (a, b) {
      if (a.criticality < b.criticality) return -1
      if (a.criticality > b.criticality) return 1
      return 0
    })
    const workersInDepartment = allWorkers.filter((worker) => {
      worker.department_Id === department
    })
    sortedTasksByCriticality.forEach(async (task) => {
      const eligibleWorkers = workersInDepartment.filter(
        (worker) => worker.skill_Id === task.skillRequired
      )
      let count = 0
      while (task.currentManpower !== task.manpowerRequired) {
        const currentWorker = eligibleWorker[count]
        if (
          !allWorkerTasks.some(
            (workerTask) => workerTask.worker_Id === currentWorker.worker_Id
          )
        ) {
          await postRequests.addWorkerTaskPair(
            currentWorker.worker_Id,
            task.task_Id
          )
          const task = await getRequests.getTask(task.task_Id)
          const newManpowerCount = task.currentManpower + 1
          await postRequests.updateTask(task.task_Id, newManpowerCount)
        }
      }
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
