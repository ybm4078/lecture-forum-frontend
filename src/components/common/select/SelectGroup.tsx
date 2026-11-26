import type { UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage, Group, Label } from "../group/Group.tsx";
import Select from "./Select.tsx";
import type { SelectHTMLAttributes } from "react";

export type optionsType = {
    text: string;
    value: string;
    selected?: boolean;
};

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    errorMessage?: string;
    id?: string;
    registerObj?: UseFormRegisterReturn;
    options: optionsType[];
}


function SelectGroup({ label, errorMessage, registerObj, id, options, ...x }: Props) {
    return (
        <Group>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Select id={id} $errorMessage={errorMessage} {...registerObj} {...x}>
                {options.map((option, index) => (
                    <option key={index} value={option.value} selected={option.selected}>
                        {option.text}
                    </option>
                ))}
            </Select>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Group>
    );
}

export default SelectGroup;