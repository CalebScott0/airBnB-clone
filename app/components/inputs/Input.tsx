"use client";

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  // type matching for react hook form errors
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  //   errors is an object, can look for id of input in errors object for class conditional
  errors,
  error,
}) => {
  // only take error if it is a string
  const errorMessage =
    error && typeof error.message === "string" ? error.message : null;
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${formatPrice ? "pl-9" : "pl-4"} ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${errors[id] ? "focus:border-rose-500" : "focus:border-black"} `}
      />
      <label
        //   peer-placeholder is for if placeholder is currently being shown in an element, label will be normal sized and not positioned
        //  on focus of peer it is moved up and scaled down
        className={`absolute top-5 z-10 origin-[0] -translate-y-3 transform text-base duration-150 ${formatPrice ? "left-9" : "left-4"} peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${errors[id] ? "text-rose-500" : "text-zinc-400"} `}
      >
        {label}
      </label>
      {errorMessage && <div className="mt-2 text-rose-500">{errorMessage}</div>}
    </div>
  );
};

export default Input;
