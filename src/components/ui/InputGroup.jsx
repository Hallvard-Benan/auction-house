import { Input } from "./input";
import { Label } from "./label";

function InputGroup({
  label,
  type,
  id,
  placeholder,
  required,
  errorMessage,
  onBlur,
  value,
  onChange,
  success,
  description,
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {required && <span className="text-muted-foreground">*</span>}

        {label}
      </Label>

      <Input
        onChange={onChange}
        value={value}
        required={required}
        placeholder={placeholder}
        onBlur={onBlur}
        id={id}
        name={id}
        type={type ? type : "text"}
        className={
          (errorMessage && "border-destructive") ||
          (success && "border-green-500") ||
          ""
        }
      ></Input>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}

export default InputGroup;
