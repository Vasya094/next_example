import React from 'react'
import Head from 'next/head'
import { server } from '../../../config'

import Link from 'next/link'

import {useRouter} from 'next/router'
import Meta from '../../../components/Meta'


const Article = ({article}) => {
  return (
    <>
      <Meta title="Article" />
    <div>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <br />
        <Link href='/'><a id="go_back">Go Back</a></Link>
        <style jsx>{`
        #go_back:hover {
            transform: scale(0.7);
          }
      `}</style>
      </div>
      </>
  )
}

export const getStaticProps = async (context) => {
  const res = await fetch( `${server}/api/articles/${ context.params.id }` )
  const article = await res.json()

  return {
    props: {
      article
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch( `${server}/api/articles` )

  const articles = await res.json()

  const ids = articles.map( article => article.id )
  const paths = ids.map(id => ({params: {id: id.toString()}}))

  return {
    paths,
    fallback: false
  }
}

export default Article
