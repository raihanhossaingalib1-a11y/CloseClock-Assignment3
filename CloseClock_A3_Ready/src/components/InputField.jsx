import React from "react";

function InputField({
    placeholder,
    value,
    setValue,
    type="text"
}){

return (

<input
type={type}
placeholder={placeholder}
value={value}
onChange={(e)=>setValue(e.target.value)}
className="input-field"
/>

)

}

export default InputField;