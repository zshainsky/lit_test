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
                background-color: #fff;
                color: #444;
                transition: 1s;
        }
        .grid-room {
            background-color: #444;
            color: #fff;
            border-radius: 5mm;
            padding: 20px;
            font-size: 150%;
            text-align: center;
            transition: 1s;
        }
            
        .grid-wrapper.click {
            grid-template-rows: 50vmin;
            transition: 2s;
        }
        .grid-room.click {
            grid-area: a;
            transition: 2s;
        }
        .grid-room.mouseover {
            background-color: #009c9c;
            transition: 1s;
        }

        .empty-grid {
            grid-area: a;
            background-color: #03463a;
        }

        .grid-title {
            background-color: #444;
            color: #fff;
            border-radius: 5mm;
            padding: 20px;
            font-size: 150%;
            text-align: center;
            margin-bottom: inherit;
        }
    `;

export const navigationStyles = css`
    .header {
        background-color: #444;
        color: #fff;
        border-radius: 5mm;
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