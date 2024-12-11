import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

// List of possible image subfolders for each scene
const imageFolders = {
  start: 'StartScreen',
  under_45_start: 'Under45Start',
  under_45_ai_dominance: 'Under45AIDominance',
  under_45_advocacy: 'Under45Advocacy',
  under_45_transparency: 'Under45Transparency',
  under_45_authorship: 'Under45Authorship',
  under_45_authenticity: 'Under45Authenticity',
  under_45_tradition: 'Under45Tradition',
  under_45_horizons: 'Under45Horizons',
  over_45_start: 'Over45Start',
  over_45_hybrid: 'Over45Hybrid',
  over_45_protest: 'Over45Protest',
  over_45_digital: 'Over45Digital',
  over_45_dialogue: 'Over45Dialogue',
  over_45_balance: 'Over45Balance',
  over_45_renaissance: 'Over45Renaissance',
  over_45_forum: 'Over45Forum',
  over_45_global: 'Over45Global',
  over_45_unity: 'Over45Unity',
  final_exhibition: 'FinalExhibit',
  ending_intent: 'EndingIntent',
  ending_emotion: 'EndingEmotion',
  ending_evolution: 'EndingEvolution'
};

// Function to preload images to avoid delays on load
const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

// Function to randomly pick an image from the folder
const getRandomImage = (folderName) => {
  const imageCount = 4; // Number of images in each subfolder (assuming 4 images per folder)
  const randomIndex = Math.floor(Math.random() * imageCount) + 1; // Random index between 1 and 4
  const imagePath = `images/${folderName}/${randomIndex}.jpeg`; // Image paths are named 1.jpeg, 2.jpeg, 3.jpeg, etc.
  
  // Preload the image to improve loading speed
  preloadImage(imagePath);
  
  return imagePath;
};

const AdventureGame = () => {
  const [currentScene, setCurrentScene] = useState('start');
  const [showScene, setShowScene] = useState(false);

  // Comprehensive game script reflecting the detailed narrative
  const scenes = {
    start: {
      text: "Welcome to The AI Canvas: A Creative Odyssey! Navigate a world where AI reshapes creativity, and every choice you make impacts your artistic journey. Relationships, reputations, and ethical dilemmas evolve, culminating in a collaborative, visual finale reflecting your decisions.\n\nChoose Your Character:",
      choices: [
        { text: "Under 45: A young artist navigating an AI-driven world, balancing ambition and authenticity.", nextScene: 'under_45_start' },
        { text: "Over 45: An established creator grappling with AI's impact on tradition and artistic integrity.", nextScene: 'over_45_start' }
      ]
    },

    // Under 45 Path
    under_45_start: {
      text: "You're invited to compete in an art contest where most participants use AI. How will you approach this challenge?",
      choices: [
        { text: "Fully integrate AI to maximize your edge.", nextScene: 'under_45_ai_dominance' },
        { text: "Use AI sparingly for subtle enhancements.", nextScene: 'under_45_authorship' },
        { text: "Avoid AI entirely, creating a fully human-made piece.", nextScene: 'under_45_tradition' }
      ]
    },

    under_45_ai_dominance: {
      text: "Your piece wins but sparks a public backlash about AI dominance in the arts. A famous critic questions your work's authenticity, claiming AI overshadows your talent. How do you respond?",
      choices: [
        { text: "Defend AI as an innovative tool that enhances human creativity.", nextScene: 'under_45_advocacy' },
        { text: "Acknowledge AI's role and commit to clearer labeling of your process.", nextScene: 'under_45_transparency' }
      ]
    },

    under_45_advocacy: {
      text: "Your public defense garners tech-world support but alienates traditionalists. How will you navigate this divide?",
      choices: [
        { text: "Continue pushing technological boundaries.", nextScene: 'final_exhibition' },
        { text: "Seek a compromise between innovation and tradition.", nextScene: 'final_exhibition' }
      ]
    },

    under_45_transparency: {
      text: "Your transparency builds trust but limits your market appeal. What's your next move?",
      choices: [
        { text: "Double down on ethical AI use.", nextScene: 'final_exhibition' },
        { text: "Explore alternative creative approaches.", nextScene: 'final_exhibition' }
      ]
    },

    under_45_authorship: {
      text: "Your balanced piece earns moderate praise but doesn't stand out. Critics suggest your piece lacks cohesion. What's your next step?",
      choices: [
        { text: "Double down on refining human-AI collaboration.", nextScene: 'final_exhibition' },
        { text: "Pivot to fully human-made art to simplify your approach.", nextScene: 'under_45_authenticity' }
      ]
    },

    under_45_tradition: {
      text: "Your piece gains niche acclaim but fails to impress mainstream judges. A gallery invites you to showcase your work as part of a 'no-tech' exhibit. How do you proceed?",
      choices: [
        { text: "Accept, becoming a leader in the anti-AI art movement.", nextScene: 'under_45_horizons' },
        { text: "Decline, pursuing broader audiences outside the traditionalist circle.", nextScene: 'final_exhibition' }
      ]
    },

    // Over 45 Path
    over_45_start: {
      text: "Your town replaces a traditional muralist with an AI-generated public art project. What do you do?",
      choices: [
        { text: "Advocate for integrating AI and human art.", nextScene: 'over_45_hybrid' },
        { text: "Protest, calling for traditional art methods.", nextScene: 'over_45_protest' },
        { text: "Suggest a separate digital exhibit for AI-generated art.", nextScene: 'over_45_digital' }
      ]
    },

    over_45_hybrid: {
      text: "The hybrid mural becomes a community centerpiece but is criticized for lacking emotion. What's your next move?",
      choices: [
        { text: "Defend the project as a symbol of inclusivity.", nextScene: 'over_45_dialogue' },
        { text: "Propose a follow-up project highlighting traditional techniques.", nextScene: 'over_45_balance' }
      ]
    },

    over_45_protest: {
      text: "Traditional artists reclaim the project, but tech advocates criticize the decision. How do you respond?",
      choices: [
        { text: "Support the return to tradition, doubling down on local art practices.", nextScene: 'over_45_renaissance' },
        { text: "Host a community forum to mediate tensions.", nextScene: 'over_45_forum' }
      ]
    },

    over_45_digital: {
      text: "The digital mural garners attention online but faces criticism for lacking cultural relevance. What's your approach?",
      choices: [
        { text: "Defend the project, focusing on its innovation.", nextScene: 'over_45_global' },
        { text: "Advocate for blending digital and traditional art in future projects.", nextScene: 'over_45_unity' }
      ]
    },

    // Final Exhibition
    final_exhibition: {
      text: "Both paths converge at an international festival where AI-driven, hybrid, and traditional art are celebrated. What defines creativity in an AI-driven world?",
      choices: [
        { text: "Creativity is about the creator's intent and perspective.", nextScene: 'ending_intent' },
        { text: "Creativity lies in its emotional resonance, regardless of origin.", nextScene: 'ending_emotion' },
        { text: "Creativity is evolving beyond human boundaries.", nextScene: 'ending_evolution' }
      ]
    },

    // Endings
    ending_intent: {
      text: "Your exhibit emphasizes the importance of the artist's intent, sparking debates on authorship and meaning in the AI era. The world watches as you champion artistic vision.",
      choices: [{ text: "Restart Game", nextScene: 'start' }]
    },

    ending_emotion: {
      text: "Your raw, emotive pieces move audiences, reminding the world that creativity's heart lies in human emotion. Critics hail your work as a timeless testament to authenticity.",
      choices: [{ text: "Restart Game", nextScene: 'start' }]
    },

    ending_evolution: {
      text: "Your futuristic, adaptive installations challenge perceptions, pushing the boundaries of creativity. You leave a legacy of innovation and redefined art.",
      choices: [{ text: "Restart Game", nextScene: 'start' }]
    }
  };

  // Check if the scene exists, if not show an error message
  const getScene = (sceneName) => {
    return scenes[sceneName] || { 
      text: "Oops! Something went wrong. Please restart the game.",
      choices: [{ text: "Restart", nextScene: 'start' }]
    };
  };
  

  const Scene = ({ scene }) => {
    const [sceneImage, setSceneImage] = useState('images/Blank/blank.jpeg'); // Default blank image
    const [loading, setLoading] = useState(true);
  
    const handleImageLoad = () => {
      setLoading(false); // Mark as loaded when the image is ready
    };
  
    useEffect(() => {
      setShowScene(true); // Shortened delay for quicker scene transition
  
      // Get random image for the current scene
      const folderName = imageFolders[currentScene];
      const randomImage = getRandomImage(folderName);
      setSceneImage(randomImage);
    }, [currentScene]);
  
    return (
      <div className={`scene-container ${showScene ? 'show' : ''}`} style={{ transition: 'opacity 0.3s ease-in-out' }}>
        <img
          src={sceneImage}
          alt="Scene illustration"
          className="w-full h-auto object-cover rounded-md mb-4"
          style={{ maxHeight: '500px' }}
          onLoad={handleImageLoad} // Mark as loaded when the image is ready
        />
        {loading && <div>Loading...</div>} {/* Show loading indicator */}
        <p style={{ fontSize: '1rem' }}>{scene.text}</p> {/* Inline style to enforce text size */}
        {scene.tip && (
          <Alert className="bg-blue-50">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>{scene.tip}</AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col items-center space-y-2">
          {scene.choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => setCurrentScene(choice.nextScene)}
              className="w-full sm:w-64 lg:w-80 transition-all duration-200 ease-in-out hover:bg-blue-600 hover:text-white"
            >
              {choice.text}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="adventure-game">
      <Card className="sm:w-full max-w-xl mx-auto p-6">
        <CardContent>
          <Scene scene={getScene(currentScene)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdventureGame;