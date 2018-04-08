const XlsxPopulate = require('xlsx-populate');

  XlsxPopulate.fromFileAsync('./book.xlsx')
      .then(workbook => {
          // Randomly generate 10 rows of data.
          const value = workbook.sheet("Sheet1").cell("A1").value();

        // Log the value.
        console.log(value);
          return workbook.toFileAsync('./out.xlsx');
      })
      .catch(err => console.error(err));
