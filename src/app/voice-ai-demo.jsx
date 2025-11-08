import React, { useState, useRef, useEffect } from 'react';
import { Mic, Upload, Radio, Play, PlayCircle, FileAudio, Send, MessageSquare, Volume2 } from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    id: 'input',
    title: 'Input: Microphone or File',
    description: 'Select your input source: capture audio with microphone or upload an audio file to feed into the demo pipeline',
    icon: Mic
  },
  {
    id: 'processing',
    title: 'Processing: LiveKit + Node',
    description: 'Connect to real-time LiveKit room. Toggle channels, connect/disconnect, and monitor the streaming state in real time',
    icon: Radio
  },
  {
    id: 'ai',
    title: 'AI Operations: Transcription & Commands',
    description: 'Node-based AI processes audio for transcription and basic intent/command detection, updating results as the stream progresses',
    icon: MessageSquare
  }
];

const ACTION_BUTTONS = [
  { id: 'toggle', label: 'Toggle input', icon: Mic, action: 'toggleInput' },
  { id: 'audio', label: 'Audio file', icon: FileAudio, action: 'selectAudioFile' },
  { id: 'detect', label: 'Intent Detect', icon: MessageSquare, action: 'detectIntent' },
  { id: 'play', label: 'Play output', icon: Play, action: 'playOutput' },
  { id: 'enable', label: 'Enable mic', icon: Mic, action: 'enableMic' },
  { id: 'select', label: 'Select file', icon: Upload, action: 'selectFile' },
  { id: 'stream', label: 'Start stream', icon: Send, action: 'startStream' },
  { id: 'status', label: 'Live status', icon: Radio, action: 'liveStatus' },
  { id: 'logic', label: 'Node logic', icon: MessageSquare, action: 'nodeLogic' },
  { id: 'transcription', label: 'Transcription', icon: MessageSquare, action: 'transcription' },
  { id: 'command', label: 'Command', icon: MessageSquare, action: 'command' },
  { id: 'audioout', label: 'Audio out', icon: Volume2, action: 'audioOut' }
];

const DEMO_QUESTIONS = [
  "What problems does this solve?",
  "Can I scale between providers real-life?",
  "How do I view our live results?"
];

const IconButton = ({ icon: Icon, label, onClick, active = false, size = "default" }) => {
  const sizeClasses = {
    small: "p-3",
    default: "p-4",
    large: "p-6"
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-lg ${
        active 
          ? 'bg-black text-white border-black' 
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
      } ${sizeClasses[size]}`}
    >
      <Icon size={size === "small" ? 20 : size === "large" ? 32 : 24} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const WorkflowStep = ({ step, index }) => {
  const Icon = step.icon;
  
  return (
    <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors">
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <Icon size={28} className="text-gray-700" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-gray-600 leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
};

const DemoQuestion = ({ question, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all text-sm text-gray-700"
  >
    {question}
  </button>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const VoiceAIDemo = () => {
  const [activeActions, setActiveActions] = useState(new Set());
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [streamStatus, setStreamStatus] = useState('disconnected'); // connected, streaming, disconnected
  const [transcription, setTranscription] = useState('');
  const [detectedCommand, setDetectedCommand] = useState('');
  const fileInputRef = useRef(null);

  // ============================================================================
  // ACTION HANDLERS
  // ============================================================================

  const handleAction = (actionId, actionType) => {
    console.log(`Action triggered: ${actionId} - ${actionType}`);
    
    const newActiveActions = new Set(activeActions);
    
    switch (actionType) {
      case 'toggleInput':
        if (newActiveActions.has(actionId)) {
          newActiveActions.delete(actionId);
        } else {
          newActiveActions.add(actionId);
        }
        break;
        
      case 'enableMic':
        setIsRecording(!isRecording);
        if (!isRecording) {
          newActiveActions.add(actionId);
          simulateMicInput();
        } else {
          newActiveActions.delete(actionId);
        }
        break;
        
      case 'selectAudioFile':
      case 'selectFile':
        fileInputRef.current?.click();
        break;
        
      case 'startStream':
        if (streamStatus === 'disconnected') {
          setStreamStatus('connected');
          newActiveActions.add(actionId);
          simulateStreaming();
        } else {
          setStreamStatus('disconnected');
          newActiveActions.delete(actionId);
        }
        break;
        
      case 'transcription':
        newActiveActions.add(actionId);
        simulateTranscription();
        break;
        
      case 'detectIntent':
      case 'command':
        newActiveActions.add(actionId);
        simulateCommandDetection();
        break;
        
      case 'playOutput':
      case 'audioOut':
        newActiveActions.add(actionId);
        setTimeout(() => {
          const newSet = new Set(activeActions);
          newSet.delete(actionId);
          setActiveActions(newSet);
        }, 2000);
        break;
        
      default:
        if (newActiveActions.has(actionId)) {
          newActiveActions.delete(actionId);
        } else {
          newActiveActions.add(actionId);
        }
    }
    
    setActiveActions(newActiveActions);
  };

  const simulateMicInput = () => {
    setTimeout(() => {
      console.log('Microphone input simulated');
    }, 1000);
  };

  const simulateStreaming = () => {
    setTimeout(() => {
      setStreamStatus('streaming');
    }, 1000);
  };

  const simulateTranscription = () => {
    const sampleText = "Hello, this is a sample transcription of the audio input...";
    let currentText = '';
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < sampleText.length) {
        currentText += sampleText[index];
        setTranscription(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  const simulateCommandDetection = () => {
    setTimeout(() => {
      setDetectedCommand('Intent: GREETING | Confidence: 0.92');
    }, 1500);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const handleQuestionClick = (question) => {
    console.log('Question clicked:', question);
    alert(`You asked: "${question}"\n\nThis would typically trigger a response or demonstration.`);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio size={24} />
            <span className="font-bold text-lg">REAL</span>
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Try Demo
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Voice AI Demo.
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Build & test real-time workflows.
        </p>

        {/* Main Demo Area */}
        <div className="bg-gray-50 rounded-3xl p-12 mb-16 min-h-[300px] flex items-center justify-center">
          <div className="text-center space-y-6">
            {streamStatus === 'streaming' && (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Streaming
              </div>
            )}
            
            {isRecording && (
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Recording
              </div>
            )}
            
            {selectedFile && (
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <FileAudio size={16} />
                {selectedFile.name}
              </div>
            )}
            
            {transcription && (
              <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Transcription:</h3>
                <p className="text-gray-600 text-left">{transcription}</p>
              </div>
            )}
            
            {detectedCommand && (
              <div className="bg-white rounded-lg p-4 max-w-md mx-auto shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Detected Command:</h3>
                <p className="text-gray-600 text-sm">{detectedCommand}</p>
              </div>
            )}
            
            {!streamStatus && !isRecording && !selectedFile && !transcription && (
              <p className="text-gray-400 text-lg">Click actions below to start interacting...</p>
            )}
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-6">
          {WORKFLOW_STEPS.map((step, index) => (
            <WorkflowStep key={step.id} step={step} index={index} />
          ))}
        </div>
      </section>

      {/* Action Buttons Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {ACTION_BUTTONS.map((button) => (
            <IconButton
              key={button.id}
              icon={button.icon}
              label={button.label}
              onClick={() => handleAction(button.id, button.action)}
              active={activeActions.has(button.id)}
            />
          ))}
        </div>
      </section>

      {/* Demo Questions */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-3">
          {DEMO_QUESTIONS.map((question, index) => (
            <DemoQuestion
              key={index}
              question={question}
              onClick={() => handleQuestionClick(question)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Radio size={20} />
              <span className="font-bold">REAL</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Demo</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Try demo</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Docs</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Status</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Guides</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Github</a>
            </div>
            <button className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors">
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
      </footer>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default VoiceAIDemo;