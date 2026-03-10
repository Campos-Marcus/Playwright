const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function excelTest(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("C:/Users/Hope/Documents/Reps/Fruits.xlsx");
    const workSheet = workbook.getWorksheet(workbook.worksheets[0].name);
    const output = await readExcel(workSheet, searchText);

    const cell = workSheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;

    await workbook.xlsx.writeFile(filePath);


    if (output.row > 0 && output.column > 0) {
        const cell = workSheet.getCell(output.row, output.column);
        cell.value = "Repucccblic";
    }

    await workbook.xlsx.writeFile("C:/Users/Hope/Documents/Reps/Fruits.xlsx");
}


async function readExcel(workSheet, searchText) {
    let output = { row: -1, column: -1 };
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }

        });
    })
    return output;
}


test("Upload download excel validation", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    await page.getByRole('button', { name: 'Download' }).click();

    writeExcel
})