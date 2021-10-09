import { google } from 'googleapis'

export const getTasks = async (size: number): Promise<string[][]> => {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const range = `Tasks!A$1:H$${size}`

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range
  })

  const data = response.data.values

  return data
}
