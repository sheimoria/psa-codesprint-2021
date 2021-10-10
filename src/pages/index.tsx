import * as deleteRequests from '../apis/deleteRequests'
import * as postRequests from '../apis/postRequests'

import Head from 'next/head'
import { intraAssign } from '../utils/assignUtils'
import { useState } from 'react'

const Home = () => {
  const postWorkers = async () => {
    const currentWorkerValue = workerValue
    await deleteRequests.deleteAllWorkers()
    await postRequests.generateWorkersAPI(currentWorkerValue)
    await postRequests.generateTasksAPI()
    // await postRequests.addWorkerTaskPair(1, 3)
    // await deleteRequests.deleteAllWorkerTaskPairs(1)
  }

  const [workerValue, setWorkerValue] = useState<any>()
  return (
    <>
      <Head>
        <title>PSA Worker Allocation System</title>
      </Head>
      <main>
        <div className="flex flex-col gap-2">
          <label htmlFor="numOfUnassignedWorkers">
            Number of unassigned workers
          </label>
          <div className="flex items-center gap-4">
            <input
              name="numOfUnassignedWorkers"
              value={workerValue}
              onChange={(e) => setWorkerValue(e.target.value)}
            />
            <button onClick={postWorkers}>Assign Workers</button>
            <button onClick={intraAssign}>Intra Assign Workers</button>
          </div>
        </div>
        <section className="flex gap-6">
          <div className="flex flex-col items-center gap-6">
            <table>
              <tr>
                <th>Equipment</th>
                <th>Workers</th>
                <th>Required</th>
                <th>Backlog</th>
              </tr>
              <tr>
                <td>Prime Mover</td>
                <td>Maria Anders</td>
                <td>3/4</td>
                <td className="text-green-600">True</td>
              </tr>
            </table>
            <div className="px-4 py-2 text-indigo-600 bg-indigo-100 rounded">
              Backlog: %
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <table>
              <tr>
                <th>Equipment</th>
                <th>Workers</th>
                <th>Required</th>
                <th>Backlog</th>
              </tr>
              <tr>
                <td>Prime Mover</td>
                <td>Maria Anders</td>
                <td>3/4</td>
                <td>True</td>
              </tr>
            </table>
            <div className="px-4 py-2 text-indigo-600 bg-indigo-100 rounded">
              Backlog: %
            </div>
          </div>
          <div className="flex flex-col items-center gap-6">
            <table>
              <tr>
                <th>Equipment</th>
                <th>Workers</th>
                <th>Required</th>
                <th>Backlog</th>
              </tr>
              <tr>
                <td>Prime Mover</td>
                <td>Maria Anders</td>
                <td>3/4</td>
                <td>True</td>
              </tr>
            </table>
            <div className="px-4 py-2 font-medium text-indigo-600 bg-indigo-100 rounded">
              Backlog: %
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
