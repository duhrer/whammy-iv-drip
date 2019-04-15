# Whammy IV Drip

The [DigiTech Whammy IV](https://digitech.com/en/products/whammy-4th-gen) pedal has various feature that can either be
configured using foot-based controls, or MIDI messages.  This package provides a simple WebMIDI harness to more
precisely configure settings than is typically possible with a human foot (at least with my human foot).

## Requirements

To use this, you'll need:

1. A DigiTech Whammy IV pedal configured to listen to MIDI channel 1 or all channels ("omni").
2. Something to connect your computer to the Whammy IV pedal's MIDI input (such as a Roland UM-ONE).
3. A node package manager such as npm or yarn.
4. A browser that supports WebMIDI (Chromium derivatives like Chrome and modern versions of Opera).

## Usage Instructions

1. Clone this package locally.
2. Install its depencies using a command like `npm install`.
3. Connect your Whammy IV's MIDI input to a USB->MIDI interface.
4. Open the file index.html in a compatible browser.
5. Select the MIDI output that feeds into your Whammy IV.
6. Do stuff with the onscreen controls.
