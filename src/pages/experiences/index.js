import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { HTMLContent } from '../../components/Content'
import Layout from '../../components/Layout'
import { ExperienceTemplate } from '../../templates/experience'
import { Helmet } from 'react-helmet'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class ExperiencesIndexPage extends React.Component {
  render() {
    
    var settings = {
      dots: true,
      arrows: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    
    const { data } = this.props
    const { edges: experiences } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <Slider className="slider" {...settings}>
                {
                  experiences.map((experience, i) => {
                    experience = experience.node;
                    return (
                      <ExperienceTemplate
                        key={i}
                        content={experience.html}
                        contentComponent={HTMLContent}
                        title={experience.frontmatter.title}
                        logo={experience.frontmatter.logo}
                        startDate={experience.frontmatter.startDate}
                        endDate={experience.frontmatter.endDate ? experience.frontmatter.endDate : null}
                        images={experience.frontmatter.images.length > 0 ? experience.frontmatter.images : null}
                        links={experience.frontmatter.links}
                        technologies={experience.frontmatter.technologies}
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
      query ExperiencesQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___startDate] }
          filter: { frontmatter: { templateKey: { eq: "experience" } } }
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
    render={(data, count) => <ExperiencesIndexPage data={data} count={count} />}
  />
)
