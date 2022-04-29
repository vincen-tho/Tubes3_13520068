function buildLast(pattern)
/* Return array storing index of last
occurrence of A, C, G, T in pattern. Modified buildLast */
{
    let last = []; // available chars, should be A, C, G, T
    last['A'] = -1;
    last['C'] = -1;
    last['G'] = -1;
    last['T'] = -1;
    for (let i = pattern.length-1; i > 0; i--)
    {
        if (last[pattern.charAt(i).toUpperCase()] === -1)
            last[pattern.charAt(i).toUpperCase()] = i;
        if(last.length >= 4) // for efficiency
            break;
    }
    return last;
} // end of buildLast()

function bmMatch(text, pattern)
{
    let last = buildLast(pattern);
    let n = text.length;
    let m = pattern.length;
    let i = m - 1;
    if (m > n)
        return -1; // no match if pattern is longer than text
    let j = m-1;
    do
    {
        if (pattern.charAt(j) === text.charAt(i))
        {
            if (j === 0) return i; // match
            else // looking-glass technique
            {
                i--;
                j--;
            }
        }
        else // character jump technique
        {
            let lo = last[text.charAt(i)]; //last occ
            i = i + m - Math.min(j, lo+1);
            j = m - 1;
        }
    }
    while (i <= n-1);
    return -1; // no match
} // end of bmMatch()

module.exports = {buildLast, bmMatch};

// let text = 'AGCTGCACCTGTGTAACCTGGTAACGTGC';
// let pattern = 'ACCTGTGTAACCTGGT';
// console.log(bmMatch(text, pattern))
    