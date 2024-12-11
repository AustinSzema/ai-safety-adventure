import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

// List of all possible image subfolders for each scene
const imageFolders = {
  start: 'StartScreen',
  under_45_start: 'Under45Start',
  over_45_start: 'Over45Start',
  scenario_2a: 'Scenario2A',
  scenario_2b: 'Scenario2B',
  scenario_2c: 'Scenario2C',
  scenario_3a: 'Scenario3A',
  scenario_3b: 'Scenario3B',
  scenario_3c: 'Scenario3C',
  scenario_3d: 'Scenario3D',
  scenario_3e: 'Scenario3E',
  scenario_3f: 'Scenario3F',
  over_45_2a: 'Over452A',
  over_45_2b: 'Over452B',
  over_45_2c: 'Over452C',
  over_45_3a: 'Over453A',
  over_45_3b: 'Over453B',
  over_45_3c: 'Over453C',
  over_45_3d: 'Over453D',
  over_45_3e: 'Over453E',
  over_45_3f: 'Over453F',
  final_4a: 'Final4A',
  final_4b: 'Final4B',
  final_4c: 'Final4C',
  final_4d: 'Final4D',
  final_4e: 'Final4E',
  final_4f: 'Final4F',
  final_4g: 'Final4G',
  final_4h: 'Final4H',
  final_4i: 'Final4I',
  final_4j: 'Final4J',
  final_4k: 'Final4K',
  final_4l: 'Final4L'
};

const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

const getRandomImage = (folderName) => {
  const imageCount = 4;
  const randomIndex = Math.floor(Math.random() * imageCount) + 1;
  const imagePath = `images/${folderName}/${randomIndex}.jpeg`;
  preloadImage(imagePath);
  return imagePath;
};

const AdventureGame = () => {
  const [currentScene, setCurrentScene] = useState('start');
  const [showScene, setShowScene] = useState(false);

  // Complete scenes object with all scenarios
  const scenes = {
    start: {
      text: "Welcome to The AI Canvas: A Creative Odyssey! Navigate a world where AI reshapes creativity, and every choice you make impacts your artistic journey. What's your age range?",
      choices: [
        { text: "Under 45", nextScene: 'under_45_start' },
        { text: "Over 45", nextScene: 'over_45_start' }
      ]
    },
    // Under 45 Path
    under_45_start: {
      text: "You're mid-scroll on your favorite art-sharing app when a pop-up grabs your attention: 'AI Art Revolution: Compete in the Ultimate Hybrid Creativity Contest!' The prize could fund your dream studio. How do you approach this opportunity?",
      choices: [
        { text: "Fully integrate AI to maximize your edge", nextScene: 'scenario_2a' },
        { text: "Use AI sparingly for subtle enhancements", nextScene: 'scenario_2b' },
        { text: "Avoid AI entirely, create a fully human-made piece", nextScene: 'scenario_2c' }
      ]
    },
    scenario_2a: {
      text: "Following your victory, a famous critic questions your work's authenticity, claiming AI overshadows your talent. How do you respond?",
      choices: [
        { text: "Defend AI as an innovative tool", nextScene: 'scenario_3a' },
        { text: "Acknowledge AI's role and commit to transparency", nextScene: 'scenario_3b' }
      ]
    },
    scenario_2b: {
      text: "Critics suggest your piece lacks cohesion because AI and human elements feel disconnected. What's your next move?",
      choices: [
        { text: "Double down on refining human-AI collaboration", nextScene: 'scenario_3c' },
        { text: "Pivot to fully human-made art", nextScene: 'scenario_3d' }
      ]
    },
    scenario_2c: {
      text: "A gallery invites you to showcase your human-made work as part of a 'no-tech' exhibit. What do you decide?",
      choices: [
        { text: "Accept, become a leader in anti-AI art", nextScene: 'scenario_3e' },
        { text: "Decline, pursue broader audiences", nextScene: 'scenario_3f' }
      ]
    },
    scenario_3a: {
      text: "Your public defense of AI sparks a protest during one of your events. How do you handle this situation?",
      choices: [
        { text: "Confront the critics directly", nextScene: 'final_4a' },
        { text: "Invite a traditionalist to collaborate", nextScene: 'final_4b' }
      ]
    },
    scenario_3b: {
      text: "Your transparency about AI's role wins back trust, but sales remain low. A gallery offers to feature your pieces in a special exhibit on ethical AI use.",
      choices: [
        { text: "Accept and position yourself as an ethical AI artist", nextScene: 'final_4c' },
        { text: "Decline and create a bold human-crafted series", nextScene: 'final_4d' }
      ]
    },
    scenario_3c: {
      text: "Your latest piece pushes boundaries between AI and human creativity. An influential artist calls it 'more machine than human.'",
      choices: [
        { text: "Engage in public dialogue about authorship", nextScene: 'final_4e' },
        { text: "Let your art speak for itself", nextScene: 'final_4f' }
      ]
    },
    scenario_3d: {
      text: "Your human-made art resonates deeply, but tech-driven competitions exclude your work. A critic suggests you're 'outdated.'",
      choices: [
        { text: "Double down on human-made ethos", nextScene: 'final_4g' },
        { text: "Explore subtle AI integrations", nextScene: 'final_4h' }
      ]
    },
    scenario_3e: {
      text: "Your leadership in anti-AI movement earns you a chance to curate 'The Art of Human Hands' museum exhibit.",
      choices: [
        { text: "Accept and showcase pure human creativity", nextScene: 'final_4i' },
        { text: "Decline to explore new traditional methods", nextScene: 'final_4j' }
      ]
    },
    scenario_3f: {
      text: "You experiment with unconventional methods to attract a wider audience. How do you proceed?",
      choices: [
        { text: "Host an interactive mixed-media workshop", nextScene: 'final_4k' },
        { text: "Create a collaborative piece across disciplines", nextScene: 'final_4l' }
      ]
    },
    // Over 45 Path
    over_45_start: {
      text: "You discover that the town council has partnered with a tech company to showcase an AI-generated mural as a symbol of 'progress and innovation.' The traditional muralist is notably absent. How do you respond?",
      choices: [
        { text: "Advocate for integrating AI and human art", nextScene: 'over_45_2a' },
        { text: "Protest, calling for traditional methods", nextScene: 'over_45_2b' },
        { text: "Suggest a separate digital exhibit", nextScene: 'over_45_2c' }
      ]
    },
    over_45_2a: {
      text: "The hybrid mural becomes a community centerpiece but faces criticism for lacking emotion. What's your next step?",
      choices: [
        { text: "Defend the project as inclusive", nextScene: 'over_45_3a' },
        { text: "Propose a traditional follow-up project", nextScene: 'over_45_3b' }
      ]
    },
    over_45_2b: {
      text: "Traditional artists reclaim the project, but tech advocates criticize the decision. How do you proceed?",
      choices: [
        { text: "Support return to tradition", nextScene: 'over_45_3c' },
        { text: "Host a community forum", nextScene: 'over_45_3d' }
      ]
    },
    over_45_2c: {
      text: "The digital mural gains attention online but faces criticism for lacking cultural relevance. What do you do?",
      choices: [
        { text: "Focus on innovation", nextScene: 'over_45_3e' },
        { text: "Blend digital and traditional art", nextScene: 'over_45_3f' }
      ]
    },
    over_45_3a: {
      text: "Your defense sparks broader conversation. The community requests workshops and town halls about public art's future.",
      choices: [
        { text: "Host inclusive design workshops", nextScene: 'final_4a' },
        { text: "Curate an art evolution exhibit", nextScene: 'final_4b' }
      ]
    },
    over_45_3b: {
      text: "Your traditional project proposal gains support, but resources are limited. Which approach do you choose?",
      choices: [
        { text: "Lead a hands-on community project", nextScene: 'final_4c' },
        { text: "Develop art education program", nextScene: 'final_4d' }
      ]
    },
    over_45_3c: {
      text: "The town becomes a traditional art hub, but tech investment decreases. How do you maintain momentum?",
      choices: [
        { text: "Organize a regional art festival", nextScene: 'final_4e' },
        { text: "Start a cultural exchange program", nextScene: 'final_4f' }
      ]
    },
    over_45_3d: {
      text: "The community forum reveals deep divisions about funding and creative direction. What's your solution?",
      choices: [
        { text: "Form a representative art council", nextScene: 'final_4g' },
        { text: "Launch an open art competition", nextScene: 'final_4h' }
      ]
    },
    over_45_3e: {
      text: "The mural gains global recognition but locals feel disconnected. How do you bridge the gap?",
      choices: [
        { text: "Create an educational digital exhibit", nextScene: 'final_4i' },
        { text: "Fund a blended local initiative", nextScene: 'final_4j' }
      ]
    },
    over_45_3f: {
      text: "Your blended art project unites diverse artists but faces funding challenges. What's your priority?",
      choices: [
        { text: "Focus on a smaller, balanced project", nextScene: 'final_4k' },
        { text: "Emphasize digital to attract funding", nextScene: 'final_4l' }
      ]
    },
    // Final Scenarios
    final_4a: {
      text: "Your chaotic, high-energy AI installation adapts to audience reactions in real-time, symbolizing the polarizing nature of innovation. 'A Town's Voice, Together' becomes a landmark achievement.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4b: {
      text: "Your hybrid gallery seamlessly intertwines human-crafted and AI-driven works, showcasing the power of collaboration. 'History in Every Stroke' becomes a beloved community space.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4c: {
      text: "Your carefully curated exhibit with clear AI labeling emphasizes transparency and trust, setting new standards for ethical art practices. 'Hands That Create' inspires future generations.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4d: {
      text: "Your bold, analog series highlighting imperfections makes a powerful statement about human creativity. 'Tomorrow's Artists' shapes young minds.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4e: {
      text: "Your interactive installation sparks global debate about authorship in the digital age. 'The Spirit of Creation' becomes a cultural touchstone.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4f: {
      text: "Your minimalist hybrid piece subtly blends AI and human techniques, leaving interpretation to the audience. 'United in Art' bridges generational gaps.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4g: {
      text: "Your raw, visceral exhibit emphasizing human touch and emotion becomes a manifesto for traditional art. 'Art for All, By All' unites the community.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4h: {
      text: "Your balanced installation shows how harmony can exist between human and AI creativity. 'The Art of Debate' becomes a cultural phenomenon.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4i: {
      text: "Your dynamic multimedia exhibit pairs traditional techniques with modern tools, bridging past and future. 'From Pixels to Paint' inspires new perspectives.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4j: {
      text: "Your theatrical, participatory exhibit creates a space where live performers and AI collaborate in real-time. 'Where Tradition Meets Technology' redefines public art.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4k: {
      text: "Your modest yet powerful installation proves that balance between digital and traditional art is possible. 'In Balance, Beauty' becomes a model for future projects.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
    },
    final_4l: {
      text: "Your kaleidoscopic installation combines diverse art forms, showing how boundaries blur in collaboration. 'The Future in Focus' shapes the art world's evolution.",
      choices: [{ text: "Start New Journey", nextScene: 'start' }]
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
