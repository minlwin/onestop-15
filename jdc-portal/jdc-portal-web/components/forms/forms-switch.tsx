'use client'

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

type FormsSwitchProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    trueLabel: string;
    falseLabel: string;
    className?: string;
}

export default function FormsSwitch<T extends FieldValues>({control, name, trueLabel, falseLabel, className} : FormsSwitchProps<T>) {
    return (
        <Controller control={control} name={name} render={({field, fieldState}) => {
            
            const onCheckedChange = (checked: boolean) => {
                field.onChange(checked)
            }

            return (
                <Field className={className}>
                    <div className="flex items-center gap-2">
                        <Switch id={name} checked={field.value} onCheckedChange={onCheckedChange} />
                        <label htmlFor={name}>{field.value ? trueLabel : falseLabel}</label>
                    </div>
                    
                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                </Field>
            )
        }} />
    )
}
