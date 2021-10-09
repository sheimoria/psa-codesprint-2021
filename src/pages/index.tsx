import Head from 'next/head'
import * as postRequests from '../apis/postRequests'
import * as deleteRequests from '../apis/deleteRequests'


const Home = () => {
  return (
    <>
      <Head>
        <title>PSA Hack</title>
      </Head>
      <div>
        <section className="adminRequirements">
          <div className="adminForm">
            <div className="inputField">
              <h1 className="workerText">Enter Number of Workers: </h1>
              <input type="text" className="workerText" style={ {border: "black 1px solid"}}/>
            </div>
            <div className="workerButton">
              <button onClick={postWorkers} >Assign To Departments</button>
            </div>
          </div>
        </section>
      </div>
      <div></div>
    </>
  )
}

export default Home



const postWorkers = async () => {
  // await postRequests.generateWorkersAPI(30)
  await postRequests.generateTasksAPI()
  // await postRequests.addWorkerTaskPair(1, 3)
  // await deleteRequests.deleteAllWorkerTaskPairs(1)
}

