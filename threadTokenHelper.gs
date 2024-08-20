const init = async() =>{
  const resp = await getThreadsLongLivedToken()
  console.log(resp)
  const token = resp.access_token
  const expiredAt = resp.expires_in
  const now = Date.now()
  await writeAccessToken(token, now + (expiredAt*1000))
}


const refresh = async() =>{

  const [token,expiredAt] = await getAccessToken()

  if(isTokenExpired(expiredAt)){
    const now = Date.now()
    const resp = await refreshThreadsLongLivedToken(token)
    const refreshed_token = resp.access_token
    const refreshed_expiredAt = now + (resp.expires_in*1000)
    await writeAccessToken(refreshed_token, refreshed_expiredAt)
    await deleteAccessToken(token)
    console.log(`Token has been refreshed`)
    return 
  }

  console.log(`Token will expired at ${secondsToDHMS(expiredAt)}`)
}

const isTokenExpired = (timestamp) =>{
  const now = Date.now()
  return timestamp - now <= 86400*2
}

function secondsToDHMS(timestamp) {
  const now = Date.now()
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;

  const totalSeconds = Math.floor((timestamp-now) / millisecondsPerSecond);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const secondsLeft = totalSeconds % 60;
  const minutesLeft = totalMinutes % 60;
  const hoursLeft = totalHours % 24;

  return `${totalDays} days, ${hoursLeft} hours, ${minutesLeft} minutes and ${secondsLeft} seconds`;
}
