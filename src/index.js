#!/usr/bin/env node

'use strict';

module.exports = function(ballots) {

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

   return {
      winner: winner,
      processedBallets: processed,
      optionValues: counted,
   };
}
