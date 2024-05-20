const dateDict = ["日","一","二","三","四","五","六"]

const dateTrans = (dateString) => {

  const event = new Date(dateString);

  const year = event.getFullYear() 
  const month = event.getMonth() + 1; 
  const date = event.getDate();
  const hour = event.getHours()
  const minute = event.getMinutes();
    
  return `${year}年${month}月${date}日 ${hour>=10?hour:`0${hour}`}:${minute>=10?minute:`0${minute}`}`;

  };
