// Factory function for a ship
function ship(length) {

    let timesHit = 0;

    function hit() {
        timesHit++;
    }

    function isSunk() {
        if (timesHit >= length) {
            return true;
        } else {
            return false;
        }
    }

    return {
        get length() { return length; },
        hit, isSunk
    };

}

module.exports = ship;