'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Textarea } from "../ui/textarea";

type FormsTextareaProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    className?: string;
    rows?: number;
    cols?: number;
}

export default function FormsTextarea<T extends FieldValues>({
    control, 
    name,
    label,
    placeholder,
    className,
    rows,
    cols
} : FormsTextareaProps<T>) {
    return (
        <Controller control={control} name={name} render={({field, fieldState}) => 
          <Field className={className}>
            <FieldLabel>{label}</FieldLabel>
            <Textarea {...field} placeholder={placeholder || `Enter ${label}.`}  rows={rows} cols={cols}></Textarea>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        } />
    )
}