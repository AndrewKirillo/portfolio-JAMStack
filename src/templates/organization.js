import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const OrganizationTemplate = ({
  content,
  contentComponent,
  title,
  logo,
  startDate,
  endDate,
  images,
  links,
  technologies,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section>
      <div className="meta">
        <div className="brand">
            <PreviewCompatibleImage
                imageInfo={{
                    image: logo,
                    alt: `${title} logo`,
                    style: {
                    height: "3rem",
                    width: "3rem"
                    }
                }}
            />
          <h2 className="company">{title}</h2>
          <h5 className="time">{startDate}{endDate ? ` - ${endDate}` : null} </h5>
        </div>
      </div>
      <div className="slide-content">
        <PostContent content={content} />
        <div className="media">
          {
            images.map((image, i) => (
                <a key={i} href={links[i]} target="_blank" rel="noopener noreferrer">
                    <PreviewCompatibleImage
                    imageInfo={{
                        image,
                        alt: "oops",
                        style: {
                        height: "144px",
                        width: "256px"
                        }
                    }}
                    />
              </a>
            ))
          }
        </div>
        <div className="technologies">
          { technologies ?
            technologies.map((technology, i) => (
              <Link key={i} to={`/technologies/${kebabCase(technology)}/`}>{technology}</Link>
            )) : null
          }
        </div>
      </div>
    </section>
  )
}

OrganizationTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  images: PropTypes.array,
  links: PropTypes.array,
  technologies: PropTypes.array,
  helmet: PropTypes.object,
}

const Organization = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <OrganizationTemplate
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
              content={`Andrew Kirillov's involvement with ${post.frontmatter.title}`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

Organization.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Organization

export const pageQuery = graphql`
  query OrganizationByID($id: String!) {
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
