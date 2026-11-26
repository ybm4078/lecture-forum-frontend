import styled from "styled-components";
import InputGroup from "../../../components/common/input/InputGroup.tsx";
import { useForm } from "react-hook-form";
import { type CreateUserInputType, createUserSchema } from "../../../schemas/auth/signUpSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectGroup from "../../../components/common/select/SelectGroup.tsx";
import { GenderType } from "../../../types/user.type.ts";
import Button from "../../../components/common/button/Button.tsx";

const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AuthFormCard = styled.form`
    width: 100%;
    max-width: 480px;
    background-color: ${props => props.theme.color.background.paper};
    border-radius: 16px;
    border: 1px solid ${props => props.theme.color.divider};
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const AuthTitle = styled.h1`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.color.primary};
    text-align: center;
    margin-bottom: -15px;
`;

const AuthSubTitle = styled.h6`
    font-size: 15px;
    color: ${props => props.theme.color.text.disabled};
    text-align: center;
    margin-bottom: 32px;
`;

const AuthRootErrorMessage = styled.p`
    font-size: 14px;
    text-align: center;
    color: ${props => props.theme.color.text.disabled};
    font-weight: 500;
    margin-bottom: 50px;
`;

function SignUpPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors,isSubmitting },
    } = useForm<CreateUserInputType>({
        resolver: zodResolver(createUserSchema),    // react-hook-form과 zod 연결
        mode: "onBlur",     // 언제 검증할 것인가를 정하는 옵션
    });

    const options = [
        { text: "남자", value: GenderType.MALE },
        { text: "여자", value: GenderType.FEMALE },
    ];

    return (
        <AuthContainer>
            <AuthFormCard>
                <AuthTitle>회원가입</AuthTitle>
                <AuthSubTitle>토론대난투에 오신 것을 환영합니다!</AuthSubTitle>
                <InputGroup
                    label={"아이디"}
                    id={"username"}
                    errorMessage={errors.username?.message}
                    registerObj={register("username")}
                    placeholder={"4자 이상 필요"}
                />
                <InputGroup
                    label={"비밀번호"}
                    id={"password"}
                    errorMessage={errors.password?.message}
                    registerObj={register("password")}
                    type={"password"}
                    placeholder={"6자 이상 필요"}
                />
                <InputGroup
                    label={"비밀번호확인"}
                    id={"confirmPassword"}
                    errorMessage={errors.confirmPassword?.message}
                    registerObj={register("confirmPassword")}
                    type={"password"}
                    placeholder={"비밀번호를 한 번 더 입력해주세요"}
                />
                <InputGroup
                    label={"닉네임"}
                    id={"nickname"}
                    errorMessage={errors.nickname?.message}
                    registerObj={register("nickname")}
                    placeholder={"닉네임을 2자 이상 입력해주세요"}
                />
                <InputGroup
                    label={"이메일"}
                    id={"email"}
                    errorMessage={errors.email?.message}
                    registerObj={register("email")}
                    type={"email"}
                />
                <InputGroup
                    label={"전화번호"}
                    id={"phoneNumber"}
                    errorMessage={errors.phoneNumber?.message}
                    registerObj={register("phoneNumber")}
                    type={"tel"}
                />
                <SelectGroup
                    label={"성별"}
                    id={"gender"}
                    errorMessage={errors.gender?.message}
                    registerObj={register("gender")}
                    options={options}
                />

                {errors.root && <AuthRootErrorMessage>{errors.root.message}</AuthRootErrorMessage>}

                <Button
                    color={"primary"}
                    variant={"contained"}
                    type={"submit"}
                    disabled={isSubmitting}>
                    회원가입
                </Button>
            </AuthFormCard>
        </AuthContainer>
    );
}

export default SignUpPage;
