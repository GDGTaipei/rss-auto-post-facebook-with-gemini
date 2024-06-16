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

    const containerId = await createIgPostContent(`${postContent}\n\n【貼文內容使用 Gemini 1.5 Pro 自動產生】`, blog.imageURL)
    const IGpostId = await sendIGPost(containerId)
    const IGmessageId = await sendIGMessage(IGpostId, blog.link)

    console.log(`IG posted sucessfully with postId : ${IGpostId}, messageId: ${IGmessageId}`)


    const ThreadsContainerId = await createThreadsPostContent(`${postContent}\n\n【貼文內容使用 Gemini 1.5 Pro 自動產生】`)
    const ThreadsPostId = await sendThreadsPost(ThreadsContainerId)
    const ThreadsMessageId = await sendThreadsMessage(ThreadsPostId, blog.link)

    console.log(`Threads posted sucessfully with postId : ${ThreadsPostId}, messageId: ${ThreadsMessageId}`)

  }catch(err){
    throw new Error(err)
  }
 }
