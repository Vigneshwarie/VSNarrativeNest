// Normal JS function didn't help. Hence, referred the link to create a helper function. https://handlebarsjs.com/examples/helper-simple.html
// Activity 14 helped. 
// Moved this functionality to the utils folder from the scripts
// getMonth always gives month starting from 0 as 0 to 11; hence added 1 to the month.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
module.exports = {
     formatDate: (vDate) => {
          const date = new Date(vDate);
          const [month, day, year] = [
               date.getMonth()+1,
               date.getDate(),
               date.getFullYear()
          ];
          var newDate = "" + month + "-" + day + "-" + year;
          return newDate;
     }
};