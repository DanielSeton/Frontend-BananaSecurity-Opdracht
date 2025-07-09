import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function SignUp() {

    const { handleLogin } = useContext(AuthContext);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(email, password);

        try{
            const response = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/users", {
                email: email,
                password: password,
                roles: [
                    "anonymous",
                    "user",
                ]
            }, {
                headers: {
                    'novi-education-project-id': 'd83f1d14-c828-41b5-940b-c58d139b7820'}
            })
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="password">Wachtwoord</label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button
                type="submit"
            >Registreren
            </button>
        </form>
        <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;