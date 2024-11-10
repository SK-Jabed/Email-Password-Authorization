import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const terms = event.target.terms.checked;
        console.log(email, password, terms);

        // Reset Error and Status
        setErrorMessage("");

        if (password.length < 6) {
            setErrorMessage("Password should be 6 characters or longer");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
           setErrorMessage(
             "At least one uppercase, one lowercase, one number, one special character"
           );
           return;
        }

        if (!terms) {
            setErrorMessage("Please accept our Terms and Conditions");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          console.log(result.user);
          setSuccess(true);

          // send verification email address
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("verification email sent");
          });

          // update Profile name and photo url
          const profile = {
            displayName: name,
            photoURL: photo,
          };
          updateProfile(auth.currentUser, profile)
            .then(() => {
              console.log("user profile updated");
            })
            .catch((error) => console.log("User profile update error"));
        })

        
        .catch(error => {
            console.log("ERROR", error.message);
            setErrorMessage(error.message);
            setSuccess(false);
        })
    }


    return (
      <div className="mt-12">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-center my-2">Sign Up</h2>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-2 top-12 rounded-full"
              >
                {showPassword ? <ImEyeBlocked /> : <ImEye />}
              </button>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label justify-start gap-2 cursor-pointer items-center">
                <input type="checkbox" name="terms" className="checkbox h-5 w-5" />
                <span className="label-text font-semibold">Accept our Terms and Conditions</span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          {errorMessage && (
            <p className="text-red-600 text-lg font-semibold p-4">
              {errorMessage}
            </p>
          )}
          {success && <p className="text-green-400 p-4">Sign Up Successful</p>}
        </div>
      </div>
    );
};

export default SignUp;