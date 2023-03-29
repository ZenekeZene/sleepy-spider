const calculate = function(input) {
	let selectors,
		selector,
		i,
		len,
		results = []

	selectors = input.split(',')

	for (i = 0, len = selectors.length; i < len; i += 1) {
		selector = selectors[i]
		if (selector.length > 0) {
			results.push(calculateSingle(selector))
		}
	}

  const specificity = results.map(result => result.specificity).reduce((a, b) => a + b, '')
  const specificityParsed = specificity.toString().replace(/,/g, '')

	return {
    selector: input,
    specificity: specificityParsed,
  }
}

const calculateSingle = function(input) {
	let selector = input,
		findMatch,
		typeCount = {
			'a': 0,
			'b': 0,
			'c': 0
		},
		parts = [],
		// The following regular expressions assume that selectors matching the preceding regular expressions have been removed
		attributeRegex = /(\[[^\]]+\])/g,
		idRegex = /(#[^\#\s\+>~\.\[:\)]+)/g,
		classRegex = /(\.[^\s\+>~\.\[:\)]+)/g,
		pseudoElementRegex = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,
		// A regex for pseudo classes with brackets - :nth-child(), :nth-last-child(), :nth-of-type(), :nth-last-type(), :lang()
		// The negation psuedo class (:not) is filtered out because specificity is calculated on its argument
		// :global and :local are filtered out - they look like psuedo classes but are an identifier for CSS Modules
		pseudoClassWithBracketsRegex = /(:(?!not|global|local)[\w-]+\([^\)]*\))/gi,
		// A regex for other pseudo classes, which don't have brackets
		pseudoClassRegex = /(:(?!not|global|local)[^\s\+>~\.\[:]+)/g,
		elementRegex = /([^\s\+>~\.\[:]+)/g;

	// Find matches for a regular expression in a string and push their details to parts
	// Type is "a" for IDs, "b" for classes, attributes and pseudo-classes and "c" for elements and pseudo-elements
	findMatch = function(regex, type) {
		let matches, i, len, match, index, length
		if (regex.test(selector)) {
			matches = selector.match(regex)
			for (i = 0, len = matches.length; i < len; i += 1) {
				typeCount[type] += 1
				match = matches[i]
				index = selector.indexOf(match)
				length = match.length
				parts.push({
					selector: input.substr(index, length),
					type: type,
					index: index,
					length: length
				})
				// Replace this simple selector with whitespace so it won't be counted in further simple selectors
				selector = selector.replace(match, Array(length + 1).join(' '))
			}
		}
	};

	// Replace escaped characters with plain text, using the "A" character
	// https://www.w3.org/TR/CSS21/syndata.html#characters
	(function() {
		const replaceWithPlainText = function(regex) {
				let matches, i, len, match
				if (regex.test(selector)) {
					matches = selector.match(regex);
					for (i = 0, len = matches.length; i < len; i += 1) {
						match = matches[i]
						selector = selector.replace(match, Array(match.length + 1).join('A'))
					}
				}
			},
			// Matches a backslash followed by six hexadecimal digits followed by an optional single whitespace character
			escapeHexadecimalRegex = /\\[0-9A-Fa-f]{6}\s?/g,
			// Matches a backslash followed by fewer than six hexadecimal digits followed by a mandatory single whitespace character
			escapeHexadecimalRegex2 = /\\[0-9A-Fa-f]{1,5}\s/g,
			// Matches a backslash followed by any character
			escapeSpecialCharacter = /\\./g

		replaceWithPlainText(escapeHexadecimalRegex)
		replaceWithPlainText(escapeHexadecimalRegex2)
		replaceWithPlainText(escapeSpecialCharacter)
	}());

	// Remove anything after a left brace in case a user has pasted in a rule, not just a selector
	(function() {
		let regex = /{[^]*/gm,
			matches, i, len, match
		if (regex.test(selector)) {
			matches = selector.match(regex)
			for (i = 0, len = matches.length; i < len; i += 1) {
				match = matches[i]
				selector = selector.replace(match, Array(match.length + 1).join(' '))
			}
		}
	}())

	// Add attribute selectors to parts collection (type b)
	findMatch(attributeRegex, 'b')

	// Add ID selectors to parts collection (type a)
	findMatch(idRegex, 'a')

	// Add class selectors to parts collection (type b)
	findMatch(classRegex, 'b')

	// Add pseudo-element selectors to parts collection (type c)
	findMatch(pseudoElementRegex, 'c')

	// Add pseudo-class selectors to parts collection (type b)
	findMatch(pseudoClassWithBracketsRegex, 'b')
	findMatch(pseudoClassRegex, 'b')

	// Remove universal selector and separator characters
	selector = selector.replace(/[\*\s\+>~]/g, ' ')

	// Remove any stray dots or hashes which aren't attached to words
	// These may be present if the user is live-editing this selector
	selector = selector.replace(/[#\.]/g, ' ')

	selector = selector.replace(/:not/g, '    ')
	selector = selector.replace(/:local/g, '      ')
	selector = selector.replace(/:global/g, '       ')
	selector = selector.replace(/[\(\)]/g, ' ')

	findMatch(elementRegex, 'c')

	parts.sort(function(a, b) {
		return a.index - b.index
	})

	return {
		selector: input,
		specificity: '0,' + typeCount.a.toString() + ',' + typeCount.b.toString() + ',' + typeCount.c.toString(),
		specificityArray: [0, typeCount.a, typeCount.b, typeCount.c],
		parts: parts
	}
}

export default calculate
