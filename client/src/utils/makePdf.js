import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import BOX_FIELDS from '../utils/boxFields';
import defineDoc from '../utils/defineDoc';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default ({ cashbox, changeBox, transactions }) => {
  const errors = {};
  // Add error to document if current cash + receipts does not equal fundTotal
  if (
    cashbox.currentSpent + cashbox.currentBox.boxTotal !==
    cashbox.fundTotal
  ) {
    errors.totalError =
      'Error: Receipts and Cash on Hand do not equal fund total';
  }
  // Add error to document if receipts does not equal change
  if (cashbox.changeBox.boxTotal !== cashbox.currentSpent) {
    errors.changeError = 'Error: Change does not equal Receipts';
  }

  // Make transactions into an array
  const expenseArr = cashbox.transactions.map(transaction => [
    transaction.expenseType,
    `$${transaction.amount.toFixed(2)}`,
    transaction.index,
    transaction.account,
    transaction.description || ''
  ]);

  // Make changeBox into an array
  const changeArr = Object.keys(BOX_FIELDS).map(key => [
    { text: BOX_FIELDS[key].string },
    {
      text: cashbox.changeBox[key] > 0 ? cashbox.changeBox[key] : '-',
      alignment: 'center'
    },
    {
      text:
        cashbox.changeBox[key] > 0
          ? `$${(cashbox.changeBox[key] * BOX_FIELDS[key].value).toFixed(2)}`
          : '-',
      alignment: 'right'
    }
  ]);
  changeArr.push([
    { text: '', alignment: 'center' },
    { text: 'TOTAL', style: 'bold', alignment: 'center' },
    {
      text: `$${cashbox.changeBox.boxTotal.toFixed(2)}`,
      style: 'bold',
      alignment: 'right'
    }
  ]);

  // Combine everything into an object to pass into defineDoc()
  const documentOptions = {
    cashbox,
    errors,
    expenseArr,
    changeArr
  };

  const docDefinition = defineDoc(documentOptions);

  pdfMake.createPdf(docDefinition).download();
};
