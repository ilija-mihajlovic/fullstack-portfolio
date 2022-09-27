import React from 'react'
import './Work.scss'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useState, useEffect } from 'react'
import { AiFillEte, AiFillEye, AiFillGithub } from 'react-icons/ai'
import { motion } from 'framer-motion'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'

import { images } from '../../constants'


const Work = ({ scrollPosition }) => {

  const [activeFilter, setActiveFilter] = useState('All')
  const [animateCard, setAnimateCard] = useState({y:0, opacity:1})
  const [works, setWorks] = useState([])
  const [filterWork, setFilterWork] = useState([])

  useEffect(() => {
    const query = '*[_type == "works"]'

    client.fetch(query)
      .then((data)=> {
        setWorks(data)
        setFilterWork(data)
      })
  }, [])
  

  const handleWorkFilter = (item) => {
    setActiveFilter(item)
    setAnimateCard([{y:100, opacity:0}])

    setTimeout(() => {
      setAnimateCard([{y:0, opacity:1}])

      if(item === 'All'){
        setFilterWork(works)
      }else{
        setFilterWork(works.filter((work) => work.tags.includes(item)))
      }
    }, 500)
  }

  const handleTags = (tag) => {
    
  }



  return (
    <>
      <h2 className='head-text'>My Creative <span>Portfolio </span></h2>

      <div className="app__work-filter">
        {['Web App', 'Wordpress', 'UI/UX', 'Design', 'All'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      
        <motion.div 
          animate={animateCard}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className="app__work-portfolio"
        >
          {filterWork.map((work, index) => (
            <div className="app__work-item app__flex" key={index}>
              <div className='app__work-img app__flex'>
                  <LazyLoadImage 
                    src={urlFor(work.imgUrl)} 
                    alt={work.name}
                    scrollPosition={scrollPosition}
                    effect='blur'
                  />

                <motion.div
                  whileHover={{opacity:[0,1]}}
                  transition={{
                    duration:0.25,
                    ease: 'easeInOut',
                    staggerChildren: 0.5
                  }}
                  className='app__work-hover app__flex'
                >
                  <a href={work.projectLink} target='_blank' rel='noreferr'>
                    <motion.div
                    whileInView={{scale:[0, 1]}}
                    whileHover={{scale:[1,0.9]}}
                    transition={{
                      duration:0.25,
                    }}
                    className='app__flex'
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                  {work.tags.includes('Design') ? '' : (
                    <a href={work.codeLink} target='_blank' rel='noreferr'>
                    <motion.div
                    whileInView={{scale:[0, 1]}}
                    whileHover={{scale:[1,0.9]}}
                    transition={{
                      duration:0.25,
                    }}
                    className='app__flex'
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                  )}
                  
                </motion.div>

              </div>

              <div className="app__work-content app__flex">
                <h4 className='bold-text'>{work.title}</h4>
                <p className="p-text" style={{marginTop:20}}>{work.description}</p>

                <div className='app__work-tag app__flex'>
                    <p className='p-text'>{work.tags[0]}</p>
                </div>
              </div>

            </div>
          ))}

        </motion.div>
    </>
  )
}

export default AppWrap(
    MotionWrap(trackWindowScroll(Work), 'app__works'), 
    'work',
    'app__primarybg'
) 