import './StudentContainer.css'

export default function StudentContainer({user}){
  return (
    <div className="student-info">
      <div className="student-info__primary">
        <div className="student-info__pic">
          {user.photo_url && <img className="student-info__pic--img" src={user.photo_url} alt="profile main"/>}
          {!user.photo_url && <img className="student-info__pic--img" src={`https://soundpost-app.s3.us-east-2.amazonaws.com/profile_icon.png`} alt="profile main"/>}
        </div>
        <div className="student-info__name-practiced">
          <h1 className="student-info__name">{user.first_name} {user.last_name}</h1>
        </div>
      </div>
    </div>
  )
}
