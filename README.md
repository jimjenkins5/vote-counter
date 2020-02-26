# Borda Vote Counter

## What?

This small script takes a json file of ballots and determines the winner using the Borda method.

## How do I use it?

```bash
npx borda-vote-counter /path/to/votes.json
```

### Format of votes.json.

The JSON file should be an array of ballot arrays. The first item in each ballot is the
preferred option, the last is the least preferred option.

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
