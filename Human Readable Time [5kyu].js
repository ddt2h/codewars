function humanReadable (seconds) {
    let hours = Math.floor(seconds / 60 / 60);
      let excSeconds = seconds - (hours * 60 * 60);
  
      let minutes = Math.floor(excSeconds / 60);
      let excMinutes = excSeconds - (minutes * 60);
  
      if (hours < 10) hours = '0' + hours;
      if (minutes < 10) minutes = '0' + minutes;
      if (excMinutes < 10) excMinutes = '0' + excMinutes;
  
      let format = `${hours}:${minutes}:${excMinutes}`;
      return format;
}