/**
 * @reference https://developers.facebook.com/docs/instagram-api/guides/content-publishing
 */

//建立圖片容器
const createIgPostContent = async(message, imageUrl) =>{

  const url = `https://graph.facebook.com/v20.0/${instaBusinessId}/media?access_token=${FACEBOOK_TOKEN}`;

  const data =  {
    image_url: imageUrl ? imageUrl :'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,h_200,q_auto:good,w_200/v1/gcs/platform-data-goog/event_banners/gdev-eccosystems-bevy-chapters-thumbnail_x4z1EBy.png', //對於圖像，將變數設為 image_url，對於視頻，將變數設為 video_url。
    caption: message, //在此插入您要發佈的文字
    media_type: '' //如果投稿僅包含圖片，則將值設置為 "空"；如果投稿僅包含影片，則將值設置為 "REELS"；如果投稿包含故事，則將值設置為 "STORIES"。
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

// 發布圖片容器(發文)
const sendIGPost = async(containerId) =>{
  const url = `https://graph.facebook.com/v20.0/${instaBusinessId}/media_publish?access_token=${FACEBOOK_TOKEN}`;

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
 * 自動IG貼文下留言
 * @reference: https://developers.facebook.com/docs/instagram-api/reference/ig-media/comments?locale=zh_TW
 */
const sendIGMessage = async(IgMediaId, blogUrl) =>{
   const url = `https://graph.facebook.com/v20.0/${IgMediaId}/comments?access_token=${FACEBOOK_TOKEN}`;

  const data =  {
    "message": `歡迎到原文查看詳細訊息：\n ${blogUrl}`,
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
