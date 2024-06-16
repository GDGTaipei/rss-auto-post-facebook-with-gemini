async function sendFBPost(message){

  var url = `https://graph.facebook.com/v20.0/${pageId}/feed?access_token=${FACEBOOK_TOKEN}`;

  var data =  {
    "message": message,
    //  "published":"true"
    "published":"false",
    "scheduled_publish_time": Math.round(new Date().getTime() / 1000) + 600 + Math.floor(Math.random() * 1440)
  }

   var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };

  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  const postId = data.id

  return postId
}

async function sendFBMessage(postId, blogUrl){

  var url = `https://graph.facebook.com/v20.0/${postId}/comments?access_token=${FACEBOOK_TOKEN}`;

  var data =  {
    "message": `歡迎到原文查看詳細訊息：\n 👉 ${blogUrl}`
  }

   var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };

  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  const messageId = data.id

  return messageId
}

