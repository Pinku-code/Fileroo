import { Link } from "react-router-dom";
import { CheckCircle, Shield, Zap } from "lucide-react";

export default function Home() {
    return (
        <div className="pt-20">
            {/* HERO SECTION */}
            <section className="px-6 py-20 bg-lime-200 rounded-xl">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-black text-gray-900 leading-tight">
                        The Fastest & Easiest PDF Tools Online
                    </h1>

                    <p className="text-lg text-gray-700 mt-5 max-w-2xl mx-auto">
                        Convert, merge, compress, and edit PDFs instantly — with full
                        privacy and no file uploads to servers. Everything runs locally in
                        your browser.
                    </p>

                    <div className="mt-10">
                        <Link
                            to="/tools"
                            className="px-8 py-4 bg-white text-black rounded-2xl text-lg font-semibold hover:bg-gray-100 transition"
                        >
                            Explore All Tools →
                        </Link>
                    </div>

                    {/* Floating UI Card */}
                    {/* <div className="mt-16 bg-white shadow-xl rounded-3xl p-8 max-w-xl mx-auto">
                        <h2 className="text-xl font-semibold mb-3">
                            Fast PDF Editing in Just 3 Steps
                        </h2>
                        <ol className="space-y-3 text-center text-gray-700 list-none pr-10">
                            <li>Choose a tool</li>
                            <li>Upload your file</li>
                            <li>Download instantly</li>
                            <li>Secure checkout</li>
                        </ol>
                    </div> */}
                    {/* Floating Feature Card */}
                    <div className="mt-20 max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Work Smarter With Fileroo
                        </h2>

                        <div className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-3 
    gap-8
  ">

                            {/* Step 1 */}
                            <div className="
      bg-white/80 backdrop-blur-xl 
      rounded-3xl 
      p-8 pt-12 
      border border-gray-100 
      shadow-xl 
      hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] 
      transition-all duration-300 
      relative text-center
    ">
                                <div className="
        absolute -top-6 left-1/2 -translate-x-1/2 
        w-14 h-14 rounded-full 
        bg-lime-100 text-lime-700 
        flex items-center justify-center 
        shadow-md border border-lime-200
      ">
                                    <span className="text-2xl font-black">1</span>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Choose Your Tool
                                </h3>
                                <p className="text-gray-600 font-medium">
                                    Pick from merge, split, convert, rotate, compress, or edit.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="
      bg-white/80 backdrop-blur-xl 
      rounded-3xl 
      p-8 pt-12 
      border border-gray-100 
      shadow-xl 
      hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] 
      transition-all duration-300 
      relative text-center
    ">
                                <div className="
        absolute -top-6 left-1/2 -translate-x-1/2 
        w-14 h-14 rounded-full 
        bg-lime-100 text-lime-700 
        flex items-center justify-center 
        shadow-md border border-lime-200
      ">
                                    <span className="text-2xl font-black">2</span>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Upload Your File
                                </h3>
                                <p className="text-gray-600 font-medium">
                                    Your files never leave your device — 100% secure and private.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="
      bg-white/80 backdrop-blur-xl 
      rounded-3xl 
      p-8 pt-12 
      border border-gray-100 
      shadow-xl 
      hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] 
      transition-all duration-300 
      relative text-center
    ">
                                <div className="
        absolute -top-6 left-1/2 -translate-x-1/2 
        w-14 h-14 rounded-full 
        bg-lime-100 text-lime-700 
        flex items-center justify-center 
        shadow-md border border-lime-200
      ">
                                    <span className="text-2xl font-black">3</span>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Download Instantly
                                </h3>
                                <p className="text-gray-600 font-medium">
                                    Process is instant — download high-quality results in seconds.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="px-6 py-20 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-10">Why Fileroo?</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="p-7 border rounded-2xl shadow-sm hover:shadow-lg transition">
                            <Zap size={40} className="text-lime-500 mx-auto" />
                            <h3 className="font-bold text-xl mt-4">Instant Processing</h3>
                            <p className="text-gray-600 mt-2">
                                Everything runs locally in your browser — no uploading needed.
                            </p>
                        </div>

                        <div className="p-7 border rounded-2xl shadow-sm hover:shadow-lg transition">
                            <Shield size={40} className="text-lime-500 mx-auto" />
                            <h3 className="font-bold text-xl mt-4">Private & Secure</h3>
                            <p className="text-gray-600 mt-2">
                                Your files never leave your device. 100% safe and private.
                            </p>
                        </div>

                        <div className="p-7 border rounded-2xl shadow-sm hover:shadow-lg transition">
                            <CheckCircle size={40} className="text-lime-500 mx-auto" />
                            <h3 className="font-bold text-xl mt-4">Works Everywhere</h3>
                            <p className="text-gray-600 mt-2">
                                Mobile, tablet, or desktop — Fileroo works on any device.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="px-6 py-20 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
                <Link
                    to="/tools"
                    className="px-10 py-4 bg-lime-500 text-black rounded-2xl font-semibold text-lg hover:bg-lime-600 transition"
                >
                    Browse All PDF Tools →
                </Link>
            </section>
        </div>
    );
}
