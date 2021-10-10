import axios from 'axios'

export const getTasks = async () => {
  const response = await axios.get<Object[]>(
    'https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Tasks'
  )
  return response.data
}

export const getWorkers = async () => {
  const response = await axios.get<Object[]>(
    'https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Workers'
  )
  return response.data
}

export const getWorkerTasks = async () => {
  const response = await axios.get<Object[]>(
    'https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Worker-Task'
  )
  return response.data
}

export const getTask = async (task_Id: number) => {
  const response = await axios.get<Object[]>(
    `https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Tasks/${
      task_Id - 1
    }`
  )
  return response.data
}
