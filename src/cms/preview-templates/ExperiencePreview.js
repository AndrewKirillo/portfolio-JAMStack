import React from 'react'
import PropTypes from 'prop-types'
import { ExperienceTemplate } from '../../templates/experience'

const ExperiencePreview = ({ entry, widgetFor }) => {
    const endDate = entry.getIn(['data', 'endDate'])
    const images = entry.getIn(['data', 'images'])
    const links = entry.getIn(['data', 'links'])
    const technologies = entry.getIn(['data', 'technologies'])
  return (
    <ExperienceTemplate
        content={widgetFor('body')}
        title={entry.getIn(['data', 'title'])}
        logo={entry.getIn(['data', 'logo'])}
        startDate={entry.getIn(['data', 'startDate'])}
        endDate={endDate && endDate}
        images={images && images.toJS()}
        links={links && links.toJS()}
        technologies={technologies && technologies.toJS()}
    />
  )
}

ExperiencePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ExperiencePreview
