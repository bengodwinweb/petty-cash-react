const mongoose = require('mongoose');
const PdfPrinter = require('pdfmake/src/printer');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
var fs = require('fs');
const requireAuth = require('../middleware/auth/requireAuth');

const Cashbox = mongoose.model('Cashbox');

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};

module.exports = app => {
  app.get('/api/cashboxes/:id/pdf', requireAuth, (req, res) => {
    console.log(`GET to /api/cashboxes/${req.params.id}/pdf`);
    res.send({});
  });
};
