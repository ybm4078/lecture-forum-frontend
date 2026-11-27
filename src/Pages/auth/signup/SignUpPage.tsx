import InputGroup from "../../../components/common/input/InputGroup.tsx";
import { useForm } from "react-hook-form";
import { type CreateUserInputType, createUserSchema } from "../../../schemas/auth/signUpSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectGroup from "../../../components/common/select/SelectGroup.tsx";
import { GenderType } from "../../../types/user.type.ts";
import Button from "../../../components/common/button/Button.tsx";
import { useNavigate } from "react-router";
import axioslnstance from "../../../api/axioslnstance.ts";
import * as axios from "axios";
import {
    AuthContainer,
    AuthFormCard,
    AuthRootErrorMessage,
    AuthSubTitle,
    AuthTitle,
} from "../../../styles/AuthStyles.tsx";



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
        // fetch는 백엔드가 400대나 500데로 오류임을 표시해도,
        // "성공"으로 생각함 -> 어쨌든 응답을 받았기 때문에
        try {
            // 전송에 대한 내용을 기재하면 되는데, 그대로 데이터를 전달할 것인가?
            // 프론트엔드에서'만' 필요한 confirmPassword 항목이 있으니, 이것을 제외하고 전송
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...submitData } = input;

            // fetch()로 통신하면, 백엔드가 전달해주는 response가 존재하기만 하면 성공으로 판단하지만,
            // axios로 통신을 하면, 백엔드가 2xx대 성공 코드를 전달해주어야만 성공으로 판단함
            // 이외의 실패는 catch로 처리해줘야 함
            await axioslnstance.post("/user/create", submitData);

            // 성공을 했을 때 백엔드가 전달해준 내용은 response.data에 객체 상태로 존재함
            // (axios는 파싱(가공)을 자동으로 해줌)
            alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
            navigate("/auth/signin");

        } catch(error) {
           // 기본 에러메세지를 미리 마련
            let errorMessage="회원가입 중 오류가 발생했습니다.";

            // 지금 catch 된 error가 axios의 에러인지 판별
            if (axios.isAxiosError(error)) {
                // axios에서 발생된 에러라면, 백엔드에서 제공한 내용이 error.response.data.message 에 존재
                // 백엔드에서 전달해준 내용을 errorMessage에 저장
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                // axios에서 발생된 에러가 아닌, 자바스크립트 표준 에러라면
                // error.message에 담긴 에러 내용을 errorMessage에 저장
                errorMessage = error.message;
            }

            setError("root",{message: errorMessage})
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
