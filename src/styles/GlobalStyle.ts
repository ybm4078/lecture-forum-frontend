import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        user-select: none;
    }
    body {
        background-color: ${props => props.theme.color.background.default};
        color: ${props => props.theme.color.text.default};
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    
    button {
        cursor: pointer;
        border: none;
        background: none;
        font-family: inherit;
    }
    input, textarea {
        font-family: inherit;
        
        &:hover {
            outline: none;
        }
        &:focus {
            outline: none;
        }
    }
`;

export default GlobalStyle;
