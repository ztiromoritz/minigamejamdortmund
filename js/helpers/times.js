module.exports = function( n, block ) {
    var accum = '', i = -1;
    while( ++i < n ) {
        accum += block.fn( i );
    }
    return accum;
};
