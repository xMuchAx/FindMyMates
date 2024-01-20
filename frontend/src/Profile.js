// Profile.js
import React from "react";
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import userProfilePicture from './assets/utilisateur.png';
import editIcon from './assets/editer.png';

const Profile = () => {
    const navigate = useNavigate();

    // Supposez que vous avez récupéré le nom d'utilisateur du backend
    const username = "NomUtilisateur"; // Remplacez par la vraie valeur du backend

    const handleEditProfile = () => {
        // Naviguer vers la page d'édition de profil ou implémenter votre logique d'édition
        navigate('/edit-profile');
    };

    return (
        <section className="profile-container">
            <h1 className="profile-title">My Profile</h1>

            {/* Afficher la photo de profil de l'utilisateur */}
            <div className="profile-picture">
                <img src={userProfilePicture} alt="Profile" />
            </div>

            {/* Afficher le nom d'utilisateur sous la photo de profil */}
            <p className="username">{username}</p>
            

            {/* Bouton "Edit Profile" */}
            <button className="edit-profile-button" onClick={handleEditProfile}>
                <img src={editIcon} alt="Edit" style={{ width: '20px', height: 'auto', marginRight: '5px' }} />
            Edit Profile
            </button>
            {/* Zone de texte "About me" */}
            <div className="about-me-section">
                <h2>About me</h2>
                <textarea
                    className="about-me-textarea"
                    placeholder="Write something about yourself..."
                />
            </div>
        </section>
    );
};

export default Profile;
