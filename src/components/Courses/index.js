import {Link} from 'react-router-dom'

import './index.css'

const Courses = props => {
  const {courseList} = props
  const {id, logoUrl, name} = courseList
  return (
    <li className="course-item">
      <Link to={`/courses/${id}`} className="link-item">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}

export default Courses
