import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, PlusCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AVERAGE_LIFESPANS = {
  'United States': { male: 76, female: 81, other: 78 },
  'Canada': { male: 80, female: 84, other: 82 },
  'United Kingdom': { male: 79, female: 83, other: 81 },
  'Germany': { male: 79, female: 84, other: 81 },
  'France': { male: 80, female: 85, other: 82 },
  'Italy': { male: 81, female: 85, other: 83 },
  'Spain': { male: 80, female: 86, other: 83 },
  'Sweden': { male: 81, female: 84, other: 82 },
  'Norway': { male: 81, female: 84, other: 82 },
  'Finland': { male: 79, female: 84, other: 81 },
  'Denmark': { male: 79, female: 83, other: 81 },
  'Netherlands': { male: 80, female: 83, other: 81 },
  'Belgium': { male: 79, female: 84, other: 81 },
  'Switzerland': { male: 82, female: 85, other: 83 },
  'Austria': { male: 79, female: 84, other: 81 },
  'Poland': { male: 74, female: 82, other: 78 },
  'Russia': { male: 68, female: 78, other: 73 },
  'Ukraine': { male: 67, female: 77, other: 72 },
  'Greece': { male: 79, female: 84, other: 81 },
  'Portugal': { male: 78, female: 84, other: 81 },
  'Ireland': { male: 80, female: 84, other: 82 },
  'Israel': { male: 81, female: 84, other: 82 },
  'China': { male: 75, female: 78, other: 76 },
  'Japan': { male: 81, female: 87, other: 84 },
  'South Korea': { male: 80, female: 86, other: 83 },
  'India': { male: 69, female: 72, other: 70 },
  'Nigeria': { male: 54, female: 56, other: 55 },
  'South Africa': { male: 62, female: 68, other: 65 },
  'Kenya': { male: 65, female: 70, other: 67 },
  'Egypt': { male: 70, female: 74, other: 72 },
};

const EMOJI_OPTIONS = { 'default': '▪️', 'cats': '🐱', 'eggplants': '🍆' };

const LifeGoalManager = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [remainingTime, setRemainingTime] = useState(null);
  const [remainingYears, setRemainingYears] = useState(null);
  const [timeUnit, setTimeUnit] = useState('months');
  const [selectedEmoji, setSelectedEmoji] = useState('default');
  const [lifeGoals, setLifeGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [feedback, setFeedback] = useState('');

  const checkIfAlive = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setResult("Yes, you are alive!");
    }, 2000);
  };

  const calculateRemainingLifespan = () => {
    if (!age || !gender || !nationality) {
      alert("Please fill in all fields: age, gender, and nationality.");
      return;
    }

    const averageLifespan = AVERAGE_LIFESPANS[nationality][gender];
    const remaining = averageLifespan - parseInt(age);
    setRemainingYears(remaining);
    updateRemainingTime(remaining);
  };

  const updateRemainingTime = (years) => {
    let time;
    switch (timeUnit) {
      case 'weeks':
        time = years * 52;
        break;
      case 'months':
        time = years * 12;
        break;
      case 'years':
        time = years;
        break;
      default:
        time = years * 12;
    }
    setRemainingTime(Math.round(time));
  };

  useEffect(() => {
    if (remainingYears !== null) {
      updateRemainingTime(remainingYears);
    }
  }, [timeUnit, remainingYears]);

  const addLifeGoal = () => {
    if (newGoal.trim() !== '') {
      setLifeGoals([...lifeGoals, { text: newGoal, completed: false }]);
      setNewGoal('');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() !== '') {
      alert(`Feedback received: ${feedback}`);
      setFeedback('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!result && (
        <Button
          onClick={checkIfAlive}
          disabled={isChecking}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : "Am I Alive?"}
        </Button>
      )}
      
      {result && (
        <div className="mt-6 text-center">
          <p className="text-4xl font-bold text-green-600 mb-4">{result}</p>
          <div className="mt-2 flex flex-col items-center justify-center space-y-2">
            <span className="text-sm text-gray-600">Share your result with friends:</span>
            <p className="italic text-blue-600">
              "I am excited to announce that I am alive!"
            </p>
          </div>
          <Button
            onClick={() => setRemainingTime(0)}
            className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 border border-blue-300 rounded-lg hover:bg-blue-200"
          >
            Manage Your Remaining Life Time
          </Button>
          <form onSubmit={handleFeedbackSubmit} className="mt-4">
            <Input
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="If this is incorrect, provide feedback"
              className="w-full mb-2"
            />
            <span
              onClick={handleFeedbackSubmit}
              className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
            >
              Submit Feedback
            </span>
          </form>
        </div>
      )}
      
      {remainingTime !== null && (
        <div className="mt-6 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Calculate Your Remaining Time</h2>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full"
            />
            <Select onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setNationality}>
              <SelectTrigger>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(AVERAGE_LIFESPANS).map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setTimeUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Choose time unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weeks">Weeks</SelectItem>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedEmoji}>
              <SelectTrigger>
                <SelectValue placeholder="Choose display style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default (▪️)</SelectItem>
                <SelectItem value="cats">Cats (🐱)</SelectItem>
                <SelectItem value="eggplants">Eggplants (🍆)</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={calculateRemainingLifespan}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Calculate
            </Button>
          </div>
          {remainingTime > 0 && (
            <div className="mt-4">
              <p className="text-center mb-2">You have approximately <span className="font-bold text-blue-600">{remainingTime}</span> {timeUnit} left.</p>
              <div className="flex flex-wrap justify-start">
                {Array.from({ length: Math.min(remainingTime, 100) }).map((_, index) => (
                  <span key={index} className="text-xs m-0.5">{EMOJI_OPTIONS[selectedEmoji]}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {remainingTime !== null && (
        <div className="mt-6 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">Set Your Life Goals</h3>
          <div className="flex items-center mb-4">
            <Input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter a new life goal"
              className="flex-grow mr-2"
            />
            <Button onClick={addLifeGoal} className="bg-blue-500 hover:bg-blue-600">
              <PlusCircle size={20} />
            </Button>
          </div>
          {showPopup && (
            <Alert className="mb-4">
              <AlertDescription>
                You probably won't make it, sorry. 😢
              </AlertDescription>
            </Alert>
          )}
          <ul className="space-y-2">
            {lifeGoals.map((goal, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => {
                    const updatedGoals = [...lifeGoals];
                    updatedGoals[index].completed = !updatedGoals[index].completed;
                    setLifeGoals(updatedGoals);
                  }}
                  className="mr-2"
                />
                <span className="line-through text-gray-500">{goal.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LifeGoalManager;
