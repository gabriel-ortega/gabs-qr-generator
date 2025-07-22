import { useState } from "react";
import QRCode from "qrcode";
import { QrCode, Download, Sparkles } from "lucide-react";

export default function App() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExampleClick = (example) => {
    setText(example);
  };

  const generateQR = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(text, {
        width: 256,
        margin: 2,
        color: {
          dark: "#1f2937",
          light: "#ffffff",
        },
      });
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Gabs QR Code Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Transform any text, URL, or data into a QR code
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
          <div className="text-center pb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create Your QR Code
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your content below and generate a custom QR code instantly
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="qr-input"
                className="text-sm font-medium text-gray-700"
              >
                Content to encode
              </label>
              <textarea
                id="qr-input"
                className="w-full min-h-[120px] resize-none p-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter text, URL, email, phone number, or any data you want to encode..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={generateQR}
                disabled={!text.trim() || isGenerating}
                className="flex-1 inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </>
                )}
              </button>

              <button
                onClick={downloadQR}
                disabled={!qrUrl}
                className="flex-1 sm:flex-none inline-flex justify-center items-center border bg-gradient-to-b from-green-500 to-green-600  disabled:border-gray-300 disabled:bg-white text-white font-medium p-3 rounded-md hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Download className="w-4 h-4 mr-2 " />
                Download
              </button>
            </div>

            {qrUrl && (
              <div className="mt-8 space-y-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Your QR Code
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Right-click to copy or save the image
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                      <img
                        src={qrUrl || "/placeholder.svg"}
                        alt="Generated QR Code"
                        className="w-64 h-64 object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    Scan this QR code with any QR code reader to access your
                    content
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="mb-2 text-sm text-gray-600">
            Try using:{" "}
            <button
              onClick={() => handleExampleClick("Hello, world!")}
              className="text-blue-500 underline hover:text-blue-700 mr-2"
            >
              hello world
            </button>
            <button
              onClick={() => handleExampleClick('{"data":"some data"}')}
              className="text-blue-500 underline hover:text-blue-700 mr-2"
            >
              JSON
            </button>
            <button
              onClick={() => handleExampleClick("https://openai.com")}
              className="text-blue-500 underline hover:text-blue-700"
            >
              URL
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Free • Secure • No data stored
          </p>
        </div>
      </div>
    </div>
  );
}
