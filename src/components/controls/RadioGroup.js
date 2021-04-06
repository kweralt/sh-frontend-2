import {
  FormHelperText,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@material-ui/core";

export default function RadioGroup(props) {
  const { name, label, value, error = null, onChange, items } = props;
  return (
    <FormControl variant="standard" {...(error && { error: true })}>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={parseInt(value)} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
