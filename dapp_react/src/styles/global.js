import { createGlobalStyle } from "styled-components";
// import {} from ''
const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'inter';
        src: url('./assets/fonts/Inter-Regular.ttf');
    }
    // 적용시킬 css 입력
    :root {
        user-select: none;
    }
    
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        /* font-size: 10px; */
        vertical-align: baseline;
    }
    body{
        line-height: 1;
        font-family: 'Inter';
        background-color: #F6F9F0;
        color: ${({ theme }) => theme.color.font.main};
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
    
`;

export default GlobalStyles;
