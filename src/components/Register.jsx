import React from "react";
import Forma from './Form';

const Register = ({labelText, buttonText, bottomLink, email, password, onChangeEmail, onChangePassword}) => {
  return (
    <Forma labelText={labelText} buttonText={buttonText} bottomLink={bottomLink}> 
      <input className="form__input" value={email} onChange={onChangeEmail} type="email" required autoComplete="off" placeholder="Email" />
      <input className="form__input" value={password} onChange={onChangePassword} type="password" required autoComplete="off" placeholder="Пароль" />
    </Forma>
  )
}

export default Register;