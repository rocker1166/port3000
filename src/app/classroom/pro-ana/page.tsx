//src>app>classroom>pro-ana>page.tsx

import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Simple Next.js Test</title>
        <meta name="description" content="Testing Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Next.js!</h1>
        <p>This is a simple test page.</p>
      </main>

      <footer>
        <p>&copy; 2025 Simple Next.js App</p>
      </footer>
    </div>
  )
}
