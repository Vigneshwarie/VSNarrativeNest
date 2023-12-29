
// Normal JS function didn't help. Hence, referred the link to create a helper function. https://handlebarsjs.com/examples/helper-simple.html

Handlebars.registerHelper('formatDate', function (vDate) {
     console.log(vDate);
     const date = new Date(vDate);
     const [month, day, year] = [
          date.getMonth(),
          date.getDate(),
          date.getFullYear()
     ];
     var newDate = "" + month + "-" + day + "-" + year;
     return newDate;
});
