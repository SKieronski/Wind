import React from 'react';

export default (direction) => {
    let lowerCaseDirection = ""
    
    if(direction) {
        lowerCaseDirection = direction.toLowerCase();
    }
    
    switch(lowerCaseDirection) {
        case 'n':
        case 'north':
            return "0"
        case 'ne':
        case 'north east':
            return "45"
        case 'e':
        case 'east':
            return "90"
        case 'se':
        case 'south east':
            return "135"
        case 's':
        case 'south':
            return "180"
        case 'sw':
        case 'south west':
            return "-135"
        case 'w':
        case 'west':
            return "-90"
        case 'nw':
        case 'north west':
            return "-45"
        default:
            return "0"
    }
}