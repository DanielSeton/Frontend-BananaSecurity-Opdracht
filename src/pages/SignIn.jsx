import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const { handleLogin } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    async function handleSubmit(e) {
        e.preventDefault();

        console.log(email, password);

        try{
            const response = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/login", {
                email: email,
                password: password,
            }, {
                headers: {
                    'novi-education-project-id': 'd83f1d14-c828-41b5-940b-c58d139b7820'}
            })
            // console.log(response)
            handleLogin(response.data);
        } catch (e) {
            console.error(e);
        }
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
              <label htmlFor="password">Wachtwoord</label>
              <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
        <button
            type="submit"
            >Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;