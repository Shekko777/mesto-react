import Form from './Form';

const Login = ({ labelText, buttonText, email, password, onChangeEmail, onChangePassword }) => {
  return (
    <Form labelText={labelText} buttonText={buttonText} bottomLink={false}>
      <input className="form__input" type="email" value={email} onChange={onChangeEmail} required placeholder="email"/>
      <input className="form__input" type="password" value={password} onChange={onChangePassword} required placeholder="Пароль" />
    </Form>
  )
}

export default Login;