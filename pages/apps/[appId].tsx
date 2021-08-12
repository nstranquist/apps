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
      await fetch(`/api/apps/${appId}`)
        .then(res => res.json())
        .then(data => {
          setAppData(data)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setErrors(err.message);
          setLoading(false)
        })
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
          <h1>{appData.title} - {appData.id}</h1>
          <p>{appData.description}</p>
          <a href={appData.website}>{appData.website}</a>
        </div>
      )}
    </div>
  )
}

export default Home;