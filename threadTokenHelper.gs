const init = async() =>{
  const resp = await getThreadsLongLivedToken()
  console.log(resp)
  const token = resp.access_token
  const expiredAt = resp.expires_in
  await writeAccessToken(token, expiredAt)
}


const refresh = async() =>{

  const data = await getAccessToken()
  const token = data[0]
  const expiredAt = data[1]

  if(isTokenExpired(expiredAt)){
    const resp = await refreshThreadsLongLivedToken(token)
    const refreshed_token = resp.access_token
    const refreshed_expiredAt = resp.expires_in
    await writeAccessToken(refreshed_token, refreshed_expiredAt)
    await deleteAccessToken(token)
    console.log(`Token has been refreshed`)
    return 
  }
    console.log(`Token will expired at ${secondsToDHMS(expiredAt)}`)
}

const isTokenExpired = (timestamp) =>{
  return timestamp <= 86400
}

function secondsToDHMS(seconds) {
  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secondsLeft = seconds % 60;

  return `${days} days, ${hours} hours, ${minutes} minutes and ${secondsLeft} seconds`;
}
