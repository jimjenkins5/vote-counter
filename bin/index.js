#!/usr/bin/env node

'use strict';

const fs = require('fs'),
      util = require('util'),
      readFile = util.promisify(fs.readFile),
      filePath = process.argv.length > 2 ? process.argv[2] : null,
      voteCounter = require('../src/index');

if (!filePath) {
   console.error('You must pass a filePath as an argument!');
}

(async function() {
   const ballots = await readFile(filePath, 'utf8')
      .then((json) => { return JSON.parse(json); });

   const results = voteCounter(ballots);

   console.log('WINNER', results.winner);
}());
