'use client'

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";

type FormsChecksProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    className?: string;
    options: string[];
}

export default function FormsChecks<T extends FieldValues>({
    control, 
    name,
    label,
    className,
    options
} : FormsChecksProps<T>) {
    return (
        <Controller control={control} name={name} render={({field, fieldState}) => {
            const { value, onChange } = field;
            const selectedValues: string[] = Array.isArray(value) ? value : [];

            const handleCheckboxChange = (option: string, checked: boolean) => {
                let newValue: string[];
                if (checked) {
                    newValue = [...selectedValues, option];
                } else {
                    newValue = selectedValues.filter(item => item !== option);
                }
                onChange(newValue);
            };

            return (
                <Field className={className}>
                    <FieldLabel>{label}</FieldLabel>
                    <div className="grid md:grid-cols-5 gap-2">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`${name}-${index}`}
                                    checked={selectedValues.includes(option)}
                                    onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor={`${name}-${index}`} className="text-sm">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                </Field>
            );
        }} />
    )
}
