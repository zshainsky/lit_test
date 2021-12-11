import { LitElement, html, css } from "lit";
import {roomStyles} from './styles.js';
// import {styleMap} from 'lit/directives/style-map.js';
// import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module";

class RoomElement extends LitElement {
    static get properties() {
        return {
            id: {type: String},
            name: {type: String},

        };
    }

    static styles = roomStyles;

    constructor() {
        super();
    }

    render() {
        return html`${this.name}, ${this.id}`

    }
}
customElements.define('room-element', RoomElement);