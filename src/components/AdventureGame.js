import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

// List of possible image subfolders for each scene
const imageFolders = {
  start: 'StartScreen',
  under_45_start: 'Under45Start',
  under_45_embrace: 'Under45Embrace',
  under_45_sparingly: 'Under45Sparingly',
  under_45_reject: 'Under45Reject',
  over_45_start: 'Over45Start',
  over_45_celebrate: 'Over45Celebrate',
  over_45_criticize: 'Over45Criticize',
  over_45_explore: 'Over45Explore',
  final_exhibit: 'FinalExhibit',
  ending_blend: 'EndingBlend',
  ending_preserve: 'EndingPreserve',
  ending_redefine: 'EndingRedefine'
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

  // Define the scenes and their choices
  const scenes = {
    start: {
      text: "Welcome to the AI-Creative Odyssey! AI is transforming the world of art and creativity. Let's explore this shifting landscape. What's your age range?",
      choices: [
        { text: "Under 45", nextScene: 'under_45_start' },
        { text: "Over 45", nextScene: 'over_45_start' }
      ]
    },
    under_45_start: {
      text: "You are under 45, a generation raised with AI technology. How do you feel about AI and creativity?",
      choices: [
        { text: "Embrace AI as a tool", nextScene: 'under_45_embrace' },
        { text: "Use AI sparingly", nextScene: 'under_45_sparingly' },
        { text: "Reject AI entirely", nextScene: 'under_45_reject' }
      ]
    },
    under_45_embrace: {
      text: "You fully embrace AI as a tool to enhance your creativity. You see it as a way to push the boundaries of what art can be.",
      choices: [
        { text: "Explore new AI-driven techniques", nextScene: 'final_exhibit' },
        { text: "Collaborate with AI on an art project", nextScene: 'final_exhibit' }
      ]
    },
    under_45_sparingly: {
      text: "You are cautious with AI, using it only when necessary. You believe in maintaining the human touch in your art.",
      choices: [
        { text: "Use AI for minor enhancements", nextScene: 'final_exhibit' },
        { text: "Focus on traditional art forms", nextScene: 'final_exhibit' }
      ]
    },
    under_45_reject: {
      text: "You completely reject the use of AI in creativity, believing it undermines the authenticity of art.",
      choices: [
        { text: "Continue creating art the traditional way", nextScene: 'final_exhibit' },
        { text: "Advocate against AI art", nextScene: 'final_exhibit' }
      ]
    },
    over_45_start: {
      text: "You are over 45, with a more traditional view of art. What are your thoughts on AI in the creative process?",
      choices: [
        { text: "Celebrate AI as a creative tool", nextScene: 'over_45_celebrate' },
        { text: "Criticize AI's impact on art", nextScene: 'over_45_criticize' },
        { text: "Explore AI cautiously", nextScene: 'over_45_explore' }
      ]
    },
    over_45_celebrate: {
      text: "You embrace AI as a tool for creativity, excited about how it can expand artistic possibilities.",
      choices: [
        { text: "Create with AI-driven techniques", nextScene: 'final_exhibit' },
        { text: "Teach others about AI art", nextScene: 'final_exhibit' }
      ]
    },
    over_45_criticize: {
      text: "You feel that AI is taking away the soul of art, and you voice concerns about its role in creative fields.",
      choices: [
        { text: "Create art that challenges AI", nextScene: 'final_exhibit' },
        { text: "Speak out against AI in art", nextScene: 'final_exhibit' }
      ]
    },
    over_45_explore: {
      text: "You cautiously explore AI, wanting to understand its potential and limitations in the creative world.",
      choices: [
        { text: "Experiment with AI-assisted art", nextScene: 'final_exhibit' },
        { text: "Stay grounded in traditional methods", nextScene: 'final_exhibit' }
      ]
    },
    final_exhibit: {
      text: "Welcome to the final exhibit. This is the culmination of your journey into AI and creativity. You've chosen your path—now, it's time to reflect.",
      choices: [
        { text: "Blend traditional and AI art", nextScene: 'ending_blend' },
        { text: "Preserve traditional techniques", nextScene: 'ending_preserve' },
        { text: "Redefine creativity with AI", nextScene: 'ending_redefine' }
      ]
    },
    ending_blend: {
      text: "You have successfully blended traditional art with AI, creating unique and groundbreaking works.",
      choices: [
        { text: "Restart", nextScene: 'start' }
      ]
    },
    ending_preserve: {
      text: "You have chosen to preserve traditional art forms, creating masterpieces that showcase the power of human creativity.",
      choices: [
        { text: "Restart", nextScene: 'start' }
      ]
    },
    ending_redefine: {
      text: "You have redefined the boundaries of creativity, using AI to push the limits of what art can be.",
      choices: [
        { text: "Restart", nextScene: 'start' }
      ]
    }
  };

  // Merge the default scenes with the original scenes
  const allScenes = { ...scenes };

  // Check if the scene exists, if not show an error message
  const getScene = (sceneName) => {
    return allScenes[sceneName] || { 
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
        <p style={{ fontSize: '2rem' }}>{scene.text}</p> {/* Inline style to enforce text size */}
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
