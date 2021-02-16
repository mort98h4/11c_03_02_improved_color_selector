"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("start");
    const colorValue = document.querySelector("#colorPicker").value;
    getTheHex(colorValue);

    document.querySelector("#colorPicker").addEventListener("input", getTheHex);
}

function getTheHex() {
    const colorValue = document.querySelector("#colorPicker").value;
    console.log(colorValue);
    changeBoxColor(colorValue);
    showHex(colorValue);
    convertToRGB(colorValue);
}

function convertToRGB(hexColor) {
    hexColor = hexColor.substring(1);
    let r = hexColor.substring(0, 2);
    let g = hexColor.substring(2, 4);
    let b = hexColor.substring(4, 6);
    r = Number.parseInt(r, 16);
    g = Number.parseInt(g, 16);
    b = Number.parseInt(b, 16);
    console.log({r, g, b});
    showRGB(r, g, b);
    convertToHSL(r, g, b);
}

function convertToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
 
    let h, s, l;
 
    const min = Math.min(r,g,b);
    const max = Math.max(r,g,b);
  
    if( max === min ) {
        h = 0;
    } else 
    if (max === r) {
        h = 60 * (0 + (g - b) / (max - min) );
    } else
    if (max === g) {
        h = 60 * (2 + (b - r) / (max - min) );
    } else
    if (max === b) {
        h = 60 * (4 + (r - g) / (max - min) );
    }
  
    if (h < 0) {
        h = h + 360; 
    }
  
    l = (min + max) / 2;
  
    if (max === 0 || min === 1 ) {
        s = 0;
    } else {
        s = (max - l) / ( Math.min(l,1-l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;
    
    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);
    console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    showHSL(h, s, l);
}

function showHex(hexColor) {
    hexColor = hexColor.toUpperCase();
    document.querySelector("#hex").textContent = `HEX: ${hexColor}`;
}

function showRGB(r, g, b) {
    document.querySelector("#rgb").textContent = `R: ${r} G: ${g} B: ${b}`;
}

function showHSL(h, s, l) {
    document.querySelector("#hsl").textContent = `H: ${h} S: ${s}% L: ${l}%`;
}

function changeBoxColor(hexColor) {
    document.querySelector(".box").style.backgroundColor = hexColor;
}