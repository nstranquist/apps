// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../util/mongodb";

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get id from the request
  const { id } = req.query
  console.log('id:', id)

  // Query the app data from the database
  const { db } = await connectToDatabase()

  try {
    const appData = await db
      .collection("apps")
      .find({ slug: id })
      .limit(1)
      .toArray()

    if(appData.length === 0) {
      res.status(404).send({
        message: "App details not found"
      })
    }

    // Return the app data
    res.send(appData)
  } catch (error) {
    console.log('error:', error.toString())
    // Return an error if the app data cannot be found
    res.status(404).send({
      message: "App Details not found"
    })
  }
}
