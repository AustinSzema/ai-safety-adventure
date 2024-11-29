import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

const AdventureGame = () => {
  const [currentScene, setCurrentScene] = useState('start');
  const [showScene, setShowScene] = useState(false);

  // Define scene images (using blank.png as placeholders)
  const sceneImages = {
    start: "/images/start.png",
    under_45_start: "/images/under_45_start.png",
    under_45_embrace: "/over_45_start.png",
    under_45_sparingly: "/images/blank.png",
    under_45_reject: "/images/blank.png",
    over_45_start: "/images/blank.png",
    over_45_celebrate: "/images/blank.png",
    over_45_criticize: "/images/blank.png",
    over_45_explore: "/images/blank.png",
    final_exhibit: "/images/blank.png",
    ending_blend: "/images/blank.png",
    ending_preserve: "/images/blank.png",
    ending_redefine: "/images/blank.png"
  };


  const scenes = {
    start: {
      text: "Welcome to the AI-Creative Odyssey! AI is transforming the world of art and creativity. Let's explore this shifting landscape. What's your age range?",
      choices: [
        { text: "Under 45", nextScene: 'under_45_start' },
        { text: "Over 45", nextScene: 'over_45_start' }
      ]
    },
    under_45_start: {
      text: "You're an emerging artist or designer navigating how AI might enhance or undermine your creative process. Your art class introduces an AI tool that generates designs based on text prompts. What do you do?",
      choices: [
        { text: "Embrace the tool to explore new ideas quickly", nextScene: 'under_45_embrace' },
        { text: "Use it sparingly, relying on your original techniques", nextScene: 'under_45_sparingly' },
        { text: "Reject it entirely, arguing art should remain human", nextScene: 'under_45_reject' }
      ]
    },
    under_45_embrace: {
      text: "Your designs improve in complexity, but peers question your artistic integrity.",
      tip: "Balancing innovation and authenticity is key in a rapidly changing creative landscape.",
      choices: [
        { text: "Defend AI as a tool that complements human creativity", nextScene: 'under_45_defend' },
        { text: "Advocate for clear labeling of AI-assisted works", nextScene: 'under_45_label' }
      ]
    },
    under_45_sparingly: {
      text: "Your work is praised for its authenticity, but you struggle to keep pace with peers using AI.",
      choices: [
        { text: "Experiment with AI to increase market appeal", nextScene: 'under_45_experiment' },
        { text: "Promote your handmade work as unique and valuable", nextScene: 'under_45_handmade' }
      ]
    },
    under_45_reject: {
      text: "You gain respect from traditionalists but fall behind in the competitive art world.",
      choices: [
        { text: "Partner with a traditional art gallery", nextScene: 'under_45_gallery' },
        { text: "Stay independent to reach diverse audiences", nextScene: 'under_45_independent' }
      ]
    },
    over_45_start: {
      text: "You're an established creator or art enthusiast contemplating AI's influence on authenticity, tradition, and innovation. A renowned artist's latest work is secretly AI-generated. What's your reaction?",
      choices: [
        { text: "Celebrate it as a bold step forward", nextScene: 'over_45_celebrate' },
        { text: "Criticize the lack of transparency", nextScene: 'over_45_criticize' },
        { text: "Explore AI's potential in your work", nextScene: 'over_45_explore' }
      ]
    },
    over_45_celebrate: {
      text: "You support new possibilities but alienate traditionalists.",
      choices: [
        { text: "Support inclusive exhibits featuring AI and traditional art", nextScene: 'over_45_inclusive' },
        { text: "Advocate for separate sections for AI and traditional art", nextScene: 'over_45_separate' }
      ]
    },
    over_45_criticize: {
      text: "You champion transparency but face backlash from innovation enthusiasts.",
      choices: [
        { text: "Teach that true art requires human emotion and experience", nextScene: 'over_45_teach_traditional' },
        { text: "Suggest art's value lies in its ability to provoke thought", nextScene: 'over_45_teach_expand' }
      ]
    },
    over_45_explore: {
      text: "AI tools help you create experimental pieces but challenge your long-standing reputation.",
      choices: [
        { text: "Treasure AI's potential to preserve history", nextScene: 'over_45_preserve' },
        { text: "Feel conflicted about its authenticity", nextScene: 'over_45_conflicted' }
      ]
    },
    final_exhibit: {
      text: "A major exhibition showcases AI-human collaborations in art. Is creativity inherently human, or is it evolving beyond us?",
      choices: [
        { text: "Blend AI and human creativity for the future of art", nextScene: 'ending_blend' },
        { text: "Preserve distinctions between AI and human art", nextScene: 'ending_preserve' },
        { text: "Redefine art to embrace all creators", nextScene: 'ending_redefine' }
      ]
    },
    ending_blend: {
      text: "You contribute to redefining collaboration and innovation in art, shaping a new movement.",
      choices: [{ text: "Restart", nextScene: 'start' }]
    },
    ending_preserve: {
      text: "You preserve traditional values but feel sidelined as AI art grows.",
      choices: [{ text: "Restart", nextScene: 'start' }]
    },
    ending_redefine: {
      text: "You become a pioneer in reshaping art's identity, gaining global recognition.",
      choices: [{ text: "Restart", nextScene: 'start' }]
    }
  };

  // Add missing scenes to prevent undefined error
  const defaultScenes = {
    under_45_defend: scenes.final_exhibit,
    under_45_label: scenes.final_exhibit,
    under_45_experiment: scenes.final_exhibit,
    under_45_handmade: scenes.final_exhibit,
    under_45_gallery: scenes.final_exhibit,
    under_45_independent: scenes.final_exhibit,
    over_45_inclusive: scenes.final_exhibit,
    over_45_separate: scenes.final_exhibit,
    over_45_teach_traditional: scenes.final_exhibit,
    over_45_teach_expand: scenes.final_exhibit,
    over_45_preserve: scenes.final_exhibit,
    over_45_conflicted: scenes.final_exhibit,
  };

  // Merge the default scenes with the original scenes
  const allScenes = { ...scenes, ...defaultScenes };

  const Scene = ({ scene, sceneImage }) => {
    useEffect(() => {
      setShowScene(false);
      setTimeout(() => setShowScene(true), 100); // Trigger transition after small delay
    }, [currentScene]);

    if (!scene) {
      return (
        <div className="text-center text-red-500">
          <p>Oops! Something went wrong. Please restart the game.</p>
          <Button
            onClick={() => setCurrentScene('start')}
            className="mt-4"
          >
            Restart
          </Button>
        </div>
      );
    }

    return (
      <div className={`scene-container ${showScene ? 'show' : ''}`}>
        <img
          src={sceneImage || "/api/placeholder/800/400?text=Scene+Image"}
          alt="Scene illustration"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="text-lg">{scene.text}</p>
        {scene.tip && (
          <Alert className="bg-blue-50">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>{scene.tip}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          {scene.choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => setCurrentScene(choice.nextScene)}
              className="w-full justify-start text-left"
            >
              {choice.text}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Play background music when the game starts
    const audio = new Audio("/path-to-your-audio-file.mp3");
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-2xl font-bold text-center">
        AI-Creative Odyssey
      </CardHeader>
      <CardContent>
        <Scene
          scene={allScenes[currentScene]}
          sceneImage={sceneImages[currentScene]}
        />
      </CardContent>
    </Card>
  );
};

export default AdventureGame;