import axios from 'axios'


export const useGetTasks = async () => {
  const response = await axios.get<Object[]>('https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Tasks')
  return response.data
}

export const useGetWorkers = async () => {
  const response = await axios.get<Object[]>( 'https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Workers')
      return response.data
}

export const useGetWorkerTasks = async () => {
  const response = await axios.get<Object[]>('https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Worker-Task')
  return response.data
}
