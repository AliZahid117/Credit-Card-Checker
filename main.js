// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

const validateCred = cardNumber => {
    // Create a copy of the card number array
    const copiedCardNumber = [...cardNumber];

    // Reverse the copied array
    copiedCardNumber.reverse();

    // Iterate over the digits of the reversed array, starting from the second digit
    for (let i = 1; i < copiedCardNumber.length; i += 2) {
        // Double every second digit
        copiedCardNumber[i] *= 2;

        // If the doubled digit is greater than 9, subtract 9 from it
        if (copiedCardNumber[i] > 9) {
            copiedCardNumber[i] -= 9;
        }
    }

    // Calculate the sum of all digits in the modified array
    const sum = copiedCardNumber.reduce((acc, curr) => acc + curr, 0);

    // Check if the sum is divisible by 10
    return sum % 10 === 0;
}

// Test the function with sample data
console.log(validateCred(valid1)); // Output: true
console.log(validateCred(invalid1)); // Output: false
console.log(validateCred(mystery1)); // Output: true


function findInvalidCards(cards) {
    // Initialize an empty array to store invalid cards
    const invalidCards = [];

    // Iterate over each card number in the nested array
    for (let i = 0; i < cards.length; i++) {
        // Check if the card number is invalid using the validateCreditCard function
        if (!validateCred(cards[i])) {
            // If the card is invalid, push it to the invalidCards array
            invalidCards.push(cards[i]);
        }
    }

    // Return the array of invalid cards
    return invalidCards;
}

// Test the function with the batch of card numbers
//console.log(findInvalidCards(batch));

//Code using switch statements
/*const idInvalidCardCompanies = invalidCards => { 
    let companies = [];

    // Iterate over each card number in the invalidCards array
    for (let i = 0; i < invalidCards.length; i++) {
        // Get the first digit of the card number
        let firstDigit = invalidCards[i][0];

        // Check which company the card belongs to based on the first digit
        switch (firstDigit) {
            case 3:
                // Check if Amex (American Express) is already in the companies array
                if (!companies.includes("Amex")) {
                    // If not, add it to the array
                    companies.push("Amex");
                }
                break;
            case 4:
                if (!companies.includes("Visa")) {
                    companies.push("Visa");
                }
                break;
            case 5:
                if (!companies.includes("Mastercard")) {
                    companies.push("Mastercard");
                }
                break;
            case 6:
                if (!companies.includes("Discover")) {
                    companies.push("Discover");
                }
                break;
            default:
                // If the first digit does not match any known company, print a message
                console.log("Company not found for card number:", invalidCards[i].join(""));
        }
    }

    // Return the array of company names
    return companies;
}*/

function idInvalidCardCompanies(invalidCards) {
    // Array to store the company information
    const companies = [
        { firstDigit: 3, name: "Amex" },
        { firstDigit: 4, name: "Visa" },
        { firstDigit: 5, name: "Mastercard" },
        { firstDigit: 6, name: "Discover" }
    ];

    // Array to store the names of companies with invalid cards
    const invalidCompanies = [];

    // Iterate over each card number in the invalidCards array
    for (let i = 0; i < invalidCards.length; i++) {
        // Get the first digit of the card number
        let firstDigit = invalidCards[i][0];

        // Find the corresponding company for the first digit
        let company = companies.find(company => company.firstDigit === firstDigit);

        // If the company is found, add its name to the invalidCompanies array
        if (company) {
            invalidCompanies.push(company.name);
        } else {
            // If the first digit does not match any known company, print a message
            console.log("Company not found for card number:", invalidCards[i].join(""));
        }
    }

    // Return the array of company names
    return [...new Set(invalidCompanies)]; // This sets to remove duplicates and spread operator to convert back to array
}

// Test function with the batch of invalid card numbers
console.log(idInvalidCardCompanies([invalid1, invalid2, invalid3, invalid4, invalid5]));



