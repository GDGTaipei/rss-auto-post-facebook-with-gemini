//建立獲取Token
const getThreadsLongLivedToken = async() =>{

  const url = `https://graph.threads.net/access_token?grant_type=th_exchange_token&client_secret=${Thread_Client_SERCET}&access_token=${SHORT_LIVED_TOKEN}`;


  const options = {
    'method' : 'get',
    'contentType': 'application/json',
  };

  const response = UrlFetchApp.fetch(url, options);
  const reaponseData = JSON.parse(response.getContentText());
  const access_token = reaponseData.access_token
  return access_token
}


//建立串文容器ID
const createThreadsPostContent = async(message,token) =>{

  const url = `https://graph.threads.net/v1.0/${threadsUserId}/threads`;

  const data =  {
    'media_type':"TEXT",
    "text": message,
    "access_token":token
  }

  const options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };

  const response = UrlFetchApp.fetch(url, options);
  const reaponseData = JSON.parse(response.getContentText());
  const containerId = reaponseData.id
  return containerId
}

// 發布串文容器(發文)
const sendThreadsPost = async(containerId,token) =>{
  const url = `https://graph.threads.net/v1.0/${threadsUserId}/threads_publish`;

  const data =  {
    creation_id: containerId,
    access_token: token
  }

  const options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };

  const response = UrlFetchApp.fetch(url, options);
  const reaponseData = JSON.parse(response.getContentText());
  const postId = reaponseData.id

  return postId
}

