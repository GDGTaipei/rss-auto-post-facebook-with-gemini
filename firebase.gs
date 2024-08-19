const db = FirebaseApp.getDatabaseByUrl(FIREBASE_URL, SECRET);

const writeAccessToken= async(token,expiredAt) => {
  await db.setData(`/threads_access_token/${token}`, expiredAt);
}

const getAccessToken = async() =>{
  const data = db.getData('/threads_access_token/');
  return Object.entries(data)[0]
}

const deleteAccessToken = async(token) => {
  await db.removeData(`/threads_access_token/${token}`);
}
