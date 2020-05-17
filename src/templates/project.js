import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import SlideContentTemplate from '../components/SlideContent'

const Project = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <SlideContentTemplate
        content={post.html}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        logo={post.frontmatter.logo}
        startDate={post.frontmatter.startDate}
        endDate={post.frontmatter.endDate}
        images={post.frontmatter.images}
        links={post.frontmatter.links}
        technologies={post.frontmatter.technologies}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.title}: A project by Andrew Kirillov.`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

Project.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Project

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        logo {
            childImageSharp {
                fluid(quality: 100) {
                ...GatsbyImageSharpFluid
                }
            }
        }
        startDate(formatString: "MMM YYYY")
        endDate(formatString: "MMM YYYY")
        images {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        links
        technologies
      }
    }
  }
`
