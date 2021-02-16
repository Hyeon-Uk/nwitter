import React, { useState } from "react";
import AuthForm from "../component/AuthForm";
import { authService, firebaseInstance } from "../fbase";

function Auth() {
    const onSocialClick = async (e) => {
        const {
            target: {
                name
            }
        } = e;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);

    };


    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">Continue With Google</button>
                <button onClick={onSocialClick} name="github">Continue With Github</button>
            </div>
        </div>
    );
}

export default Auth;