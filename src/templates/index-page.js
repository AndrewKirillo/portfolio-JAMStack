import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


export const IndexPageTemplate = ({
  content,
  contentComponent,
  title,
  image
}) => {
  const PostContent = contentComponent || Content;

  return (
    <div>
      <section className="scroll-section" id="section-0">
        <h1 className="my-name">{title}</h1>
        <div className="bio-wrapper">
          <PreviewCompatibleImage
            imageInfo={{
              image,
              alt: "Andrew Kirillov's headshot",
              style: {
                height: "16rem",
                width: "16rem"
              }
            }}
          />
          <PostContent content={content} />
        </div>
        <div className="bio-action">
          <a href="/andrew/resume.pdf" target="_blank" rel="noopener noreferrer" className="button">View Resume</a>
        </div>
      </section>
    </div>
  )
}

IndexPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const IndexPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <IndexPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
