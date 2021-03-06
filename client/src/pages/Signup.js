import React, { useContext, useState } from 'react';
import serialize from 'form-serialize';
import { useHistory } from 'react-router-dom';

import * as API from '../api/api'

import { UserContext } from '../utils/UserContext';
import Error from '../components/Error';

const Signup = () => {

    const [user, setUser] = useContext(UserContext)

    let history = useHistory();
    const [error, setError] = useState("");

    const signupHandler = (e) => {
        e.preventDefault();
        const formData = serialize(e.target, { hash: true });
        console.log(formData);
        API.signup(formData).then(response => {
            if (response.error) {
                setError(response.error);
                return console.log(response.error)
            }

            setUser(response);
            history.push("/events")

        })
    }

    return (
        <div>
            <div className="section hero-bg-gradient">
                <div className="container">
                    <h1 className="title has-text-white" >Signup</h1>
                </div>
            </div>

            <div className="container">
                <div className="section has-background-white my-5">

                    <form onSubmit={signupHandler}>
                        <div className="field">
                            <label className="label">First Name</label>
                            <div className="control">
                                <input name="first_name" className="input" type="text" placeholder="Jimmi" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Last Name</label>
                            <div className="control">
                                <input name="last_name" className="input" type="text" placeholder="Hendrix" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input name="email" className="input" type="email" placeholder="JimmiHendrix@experience.com" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input name="password" className="input" type="password" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Confirm Password</label>
                            <div className="control">
                                <input name="confirmpassword" className="input" type="password" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Date of Birth</label>
                            <div className="control">
                                <input name="dob" className="input" type="date" />
                            </div>
                        </div>
                        
                        <Error error={error} />

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default Signup;