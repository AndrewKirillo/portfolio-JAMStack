import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'
import Content from './Content'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const SlideContentTemplate = ({
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
          <h5 className="time">{startDate} - {endDate !== "Invalid date" ? endDate : "Present"} </h5>
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

SlideContentTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  images: PropTypes.array,
  links: PropTypes.array,
  technologies: PropTypes.array,
  helmet: PropTypes.object,
}

export default SlideContentTemplate;