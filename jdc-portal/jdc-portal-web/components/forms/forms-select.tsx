import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";

type FormsInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    className?: string;
    options: { value: string; label: string }[];
}

export default function FormsInput<T extends FieldValues>({
    control, 
    name,
    label,
    placeholder,
    className,
    type
} : FormsInputProps<T>) {
    return (
        <Controller control={control} name={name} render={({field, fieldState}) => 
          <Field className={className}>
            <FieldLabel>{label}</FieldLabel>
            <Input {...field} placeholder={placeholder || `Enter ${label}.`} type={type} />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        } />
    )
}