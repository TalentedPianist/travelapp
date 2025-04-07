import { useFormContext } from 'react-hook-form';

export default function InputField({ name, label, type, required, validate, ...rest }) {
    
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name]?.message;
    return(
        <div className={`input-wrapper ${error ? 'has-error' : ''}`}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type || 'text'}
                {...register(name, { required: required, validate: validate })}
                {...rest}
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}