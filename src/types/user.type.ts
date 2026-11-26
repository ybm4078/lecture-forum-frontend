
// Enum 타입
// type ThemeType = "light" | "dark"; <- 유니온 타입을 사용하는 것과 결과론적으로는 2개의 값만 저장할 수 있다는 점에서 같음
// 내부적으로 유니온 타입은 string 타입이 허용되어져 있는 상태이고
// enum 타입은 GenderType이라는 객체의 2가의 kwy(MALE, FEMALE)이 허용되어져 있는 상태
// 개발자가 편하게 사용할 수 있는 점은, 자동완성을 지원해줌

export const GenderType = {
    MALE: "MALE",
    FEMALE: "FEMALE",
} as const;

export type GenderType = (typeof GenderType)[keyof typeof GenderType];


export const RoleType = {
    USER: "USER",
    ADMIN: "ADMIN",
} as const;
export type RoleType = (typeof RoleType)[keyof typeof RoleType];
