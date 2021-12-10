import { LitElement, html, css } from "lit";
import {classMap} from 'lit/directives/class-map.js';
// import {styleMap} from 'lit/directives/style-map.js';
// import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module";

class RoomsGrid extends LitElement {
    static properties = {
        rooms: {},
        eventGridRoom: {},
        eventGridWrapper: {},
    };

    static styles = css`

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
                grid-template-rows: 40vmin;
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
    `;

    constructor() {
        super();
        this.rooms = ["Room 10", "Room 20", "Room 30", "Room 40", "Room 50"];
        this.eventGridRoom = {
            "grid-room": true,
            "mouseover": false
        };
    }

    render () {
        return html`<div id="rooms">
            <div class="grid-wrapper">
            ${this.rooms.map( 
                (item, index) => html `
                    <div id="${index}" class=${classMap(this.eventGridRoom)} @click="${this.handleClick}" @mouseover="${this.handleMouseOver}" @mouseleave="${this.handleMouseLeave}"  >
                        ${item}
                    </div>`
            )}
            </div>
        </div>
        `
    }
    handleClick(e){
        // Get all items in grid
        var gridItems = e.currentTarget.parentElement.getElementsByClassName("click");
        // Check if any other items are already clicked
        if (gridItems.length > 0) {
            // look through all items in grid
            for (let item of gridItems) {
                // handle all items except the one that was just clicked (e)
                if (item.id != e.currentTarget.id) {
                    // check if item has click as a class
                    if (item.classList.value.includes('click')) {
                        item.classList.toggle('click');
                    }
                } else { // if user selected the same item that is already clicked and displayed by parent
                    e.currentTarget.parentElement.classList.toggle("click");
                }
            }
        } else { // no other elements in the grid have been clicked
            e.currentTarget.parentElement.classList.toggle("click");
        }
        
        e.currentTarget.classList.toggle("click");

    }
    handleMouseOver(e) {
        console.log("mouse over: " +e.currentTarget.classList);
        e.currentTarget.classList.toggle("mouseover");

    }
    handleMouseLeave(e) {
        console.log("mouse leave: " + e.currentTarget.id);
        e.currentTarget.classList.toggle("mouseover");
    }
}
customElements.define('rooms-grid', RoomsGrid);