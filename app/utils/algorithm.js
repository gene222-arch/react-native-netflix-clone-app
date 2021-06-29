export const levenshteinFuzzyMatched = (comparer, comparitor, matchCount) =>
{
    let isMatched = false;

    let a = comparer.trim().toLowerCase();
    let b = comparitor.trim().toLowerCase();

    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;

    let matrix = [];
    
    // increment along the first column of each row
    let i;
    for(i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    
    // increment each column in the first row
    let j;
    for(j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++) {
        for(j = 1; j <= a.length; j++) {
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                        Math.min(matrix[i][j-1] + 1, // insertion
                                                 matrix[i-1][j] + 1)); // deletion
            }
        }
    }

    let fuzzyDistance = matrix[b.length][a.length];
    let cLength = Math.max(a.length, b.length);
    let score = 1.0 - (fuzzyDistance / cLength);

    if (score > matchCount)
        isMatched = true;
    
    return isMatched;
}