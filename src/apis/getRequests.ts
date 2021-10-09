import axios from 'axios'
import useSWR from 'swr'

export const useGetTasks = () => {
  return useSWR(
    'https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Tasks',
    async (url) => {
      const response = await axios.get(url)
      return response.data
    }
  )
}

export const useGetWorkers = () => {
  return useSWR(
    'https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Workers',
    async (url) => {
      const response = await axios.get(url)
      return response.data
    }
  )
}

export const useGetWorkerTasks = () => {
  return useSWR(
    'https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Worker-Task',
    async (url) => {
      const response = await axios.get(url)
      return response.data
    }
  )
}
