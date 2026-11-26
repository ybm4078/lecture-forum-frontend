import styled from "styled-components";
import type { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

export type ButtonColorType = "primary" | "secondary" | "success" | "warning" | "info" | "error";
export type ButtonVariantType = "contained" | "text" | "icon";

// styled-components의 힘을 빌어서 만드는 모양 잡힌 컴포넌트는
// 우리가 정한 속성을 받을 땐 무조건 $ 를 붙여줘야 함
// $을 붙이지 않은 속성은 (type, className, onClick 같은) 기본 Props라고 생각하고
// $를 붙인건 스타일에서 사용할 수 있는 속성이구나 라고 구분 짓기 때문
const StyledButton = styled.button<{ $color: ButtonColorType; $variant: ButtonVariantType }>`
    // 사용하는 곳에서 속성(color)으로 전당된 값은 props.$color 에 존재
    // 실제로 사용해야 되는 색상코드는 props.theme.color에 있음 primary,secondary 같은 프로퍼티의 값으로서 존재
    background-color: ${props => (props.$variant === "contained" ? props.theme.color[props.$color] : "transparent")};
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: ${props => (props.$variant === "icon" ? "1" : "auto")};
    font-size: 14px;
    font-weight: 600;
    color: ${props => (props.$variant === "contained" ? "#FFFFFF" : props.theme.color[props.$color])};
    padding: ${props => (props.$variant === "icon" ? "8px" : "8px 16px")};
    border-radius: ${props => (props.$variant === "icon" ? "50%" : "6px")};
    transition: all 0.5s;

    &:hover {
        filter: brightness(0.8);
        background-color: ${props => (props.$variant === "contained" ? undefined : props.theme.color.background.default)};
    }
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    color: ButtonColorType;
    variant: ButtonVariantType;
    as?: ElementType;
    to?: string;
}

// 우리가 만드는 이 Button 이라는 이름의 컴포넌트는
// button 태그처럼 사용하되 모양이 무리가 원하는대로 나오고 color 속성도 받아들여주길
// 바래서 만드는 것
// 그런니까 button 태그가 받을 수 있는 속성을 모두 다 허용해줘 => "상속"
// button 태그의 타입 : buttonHTMLAttributes<HTMLButtonElement>

// 구조분해할당에서 내가 원하는 애들에 대해서만 이름을 붙이고
// 나머지는 뭉뚱그려서 'x'라고 부를게
function Button({ children, color, variant,...x }: Props) {
    return (
        <StyledButton $color={color} $variant={variant} {...x}>
            {children}
        </StyledButton>
    );
}

export default Button;

