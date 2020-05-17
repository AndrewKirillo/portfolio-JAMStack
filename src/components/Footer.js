import React from 'react'
import { Link } from 'gatsby'

import email from '../img/email.svg'
import linkedin from '../img/linkedin.svg'
import github from '../img/github.svg'
import twitter from '../img/twitter.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered">
          <div className="social">
            <Link title="email" to="/contact">
              <img
                src={email}
                alt="Email"
                style={{ width: '1em', height: '1em' }}
              />
            </Link>
            <a title="linkedin" href="https://www.linkedin.com/in/andrew-kirillov/">
              <img
                src={linkedin}
                alt="LinkedIn"
                style={{ width: '1em', height: '1em' }}
              />
            </a>
            <a title="github" href="https://github.com/AndrewKirillo">
              <img
                src={github}
                alt="Github"
                style={{ width: '1em', height: '1em' }}
              />
            </a>
            <a title="twitter" href="https://twitter.com/a_kirillo">
              <img
                className="fas fa-lg"
                src={twitter}
                alt="Twitter"
                style={{ width: '1em', height: '1em' }}
              />
            </a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
