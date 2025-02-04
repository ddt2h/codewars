function formatDuration (seconds) {
    if (!seconds) return 'now';
    let years, days, hours, minutes;
    let left = seconds;

    years = Math.floor(left / 31536000);
    left -= (years * 31536000);

    days = Math.floor(left / 86400);
    left -= (days * 86400);

    hours = Math.floor(left / 3600);
    left -= (hours * 3600);

    minutes = Math.floor(left / 60);
    left -= (minutes * 60);
    
    const ordered = [years, days, hours, minutes, left];
    const counted = [];

    for (let i = 0; i < ordered.length; i++) {
        if (ordered[i] === 0) continue;

        switch (i) {
            case 0: {
                counted.push(`${ordered[0]} ${ordered[0] > 1 ? 'years' : 'year'}`); //year
                break;
            }
            case 1: {
                counted.push(`${ordered[1]} ${ordered[1] > 1 ? 'days' : 'day'}`); //year
                break;
            }
            case 2: {
                counted.push(`${ordered[2]} ${ordered[2] > 1 ? 'hours' : 'hour'}`); //year
                break;
            }
            case 3: {
                counted.push(`${ordered[3]} ${ordered[3] > 1 ? 'minutes' : 'minute'}`); //year
                break;
            }
            case 4: {
                counted.push(`${ordered[4]} ${ordered[4] > 1 ? 'seconds' : 'second'}`); //year
                break;
            }
        }
    }
    let retStr = '';

    if (counted.length === 1) return counted[0];

    for (let i = 0; i < counted.length; i++) {
        if (i === 0) retStr += counted[i];
        if (i !== 0){
            if ((counted.length > 1) && (i === counted.length - 1)) {
                retStr += ' and ';
            }
            else {
                retStr += ', ';
            }
            retStr += counted[i];
        } 
        
    }

    return retStr;
}