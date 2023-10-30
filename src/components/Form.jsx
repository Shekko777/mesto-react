import { Link } from "react-router-dom";

const Forma = ({labelText, buttonText, bottomLink, children}) => {
  return (
    <form className="form" action="#" noValidate>
      <fieldset className="form__fieldset">
        <label className="form__label">{labelText}</label>
        {children}
      <button className="form__button" type="submit">{buttonText}</button>
       {bottomLink && <p className="form__bottom-text">Уже зарегестрированы? <Link className="form__bottom-link" to="/sign-up">Войти</Link></p>}
      </fieldset>
    </form>
  )
}

export default Forma;