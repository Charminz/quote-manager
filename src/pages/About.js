import React, { Component } from 'react';
import linkedin from "../assets/linkedin-img.svg";
import github from "../assets/github-img.svg";

class About extends Component {
	render() {
		return (
			<div className="about">
				<div className="about-me">
					<h2>Indrek Toomsalu</h2>
					<p>I'm passionate frontend developer with mostly experience in Vue.js.</p>
					<p>
						I am also a Informatics student at Tallinn University of Technology, where I'm finishing a bachelor's
						degree.
					</p>
				</div>
				<div className="social">
					<h4>Find more information about me at:</h4>
					<a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/indrek-toomsalu/">
						<img src={linkedin} className="social-icon" alt="Linkedin"/>
					</a>
					<a rel="noopener noreferrer" target="_blank" href="https://github.com/Charminz">
						<img src={github} className="social-icon" alt="Github"/>
					</a>
				</div>
			</div>
		);
	}
}

export default About;
