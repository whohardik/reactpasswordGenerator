import { useState, useCallback, useEffect, useRef } from "react"; // Importing necessary hooks from React
import reactLogo from "./assets/react.svg"; // Importing an image file
import viteLogo from "/vite.svg"; // Importing another image file
import "./App.css"; // Importing a CSS file

function App() {
  // State variables
  const [length, setLength] = useState(8); // State for password length, default value is 8
  const [numberAllowed, setNumberAllowed] = useState(false); // State for allowing numbers in password, default is false

  const [charAllowed, setCharAllowed] = useState(false); // State for allowing special characters in password, default is false
  const [password, setPassword] = useState(""); // State for storing generated password, initially empty

  // Ref for password input field
  const passwordRef = useRef(null); // Creating a reference for the password input field

  // Function to generate password
  const passwordGenerator = useCallback(() => {
    let pass = ""; // Initialize an empty string for the password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // String containing only alphabets
    if (numberAllowed) str += "0123456789"; // If numbers are allowed, add them to the string
    if (charAllowed) str += "!@#$%^&*(){}~`"; // If special characters are allowed, add them to the string
    for (let i = 1; i <= length; i++) {
      // Loop to generate password characters
      const char = Math.floor(Math.random() * str.length); // Generate a random index within the string length
      pass += str.charAt(char); // Add the character at that index to the password
    }
    setPassword(pass); // Set the generated password to the state
  }, [length, numberAllowed, charAllowed, setPassword]); // Dependency array for useCallback

  // Function to copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // Select the password text
    window.navigator.clipboard.writeText(password); // Copy the password to clipboard using browser API
  }, [password]); // Dependency array for useCallback

  // Effect to generate password when length or character options change
  useEffect(() => {
    passwordGenerator(); // Call the password generator function
  }, [length, numberAllowed, charAllowed, passwordGenerator]); // Dependency array for useEffect

  // JSX rendering
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password</h1>{" "}
      {/* Heading for the password section */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef} // Ref for password input field
        />
        <button
          onClick={copyPasswordToClipboard} // Click handler to copy password to clipboard
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value); // Update password length when slider value changes
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev); // Toggle allowing numbers in password
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev); // Toggle allowing special characters in password
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App; // Exporting the component
