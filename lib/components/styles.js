import {css} from 'lit';

export const gridStyles = css`

        @media only screen and (max-width: 899px) {
            .grid-wrapper {
                display: grid;
                grid-template-areas: 
                    "a"
                    "b";
            }
        }
        @media only screen and (min-width: 900px) {
            .grid-wrapper {
                display: grid;
                grid-template-areas: 
                    "a a"
                    "b b";
            }
        }
        #rooms {
            margin: 1rem 75px 1rem 75px;
        }
        .grid-wrapper {
                display: grid;
                grid-gap: 1rem;
                color: #444;
                transition: 1s;
        }
        .grid-room {
            background-color: #444;
            color: #fff;
            opacity: .85;
            border-radius: 5mm;
            padding: 20px;
            font-size: 150%;
            text-align: center;
            transition: transform 500ms;
            cursor: pointer;
        }
            
        .grid-wrapper.click {
            grid-template-rows: 50vmin;
            transition: 2s;
        }
        .grid-room.click {
            grid-area: a;
            transition: 2s;
            opacity: 1;;
        }
        .grid-room:hover.click{
            background-color: #444;
            transform: scale(1);


        }
        .grid-room:hover {
            background-color: #009c9c;
            /* transform: translateY(-5x); */
            transform: scale(1.025);
            opacity: 1;
        }

        .empty-grid {
            grid-area: a;
            background-color: #03463a;
        }

        .grid-title {
            color: #000;
            border-radius: 5mm;
            padding: 20px;
            font-size: 150%;
            text-align: center;
            margin-bottom: inherit;
        }
`;

export const roomStyles = css `
`;

export const navigationStyles = css`
    .header {
        /* background-color: #444; */
        color: #000;
        padding: 20px;
        font-size: 150%;
        text-align: center;
        margin-bottom: 10px;
    }
    .header .home {
        float: left;
    }
    .header .profile {
        float: right;
    }

`;

export const footerStyles = css`
    .footer-bar {
        color: #000;
        padding: 20px;
        font-size: 25%;
        text-align: center;
        margin-top: 10px;
    }
    .footer-bar .author {
        float: left;
    }
    .footer-bar .attribution {
        float: right;
    }

`;