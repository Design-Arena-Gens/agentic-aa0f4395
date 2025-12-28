"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const generateVideo = async () => {
    if (!prompt.trim()) {
      addLog("Error: Please enter a video description");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setVideoUrl("");
    setLogs([]);

    addLog("Agent initialized: Starting video generation process");

    // Simulate agent processing steps
    const steps = [
      { progress: 10, message: "Analyzing prompt and extracting key concepts..." },
      { progress: 25, message: "Planning video structure and scenes..." },
      { progress: 40, message: "Generating visual elements and assets..." },
      { progress: 55, message: "Creating scene transitions and effects..." },
      { progress: 70, message: "Rendering video frames..." },
      { progress: 85, message: "Adding audio and synchronization..." },
      { progress: 95, message: "Finalizing video output..." },
      { progress: 100, message: "Video generation complete!" },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProgress(step.progress);
      addLog(step.message);
    }

    // Generate a demo video URL (using a sample video)
    const demoVideoUrl = generateDemoVideo(prompt);
    setVideoUrl(demoVideoUrl);
    addLog(`Agent completed: Video ready for preview`);
    setIsGenerating(false);
  };

  const generateDemoVideo = (userPrompt: string): string => {
    // Create a canvas-based video representation
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Create gradient background based on prompt
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const colors = getColorsFromPrompt(userPrompt);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add text
      ctx.fillStyle = "white";
      ctx.font = "bold 60px Arial";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 10;
      ctx.fillText("AI Generated Video", canvas.width / 2, canvas.height / 2 - 50);

      ctx.font = "30px Arial";
      ctx.fillText(userPrompt.substring(0, 50), canvas.width / 2, canvas.height / 2 + 20);

      ctx.font = "20px Arial";
      ctx.fillText("(Demo Preview)", canvas.width / 2, canvas.height / 2 + 60);
    }

    return canvas.toDataURL("image/png");
  };

  const getColorsFromPrompt = (text: string): [string, string] => {
    const lower = text.toLowerCase();
    if (lower.includes("sunset") || lower.includes("orange")) return ["#ff6b35", "#f7931e"];
    if (lower.includes("ocean") || lower.includes("blue")) return ["#0077be", "#00a8e8"];
    if (lower.includes("forest") || lower.includes("green")) return ["#2d6a4f", "#52b788"];
    if (lower.includes("night") || lower.includes("dark")) return ["#1a1a2e", "#16213e"];
    if (lower.includes("fire") || lower.includes("red")) return ["#d00000", "#ff6d00"];
    return ["#6b4ce6", "#9b59b6"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            🎬 AI Video Generator Agent
          </h1>
          <p className="text-xl text-gray-300">
            Autonomous agent that creates videos from text descriptions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Video Prompt</h2>
            <textarea
              className="w-full h-40 p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Describe the video you want to create... (e.g., 'A sunset over the ocean with birds flying')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />

            <button
              onClick={generateVideo}
              disabled={isGenerating}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {isGenerating ? "🤖 Agent Working..." : "🚀 Generate Video"}
            </button>

            {isGenerating && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Agent Logs</h2>
            <div className="bg-black/40 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
              {logs.length === 0 ? (
                <p className="text-gray-500 italic">Waiting for agent activation...</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="text-green-400 mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Video Preview */}
        {videoUrl && (
          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Generated Video Preview</h2>
            <div className="bg-black rounded-lg overflow-hidden">
              <img
                src={videoUrl}
                alt="Generated video preview"
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 mt-4 text-center">
              ✨ This is a demo preview. In production, this would be an actual video file generated by AI services like Runway, Stable Video Diffusion, or similar APIs.
            </p>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-xl font-bold text-white mb-2">Autonomous Agent</h3>
            <p className="text-gray-400">AI agent plans and executes video generation autonomously</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Fast Processing</h3>
            <p className="text-gray-400">Optimized pipeline for quick video generation</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-bold text-white mb-2">Creative AI</h3>
            <p className="text-gray-400">Interprets prompts and creates unique visuals</p>
          </div>
        </div>
      </div>
    </div>
  );
}
