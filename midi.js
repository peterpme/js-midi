'use strict'

export default class MidiInterface {

  constructor({onPressNote, onReleaseNote}) {
    this.startMidiRequest()
    this.selectedInput = null
    this.activeNotes = []

    this.onPressNote = onPressNote
    this.onReleaseNote = onReleaseNote
  }

  startMidiRequest() {
    try {
      navigator.requestMIDIAccess()
      .then(this.onMidiSuccess.bind(this))
      .catch(this.onMidiFail.bind(this))
    } catch(err) {
      console.error('StartMidiRequest ERR:', err)
    }

  }

  frequencyFromNote( note ) {
    return 440 * Math.pow(2,(note-69)/12);
  }

  getActiveNotes() {
    return this.activeNotes.length
  }

  noteOn(noteNumber) {
    this.activeNotes.push(noteNumber);
    this.onPressNote(noteNumber, this.frequencyFromNote(noteNumber));

  }

  noteOff(noteNumber) {
    let position = this.activeNotes.indexOf(noteNumber);
    if (position != -1) {
      this.activeNotes.splice(position, 1);
    }
    this.onReleaseNote(noteNumber, this.frequencyFromNote(this.activeNotes[this.activeNotes.length-1]))

  }

  onMidiSuccess(midiAccess, midiOptions) {
    midiAccess.onstateChange = this.onMidiStateChange

    for (let input of midiAccess.inputs.values()) {
      if (midiAccess.inputs.size === 1) {
        this.selectedInput = input;
      }

      this.selectedInput.onmidimessage =  (evt) => this.onMidiInputMessage(evt)
      this.selectedInput.onstatechange = this.onMidiInputStateChange

    }

  }

  onMidiFail(err) {
    console.error('MIDI Failed to start', err)
  }

  onMidiStateChange(evt) {
    console.log('onMidiStateChange', evt, evt.port.name, evt.port.connection, evt.port.state)
  }

  onMidiInputMessage(evt) {
    switch (evt.data[0] & 0xf0) {
      case 0x90:
        if (evt.data[2]!=0) {
          return this.noteOn(evt.data[1])
        }
      case 0x80:
        return this.noteOff(evt.data[1]);
    }
  }

  onMidiInputStateChange(evt) {
    console.log('onMidiInputStateChange', evt)
  }

}
