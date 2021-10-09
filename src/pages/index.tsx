import Head from 'next/head'
import { google } from 'googleapis'

const Home = ({ data }: { data: string[][] }) => {
  return (
    <>
      <Head>
        <title>PSA Hack</title>
      </Head>
      <div>
        {data.map((entries, index) => (
          <h1 key={index}>
            {entries.map((entry, index) => (
              <span key={index}>{entry}</span>
            ))}
          </h1>
        ))}
      </div>
    </>
  )
}

export default Home

export async function getServerSideProps({ query }) {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const range = `Sheet1!A$1:C$10`

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range
  })

  const data = response.data.values

  return {
    props: {
      data
    }
  }
}
