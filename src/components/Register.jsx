import Form from './Form';

const Register = ({labelText, buttonText, email, password, onChangeEmail, onChangePassword}) => {
  return (
    <Form labelText={labelText} buttonText={buttonText} bottomLink={false}> 
      <input className="form__input" value={email} onChange={onChangeEmail} type="email" required autoComplete="off" placeholder="Email" />
      <input className="form__input" value={password} onChange={onChangePassword} type="password" required autoComplete="off" placeholder="Пароль" />
    </Form>
  )
}

export default Register;