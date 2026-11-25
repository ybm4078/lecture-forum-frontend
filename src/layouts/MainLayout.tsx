import styled from "styled-components";
import MainHeader from "../components/layout/MainHeader.tsx";
import MainFooter from "../components/layout/MainFooter.tsx";
import { Outlet } from "react-router";

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
`;

const MainContainer = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    // 모바일처럼 화면이 줄어들었을 때 화면에 딱 붙지 않도록 하기 위해
    padding: 40px 20px;
`;

function MainLayout() {
    return (
        <LayoutWrapper>
            <MainHeader />
            <MainContainer>
                <Outlet />
            </MainContainer>
            <MainFooter />
        </LayoutWrapper>
    );
}
export default MainLayout;
