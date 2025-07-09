import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {

    const { userData, token } = useContext(AuthContext);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        async function fetchSecret() {
            try {
                const response = await axios.get("https://novi-backend-api-wgsgz.ondigitalocean.app/api/secrets", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'novi-education-project-id': 'd83f1d14-c828-41b5-940b-c58d139b7820'
                    }
                })
                console.log(response.data[0]);
                setProfileData(response.data[0]);
            } catch (e) {
                console.error(e);
            }
        }
        fetchSecret();

    }, [])


    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {userData.email}</p>
                <p><strong>Email:</strong> {userData.email}</p>
            </section>
            <section>
                <h2>Strikt geheime profiel-content</h2>
                <p><strong>{profileData.title}</strong></p>
                <p>{profileData.content}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;