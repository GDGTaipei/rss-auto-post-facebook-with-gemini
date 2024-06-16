/**
 * @reference https://developers.facebook.com/docs/threads
 * [!]目前需要等權限開放，預計今年六月
 */

//建立串文容器ID
const createThreadsPostContent = async(message, imageUrl) =>{

  const url = `https://graph.facebook.com/v20.0/${instaBusinessId}/threads?access_token=${FACEBOOK_TOKEN}`;

  const data =  {
    // image_url: imageUrl, //對於圖像，將變數設為 image_url，對於視頻，將變數設為 video_url。
    text: message, //在此插入您要發佈的文字
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
const sendThreadsPost = async(containerId) =>{
  const url = `https://graph.facebook.com/v20.0/${instaBusinessId}/threads_publish?access_token=${FACEBOOK_TOKEN}`;

  const data =  {
    creation_id: containerId,
  }

  const options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };

  const response = UrlFetchApp.fetch(url, options);
  const reaponseData = JSON.parse(response.getContentText());
  const postId = reaponseData.id

  return postId
}

/**
 * 自動Threads貼文下留言
 * @reference: https://developers.facebook.com/docs/instagram-api/reference/ig-media/comments?locale=zh_TW
 */
const sendThreadsMessage = async(IgMediaId, blogUrl) =>{
   const url = `https://graph.facebook.com/v20.0/${IgMediaId}/comments?access_token=${FACEBOOK_TOKEN}`;

  const data =  {
    "message": `還在觀望嗎？不如手刀報名！\n ${blogUrl}`,
  }

  const options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };

  const response = UrlFetchApp.fetch(url, options);
  const reaponseData = JSON.parse(response.getContentText());
  const postId = reaponseData.id

  return postId
}
