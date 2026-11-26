import Input from "./Input.tsx";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage, Group, Label } from "../group/Group.tsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorMessage?: string;
    id?: string;
    registerObj?:UseFormRegisterReturn
}

function InputGroup({ label, errorMessage, registerObj, id, ...x }: Props) {
    return (
        <Group>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Input id={id} $errorMessage={errorMessage} {...registerObj} {...x} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Group>
    );
}

export default InputGroup;
