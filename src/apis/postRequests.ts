import * as randomGenerators from '../randomGenerators.js'

import axios from 'axios'

export const generateWorkersAPI = async (count) => {
  const generatedWorkers = randomGenerators.generateWorkers(count)
  try {
    const response = await axios.post(
      'https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Workers',
      generatedWorkers
    )
    console.log(JSON.stringify(response, null, 2))
  } catch (err) {
    console.error(err)
  }
}

export const generateTasksAPI = async () => {
  const generatedTasks = randomGenerators.generateTasks()
  generatedTasks.forEach(async (task, index) => {
    try {
      const response = await axios.put(
        `https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Tasks/${index}`,
        task
      )
      console.log(JSON.stringify(response, null, 2))
    } catch (err) {
      console.error(err)
    }
  })
}

export const addWorkerTaskPair = async (workerId, taskId) => {
  const body = {
    worker_Id: workerId,
    task_Id: taskId
  }
  try {
    const response = await axios.post(
      'https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Worker-Task',
      body
    )
    console.log(JSON.stringify(response, null, 2))
  } catch (err) {
    console.error(err)
  }
}

export const updateTask = async (task_Id: number, currentManpower: number) => {
  const response = await axios.patch(
    `https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Tasks/${
      task_Id - 1
    }`,
    { currentManpower: currentManpower }
  )
  return response.data
}
