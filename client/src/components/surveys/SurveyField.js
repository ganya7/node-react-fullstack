// contains logic to render a single label and text input
import React from "react";

// export default (props) => {
export default ({ input, label, meta: { touched, error } }) => {
    // console.log(props);
    return (
        <div>
            <label>{label}</label>
            {/* <input onBlur={input.onBlur} onChange={input.onChange} /> */}
            <input {...input} style={{marginBottom: '5px'}} />
            <div className="red-text" style={{marginBottom: '20px'}}>

            {touched && error}
            </div>
        </div>
    );
};