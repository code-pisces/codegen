import { Checkbox, CheckboxProps } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
} & CheckboxProps;

export default function CheckboxControlled({
  control,
  name,
  label,
  ...props
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Checkbox
          onChange={onChange}
          onBlur={onBlur}
          defaultChecked={value}
          ref={ref}
          {...props}
        >
          {label}
        </Checkbox>
      )}
    />
  );
}
