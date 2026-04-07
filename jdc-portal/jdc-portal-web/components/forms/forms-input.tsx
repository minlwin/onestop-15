'use client'
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
    type?: HTMLInputTypeAttribute;
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
        <Controller control={control} name={name} render={({field, fieldState}) => {

            const {onChange, ... restField} = field

            return (
                <Field className={className}>
                    <FieldLabel>{label}</FieldLabel>
                    <Input {...restField} placeholder={placeholder || `Enter ${label}.`} type={type} onChange={(e) => {
                        if(type == 'number') {
                            const value = Number(e.target.value)
                            if (!isNaN(value)) {
                                onChange(value)
                            }
                        } else {
                            onChange(e.target.value)
                        }
                    }}/>
                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                </Field>
            )
        }} />
    )
}