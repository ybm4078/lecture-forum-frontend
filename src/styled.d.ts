import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            background: {
                default: string;    // 기본 배경색
                paper: string;      // 카드에 사용할 배경색
            }
            text: {
                default: string;    // 기본 글자색
                disabled: string;   // 비활성화나 설명글에 사용할 글자색
            }
            divider: string;        // 테두리색
            primary: string;        // 주색
            secondary: string;      // 부색
            success: string;        // 성공 안내색
            error: string;          // 실패 안내색
            warning: string;        // 경고 안내색
            info: string;           // 알림 안내색
        };
    }
}