// import axios from "axios";
import io from "socket.io-client";

const socket = io.connect('http://localhost:3000/');

// Fetch the currency data
export function fetchCurrency() {
    socket.emit('fetch_currency');
    return function(dispatch) {
        socket.on('emit_currency', (response) => {
            dispatch({ type: "FETCH_CURRENCY_FULFILLED", payload: response });
        });
    }
}

export function fetchAssets() {
	socket.emit('fetch_assets');
    return function(dispatch) {
        socket.on('emit_assets', (response) => {
            dispatch({ type: "FETCH_ASSETS_FULFILLED", payload: response });
        });
    }
}
