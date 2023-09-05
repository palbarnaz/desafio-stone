

export const formatDate = ()=>{
  const data = new Date(); 
const formatoData = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  day: '2-digit',
  timeZone: 'UTC'
});

 const date = formatoData.format(data) + " " + data.getUTCFullYear()
  
  return date
//  return formatoData.format(data).toString();

}

export const formatHour = ()=>{
  const data = new Date();
 
  const formatoHour = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
   return formatoHour.format(data);
  
}