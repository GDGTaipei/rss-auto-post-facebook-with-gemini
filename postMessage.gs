async function postMessage(chatId) {

  const blogs = parseXml()
  
  Logger.log(`Avaliable blog count: ${blogs.length}`)
  
  if(blogs.length < 1 ){
    return;
  }

  for (let blog of blogs){
    try{
      await fbPostMessage(blog)
    }catch(err){
      console.log(blog)
    }
  }
}

