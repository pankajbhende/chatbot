import { useState, useCallback, useEffect } from 'react';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}


type CustomSpeechRecognition =
  typeof window.webkitSpeechRecognition extends { new (): any }
    ? InstanceType<typeof window.webkitSpeechRecognition>
    : any;

interface CustomSpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const useSpeech = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [isSupported, setIsSupported] = useState(!!SpeechRecognition);

  const recognition: CustomSpeechRecognition | null = isSupported
    ? new SpeechRecognition()
    : null;

  const speak = useCallback((text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }, []);

  const startListening = () => {
    if (!recognition) return;

    setTranscript('');
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (e: Event) => console.error('Speech error', e);

    recognition.onresult = (event: CustomSpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.start();
  };

  return {
    transcript,
    listening,
    isSupported,
    startListening,
    speak,
  };
};

export default useSpeech;
