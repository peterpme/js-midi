# Chrome Midi Api Bridge

## Prequisites
- does use Classes, make sure you use babel or traceur

## NPM
`npm install js-midi`

## Usage

```javascript
import MidiInterface from 'js-midi'

let midi = new MidiInterface({
  onPressNote: (evt) => console.log(evt),
  onReleaseNote: (evt) => console.log(evt)
})
