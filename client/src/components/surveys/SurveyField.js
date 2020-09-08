// contains logic to render a single label and text input
import React from "react";

// export default (props) => {
export default ({ input,label }) => {
    // console.log(props);
    return (
        <div>
            <label>{label}</label>
            {/* <input onBlur={input.onBlur} onChange={input.onChange} /> */}
            <input {...input} />
        </div>
    );
};