
# linear-conversion

A basic linear conversion utlity. Scales a number from an old range to a new range.

## Installation

	$ component install bmcmahen/linear-conversion

## API

	// Import the module
	var linearConversion = require('bmcmahen-linear-conversion');

	// Create your scale, with a domain and range
	var scale = linearConversion([0, 10], [0, 100]);
	alert(scale(1)); // alerts 10

## License

	MIT
