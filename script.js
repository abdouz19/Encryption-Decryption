// Chat Logic
function sendMessage(user) {
    // Get the input field and encryption method based on the user (A or B)
    const input = user === 'A' ? document.getElementById('input-a') : document.getElementById('input-b');
    const method = user === 'A' ? document.getElementById('encryption-method-a').value : document.getElementById('encryption-method-b').value;
    const message = input.value.trim();
    
    if (message) {
        // Encrypt the message using the selected method
        const encryptedMessage = encryptMessage(message, method);
        // Display the encrypted message
        displayMessage(user, encryptedMessage, method);
        input.value = ''; // Clear input after sending
    }
}

function encryptMessage(message, method) {
    // Encrypt the message based on the selected method
    switch (method) {
        case 'mirror':
            return mirrorEncrypt(message);
        case 'affine':
            return affineEncrypt(message);
        case 'shift':
            return shiftEncrypt(message);
        case 'caesar':
            return caesarEncrypt(message, 3); // Example with a shift of 3
        default:
            return message; // Return the original message if no method is selected
    }
}

function displayMessage(user, encrypted, method) {
    // Display the encrypted message in the appropriate messages container
    const messagesDiv = user === 'A' ? document.getElementById('messages-b') : document.getElementById('messages-a');
    const otherUser = user === 'A' ? 'B' : 'A';

    messagesDiv.innerHTML += `
        <div class="message">
            <strong>${otherUser}:</strong> Encrypted: ${encrypted} 
            <button onclick="decryptMessage('${encrypted}', '${method}', '${otherUser}')">Decrypt</button>
        </div>
    `;
}

// =============================
// PART 3: Encryption Functions
// =============================

function mirrorEncrypt(message) {
    // Reverse the message for mirror encryption
    return message.split('').reverse().join('');
}

function affineEncrypt(message) {
    const a = 5; // Must be coprime to 26
    const b = 8; // Shift value
    let encrypted = '';

    // Encrypt each character using the affine cipher formula
    for (let char of message) {
        if (char.match(/[a-zA-Z]/)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const encryptedChar = String.fromCharCode(((a * (char.charCodeAt(0) - base) + b) % 26) + base);
            encrypted += encryptedChar;
        } else {
            encrypted += char; // Non-alphabetic characters remain the same
        }
    }
    return encrypted;
}

function shiftEncrypt(message) {
    const shift = 2; // Shift by 2 positions
    let encrypted = '';

    // Encrypt each character by shifting its position
    for (let char of message) {
        if (char.match(/[a-zA-Z]/)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - base + shift + 26) % 26) + base);
            encrypted += encryptedChar;
        } else {
            encrypted += char; // Non-alphabetic characters remain the same
        }
    }
    return encrypted;
}

function caesarEncrypt(message, shift) {
    let encrypted = '';

    // Encrypt each character using the Caesar cipher formula
    for (let char of message) {
        if (char.match(/[a-zA-Z]/)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - base + shift + 26) % 26) + base);
            encrypted += encryptedChar;
        } else {
            encrypted += char; // Non-alphabetic characters remain the same
        }
    }
    return encrypted;
}

// =============================
// DECRYPTION FUNCTIONS
// =============================

function decryptMessage(encrypted, method, user) {
    // Decrypt the message using the appropriate method
    const decryptedMessage = decryptMessageLogic(encrypted, method);
    const messagesDiv = user === 'A' ? document.getElementById('messages-a') : document.getElementById('messages-b');
    messagesDiv.innerHTML += `<div class="message"><strong>${user}:</strong> Decrypted: ${decryptedMessage}</div>`;
}

function decryptMessageLogic(encrypted, method) {
    // Decrypt the message based on the selected method
    switch (method) {
        case 'mirror':
            return mirrorEncrypt(encrypted); // Same as encryption for mirror
        case 'affine':
            return affineDecrypt(encrypted);
        case 'shift':
            return shiftDecrypt(encrypted);
        case 'caesar':
            return caesarDecrypt(encrypted, 3); // Example with a shift of 3
        default:
            return encrypted; // Return the encrypted message if no method is selected
    }
}

function affineDecrypt(encrypted) {
    const a = 5; // Must be coprime to 26
    const b = 8; // Shift value
    const modInverseA = modInverse(a, 26); // Calculate the modular inverse of 'a'
    let decrypted = '';

    // Decrypt each character using the affine cipher formula
    for (let char of encrypted) {
        if (char.match(/[a-zA-Z]/)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            // Decrypt the character
            const decryptedChar = String.fromCharCode(
                ((modInverseA * (char.charCodeAt(0) - base - b + 26)) % 26 + 26) % 26 + base);
            decrypted += decryptedChar;
        } else {
            decrypted += char; // Non-alphabetic characters remain the same
        }
    }
    return decrypted;
}

// Modular Inverse Function for Affine Cipher
function modInverse(a, m) {
    a = a % m; // Ensure 'a' is within the modulo range
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x; // Return the modular inverse
    }
    return 1; // Inverse not found
}

function shiftDecrypt(encrypted) {
    const shift = 2; // Shift by 2 positions
    let decrypted = '';

    // Decrypt each character by shifting its position
    for (let char of encrypted) {
        if (char.match(/[a-zA-Z]/)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const decryptedChar = String.fromCharCode((char.charCodeAt(0) - base - shift + 26) % 26 + base);
            decrypted += decryptedChar;
        } else {
            decrypted += char; // Non-alphabetic characters remain the same
        }
    }
    return decrypted;
}

function caesarDecrypt(encrypted, shift) {
    let decrypted = '';

    // Decrypt each character using the Caesar cipher formula
    for (let char of encrypted) {
        if (char.match(/[a-zA-Z]/)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const decryptedChar = String.fromCharCode((char.charCodeAt(0) - base - shift + 26) % 26 + base);
            decrypted += decryptedChar;
        } else {
            decrypted += char; // Non-alphabetic characters remain the same
        }
    }
    return decrypted;
}

// =============================
// PART 4: Password Management Functions
// =============================

// Password Generation Functions
function generatePasswordType1() {
    // Generate a password with 3 characters, each 0, 1, or 2
    const characters = '012';
    let password = '';
    for (let i = 0; i < 3; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('generated-password').textContent = `Generated Password (3 chars, 0-2): ${password}`;
}

function generatePasswordType2() {
    // Generate a password with 6 characters, each from 0 to 9
    const characters = '0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('generated-password').textContent = `Generated Password (6 chars, 0-9): ${password}`;
}

function generatePasswordType3() {
    // Generate a password with 6 characters, including a-z, A-Z, 0-9, +, *
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+*';
    let password = '';
    for (let i = 0; i < 6; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('generated-password').textContent = `Generated Password (6 chars, a-z, A-Z, 0-9, +, *): ${password}`;
}

