import React,{useState,useRef} from 'react'
import { Upload, ArrowRight } from 'lucide-react'
import '../style/home.scss'
import {useInterview} from '../hooks/useinterview'
import {useNavigate} from 'react-router'

const Home = () => {
  const {loading,generateReport,reports} = useInterview()
  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const resumeInputRef = useRef() 


  const navigate = useNavigate()

  const handleGenerateReport= async()=>{
    const resumeFile= resumeInputRef.current?.files?.[0]
    const data = await generateReport({jobDescription,selfDescription,resumeFile})
    if (data && data._id) {
        navigate(`/interview/${data._id}`)
    }
  }

  if(loading) {
    return <div className="loading">Generating your interview plan...</div>
  }

  return (
    <main className='home'>
      {/* Atmospheric background */}
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      {/* Header section */}
      <div className="header-section">
        <h1 className="header-title">
          Create Your Custom <span className="accent-text">Interview Plan</span>
        </h1>
        <p className="header-subtitle">
          Let our AI analyze the job requirements and your unique profile to<br />
          build a winning strategy.
        </p>
      </div>

      {/* Main card group */}
      <div className="interview-input-group">
        
        {/* Left panel - Job Description */}
        <div className="left">
          <div className="panel-label">
            <span className="label-dot"></span>
            Target Job Description
            <span className="badge badge-required">REQUIRED</span>
          </div>
          <textarea 
            onChange={(e) => {setJobDescription(e.target.value)}}
            name="jobdescription" 
            id="jobdescription" 
            placeholder="Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
          />
          <div className="char-count">0 / 5000 chars</div>
        </div>

        {/* Center divider */}
        <div className="divider">
          <div className="divider-icon">⚙</div>
        </div>

        {/* Right panel - User Profile */}
        <div className="right">
          
          {/* Resume upload section */}
          <div className="input-group">
            <div className="group-label">
              <span className="label-dot"></span>
              Your Profile
              <span className="badge badge-best">BEST RESULTS</span>
            </div>
            
            <div className="file-input-wrapper">
              <input 
              ref={resumeInputRef}
              type="file" 
                name="resume" 
                id="resume" 
                accept=".pdf,.doc,.docx"
              />
              <div className="file-display">
                <Upload size={20} />
                <div>
                  <span>Click to upload or drag & drop</span>
                  <div className="file-hint">PDF or DOCX (Max 3MB)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Self description section */}
          <div className="input-group">
            <div className="group-label">
              Quick Self-Description
            </div>
            <textarea 
            onChange={(e) => {setSelfDescription(e.target.value)}}
              name="selfDescription" 
              id="selfDescription" 
              placeholder="Briefly describe your experience, key skills, and years of experience. If you don't have a resume handy..."
            />
            <div className="input-hint">
              <span className="info-icon">ℹ</span>
              Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
            </div>
          </div>

          {/* Generate button */}
          <button 
          className="generate-btn"
          onClick={handleGenerateReport}
          >
            <span>★</span>
            Generate My Interview Strategy
            <ArrowRight size={18} />
            <div className="btn-glow"></div>
          </button>

          {/* Processing info */}
          <div className="processing-info">
            AI-Powered Strategy Generation • Approx 30s
          </div>
        </div>

      </div>

          {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
     {/* Footer */}
      <div className="footer-section">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#help">Help Center</a>
      </div>
    </main>
  )
}

export default Home