import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AppData } from '../../types/AppData'

const Home: NextPage = () => {
  const router = useRouter()
  const { appId } = router.query

  const [appData, setAppData] = useState<null | AppData>(null)
  const [errors, setErrors] = useState<null | string[]>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Query App Detail information with the id
    async function loadAppData() {
      setErrors(null)
      setLoading(true)
      try {
        const response = await fetch(`/api/apps/${appId}`)
        const data = await response.json()
        if(response.status === 404) {
          throw new Error(data.message || 'App data not found')
        }
        console.log('data:', data)
        setAppData(data[0])
        setLoading(false)
      }
      catch (err) {
        console.log(err.message)
        setErrors(err.message);
        setLoading(false)
      }

    }

    if(appId)
      loadAppData()
  }, [appId])

  return (
    <div>
      <Head>
        <title>App Detail for {appId || ""}</title>
        <meta name="description" content="Detail page for app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* If app is loading, indicate that */}
      {loading && (
        <p>loading</p>
      )}

      {/* If app has errors, show them */}
      {errors && (
        <p style={{color:'red'}}>{errors.toString()}</p>
      )}

      {/* If app data is loaded, render it */}
      {appData && (
        <div className="app-data-container">
          <h1>{appData.title}</h1>
          <p>{appData.description}</p>
          <a href={appData.website}>{appData.website}</a>
        </div>
      )}
    </div>
  )
}

export default Home;