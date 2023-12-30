
// Normal JS function didn't help. Hence, referred the link to create a helper function. https://handlebarsjs.com/examples/helper-simple.html
// Activity 14 helped. 
module.exports = {
     formatDate: (vDate) => {
          console.log(vDate);
          const date = new Date(vDate);
          const [month, day, year] = [
               date.getMonth(),
               date.getDate(),
               date.getFullYear()
          ];
          var newDate = "" + month + "-" + day + "-" + year;
          return newDate;
     }
};
