import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { HTMLContent } from '../../components/Content'
import Layout from '../../components/Layout'
import SlideContentTemplate from '../../components/SlideContent'
import { Helmet } from 'react-helmet'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class OrganizationsIndexPage extends React.Component {
  render() {
    
    var settings = {
      dots: true,
      arrows: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    
    const { data } = this.props
    const { edges: organizations } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <Slider className="slider" {...settings}>
                {
                  organizations.map((organization, i) => {
                    organization = organization.node;
                    return (
                      <SlideContentTemplate
                        key={i}
                        content={organization.html}
                        contentComponent={HTMLContent}
                        title={organization.frontmatter.title}
                        logo={organization.frontmatter.logo}
                        startDate={organization.frontmatter.startDate}
                        endDate={organization.frontmatter.endDate ? organization.frontmatter.endDate : null}
                        images={organization.frontmatter.images.length > 0 ? organization.frontmatter.images : null}
                        links={organization.frontmatter.links}
                        technologies={organization.frontmatter.technologies}
                        helmet={
                          <Helmet titleTemplate="%s | Blog">
                            <title>{`${organization.frontmatter.title}`}</title>
                            <meta
                              name="description"
                              content={`Andrew Kirillov's involvement with ${organization.frontmatter.title}`}
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
      query OrganizationsQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___startDate] }
          filter: { frontmatter: { templateKey: { eq: "organization" } } }
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
    render={(data, count) => <OrganizationsIndexPage data={data} count={count} />}
  />
)
