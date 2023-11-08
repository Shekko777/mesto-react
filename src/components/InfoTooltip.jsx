
const InfoTooltip = ({ img, text, isOpen, isClose, closeTouchOverlay }) => {
  return (
    <div onClick={closeTouchOverlay} className={isOpen ? "tooltip tooltip_opened" : "tooltip"}>
      <div className="tooltip__container">
       <button className="tooltip__button-close" onClick={isClose}></button>
       <img className="tooltip__img" src={img} alt="ситуация" />
       <p className="tooltip__text">{text}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;