// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  var chinaUnionPayPrefixes = [];
  for (var i = 622126; i <= 622925; i++) {
    chinaUnionPayPrefixes.push(String(i));
  }
  for (var i = 624; i <= 626; i++) {
    chinaUnionPayPrefixes.push(String(i));
  }
  for (var i = 6282; i <= 6288; i++) {
    chinaUnionPayPrefixes.push(String(i));
  }



  var cardList = [
    {
        cardName: 'Diner\'s Club',
        cardPrefixes: ['38', '39'],
        cardLengths: [14]
    },

    {
        cardName: 'American Express',
        cardPrefixes: ['34', '37'],
        cardLengths: [15]
    },

    {
        cardName: 'Visa',
        cardPrefixes: ['4'],
        cardLengths: [13, 16, 19]
    },

    {
        cardName: 'MasterCard',
        cardPrefixes: ['51', '52', '53', '54', '55'],
        cardLengths: [16]
    },

    {
        cardName: 'Discover',
        cardPrefixes: ['6011', '644', '645', '646', '647', '648', '649', '65'],
        cardLengths: [16, 19]
    },

    {
        cardName: 'Maestro',
        cardPrefixes: ['5018', '5020', '5038', '6304'],
        cardLengths: [12, 13, 14, 15, 16, 17, 18, 19]
    },

    {
        cardName: 'China UnionPay',
        cardPrefixes: chinaUnionPayPrefixes,
        cardLengths: [16, 17, 18, 19]
    },

    {
        cardName: 'Switch',
        cardPrefixes: ['4903', '4905', '4911', '4936', '564182', '633110', '6333', '6759'],
        cardLengths: [16, 18, 19]
    }
    ];


  var longestMatchingPrefixLength = 0;
  var bestMatchingCard;

  for (var i = 0; i < cardList.length; i++) {
    var isValidPrefix = cardList[i]['cardPrefixes'].some(function(prefix) {
        return prefix === cardNumber.slice(0, prefix.length);
    });
    var isValidLength = cardList[i]['cardLengths'].some(function(length) {
        return length === cardNumber.length;
    });



    if (isValidPrefix) {
        var currPrefix = cardList[i]['cardPrefixes'].filter(function(prefix) {
            return prefix === cardNumber.slice(0, prefix.length);
        });
        var currPrefixLength = currPrefix[0].length;
    }

    if (isValidLength && isValidPrefix && currPrefixLength > longestMatchingPrefixLength) {
        longestMatchingPrefixLength = currPrefixLength;
        bestMatchingCard = cardList[i]['cardName'];
    }
  }
  return bestMatchingCard
};
