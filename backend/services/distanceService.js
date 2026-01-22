function calculateDistance(point1, point2) {
    try {
        if(!point1 || !point2) {
            throw new Error("Invalid points provided for distance calculation.");
        }

        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    } catch (error) {
        console.error("Error calculating distance:", error);
        return null;    
    }
}

function estimateTime(distance, speed, prepTime) {
    try {
        if(distance == null || speed <= 0 || prepTime < 0) {
            throw new Error("Invalid parameters for time estimation.");
        }

        const travelTime = distance / speed; // time = distance / speed
        return travelTime + prepTime; // total time = travel time + preparation time
    } catch (error) {
        console.error("Error estimating time:", error);
        return null;    
    }     
};

module.exports = { calculateDistance, estimateTime };