
function parseXml() {
  let xml = UrlFetchApp.fetch(BLOG_RSS_URL).getContentText();
  let document = XmlService.parse(xml);
  let root = document.getRootElement();

  let channel = root.getChild('channel');
  let items = channel.getChildren('item');

  let summationList = []

  items.forEach(item => {

    summationList.push({
      pubDate:new Date(item.getChild('pubDate').getText()),
      title : item.getChild('title').getText(),
      description : item.getChild('description').getText().replace(/<[^>]+>/g, ""),
      link : item.getChild('link').getText(),
      imageURL:getImageUrls(item.getChild('description').getText())
    })
  });

  return summationList.filter(item=>DateFilter(item.pubDate))
}


function getImageUrls(html) {
  var imageUrls = [];
  
  // Regular expression to find image URLs
  var regex = /<img[^>]+src=["']([^"']+)["']/g;
  
  // Match all occurrences of the regex in the HTML
  var matches = html.match(regex);
  
  if (matches) {
    // Extract the URLs from the matches
    for (var i = 0; i < matches.length; i++) {
      var match = matches[i];
      var urlMatch = /src=["']([^"']+)["']/g.exec(match);
      if (urlMatch && urlMatch.length > 1) {
        var imageUrl = urlMatch[1];
        imageUrls.push(imageUrl);
      }
    }
     return imageUrls[0]
  }
 
  return null
 
}

function DateFilter(inputDate){
  
  const eventDate =  new Date(inputDate).getTime()
  const dateNow = new Date().getTime()
  const dateInterval = (eventDate-dateNow)/86400000

  return dateInterval>=-1 && dateInterval<=0
}


