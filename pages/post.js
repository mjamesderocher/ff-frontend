import React from 'react'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/Layout'
import sanity from '../config/sanity'
import sanityClient from '../config/sanity'
import localize from '../utils/localize'

import Image from '../components/Image'

//const query = `*[_type == "post" && slug[$lang].current == $slug] {
const query = `*[_type == "post" && _id == "3556c959-a866-475d-9946-b4ebd761b728"] {
  _id,
  title,
  "body": body[]->{
    _id,
    heading,
    body
  }
}[0]
`

export default class Post extends React.Component {

  static async getInitialProps(req) {
    console.log('request:', req)
    return {
      //unfilteredPost: await sanity.fetch(query, {lang: req.query.lang, slug: req.query.slug})
      unfilteredPost: await sanity.fetch(query)
    }
  }

  render() {
    const {unfilteredPost} = this.props
    const post = localize(unfilteredPost, ['sw', 'en'])
    console.log(post)
    return (
      <Layout>
        <article>
          
          
        </article>
      </Layout>
    )
  }
}

/*
<h1>{post.title}</h1>
          {post.imageUrl && <Image imgUrl={post.imageUrl} />}
{post.body.map(section => {
              return (
                <section key={section._key}>
                  <h2>{section.heading}</h2>
                  <BlockContent blocks={section.body} />
                </section>
              )
            })
          }*/
