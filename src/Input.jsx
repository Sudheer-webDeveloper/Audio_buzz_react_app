import React from "react";

const Input = ({ input,handleChange,form}) => {
  const { id, name, type, placeholder, error, label,pattern } = input;

  return (
    <div className="field">
      <div className="label-filed">
        <label htmlFor={name}>{label}</label>
        <input type={type} id={name} placeholder={placeholder} required onChange={handleChange} name={name}  value={form[name]} pattern={pattern} />
      </div>

      {/* <h2>hello world {form[name]}</h2> */}
      <div className="error">

      <h2>{error}</h2>
      </div>
    </div>
  );
};

export default Input;
