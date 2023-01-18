import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStateConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

export default class CourseItemDetails extends Component {
  state = {courseDetails: {}, apiStatus: apiStateConstants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStateConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const courseDetails = {
        description: data.course_details.description,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }
      this.setState({courseDetails, apiStatus: apiStateConstants.success})
    } else {
      this.setState({apiStatus: apiStateConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getCourseDetails()
  }

  renderCourseDetails = () => {
    const {courseDetails} = this.state
    const {imageUrl, name, description} = courseDetails
    return (
      <div className="course-details-cont">
        <img src={imageUrl} alt={name} className="course-details-img" />
        <div className="course-details-content">
          <h1 className="course-details-name">{name}</h1>
          <p className="course-details-desc">{description}</p>
        </div>
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

  renderCourseDetailsStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStateConstants.success:
        return this.renderCourseDetails()
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
        {this.renderCourseDetailsStatus()}
      </div>
    )
  }
}
