import Head from 'next/head'
import { server } from '../config'
import Article from '../components/Article'
import Meta from '../components/Meta'
// import styles from '../styles/Home.module.css'

export default function Home( { data } ) {
  debugger
 
  return (
    <div>
      <Meta title="Dev Newz" />
     <Article articles={data} />
    </div>
  )
}

// export const getStaticProps = async () => {
//   const res = await fetch( `https://jsonplaceholder.typicode.com/posts?_limit=6` )
//   const articles = await res.json()
//   console.log(articles)
//   return {
//     props: {
//       articles
//     }
//   }
// }

export async function getStaticProps(context) {
  const res = await fetch(`${server}/api/articles`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}