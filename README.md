# Borda Vote Counter

## What?

This small script takes a json file of ballots and determines the winner using the Borda method.

## How do I use it?i

```bash
npx borda-vote-counter /path/to/votes.json
```

Format of votes.json

```json
[
  [ "OB", "SL" ],
  [ "SL", "CL", "OB", "SB" ],
  [ "OB", "SL", "SB", "CL", "TR" ],
  [ "SL", "SB", "TR", "CL", "OB" ],
  [ "OB" ],
  [ "OB", "SB", "SL" ],
  [ "TR", "CL", "SL", "OB" ],
  [ "SB", "CL", "OB" ]
]
```
