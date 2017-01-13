### Usage
- Make sure you have [node.js](https://nodejs.org/) installed version 5+
- Make sure you have NPM installed version 3+
- `WINDOWS ONLY` run `npm install -g webpack webpack-dev-server typescript` to install global dependencies
- run `npm install` to install dependencies
- run `npm start` to fire up dev server
- open browser to [`http://localhost:3000`](http://localhost:3000)
- if you want to use other port, open `package.json` file, then change port in `--port 3000` script


## When using reactive forms?

Using reactive forms means writing more component and less template code. Reactive forms are more appropriate than template-driven forms for complex scenarios. Usually, when templates gets too complicated and messy, putting reactive forms in place is an appropriate measure.

Reactive froms can be used for:

	* Dynamically add input elements
	* Watch what the user types
	* Wait validation until typing stops
	* Different validation for different situations
	* Immutable data structures

