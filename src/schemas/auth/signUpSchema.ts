import { z } from "zod";
import { GenderType } from "../../types/user.type.ts";

const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

// zod 패키지를 통해 검증할 Input값에 대한 객체모양 생성
export const createUserSchema = z.object({
    username: z.string().min(4, "아이디는 4자 이상 입력해주세요"),
    password: z.string().min(6, "비밀번호는 6자 이상 입력해주세요"),
    confirmPassword: z.string().min(6, "비밀번호 확인을 입력해주세요"),
    nickname: z.string().min(2,"닉네임은 2글자 이상 입력해주세요").max(10,"닉네임은 최대 10글자까지 가능합니다"),
    email: z.email("올바른 이메일 형식이 아닙니다"),
    phoneNumber: z.string().regex(phoneRegex, "올바른 전화번호 형식이 아닙니다."),
    gender: z.enum(GenderType),
});

// 위에서 만든 CreateUserInputType는 조건은 건 "객체"를 만들러내는 일이라,
// 앞으로 다른 곳에서 사용할 수 있는 타입을 infer로 만들어냄
export type CreateUserInputType = z.infer<typeof createUserSchema>;
