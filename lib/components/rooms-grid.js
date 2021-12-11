import { LitElement, html, css } from "lit";
import {gridStyles} from './styles.js';
// import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module";

class RoomsGrid extends LitElement {
    static properties = {
        rooms: {type: Array},
        loading: { type: Boolean },
    };
    static styles = gridStyles;

    connectedCallback() {
        super.connectedCallback();

        if(!this.rooms) {
            this.fetchRooms();
        }
    }
    async fetchRooms() {
        this.loading = true;
        const response = await fetch('https://api.openbrewerydb.org/breweries');
        const jsonResponse = await response.json();
        this.rooms = jsonResponse;
        this.loading = false;
        console.log(this.rooms);
    }

    render () {
        if (this.loading) {
            return html` <p>Loading...</p> `;
        }
        return html`<div id="rooms">
            ${this.rooms.length > 0 ? 
                html`
                <div class="grid-title">Active Rooms</div>
                    <div class="grid-wrapper">
                        ${this.rooms.map( 
                            (item, index) => html `
                                <div id="${index}" class="grid-room" @click="${this.handleClick}"  >
                                    <room-element .id=${item.id} .name=${item.name}></room-element>
                                </div>`
                        )}
                    </div>
                `
                :
                html`
                <div class="grid-wrapper">
                    <div class="grid-room empty-grid"> 
                        <p> Create your first Room </p>
                        <button>New Room</button>
                    </div>
                </div>
                `
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
    // handleMouseOver(e) {
    //     console.log("mouse over: " +e.currentTarget.classList);
    //     e.currentTarget.classList.toggle("mouseover");

    // }
    // handleMouseLeave(e) {
    //     console.log("mouse leave: " + e.currentTarget.id);
    //     e.currentTarget.classList.toggle("mouseover");
    // }
    //@mouseover="${this.handleMouseOver}" @mouseleave="${this.handleMouseLeave}"
}
customElements.define('rooms-grid', RoomsGrid);