import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Option {
  text: string;
  value: string;
  image?: string;
  genrePoints: { [key: string]: number };
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  currentQuestionIndex = 0;
  answers: string[] = [];
  showResult = false;
  resultGenre = '';
  resultMessage = '';
  
  questions: Question[] = [
    {
      id: 1,
      text: "How are you feeling right now?",
      options: [
        {
          text: "Happy & Energetic",
          value: "happy",
          image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=200&h=200&fit=crop",
          genrePoints: { comedy: 3, adventure: 2, animation: 1 }
        },
        {
          text: "Thoughtful & Reflective",
          value: "thoughtful",
          image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&h=200&fit=crop",
          genrePoints: { drama: 4, romance: 2, documentary: 1 }
        },
        {
          text: "Adventurous & Excited",
          value: "adventurous",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
          genrePoints: { adventure: 4, action: 3, thriller: 2 }
        },
        {
          text: "Cozy & Relaxed",
          value: "cozy",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
          genrePoints: { romance: 3, comedy: 2, drama: 1 }
        }
      ]
    },
    {
      id: 2,
      text: "What's your ideal movie night?",
      options: [
        {
          text: "Laughing with friends",
          value: "friends",
          image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=200&h=200&fit=crop",
          genrePoints: { comedy: 4, animation: 2, adventure: 1 }
        },
        {
          text: "Romantic date night",
          value: "romantic",
          image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=200&h=200&fit=crop",
          genrePoints: { romance: 4, drama: 2, comedy: 1 }
        },
        {
          text: "Thrilling solo experience",
          value: "solo",
          image: "https://images.unsplash.com/photo-1489599809505-f3b2a0d50e61?w=200&h=200&fit=crop",
          genrePoints: { thriller: 4, mystery: 3, horror: 2 }
        },
        {
          text: "Family movie time",
          value: "family",
          image: "https://images.unsplash.com/photo-1484712401471-05c7215830eb?w=200&h=200&fit=crop",
          genrePoints: { animation: 3, comedy: 2, adventure: 2 }
        }
      ]
    },
    {
      id: 3,
      text: "What setting excites you most?",
      options: [
        {
          text: "Futuristic worlds",
          value: "futuristic",
          image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=200&fit=crop",
          genrePoints: { scifi: 4, action: 2, adventure: 1 }
        },
        {
          text: "Historical eras",
          value: "historical",
          image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=200&h=200&fit=crop",
          genrePoints: { drama: 3, romance: 2, adventure: 2 }
        },
        {
          text: "Mysterious locations",
          value: "mysterious",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
          genrePoints: { mystery: 4, thriller: 3, adventure: 1 }
        },
        {
          text: "Urban city life",
          value: "urban",
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop",
          genrePoints: { comedy: 3, drama: 2, romance: 2 }
        }
      ]
    },
    {
      id: 4,
      text: "What emotional journey do you prefer?",
      options: [
        {
          text: "Heartwarming & uplifting",
          value: "uplifting",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=200&fit=crop",
          genrePoints: { comedy: 3, romance: 2, drama: 1 }
        },
        {
          text: "Intense & suspenseful",
          value: "suspenseful",
          image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=200&h=200&fit=crop",
          genrePoints: { thriller: 4, mystery: 3, horror: 2 }
        },
        {
          text: "Epic & adventurous",
          value: "epic",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop",
          genrePoints: { adventure: 4, action: 3, scifi: 1 }
        },
        {
          text: "Deep & meaningful",
          value: "meaningful",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
          genrePoints: { drama: 4, documentary: 2, romance: 1 }
        }
      ]
    },
    {
      id: 5,
      text: "Choose your movie pace preference",
      options: [
        {
          text: "Fast & action-packed",
          value: "fast",
          image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&h=200&fit=crop",
          genrePoints: { action: 4, adventure: 3, thriller: 2 }
        },
        {
          text: "Slow & atmospheric",
          value: "slow",
          image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=200&h=200&fit=crop",
          genrePoints: { drama: 3, romance: 2, documentary: 2 }
        },
        {
          text: "Fun & energetic",
          value: "fun",
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop",
          genrePoints: { comedy: 4, animation: 2, musical: 1 }
        },
        {
          text: "Mysterious & unfolding",
          value: "mysterious_pace",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
          genrePoints: { mystery: 4, thriller: 3, drama: 1 }
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  selectOption(optionValue: string) {
    this.answers[this.currentQuestionIndex] = optionValue;
    
    // Add selection animation
    const selectedElement = document.querySelector(`[data-value="${optionValue}"]`);
    selectedElement?.classList.add('selected');
    
    setTimeout(() => {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.calculateResult();
      }
    }, 500);
  }

  calculateResult() {
    const genreScores: { [key: string]: number } = {
      action: 0, adventure: 0, comedy: 0, drama: 0, 
      romance: 0, thriller: 0, scifi: 0, horror: 0,
      mystery: 0, animation: 0, documentary: 0, musical: 0
    };

    this.answers.forEach((answer, index) => {
      const question = this.questions[index];
      const selectedOption = question.options.find(opt => opt.value === answer);
      
      if (selectedOption) {
        Object.keys(selectedOption.genrePoints).forEach(genre => {
          genreScores[genre] += selectedOption.genrePoints[genre];
        });
      }
    });

    // Find top genre
    let maxScore = 0;
    let topGenre = 'comedy'; // default
    
    Object.keys(genreScores).forEach(genre => {
      if (genreScores[genre] > maxScore) {
        maxScore = genreScores[genre];
        topGenre = genre;
      }
    });

    this.resultGenre = topGenre;
    this.showResult = true;
    
    // Set result message based on genre
    const genreMessages: { [key: string]: string } = {
      action: "Action-packed adventures with thrilling sequences!",
      adventure: "Epic journeys to unknown worlds and exciting quests!",
      comedy: "Light-hearted fun and laughter-filled entertainment!",
      drama: "Emotional stories with deep character development!",
      romance: "Heartwarming love stories and emotional connections!",
      thriller: "Edge-of-your-seat suspense and mystery!",
      scifi: "Futuristic worlds and technological wonders!",
      horror: "Spooky tales and chilling experiences!",
      mystery: "Intriguing puzzles and mind-bending plots!",
      animation: "Colorful animated worlds for all ages!",
      documentary: "Real-life stories and educational content!",
      musical: "Catchy tunes and spectacular performances!"
    };

    this.resultMessage = `Your perfect match is ${this.resultGenre.toUpperCase()}! ${genreMessages[topGenre]}`;
  }

  goToSearch() {
    this.router.navigate(['/search'], { 
      queryParams: { genre: this.resultGenre } 
    });
  }

  get progressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }
}