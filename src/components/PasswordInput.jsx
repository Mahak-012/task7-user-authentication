import { useState } from "react";
import Input from "./Input";
import { EyeIcon, EyeOffIcon } from "./icons";


export default function PasswordInput({ label, error, icon, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <Input
      label={label}
      error={error}
      icon={icon}
      type={show ? "text" : "password"}
      rightElement={
        <button
          type="button"
          className="toggle-pass"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          title={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
      {...props}
    />
  );
}