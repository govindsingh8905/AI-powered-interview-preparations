import React, { useState,useEffect } from 'react'
import { ChevronRight, CheckCircle, AlertCircle, BookOpen, Calendar, Zap, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../style/interview.scss'
import { useInterview } from '../hooks/useinterview'
import {useNavigate,useParams} from 'react-router'


const Interview = () => {
  const [selectedSection, setSelectedSection] = useState('technical')
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0)
  const { report,getReportById,loading } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

///Problem (Pehle kya ho raha tha): Aapka loading aur null check (if(loading || !report)) pehle code ke bilkul niche (line 72 par) tha. Aur usse pehle hi aapne line 23 par sections array declare kar diya tha.

//Jaise hi page refresh hua, report variable null tha. React ne render karte waqt line 29 par report.technicalQuestions.length check karne ki koshish ki. report null hone ki wajah se error throw ho gaya: "Cannot read properties of null (reading 'technicalQuestions')", aur page wahi crash ho gaya (niche wale loading check tak code pahunch hi nahi paya).

//Fix (Ab humne kya kiya): Humne is loading check (if(loading || !report)) ko uthakar components ke bilkul top par (line 23 par) shift kar diya hai:

  if(loading || !report) {
    return (
      <main className="interview-loading" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        color: '#fff',
        fontFamily: 'sans-serif'
      }}>
        <h2>Loading Interview Plan...</h2>
      </main>
    )
  }

  const sections = [
    {
      id: 'technical',
      title: 'Technical Questions',
      icon: Zap,
      color: '#5b8fff',
      count: report.technicalQuestions.length,
      data: report.technicalQuestions,
      type: 'questions'
    },
    {
      id: 'behavioral',
      title: 'Behavioral Questions',
      icon: BookOpen,
      color: '#ffa502',
      count: report.behavioralQuestions.length,
      data: report.behavioralQuestions,
      type: 'questions'
    },
    {
      id: 'gaps',
      title: 'Skill Gaps',
      icon: AlertCircle,
      color: '#ff4757',
      count: report.skillGaps.length,
      data: report.skillGaps,
      type: 'gaps'
    },
    {
      id: 'prep',
      title: '7-Day Plan',
      icon: Calendar,
      color: '#2ed573',
      count: report.preparationPlan.length,
      data: report.preparationPlan,
      type: 'prep'
    }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ff4757'
      case 'medium': return '#ffa502'
      case 'low': return '#5b8fff'
      default: return '#8891a8'
    }
  }

  const currentSection = sections.find(s => s.id === selectedSection)

  


  return (
    <main className='interview'>
      {/* Background */}
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      {/* Main Layout */}
      <div className="interview-layout">

        {/* Left Column - Match Score + Section Menu */}
        <motion.div
          className="left-column"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Match Score Card */}
          <div className="match-score-card">
            <div className="score-circle">
              <svg viewBox="0 0 120 120" className="score-ring">
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5b8fff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="54" className="score-ring-bg" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="54"
                  className="score-ring-fill"
                  initial={{ strokeDashoffset: 339.29 }}
                  animate={{ strokeDashoffset: 339.29 * (1 - report.matchScore / 100) }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
              </svg>
              <div className="score-text">
                <span className="score-number">{report.matchScore}</span>
                <span className="score-label">Match %</span>
              </div>
            </div>

            <div className="score-info">
              <h3>Excellent Match!</h3>
              <p>Your profile aligns exceptionally well with the role.</p>

              <div className="match-stats">
                <div className="stat">
                  <span className="stat-value">{report.technicalQuestions.length + report.behavioralQuestions.length}</span>
                  <span className="stat-label">Questions</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{report.preparationPlan.length}</span>
                  <span className="stat-label">Days</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{report.skillGaps.length}</span>
                  <span className="stat-label">Focus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Menu */}
          <div className="section-menu">
            {sections.map((section, idx) => {
              const Icon = section.icon
              const isActive = selectedSection === section.id

              return (
                <motion.button
                  key={section.id}
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSection(section.id)
                    setSelectedQuestionIdx(0)
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="menu-icon" style={{ color: section.color }}>
                    <Icon size={18} />
                  </div>
                  <div className="menu-label">
                    <h4>{section.title}</h4>
                    <span className="item-count">{section.count} items</span>
                  </div>
                  {isActive && <ChevronRight size={18} className="active-indicator" />}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          className="right-column"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {currentSection && (
              <motion.div
                className="content-panel"
                key={currentSection.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Content Header */}
                <div className="content-header">
                  <div className="header-title">
                    {React.createElement(currentSection.icon, { size: 20, color: currentSection.color })}
                    <div>
                      <h2>{currentSection.title}</h2>
                      <p>{currentSection.count} items to review</p>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="content-body">
                  {currentSection.type === 'questions' && (
                    <div className="questions-container">
                      {currentSection.data.map((item, idx) => (
                        <motion.button
                          key={idx}
                          className={`question-item ${selectedQuestionIdx === idx ? 'active' : ''}`}
                          onClick={() => setSelectedQuestionIdx(idx)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          <div className="question-marker">{idx + 1}</div>
                          <div className="question-content">
                            <p className="question-text">{item.question}</p>
                          </div>
                          <ChevronRight size={18} className="item-chevron" />
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {currentSection.type === 'gaps' && (
                    <div className="gaps-container">
                      {currentSection.data.map((gap, idx) => (
                        <motion.div
                          key={idx}
                          className="gap-item"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <div className="gap-header">
                            <h4>{gap.skill}</h4>
                            <span
                              className="severity-badge"
                              style={{
                                backgroundColor: `${getSeverityColor(gap.severity)}20`,
                                color: getSeverityColor(gap.severity)
                              }}
                            >
                              {gap.severity}
                            </span>
                          </div>
                          <p className="gap-description">{gap.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {currentSection.type === 'prep' && (
                    <div className="prep-container">
                      {currentSection.data.map((day, idx) => (
                        <motion.div
                          key={idx}
                          className="prep-item"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <div className="day-marker">Day {day.day}</div>
                          <div className="day-content">
                            <h4>{day.focus}</h4>
                            <ul className="tasks-list">
                              {day.tasks.map((task, taskIdx) => (
                                <li key={taskIdx}>
                                  <CheckCircle size={14} />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Footer */}
                {currentSection.type === 'questions' && selectedQuestionIdx !== null && (
                  <motion.div
                    className="question-detail"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="detail-header">
                      <h3>Question {selectedQuestionIdx + 1}</h3>
                    </div>
                    <div className="detail-boxes">
                      <div className="detail-box">
                        <h4>💡 Why This Question?</h4>
                        <p>{currentSection.data[selectedQuestionIdx].intention}</p>
                      </div>
                      <div className="detail-box">
                        <h4>✅ Suggested Answer</h4>
                        <p>{currentSection.data[selectedQuestionIdx].answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fixed Footer */}
      <motion.div
        className="interview-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
      </motion.div>
    </main>
  )
}

export default Interview