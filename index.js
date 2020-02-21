#!/usr/bin/env node

'use strict';

const fs = require('fs'),
      util = require('util'),
      readFile = util.promisify(fs.readFile),
      filePath = process.argv.length > 2 ? process.argv[2] : null;

if (!filePath) {
   console.error('You must pass a filePath as an argument!');
}

(async function() {
   const ballots = await readFile(filePath, 'utf8')
      .then((json) => { return JSON.parse(json); });

   const opts = ballots.reduce((memo, ballot) => {
      ballot.forEach((opt) => {
         if (!memo.includes(opt)) {
            memo.push(opt);
         }
      });
      return memo;
   }, []);

   // Get the value of each option in each ballot
   const processed = ballots.map((ballot) => {
      return ballot.reduce((memo, vote, index) => {
         // Vote should be N-{position}. So first place is N-1 and last is 0.
         memo[vote] = opts.length - index - 1;
         return memo;
      }, {});
   });

   // Add up the value of each option globally
   const counted = opts.reduce((memo, opt) => {
      const value = processed.map((o) => { return o[opt] })
         .reduce((count, val) => {
            if (!val) {
               return count;
            }
            return count + val;
         }, 0)

      memo.push({ option: opt, value: value });
      return memo;
   }, []);


   const winner = counted.reduce((win, current) => {
      if (current.value > win.value) {
         return current;
      }

      return win;
   }, { value: 0 });

   // Pull the option with the highest value
   console.log('WINNER: ', winner);
}());
