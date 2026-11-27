import styled from "styled-components";
import InputGroup from "../../../components/common/input/InputGroup.tsx";
import { useForm } from "react-hook-form";
import { type CreateUserInputType, createUserSchema } from "../../../schemas/auth/signUpSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectGroup from "../../../components/common/select/SelectGroup.tsx";
import { GenderType } from "../../../types/user.type.ts";
import Button from "../../../components/common/button/Button.tsx";
import { useNavigate } from "react-router";

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

// register : input에 react-hook-form의 기능들을 등록할 때 사용할 수 있는 기능
// handleSubmit : 전송할 때 사용할 수 있는 기능 (모든 값에 대해 검증 후 전송하는 기능을 제공)
// setError : 에러 메세지 내용을 우리가 수동으로 입력하고 싶을 때 사용
// formState 중 errors : 에러 메세지 자체를 저장하고 있는 저장소 => root, 우리가 제공한 항목들
//           중 isSubmitting : 전송 중임을 표현하는 boolean 변수 (전송 중은 true, 아닐 땐 false

function SignUpPage() {

    const navigate = useNavigate();

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
    const onSubmit = async (input: CreateUserInputType) => {
        // 입력된 정보(input)을 가지고 백엔드에거 요청
        // 앞으로 fetch를 사용하지 않을것임. axios 패키지를 이용할 것임
        try {
            // 전송에 대한 내용을 기재하면 되는데, 그대로 데이터를 전달할 것인가?
            // 프론트엔드에서'만' 필요한 confirmPassword 항목이 있으니, 이것을 제외하고 전송
            const { confirmPassword, ...submitData } = input;

            // 사용자가 적은 내용을 함께 fetch를 통해 보내줘야 함 => 사용자가 적은 내용은 HTTP 메세지 중 body
            // fetch(주소, 옵션) => 주소는 필수값, 옵션은 선택값
            // 옵션 자리에는 객채 { method, headers, body }
            const respsone = await fetch("http://localhost:8000/user/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData), // 객체를 그대로 body에 담아서 보냃 수 없고, JSON.stringify()를 통해 JSON 형식의 string으로 변환
            });

            // 백엔드에서 보낸준 응답(string)을 JSON으로 파싱함
            const result = await respsone.json();

            alert("회원가입이 완료 되었습니다. 로그인을 진행해주세요")
            navigate("/auth/signin")

        } catch(error) {
            setError("root",{message: "회원가입이 실패했습니다. 다시 시도해주세요."})
        }
    };

    return (
        <AuthContainer>
            <AuthFormCard onSubmit={handleSubmit(onSubmit)}>
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
