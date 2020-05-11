import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { HTMLContent } from '../../components/Content'
import Layout from '../../components/Layout'
import { ProjectTemplate } from '../../templates/project'
import { Helmet } from 'react-helmet'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class ProjectsIndexPage extends React.Component {
  render() {
    
    var settings = {
      dots: true,
      arrows: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    
    const { data } = this.props
    const { edges: projects } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <Slider className="slider" {...settings}>
                {
                  projects.map((project, i) => {
                    project = project.node;
                    return (
                      <ProjectTemplate
                        key={i}
                        content={project.html}
                        contentComponent={HTMLContent}
                        title={project.frontmatter.title}
                        logo={project.frontmatter.logo}
                        startDate={project.frontmatter.startDate}
                        endDate={project.frontmatter.endDate ? project.frontmatter.endDate : null}
                        images={project.frontmatter.images.length > 0 ? project.frontmatter.images : null}
                        links={project.frontmatter.links}
                        technologies={project.frontmatter.technologies}
                        helmet={
                          <Helmet titleTemplate="%s | Blog">
                            <title>{`${project.frontmatter.title}`}</title>
                            <meta
                              name="description"
                              content={`${project.frontmatter.title}: A project by Andrew Kirillov.`}
                            />
                          </Helmet>
                        }
                      />
                    )
                  })
                }
              </Slider>            
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
  
export default () => (
  <StaticQuery
    query={graphql`
      query ProjectsQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___startDate] }
          filter: { frontmatter: { templateKey: { eq: "project" } } }
        ) {
          edges {
            node {
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
        }
      }
    `}
    render={(data, count) => <ProjectsIndexPage data={data} count={count} />}
  />
)
