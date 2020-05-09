import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const ExperienceTemplate = ({
  content,
  contentComponent,
  company,
  startDate,
  endDate,
  images,
  links,
  technologies,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {company}
            </h1>
            <PostContent content={content} />
            {technologies && technologies.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {technologies.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

ExperienceTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  company: PropTypes.string,
  helmet: PropTypes.object,
}

const Experience = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ExperienceTemplate
        content={post.html}
        contentComponent={HTMLContent}
        descriptions={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        company={post.frontmatter.title}
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
        company
        startDate(formatString: "MMM YYYY")
        endDate(formatString: "MMM YYYY")
        images
        links
        technologies
      }
    }
  }
`
