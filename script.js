"use strict";

window.addEventListener("DOMContentLoaded", getTheHex);

function getTheHex() {
    document.querySelector("#colorPicker").addEventListener("input", showInformation);
}

function showInformation() {
    const hex = document.querySelector("#colorPicker").value;
    const rgb = hexToRGB(hex)
    const hsl = rgbToHSL(rgb);
    const css = rgbToCSS(rgb);

    showHex(hex);
    showRGB(rgb);
    showHSL(hsl);
    changeBoxColor(css);
}

function hexToRGB(hex) {
    hex = hex.substring(1);
    let r = hex.substring(0, 2);
    let g = hex.substring(2, 4);
    let b = hex.substring(4, 6);
    r = Number.parseInt(r, 16);
    g = Number.parseInt(g, 16);
    b = Number.parseInt(b, 16);
    return {r, g, b};
}

function rgbToHSL({r, g, b}) {
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
    //console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    return {h, s, l};
}

function rgbToCSS({r, g, b}) {
    return `rgb(${r}, ${g}, ${b})`;
}

function showHex(hex) {
    hex = hex.toUpperCase();
    document.querySelector("#hex").textContent = `HEX: ${hex}`;
}

function showRGB({r, g, b}) {
    document.querySelector("#rgb").textContent = `R: ${r} G: ${g} B: ${b}`;
}

function showHSL({h, s, l}) {
    document.querySelector("#hsl").textContent = `H: ${h} S: ${s}% L: ${l}%`;
}

function changeBoxColor(css) {
    document.querySelector(".box").style.backgroundColor = css;
}