import { useId } from "react";

export default function Input({ label, error, icon, rightElement, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>

      <div className={`input-wrap ${error ? "has-error" : ""} ${icon ? "has-icon" : ""}`}>
        {icon && (
          <span className="input-icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <input
          id={id}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />

        {rightElement}
      </div>

      {error && (
        <p className="error-msg" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}