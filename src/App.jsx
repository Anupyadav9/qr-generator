import { useState, useRef } from 'react'
import QRCode from 'react-qr-code'
import html2canvas from 'html2canvas'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [qrText, setQrText] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const qrRef = useRef(null)

  const generateQR = () => {
    setQrText(text)
  }

  const downloadQR = () => {
    if (qrRef.current) {
      html2canvas(qrRef.current).then((canvas) => {
        const link = document.createElement('a')
        link.download = 'qr-code.png'
        link.href = canvas.toDataURL()
        link.click()
      })
    }
  }

  const copyText = () => {
    navigator.clipboard.writeText(text)
    alert('Text copied to clipboard!')
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-blue-200 dark:bg-blue-700 hover:bg-blue-300 dark:hover:bg-blue-600 transition-colors"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      <h1 className="text-3xl font-bold mb-12">QR Code Generator</h1>
      <div className={`p-8 rounded-lg shadow-md w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to generate QR code"
          className={`w-full p-3 border rounded-md mb-6 focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-black focus:ring-blue-500'}`}
        />
        <div className="flex gap-4 mb-6">
          <button
            onClick={generateQR}
            className="flex-1 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Generate QR
          </button>
          <button
            onClick={copyText}
            className="flex-1 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Copy Text
          </button>
        </div>
        {qrText && (
          <div className="flex flex-col items-center">
            <div ref={qrRef} className="mb-6">
              <QRCode value={qrText} size={256} />
            </div>
            <button
              onClick={downloadQR}
              className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Download QR
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
