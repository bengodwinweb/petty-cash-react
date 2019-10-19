import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfStyles from './pdfStyles';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default ({ cashbox, changeBox, transactions }) => {
  // Have to make transactions into an array for docDefinition display
  var expensesArr = cashbox.transactions.map(transaction => [
    transaction.expenseType,
    `$${transaction.amount.toFixed(2)}`,
    transaction.index,
    transaction.account,
    transaction.description
  ]);
  console.log(expensesArr);

  const docDefinition = {
    info: {
      title: 'Petty Cash Reconciliation',
      author: 'Petty Cash'
    },
    content: [
      {
        text: cashbox.companyName.toUpperCase(),
        style: 'firstLine'
      },
      {
        text: `PETTY CASH RECONCILIATION AND REQUEST FOR REPLENISHMENT\n\n`,
        style: 'secondLine'
      }
    ],
    styles: pdfStyles
  };

  pdfMake.createPdf(docDefinition).download();
};
