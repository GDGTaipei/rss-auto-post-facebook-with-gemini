async function MetaPostMessage(blog) {
 
  try{

    const postContent = await generateFBText(blog.description)

    if(postContent.length === 0 ){
      console.log(blog.description)
      return ;
    }

    const FBpostedId = await sendFBPost(`${postContent}\n\n【貼文內容使用 Gemini 1.5 Pro 自動產生】`)
    const FBmessageId = await sendFBMessage(FBpostedId, blog.link)

    console.log(`FB posted sucessfully with postId : ${FBpostedId}, messageId: ${FBmessageId}`)

    const token = await getThreadsLongLivedToken()
    const ThreadContainerId = await createThreadsPostContent(`${postContent}\n\n👉閱讀原文細節：${blog.link}\n\n【貼文內容使用 Gemini 1.5 Pro 自動產生】`,token)
    const ThreadPostId = await sendThreadsPost(ThreadContainerId,token)

    console.log(`Threads posted sucessfully with postID : ${ThreadPostId}`)

    const containerId = await createIgPostContent(`${postContent}\n\n【貼文內容使用 Gemini 1.5 Pro 自動產生】`, blog.imageURL)
    const IGpostId = await sendIGPost(containerId)
    const IGmessageId = await sendIGMessage(IGpostId, blog.link)

    console.log(`IG posted sucessfully with postId : ${IGpostId}, messageId: ${IGmessageId}`)

  }catch(err){
    throw new Error(err)
  }
 }
