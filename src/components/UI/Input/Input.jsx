import React from 'react';
import './Input.sass';

const Input = ({className='',...props}) => {
  return(
    <div className={`${className} c-input__wrap`}>
      <input
        className='c-input'
        {...props}/>
    </div>
  );
}

const InputFormField = ({field, form:{errors, touched},...props}) => {
  return(
    <div className='c-input__wrap'>
      {touched[field.name] &&
        errors[field.name] && <div className="c-input__error">{errors[field.name]}</div>}
      <input
        className='c-input'
        {...field}
        {...props}/>
    </div>
  );
}

const InputFormTextarea = ({field, form:{errors, touched},...props}) => {
  return(
    <div className='c-input__wrap'>
      {touched[field.name] &&
        errors[field.name] && <div className="c-input__error">{errors[field.name]}</div>}
      <textarea
        className='c-input c-input--textarea'
        {...field}
        {...props}>
      </textarea>
    </div>
  );
}
const InputTextarea = ({...props}) => {
  return(
    <div className='c-input__wrap'>
      <textarea
        className='c-input c-input--textarea'
        {...props}>
      </textarea>
    </div>
  );
}

const InputFormSelect = ({field, form:{touched, errors}, children, ...props}) => {
  return(
    <div className='c-input__wrap--select'>
      <select
        className='c-input c-input--select'
        {...field}
        {...props}>
        {children}
      </select>
      {touched[field.name] &&
        errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  );
}

Input.FormField = InputFormField;
Input.FormTextarea = InputFormTextarea;
Input.Textarea = InputTextarea;
Input.FormSelect = InputFormSelect;
export default Input;