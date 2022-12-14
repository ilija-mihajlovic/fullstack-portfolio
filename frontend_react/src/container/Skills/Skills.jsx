import React from 'react'
import './Skills.scss'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactTooltip from 'react-tooltip'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'


const Skills = ({ scrollPosition }) => {

  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])

  useEffect(() => {
    const query = '*[_type == "experiences"]'
    const skillsQuery = '*[_type == "skills"]'

    client.fetch(query)
      .then((data)=> {
        setExperience(data)
      })
    
    client.fetch(skillsQuery)
    .then((data)=> {
      setSkills(data)
    })
  }, [])
  
  return (
    <>
      <h2 className='head-text'>Skills & Experience</h2>

      <div className="app__skills-container">
        <motion.div className='app__skills-list'>
          {skills?.map((skill) => (
            <motion.div
              whileInView={{opacity:[0,1]}}
              transition={{duration:0.5}}
              className='app__skills-item app__flex'
              key={skill.name}
            >
              <div className="app__flex" style={{backgroundColor: skill.bgColor}}>
                <LazyLoadImage 
                  src={urlFor(skill.icon)} 
                  alt={skill.name} 
                  scrollPosition={scrollPosition}
                  effect='blur'
                />
              </div>
              <p className='p-text'>{skill.name}</p>

            </motion.div>
          ))}
        </motion.div>

        <motion.div className='app__skills-exp'>
            {experience?.map((experience) => (
              <motion.div
                className='app__skills-exp-item'
                key={experience.year}
              >
                <div className='app__skills-exp-year'>
                  <p className="bold-text">{experience.year}</p>
                </div>

              <motion.div className='app__skills-exp-works'>
              {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>

              </motion.div>
            ))}
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(
    MotionWrap(trackWindowScroll(Skills), 'app__skills'), 
    'skills',
    'app__whitebg'
) 