import React from 'react'
import PropTypes from 'prop-types'
import { ExperienceTemplate } from '../../templates/experience'

const ExperiencePreview = ({ entry, widgetFor, widgetsFor, getAsset }) => {
    const links = entry.getIn(['data', 'links'])
    const technologies = entry.getIn(['data', 'technologies'])
    const logo = entry.getIn(['data', 'logo']);
    const images = [];
    widgetsFor('images').map(image => {
        if (image) {
            console.log(image._root.entries[0][1]);
            images.push(image._root.entries[0][1]);
        }
    });

    console.log(images);

    return (
        <ExperienceTemplate
            content={widgetFor('body')}
            title={widgetFor('title')}
            logo={getAsset(logo).toString()}
            startDate={widgetFor('startDate')}
            endDate={widgetFor('endDate')}
            images={images}
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
