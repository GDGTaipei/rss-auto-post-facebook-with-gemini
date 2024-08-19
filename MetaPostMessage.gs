async function MetaPostMessage(blog) {
 
  try{

    const postContent = await generateFBText(blog.description)

    if(postContent.length === 0 ){
      console.log(blog.description)
      return ;
    }

 const FBpostedId = await sendFBPost(`${postContent}\n\n【貼文內容使用 Gemini 1.5 Pro 自動產生】`)
    const FBmessageId = await sendFBMessage(FBpostedId, blog.link)

    console.log(`FB posted sucessfully with postID : ${FBpostedId}, messageId: ${FBmessageId}`)
    
    const containerId = await createIgPostContent(`${postContent}\n\n【貼文內容使用 Gemini 1.5 Pro / 圖片採用 Imagen 2 自動產生】`, blog.imageURL)
    const IGpostId = await sendIGPost(containerId)
    const IGmessageId = await sendIGMessage(IGpostId, blog.link)

    console.log(`IG posted sucessfully with postId : ${IGpostId}, messageId: ${IGmessageId}`)

    const token = await getThreadsLongLivedToken()
    const segments = paragraphToSlice(postContent)

    const firstPost = segments.length > 1 ? `${segments[0]}\n\n 續(1/${segments.length})`: `${postContent}\n\n【貼文內容使用 Gemini 1.5 Pro 自動產生】`
    const ThreadContainerId = await createThreadsPostContent(firstPost,token)
    const ThreadPostId = await sendThreadsPost(ThreadContainerId,token)
    console.log(`Thread replied sucessfully with postID : ${ThreadPostId}`)

    if(segments.length > 1){
        for(let i = 1; i < segments.length-1; i++){
          const ThreadSubReplyContainerId = await createThreadsMessageContainer(ThreadPostId, `${segments[i]}\n\n 續(${i}/${segments.length})`,token)
          const ThreadSubReplyId = await sendThreadsPost(ThreadSubReplyContainerId,token)
          console.log(`Thread replied sucessfully with replyId: ${ThreadSubReplyId}`)
        }
          const ThreadSubReplyContainerId = await createThreadsMessageContainer(ThreadPostId, `${segments[segments.length-1]}\n\n【貼文內容使用 Gemini 1.5 Pro 自動產生】`,token)
          const ThreadSubReplyId = await sendThreadsPost(ThreadSubReplyContainerId,token)
          console.log(`Thread replied sucessfully with replyId: ${ThreadSubReplyId}`)
    }

    const ThreadReplyContainerId = await createThreadsMessageContainer(ThreadPostId, `歡迎到原文查看詳細訊息：\n 👉 ${blog.link}`,token)
    const ThreadReplyId = await sendThreadsPost(ThreadReplyContainerId,token)

    console.log(`Thread posted sucessfully with replyId: ${ThreadReplyId}`)
  }catch(err){
    throw new Error(err)
  }
 }
