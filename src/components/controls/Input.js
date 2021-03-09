import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      // extras
      {...other}
      // check if both error and helperText != null
      {...(error && { error: true, helperText: error })}
    />
  );
}
