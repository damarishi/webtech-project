exports.castPosition = (position) => {
    if (typeof position !== 'string') {
        throw new Error("Could not parse position");
    }
    const matches = position.match(/-?\d+(\.\d+)?/g);
    if(!matches) {
        throw new Error('Invalid POINT format');
    }
    let x = Number(matches[0]);
    let y = Number(matches[1]);
    return {x,y};
}

exports.castPairToString = ({x,y}) => {
    return `(${x},${y})`;
}