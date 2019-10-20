import pdfStyles from './pdfStyles';

const defineDoc = ({ cashbox, errors, expenseArr, changeArr }) => {
  return {
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
      },
      {
        style: 'tableBottomSpace',
        table: {
          widths: [120, '*'],
          body: [
            [
              { text: 'Department', style: 'bold' },
              { text: cashbox.cashboxName, style: 'underline' }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        style: 'table',
        table: {
          widths: [200, 50, 50, '*'],
          body: [
            [
              { text: 'Total Amount of Petty Cash Fund:', style: 'bold' },
              {
                text: `$${cashbox.fundTotal.toFixed(2)}`,
                style: ['bold', 'underline']
              },
              { text: '(A) + (B)', style: 'bold' },
              { text: '(Original Amount of Fund)' }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        style: 'table',
        table: {
          widths: [200, 50, 50, '*'],
          body: [
            [
              { text: 'Receipts', style: 'bold' },
              {
                text: `$${cashbox.currentSpent.toFixed(2)}`,
                style: ['bold', 'underline']
              },
              { text: '(A)', style: 'bold' },
              { text: '(Amount to be Reimbursed by Bursar)' }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        style: 'tableBottomSpace',
        table: {
          widths: [200, 50, 50, '*'],
          body: [
            [
              { text: 'Cash on Hand:', style: 'bold' },
              {
                text: '$' + cashbox.currentBox.boxTotal.toFixed(2),
                style: ['bold', 'underline']
              },
              { text: '(B)', style: 'bold' },
              { text: '(Amount Remaining in Petty Cash Box)' }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        text: errors.totalError ? errors.totalError : '',
        style: 'error'
      },
      {
        text: errors.changeError ? errors.changeError : '',
        style: 'error'
      },
      {
        style: 'expensesTable',
        table: {
          headerRows: 1,
          widths: [120, '*', '*', '*', 150],
          body: [
            [
              { text: 'Type', style: 'tableHeader' },
              { text: 'Amount', style: 'tableHeader' },
              { text: 'Index #', style: 'tableHeader' },
              { text: 'Account #', style: 'tableHeader' },
              { text: '', style: 'tableHeader' }
            ]
          ].concat(expenseArr)
        },
        layout: 'noBorders'
      },
      {
        style: 'receiptsTable',
        table: {
          widths: [120, 70, '*'],
          body: [
            [
              { text: 'Receipts Total', style: 'bold' },
              {
                text: `$${cashbox.currentSpent.toFixed(2)}`,
                style: ['bold', 'underline']
              },
              { text: '(A)', style: 'bold' }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        style: 'signatureTable',
        table: {
          widths: [120, '*', '*'],
          body: [
            [
              { text: 'Counted By:', style: 'bold' },
              {
                text: '_______________________________________________',
                style: 'bold'
              },
              {
                text: '___________________________',
                style: ['bold', 'center']
              }
            ],
            [
              { text: '' },
              {
                text: 'Print Name and Date',
                style: ['bold', 'center', 'signature']
              },
              {
                text: 'Signature',
                style: ['bold', 'center', 'signature']
              }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        style: 'signatureTable',
        table: {
          widths: [120, '*', '*'],
          body: [
            [
              { text: 'Approved By:', style: 'bold' },
              {
                text: '_______________________________________________',
                style: 'bold'
              },
              {
                text: '___________________________',
                style: ['bold', 'center']
              }
            ],
            [
              { text: '' },
              {
                text: 'Print Name and Date',
                style: ['bold', 'center', 'signature']
              },
              {
                text: 'Signature',
                style: ['bold', 'center', 'signature']
              }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        style: 'signatureTable',
        table: {
          widths: [120, '*', '*'],
          body: [
            [
              { text: 'Cash Received By:', style: 'bold' },
              {
                text: '_______________________________________________',
                style: 'bold'
              },
              {
                text: '___________________________',
                style: ['bold', 'center']
              }
            ],
            [
              { text: '' },
              {
                text: 'Print Name and Date',
                style: ['bold', 'center', 'signature']
              },
              {
                text: 'Signature',
                style: ['bold', 'center', 'signature']
              }
            ]
          ]
        },
        layout: 'noBorders',
        pageBreak: 'after'
      },
      {
        text: 'CHANGE',
        style: 'firstLine'
      },
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            style: 'changeTable',
            table: {
              headerRows: 1,
              widths: [100, 50, 50],
              body: [
                [
                  { text: 'Denomination', style: 'tableHeader' },
                  {
                    text: 'Needed',
                    style: 'tableHeader',
                    alignment: 'center'
                  },
                  {
                    text: '$',
                    style: 'tableHeader',
                    alignment: 'center'
                  }
                ]
              ].concat(changeArr)
            }
          },
          { width: '*', text: '' }
        ]
      }
    ],
    styles: pdfStyles
  };
};

export default defineDoc;
