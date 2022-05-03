const keysNames = [
	[
		{
			'Backquote' : {
				'en': {
					'caseDown': '`',
					'caseUp':  '`'
				},
				'ru': {
					'caseDown': 'ё',
					'caseUp': 'Ё'
				}
			}
		},
		{
			'Digit1' : {
				'en': {
					'caseDown': '1',
					'caseUp':  '!'
				},
				'ru': {
					'caseDown': '1',
					'caseUp': '!'
				}
			}
		},
		{
			'Digit2' : {
				'en': {
					'caseDown': '2',
					'caseUp':  '@'
				},
				'ru': {
					'caseDown': '2',
					'caseUp': '"'
				}
			}
		},
		{
			'Digit3' : {
				'en': {
					'caseDown': '3',
					'caseUp':  '#'
				},
				'ru': {
					'caseDown': '3',
					'caseUp': '№'
				}
			}
		},
		{
			'Digit4' : {
				'en': {
					'caseDown': '4',
					'caseUp':  '$'
				},
				'ru': {
					'caseDown': '4',
					'caseUp': ';'
				}
			}
		},
		{
			'Digit5' : {
				'en': {
					'caseDown': '5',
					'caseUp':  '%'
				},
				'ru': {
					'caseDown': '5',
					'caseUp': '%'
				}
			}
		},
		{
			'Digit6' : {
				'en': {
					'caseDown': '6',
					'caseUp':  '^'
				},
				'ru': {
					'caseDown': '6',
					'caseUp': ':'
				}
			}
		},
		{
			'Digit7' : {
				'en': {
					'caseDown': '7',
					'caseUp':  '&'
				},
				'ru': {
					'caseDown': '7',
					'caseUp': '?'
				}
			}
		},
		{
			'Digit8' : {
				'en': {
					'caseDown': '8',
					'caseUp':  '*'
				},
				'ru': {
					'caseDown': '8',
					'caseUp': '*'
				}
			}
		},
		{
			'Digit9' : {
				'en': {
					'caseDown': '9',
					'caseUp':  '('
				},
				'ru': {
					'caseDown': '9',
					'caseUp': '('
				}
			}
		},
		{
			'Digit0' : {
				'en': {
					'caseDown': '0',
					'caseUp':  ')'
				},
				'ru': {
					'caseDown': '0',
					'caseUp': ')'
				}
			}
		},
		{
			'Minus' : {
				'en': {
					'caseDown': '-',
					'caseUp':  '_'
				},
				'ru': {
					'caseDown': '-',
					'caseUp': '_'
				}
			}
		},
		{
			'Equal' : {
				'en': {
					'caseDown': '=',
					'caseUp':  '+'
				},
				'ru': {
					'caseDown': '=',
					'caseUp': '+'
				}
			}
		},
		{ 'Backspace' : '' }
	],
	[
		{ 'Tab' : '' },
		{
			'keyQ' : {
				'en': {
					'caseDown': 'q',
					'caseUp':  'Q'
				},
				'ru': {
					'caseDown': 'й',
					'caseUp': 'Й'
				}
			}
		},
		{
			'keyW' : {
				'en': {
					'caseDown': 'w',
					'caseUp':  'W'
				},
				'ru': {
					'caseDown': 'ц',
					'caseUp': 'ЙЦ'
				}
			}
		},
		{
			'keyE' : {
				'en': {
					'caseDown': 'e',
					'caseUp':  'E'
				},
				'ru': {
					'caseDown': 'у',
					'caseUp': 'У'
				}
			}
		},
		{
			'keyR' : {
				'en': {
					'caseDown': 'r',
					'caseUp':  'R'
				},
				'ru': {
					'caseDown': 'к',
					'caseUp': 'К'
				}
			}
		},
		{
			'keyT' : {
				'en': {
					'caseDown': 't',
					'caseUp':  'T'
				},
				'ru': {
					'caseDown': 'е',
					'caseUp': 'Е'
				}
			}
		},
		{
			'keyY' : {
				'en': {
					'caseDown': 'y',
					'caseUp':  'Y'
				},
				'ru': {
					'caseDown': 'н',
					'caseUp': 'Н'
				}
			}
		},
		{
			'keyU' : {
				'en': {
					'caseDown': 'u',
					'caseUp':  'U'
				},
				'ru': {
					'caseDown': 'г',
					'caseUp': 'Г'
				}
			}
		},
		{
			'keyI' : {
				'en': {
					'caseDown': 'i',
					'caseUp':  'I'
				},
				'ru': {
					'caseDown': 'ш',
					'caseUp': 'Ш'
				}
			}
		},
		{
			'keyO' : {
				'en': {
					'caseDown': 'o',
					'caseUp':  'O'
				},
				'ru': {
					'caseDown': 'щ',
					'caseUp': 'Щ'
				}
			}
		},
		{
			'keyP' : {
				'en': {
					'caseDown': 'p',
					'caseUp':  'P'
				},
				'ru': {
					'caseDown': 'з',
					'caseUp': 'З'
				}
			}
		},
		{
			'BracketLeft' : {
				'en': {
					'caseDown': '[',
					'caseUp':  '{'
				},
				'ru': {
					'caseDown': 'х',
					'caseUp': 'Х'
				}
			}
		},
		{
			'BracketRight' : {
				'en': {
					'caseDown': ']',
					'caseUp':  '}'
				},
				'ru': {
					'caseDown': 'ъ',
					'caseUp': 'Ъ'
				}
			}
		},
		{
			'Backslash' : {
				'en': {
					'caseDown': '\\',
					'caseUp':  '|'
				},
				'ru': {
					'caseDown': '\\',
					'caseUp': '/'
				}
			}
		},
		{ 'Del' : ''}
	],
	[ 
		{ 'CapsLock' : ''},
		{
			'keyA' : {
				'en': {
					'caseDown': 'a',
					'caseUp':  'A'
				},
				'ru': {
					'caseDown': 'ф',
					'caseUp': 'Ф'
				}
			}
		},
		{
			'keyS' : {
				'en': {
					'caseDown': 's',
					'caseUp':  'S'
				},
				'ru': {
					'caseDown': 'ы',
					'caseUp': 'Ы'
				}
			}
		},
		{
			'keyD' : {
				'en': {
					'caseDown': 'd',
					'caseUp':  'D'
				},
				'ru': {
					'caseDown': 'в',
					'caseUp': 'В'
				}
			}
		},
		{
			'keyF' : {
				'en': {
					'caseDown': 'f',
					'caseUp':  'F'
				},
				'ru': {
					'caseDown': 'а',
					'caseUp': 'А'
				}
			}
		},
		{
			'keyG' : {
				'en': {
					'caseDown': 'g',
					'caseUp':  'G'
				},
				'ru': {
					'caseDown': 'п',
					'caseUp': 'П'
				}
			}
		},
		{
			'keyH' : {
				'en': {
					'caseDown': 'h',
					'caseUp':  'H'
				},
				'ru': {
					'caseDown': 'р',
					'caseUp': 'Р'
				}
			}
		},
		{
			'keyJ' : {
				'en': {
					'caseDown': 'j',
					'caseUp':  'J'
				},
				'ru': {
					'caseDown': 'о',
					'caseUp': 'О'
				}
			}
		},{
			'keyK' : {
				'en': {
					'caseDown': 'k',
					'caseUp':  'K'
				},
				'ru': {
					'caseDown': 'л',
					'caseUp': 'Л'
				}
			}
		},
		{
			'keyL' : {
				'en': {
					'caseDown': 'l',
					'caseUp':  'L'
				},
				'ru': {
					'caseDown': 'д',
					'caseUp': 'Д'
				}
			}
		},
		{
			'Semicolon' : {
				'en': {
					'caseDown': ';',
					'caseUp':  ':'
				},
				'ru': {
					'caseDown': 'ж',
					'caseUp': 'Ж'
				}
			}
		},
		{
			'Quote' : {
				'en': {
					'caseDown': '\'',
					'caseUp':  '"'
				},
				'ru': {
					'caseDown': 'э',
					'caseUp': 'Э'
				}
			}
		},
		{ 'Enter' : '' }
	],
	[
		{ 'Shift' : '' },
		{
			'keyZ' : {
				'en': {
					'caseDown': 'z',
					'caseUp':  'Z'
				},
				'ru': {
					'caseDown': 'я',
					'caseUp': 'Я'
				}
			}
		},
		{
			'keyX' : {
				'en': {
					'caseDown': 'x',
					'caseUp':  'X'
				},
				'ru': {
					'caseDown': 'ч',
					'caseUp': 'Ч'
				}
			}
		},
		{
			'keyC' : {
				'en': {
					'caseDown': 'c',
					'caseUp':  'C'
				},
				'ru': {
					'caseDown': 'с',
					'caseUp': 'С'
				}
			}
		},
		{
			'keyV' : {
				'en': {
					'caseDown': 'v',
					'caseUp':  'V'
				},
				'ru': {
					'caseDown': 'м',
					'caseUp': 'М'
				}
			}
		},
		{
			'keyB' : {
				'en': {
					'caseDown': 'b',
					'caseUp':  'B'
				},
				'ru': {
					'caseDown': 'И',
					'caseUp': 'И'
				}
			}
		},
		,
		{
			'keyN' : {
				'en': {
					'caseDown': 'n',
					'caseUp':  'N'
				},
				'ru': {
					'caseDown': 'т',
					'caseUp': 'Т'
				}
			}
		},
		{
			'keyM' : {
				'en': {
					'caseDown': 'm',
					'caseUp':  'M'
				},
				'ru': {
					'caseDown': 'ь',
					'caseUp': 'Ь'
				}
			}
		},
		{
			'Comma' : {
				'en': {
					'caseDown': ',',
					'caseUp':  '<'
				},
				'ru': {
					'caseDown': 'б',
					'caseUp': 'Б'
				}
			}
		},
		{
			'Dot' : {
				'en': {
					'caseDown': '.',
					'caseUp':  '>'
				},
				'ru': {
					'caseDown': 'ю',
					'caseUp': 'Ю'
				}
			}
		},
		{
			'Slash' : {
				'en': {
					'caseDown': '/',
					'caseUp':  '?'
				},
				'ru': {
					'caseDown': '.',
					'caseUp': ','
				}
			}
		},
		{
			'ArrowUp' : {
				'en': {
					'caseDown': '▲',
					'caseUp':  '▲'
				},
				'ru': {
					'caseDown': '▲',
					'caseUp': '▲'
				}
			}
		},
		{ 'Shift' : '' }
	],
	[
		{ 'Ctrl' : '' },
		{ 'Win' : '' },
		{ 'Alt' : '' },
		{ 'Space' : '' },
		{ 'Alt' : '' },
		{
			'ArrowLeft' : {
				'en': {
					'caseDown': '◄',
					'caseUp':  '◄'
				},
				'ru': {
					'caseDown': '◄',
					'caseUp': '◄'
				}
			}
		},
		{
			'ArrowDown' : {
				'en': {
					'caseDown': '▼',
					'caseUp':  '▼'
				},
				'ru': {
					'caseDown': '▼',
					'caseUp': '▼'
				}
			}
		},
		{
			'ArrowRight' : {
				'en': {
					'caseDown': '►',
					'caseUp':  '►'
				},
				'ru': {
					'caseDown': '►',
					'caseUp': '►'
				}
			}
		},
		{ 'Ctrl' : '' },
	]
]

export default keysNames;