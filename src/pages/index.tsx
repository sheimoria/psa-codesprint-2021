import * as deleteRequests from '../apis/deleteRequests'
import * as getRequests from '../apis/getRequests'
import * as postRequests from '../apis/postRequests'

import { interAssign, intraAssign } from '../utils/assignUtils'
import { useEffect, useState } from 'react'

import Head from 'next/head'

const Home = () => {
  const departments = ['A', 'B', 'C']
  const postWorkers = async () => {
    await deleteRequests.deleteAllWorkers()
    await postRequests.generateWorkersAPI(workerValue)
    await postRequests.generateTasksAPI()
    await deleteRequests.deleteAllWorkerTaskPairs()
  }
  const [workerValue, setWorkerValue] = useState<any>()
  const [workers, setWorkers] = useState([])
  const [equipment, setEquipment] = useState([])
  const [tasks, setTasks] = useState([])
  const [workerTasks, setWorkerTasks] = useState([])

  useEffect(() => {
    const workers = async () => {
      const response = await getRequests.getWorkers()
      setWorkers(response)
    }
    const equipment = async () => {
      const response = await getRequests.getEquipment()
      setEquipment(response)
    }
    const workerTasks = async () => {
      const response = await getRequests.getWorkerTasks()
      setWorkerTasks(response)
    }
    const tasks = async () => {
      const response = await getRequests.getTasks()
      setTasks(response)
    }
    workers()
    equipment()
    workerTasks()
    tasks()
  }, [])

  const departmentTasks = (department_Id: string) => {
    const table = []
    tasks
      .filter((task) => task.department_Id === department_Id)
      .forEach((task) => {
        const object = {}
        const selectedEquipment = equipment.filter(
          (equipment) => equipment.equipment_Id == task.equipment_Id
        )
        const selectedWorkerTasks = workerTasks.filter(
          (workerTask) => workerTask.task_Id == task.task_Id
        )
        const selectedWorkers = workers
          .filter((worker) =>
            selectedWorkerTasks.some(
              (selectedWorkerTask) =>
                selectedWorkerTask.worker_Id === worker.worker_Id
            )
          )
          .map((worker) => worker.name)
        const selectedManpowerRequired = `${task.currentManpower}/${task.manpowerRequired}`
        const backLog =
          task.currentManpower < task.manpowerRequired ? 'True' : 'False'
        const criticality = task.criticality
        const skill = task.skillRequired
        object['equipment'] = selectedEquipment
        object['workers'] = selectedWorkers
        object['manpower'] = selectedManpowerRequired
        object['backlog'] = backLog
        object['criticality'] = criticality
        object['skill'] = skill
        table.push(object)
      })
    return table
  }
  const points = [0, 1, 2, 3]
  const getBackLogForDepartment = (department_Id) => {
    return (
      (tasks
        .filter(
          (task) =>
            task.department_Id === department_Id &&
            task.currentManpower < task.manpowerRequired
        )
        .reduce((cur, acc) => {
          console.log(cur + points[acc.criticality])
          return cur + points[acc.criticality]
        }, 0) /
        tasks
          .filter((task) => task.department_Id === department_Id)
          .reduce((cur, acc) => {
            console.log(cur + points[acc.criticality])
            return cur + points[acc.criticality]
          }, 0)) *
      100
    )
  }

  const criticalityEnum = [
    '',
    <td key={1}>
      <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded place-self-start">
        Low
      </span>
    </td>,
    <td key={2}>
      <span className="px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-200 rounded place-self-start">
        Medium
      </span>
    </td>,
    <td key={3}>
      <span className="px-3 py-1 text-sm font-medium text-indigo-800 bg-indigo-300 rounded place-self-start">
        High
      </span>
    </td>
  ]

  return (
    <>
      <Head>
        <title>PSA Worker Allocation System</title>
      </Head>
      <main>
        <h1 className="text-lg font-medium text-indigo-600">
          PSA Manpower Allocation System
        </h1>
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
            <button onClick={interAssign}>Inter Assign Workers</button>
          </div>
        </div>
        <section className="flex flex-col gap-6">
          {departments.map((department) => (
            <div key={department} className="flex flex-col items-start gap-6">
              <h1>Department {department}</h1>
              <table>
                <tr>
                  <th>Equipment</th>
                  <th>Skills Required</th>
                  <th>Workers</th>
                  <th>Manpower Required</th>
                  <th>Backlog</th>
                  <th>Criticality</th>
                </tr>
                {departmentTasks(department).map((departmentTask) => (
                  <tr key={department}>
                    <td>{departmentTask.equipment[0]?.type}</td>
                    <td>
                      <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded place-self-start">
                        {departmentTask.skill}
                      </span>
                    </td>
                    <td>
                      {departmentTask.workers.map((worker, index) => (
                        <p key={index}>{worker}</p>
                      ))}
                    </td>
                    <td>{departmentTask.manpower}</td>
                    <td
                      className={
                        departmentTask.backlog == 'True'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {departmentTask.backlog}
                    </td>
                    {criticalityEnum[departmentTask.criticality]}
                  </tr>
                ))}
              </table>
              <div className="px-4 py-2 font-medium text-indigo-600 bg-indigo-100 rounded">
                Backlog: {Math.round(getBackLogForDepartment(department))}%
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export default Home
