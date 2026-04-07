'use client';

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { NativeSelect } from "../ui/native-select";
import { SelectOption } from "@/lib/types";

type FormsSelectProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    className?: string;
    options: SelectOption[];
}

export default function FormsSelect<T extends FieldValues>({
    control, 
    name,
    label,
    className,
    options
} : FormsSelectProps<T>) {
    return (
        <Controller control={control} name={name} render={({field, fieldState}) => 
          <Field className={className}>
            <FieldLabel>{label}</FieldLabel>
            <NativeSelect {...field} >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </NativeSelect>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        } />
    )
}