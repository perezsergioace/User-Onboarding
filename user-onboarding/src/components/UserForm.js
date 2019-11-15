import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div className="user-form">
            <h2>Test Form</h2>

            <Form>
                <Field className="forms"
                name="name" 
                placeholder="name" 
                type="text" />
                {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
            )}

                <Field className="forms"
                name="email" 
                placeholder="email" 
                type="text" />
                {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
            )}

                <Field className="forms"
                name="password" 
                placeholder="password" 
                type="text" />
                {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
            )}
                    
                <label>
                    Terms of Service
                    <Field 
                    name="checkbox" 
                    type="checkbox" 
                    checked={values.checkbox} />
                </label>

            <button type="submit" className="button">Submit User!</button>
            </Form>
            {users.map(user => (
                <div key={user.id}>
                    <h2>User: {user.name}</h2>
                    <h3>Email: {user.email}</h3>
                </div>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, checkbox }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            checkbox: checkbox || false
        };
    }, 
    validationSchema: Yup.object().shape({
        name: Yup.string().required("A name is required!"),
        email: Yup.string().email("Email not valid!").required("Email is required!"),
        password: Yup.string().min(6, "Password must be 6 characters or longer").required("Password is required!"),
        checkbox: Yup.bool().oneOf([true], 'Field must be checked')
    }),
    handleSubmit(values, { setStatus }) {
        axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        setStatus(response.data);
        console.log(response);
      })
      .catch(err => console.log(err.response));
    }
})(UserForm);

export default FormikUserForm;