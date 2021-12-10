import { LitElement, html, css } from "lit";
import {classMap} from 'lit/directives/class-map.js';
import {gridStyles} from './styles.js';
// import {styleMap} from 'lit/directives/style-map.js';
// import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module";

class RoomsGrid extends LitElement {
    static properties = {
        rooms: {},
        eventGridRoom: {},
        eventGridWrapper: {},
    };
    static styles = gridStyles;
    
    constructor() {
        super();
        // this.rooms = ["Room 10", "Room 20", "Room 30", "Room 40", "Room 50"];
        this.rooms = [];
        this.eventGridRoom = {
            "grid-room": true,
            "mouseover": false
        };
    }

    render () {
        return html`<div id="rooms">
            ${this.rooms.length > 0 ? html`
                <div class="grid-wrapper">
                    ${this.rooms.map( 
                        (item, index) => html `
                            <div id="${index}" class=${classMap(this.eventGridRoom)} @click="${this.handleClick}" @mouseover="${this.handleMouseOver}" @mouseleave="${this.handleMouseLeave}" >
                                <room-element>${item}</room-element>
                            </div>`
                    )}`
                :
                html`
                <div class="grid-wrapper">
                    <div class="grid-room empty-grid"> 
                        <p> Create your first Room </p>
                        <button>New Room</button>
                    </div>
                </div>`
            }
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