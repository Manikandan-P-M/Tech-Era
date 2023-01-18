import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Courses from '../Courses'

import './index.css'

const apiStateConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

export default class Home extends Component {
  state = {courseList: [], apiStatus: apiStateConstants.initial}

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({apiStatus: apiStateConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const courseList = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({courseList, apiStatus: apiStateConstants.success})
    } else {
      this.setState({apiStatus: apiStateConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getCourseList()
  }

  renderCourses = () => {
    const {courseList} = this.state
    return (
      <div className="courses-cont">
        <h1 className="title">Courses</h1>
        <ul className="course-list">
          {courseList.map(eachItem => (
            <Courses key={eachItem.id} courseList={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="fail-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderCoursesStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStateConstants.success:
        return this.renderCourses()
      case apiStateConstants.inProgress:
        return this.renderLoadingView()
      case apiStateConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <nav className="header">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="nav-logo"
            />
          </Link>
        </nav>
        {this.renderCoursesStatus()}
      </div>
    )
  }
}
