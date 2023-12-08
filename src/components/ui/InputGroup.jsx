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
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        onChange={onChange}
        value={value}
        required={required}
        placeholder={placeholder}
        onBlur={onBlur}
        id={id}
        name={id}
        type={type ? type : "text"}
        className={errorMessage && "border-destructive"}
      ></Input>
      {errorMessage && <p className="text-destructive">{errorMessage}</p>}
    </div>
  );
}

export default InputGroup;
