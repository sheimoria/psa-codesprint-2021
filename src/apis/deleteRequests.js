import axios from 'axios'
export const deleteAllWorkerTaskPairs = async (count) => {
    try {
        const response = await axios.delete(
          `https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Worker-Task/deleteKey/*key*`
        )
        // console.log(JSON.stringify(response, null, 2));
      } catch (err) {
        console.error(err)
      }
}

export const deleteAllWorkers = async (count) => {
  try {
    const response = await axios.delete(
      `https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Workers/deleteKey/*key*`
    )
    // console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err)
  }
}
