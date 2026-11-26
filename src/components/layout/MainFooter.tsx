import styled from "styled-components";

const FooterContainer = styled.footer`
    background-color: ${props => props.theme.color.background.paper};
    border-top: 1px solid ${props => props.theme.color.divider};
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function MainFooter() {
    return (
        <FooterContainer>
            <p>Copyright 2026 My Website</p>
        </FooterContainer>
    );
}

export default MainFooter;