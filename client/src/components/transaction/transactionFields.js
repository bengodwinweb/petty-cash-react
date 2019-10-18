export default [
  { label: 'Group', name: 'paidTo', type: 'text', required: true },
  { label: 'Category', name: 'expenseType', type: 'text', required: true },
  {
    label: 'Amount',
    name: 'amount',
    type: 'number',
    required: true,
    min: 0.01,
    max: 500
  },
  { label: 'Index', name: 'index', type: 'text', required: true },
  { label: 'Account', name: 'account', type: 'text', required: true },
  { label: 'Description', name: 'description', type: 'text', required: false }
];
