import axios from 'axios'
export const deleteAllWorkerTaskPairs = async (count) => {
    for (let x = 0; x < count; x+=1) {
        try {
            const response = await axios.delete(`https://sheet.best/api/sheets/4dfeb757-5527-4d0c-8134-88923d27e660/tabs/Worker-Task/worker_Id/${x+1}`)
            console.log(JSON.stringify(response, null, 2));
        } catch (err) {
        console.error(err);
        }
    }
      
  }
      