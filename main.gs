function doGet(e){
  return ContentService.createTextOutput("Method GET not allowed");
}

const autoPostMessage = async () => {
  await postMessage(chatId)
};


