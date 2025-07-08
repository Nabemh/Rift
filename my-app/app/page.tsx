"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Terminal, Code } from "lucide-react"
import { useEffect, useState } from "react"
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { useRouter } from 'next/navigation';

export default function Component() {
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const router = useRouter();

  const handleClick = () => {
    router.push('/upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900">
      <BackgroundBeams className="opacity-10" />
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm relative z-5">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Alris
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105">
            Features
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105">
            How to Use
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105">
            Documentation
          </a>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
        {/* Grid background */}
        <BackgroundGrid
          size={30}
          lineWidth={0.5}
          opacity={0.15}
          color="#3b82f6"
          className="z-0"
          blur={2}
        />
          <p className="text-gray-600 text-sm font-medium tracking-wider uppercase mb-8 relative z-5">
            STOP WRESTLING WITH COMPLEX TOOLS
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight relative z-5">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent ">
              Your AI Assistant That Actually Gets Tasks Done
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed relative z-5">
            Alris turns your voice or text commands into automated actions. No more context switching, no more manual
            work - just tell Alris what you need done.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-5">
            <Button
              onClick={handleClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-100 hover:scale-105">
              Try Alris Now →
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 px-8 py-3 text-lg bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="absolute inset-0 z-[0] backdrop-blur-[1px]" />
        <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-6 relative z-5">
          <Card className="bg-white/80 border-gray-200 backdrop-blur-sm hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-100 group cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                Natural Language Control
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Interact with services using simple voice or text commands
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-gray-200 backdrop-blur-sm hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-100 group cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Terminal className="w-8 h-8 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                Automated Actions
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Automate tasks and workflows seamlessly
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-gray-200 backdrop-blur-sm hover:border-green-300 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-100 group cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-green-600 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                AI-Powered Execution
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Smart task interpretation and reliable execution
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Three Steps to Automation Section */}
        <div className="mt-32 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Three Steps to Automation
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of automation with Alris intuitive interface
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Steps Column */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 backdrop-blur-sm hover:border-blue-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-100 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-6 h-6 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-blue-600 text-sm font-medium mb-1 group-hover:text-purple-600 transition-colors duration-300">
                        Step 1
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                        Launch Alris
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        Start your journey with Alris in your browser. No downloads, no waiting - just instant AI
                        assistance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 border-gray-200 backdrop-blur-sm hover:border-purple-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-100 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-purple-600 group-hover:text-pink-600 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-purple-600 text-sm font-medium mb-1 group-hover:text-pink-600 transition-colors duration-300">
                        Step 2
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                        Give Commands
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        Speak naturally or type your requests. Alris understands context and executes with precision.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 border-gray-200 backdrop-blur-sm hover:border-green-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-100 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-green-600 group-hover:text-blue-600 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-green-600 text-sm font-medium mb-1 group-hover:text-blue-600 transition-colors duration-300">
                        Step 3
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                        Watch It Work
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        Sit back as Alris handles your tasks. Complex workflows simplified into single commands.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Terminal Mockup Column */}
            <div className="lg:pl-8">
              <div className="bg-gray-900 rounded-lg border border-gray-300 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105">
                {/* Terminal Header */}
                <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-400 text-sm ml-4">Alris Terminal</div>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm">
                  <div className="text-purple-400 mb-2"># Access Alris</div>
                  <div className="text-blue-400 mb-2">Visit: alris-ai.vercel.app</div>
                  <div className="text-green-400 flex items-center">
                    Status: Ready to assist
                    <span
                      className={`ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
                    >
                      |
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dive Deeper Section */}
        <div className="mt-32 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dive Deeper into Alris
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the technology and features that make Alris your perfect browsing companion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-32">
            <Card className="bg-white/80 border-gray-200 backdrop-blur-sm hover:border-blue-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-100 group cursor-pointer">
              <CardContent className="p-8">
                <div className="w-12 h-12 mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-6 h-6 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                  Natural Language Processing
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Understand how Alris processes your commands and translates them into actions using advanced AI
                  algorithms.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
                    Context-aware command processing
                  </li>
                  <li className="flex items-center text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
                    Multi-step action support
                  </li>
                  <li className="flex items-center text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
                    Learning from user interactions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-gray-200 backdrop-blur-sm hover:border-purple-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-100 group cursor-pointer">
              <CardContent className="p-8">
                <div className="w-12 h-12 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-purple-600 group-hover:text-pink-600 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                  Browser Integration
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Learn about Alriss seamless integration with your browser and how it enhances your browsing
                  experience.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-purple-600 group-hover:text-pink-600 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></span>
                    No extension required
                  </li>
                  <li className="flex items-center text-purple-600 group-hover:text-pink-600 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></span>
                    Cross-browser compatibility
                  </li>
                  <li className="flex items-center text-purple-600 group-hover:text-pink-600 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></span>
                    Progressive web app features
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-gray-200 backdrop-blur-sm hover:border-green-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-100 group cursor-pointer">
              <CardContent className="p-8">
                <div className="w-12 h-12 mb-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-green-600 group-hover:text-blue-600 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                  Privacy & Security
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Discover how Alris collects and protects your data to provide personalized features.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-green-600 group-hover:text-blue-600 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></span>
                    Secure data collection
                  </li>
                  <li className="flex items-center text-green-600 group-hover:text-blue-600 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></span>
                    Data encryption
                  </li>
                  <li className="flex items-center text-green-600 group-hover:text-blue-600 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></span>
                    Personalized experience
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-16 pb-8 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <h4 className="text-gray-900 font-semibold mb-6 tracking-wider">PRODUCT</h4>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105"
                    >
                      How to Use
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105"
                    >
                      Launch App
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold mb-6 tracking-wider">SUPPORT</h4>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-105"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-105"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-105"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold mb-6 tracking-wider">LEGAL</h4>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-green-600 transition-all duration-300 hover:scale-105"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-green-600 transition-all duration-300 hover:scale-105"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center text-gray-500 text-sm">© 2025 Alris. All rights reserved.</div>
          </div>
        </footer>
      </main>
    </div>
  )
}
