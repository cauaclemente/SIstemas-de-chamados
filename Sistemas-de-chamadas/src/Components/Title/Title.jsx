import "./Title.css"

export const Title = ({ children, name}) => {
  return (
    <>
    <div className="container-title">
      <div className="title">
        {children}
        <span>{name}</span>
      </div>
    </div>
    </>
  )
}
