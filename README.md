# Chrome Midi Api Bridge

## Prequisites

- JS Midi uses `classes` and `arrow functions`. Make sure you use something like babel or traceur.

## NPM
`npm install js-midi`

## Usage

```javascript
import MidiInterface from 'js-midi'

let midi = new MidiInterface({
  onPressNote: (evt) => console.log(evt),
  onReleaseNote: (evt) => console.log(evt)
})
