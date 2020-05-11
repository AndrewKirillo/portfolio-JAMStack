import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ExperienceTemplate = ({
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
  const PostContent = contentComponent || Content;
  return (
    <section>
      <div className="meta">
        <div className="brand">
          <div className="logo">
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
          </div>
          <h2 className="company">{title}</h2>
          <h5 className="time">{startDate} - {endDate ? endDate : "Present"} </h5>
        </div>
      </div>
      <div className="slide-content">
        <PostContent content={content} />
        <div className="media">
          {
            images.map((image, i) => (
              <a key={i} href={links && links[i] && links[i]} target="_blank" rel="noopener noreferrer">
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

ExperienceTemplate.propTypes = {
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

const Experience = ({ data }) => {
  const { markdownRemark: experience } = data

  return (
    <Layout>
      <ExperienceTemplate
        content={experience.html}
        contentComponent={HTMLContent}
        title={experience.frontmatter.title}
        logo={experience.frontmatter.logo}
        startDate={experience.frontmatter.startDate}
        endDate={experience.frontmatter.endDate && experience.frontmatter.endDate}
        images={experience.frontmatter.images && experience.frontmatter.images}
        links={experience.frontmatter.links && experience.frontmatter.links}
        technologies={experience.frontmatter.technologies && experience.frontmatter.technologies}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${experience.frontmatter.title} Experience`}</title>
            <meta
              name="description"
              content={`Andrew Kirillov's experience working at ${experience.frontmatter.title}`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

Experience.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Experience

export const pageQuery = graphql`
  query ExperienceByID($id: String!) {
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
