import styled from "styled-components";
import Input from "./Input.tsx";
import type { InputHTMLAttributes } from "react";

const StyledInputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 800;
    color: ${props => props.theme.color.text.default};
`;

const ErrorMessage = styled.span`
    font-size: 13px;
    color: ${props => props.theme.color.error};
    font-weight: 500;
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorMessage?: string;
    id?: string;
}

function InputGroup({ label, errorMessage, id, ...x }: Props) {
    return (
        <StyledInputGroup>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Input id={id} $errorMessage={errorMessage} {...x} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </StyledInputGroup>
    );
}

export default InputGroup;
