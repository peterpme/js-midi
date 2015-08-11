# Chrome Midi Api Bridge

## Installation
`npm install -g babel` Install Babel


## Usage

```javascript
import MidiInterface from './lib/midi'

let midi = new MidiInterface({
  onPressNote: (evt) => console.log(evt),
  onReleaseNote: (evt) => console.log(evt)
})
