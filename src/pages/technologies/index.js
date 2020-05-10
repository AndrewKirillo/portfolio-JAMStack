import React from 'react'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const TechnologiesPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Technologies | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">Technologies</h1>
            <ul className="technologylist">
              {group.map((technology) => (
                <li key={technology.fieldValue}>
                  <Link to={`/technologies/${kebabCase(technology.fieldValue)}/`}>
                    {technology.fieldValue} ({technology.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default TechnologiesPage

export const technologiesPageQuery = graphql`
  query TechnologiesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___technologies) {
        fieldValue
        totalCount
      }
    }
  }
`
