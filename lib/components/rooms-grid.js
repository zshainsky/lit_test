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
        .gridWrapper {
            display: grid;
            grid-template-columns: 1fr 100px 100px;
            grid-gap: 10px;
            background-color: #fff;
            color: #444;
        }
        .gridRoom {
            background-color: #444;
            color: #fff;
            border-radius: 5mm;
            padding: 20px;
            font-size: 150%;
            text-align: center;
            transition: 1s;
          }
        .gridWrapper.mouseOver {
            background-color: #080707;
            

        }
        .gridRoom.mouseOver {
            background-color: #009c9c;
            transition: 1s;
        }
    `;

    constructor() {
        super();
        this.rooms = ["Room 10", "Room 20", "Room 30", "Room 41"];
        this.eventGridRoom = {
            gridRoom: true,
            mouseOver: false
        };
        this.eventGridWrapper = {
            gridWrapper: true,
            mouseOver: false
        }
    }

    render () {
        return html`<div id="rooms">
            <div class="gridWrapper">
            ${this.rooms.map( 
                (item, index) => html `
                    <div id="${index}" class=${classMap(this.eventGridRoom)} @mouseover="${this.handleMouseOver}" @mouseleave="${this.handleMouseLeave}"  >
                        ${item}
                    </div>`
            )}
            </div>
        </div>
        `
    }
    handleMouseOver(e) {
        console.log("mouse over: " +e.currentTarget.classList);
        e.currentTarget.parentElement.classList.toggle("moseOver");
        e.currentTarget.classList.toggle("mouseOver");

    }
    handleMouseLeave(e) {
        console.log("mouse leave: " + e.currentTarget.id);
        e.currentTarget.parentElement.classList.toggle("moseOver");
        e.currentTarget.classList.toggle("mouseOver");
    }
}
customElements.define('rooms-grid', RoomsGrid);