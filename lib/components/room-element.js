import { LitElement, html, css } from "lit";
import {roomStyles} from './styles.js';
// import {styleMap} from 'lit/directives/style-map.js';
// import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module";

class RoomElement extends LitElement {
    static get properties() {
        return {
            id: {type: String},
            name: {type: String},
            isRoomSelected: {type: Boolean},
            selectedRoomId: {type: String, 
                hasChanged(newVal, oldVal) { 
                    
                    console.log("has changed: ", newVal, " : ", oldVal);
                }
            }
        };
        
    }

    static styles = roomStyles;

    constructor() {
        super();
    }

    render() {
        console.log(this.selectedRoomId + ", " + this.id, this.selectedRoomId != "");
        
        return html`
                    <div class="clickable open-room-btn center" @click="${this.openRoom}"> open </div>
                    <div class="title">${this.name}, ${this.id}</div>
                    ` 

        
    }
    openRoom (e) {
        console.log("open room" + this.isRoomSelected);
        console.log(e.currentTarget);
        // open room in preview
        window.open("/rooms-"+this.id);
        
    }
}
customElements.define('room-element', RoomElement);