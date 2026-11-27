import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
    AuthContainer,
    AuthFormCard,
    AuthRootErrorMessage,
    AuthSubTitle,
    AuthTitle,
} from "../../../styles/AuthStyles.tsx";
import InputGroup from "../../../components/common/input/InputGroup.tsx";
import Button from "../../../components/common/button/Button.tsx";
import { type LoginInputType, loginSchema } from "../../../schemas/auth/loginSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";

function SignInPage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginInputType>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
    });

    const onSubmit = async (input: LoginInputType) => {
        try {
        } catch (error) {}
    };

    return (
        <AuthContainer>
            <AuthFormCard onSubmit={handleSubmit(onSubmit)}>
                <AuthTitle>로그인</AuthTitle>
                <AuthSubTitle>다시 오신 것을 환영합니다!</AuthSubTitle>
                <InputGroup
                    label={"아이디"}
                    registerObj={register("username")}
                    errorMessage={errors.username?.message}
                    placeholder={"아이디를 입력해주세요"}
                />
                <InputGroup
                    label={"비밀번호"}
                    type={"password"}
                    registerObj={register("password")}
                    errorMessage={errors.password?.message}
                    placeholder={"비밀번호를 입력해주세요"}
                />
                {errors.root && <AuthRootErrorMessage>{errors.root.message}</AuthRootErrorMessage>}
                <Button
                    color={"primary"}
                    variant={"contained"}
                    type={"submit"}
                    disabled={isSubmitting}>
                    로그인
                </Button>
                <Button color={"secondary"} variant={"contained"} as={Link} to={"/auth/signup"}>
                    회원가입
                </Button>
            </AuthFormCard>
        </AuthContainer>
    );
}

export default SignInPage;
