import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  id: number;
  text: string;
  type: 'mood' | 'setting' | 'genre' | 'style' | 'character';
  options: Option[];
  nextQuestion?: number; // Default next question
}

interface Option {
  text: string;
  value: string;
  genrePoints: { [key: string]: number };
  nextQuestion?: number; // Specific next question based on choice
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent {
  currentQuestionIndex = 0;
  answers: string[] = [];
  showResult = false;
  topGenres: string[] = [];
  userProfile: any = {};
  
  // Question flow based on user choices
  questions: Question[] = [
    // Initial mood-based questions
    {
      id: 1,
      type: 'mood',
      text: "How are you feeling right now?",
      options: [
        {
          text: "Happy and energetic",
          value: "happy_energetic",
          genrePoints: { comedy: 3, adventure: 2, musical: 2 },
          nextQuestion: 2
        },
        {
          text: "Thoughtful and reflective",
          value: "thoughtful_reflective",
          genrePoints: { drama: 3, romance: 2, documentary: 2 },
          nextQuestion: 3
        },
        {
          text: "Excited and adventurous",
          value: "excited_adventurous",
          genrePoints: { adventure: 3, action: 2, scifi: 2 },
          nextQuestion: 4
        },
        {
          text: "Cozy and relaxed",
          value: "cozy_relaxed",
          genrePoints: { romance: 3, comedy: 2, drama: 1 },
          nextQuestion: 5
        }
      ],
      nextQuestion: 2
    },
    // Follow-up for happy/energetic
    {
      id: 2,
      type: 'setting',
      text: "What kind of happy ending do you prefer?",
      options: [
        {
          text: "Big celebration with friends",
          value: "celebration_friends",
          genrePoints: { comedy: 3, musical: 2, romance: 1 },
          nextQuestion: 6
        },
        {
          text: "Romantic sunset moment",
          value: "romantic_sunset",
          genrePoints: { romance: 3, drama: 2 },
          nextQuestion: 7
        },
        {
          text: "Heroic victory",
          value: "heroic_victory",
          genrePoints: { action: 3, adventure: 2 },
          nextQuestion: 8
        }
      ],
      nextQuestion: 6
    },
    // Follow-up for thoughtful/reflective
    {
      id: 3,
      type: 'character',
      text: "Which character journey resonates with you?",
      options: [
        {
          text: "Someone finding their purpose",
          value: "finding_purpose",
          genrePoints: { drama: 3, biography: 2 },
          nextQuestion: 9
        },
        {
          text: "Overcoming personal struggles",
          value: "overcoming_struggles",
          genrePoints: { drama: 3, romance: 2 },
          nextQuestion: 10
        },
        {
          text: "Solving a complex mystery",
          value: "solving_mystery",
          genrePoints: { mystery: 3, thriller: 2 },
          nextQuestion: 11
        }
      ],
      nextQuestion: 9
    },
    // Follow-up for excited/adventurous
    {
      id: 4,
      type: 'setting',
      text: "What adventure setting excites you most?",
      options: [
        {
          text: "Ancient ruins and lost civilizations",
          value: "ancient_ruins",
          genrePoints: { adventure: 3, fantasy: 2 },
          nextQuestion: 12
        },
        {
          text: "Futuristic space exploration",
          value: "space_exploration",
          genrePoints: { scifi: 3, adventure: 2 },
          nextQuestion: 13
        },
        {
          text: "Urban jungle and modern challenges",
          value: "urban_jungle",
          genrePoints: { action: 3, thriller: 2 },
          nextQuestion: 14
        }
      ],
      nextQuestion: 12
    },
    // Follow-up for cozy/relaxed
    {
      id: 5,
      type: 'style',
      text: "What's your ideal cozy movie style?",
      options: [
        {
          text: "Heartwarming family stories",
          value: "family_stories",
          genrePoints: { comedy: 2, drama: 2, romance: 1 },
          nextQuestion: 15
        },
        {
          text: "Slow-burn romantic dramas",
          value: "slow_burn_romance",
          genrePoints: { romance: 3, drama: 2 },
          nextQuestion: 16
        },
        {
          text: "Quirky character studies",
          value: "quirky_characters",
          genrePoints: { comedy: 2, drama: 2 },
          nextQuestion: 17
        }
      ],
      nextQuestion: 15
    },
    // Genre-specific questions (various paths)
    {
      id: 6,
      type: 'genre',
      text: "What comedy style makes you laugh most?",
      options: [
        {
          text: "Witty dialogue and clever humor",
          value: "witty_humor",
          genrePoints: { comedy: 3, romance: 1 }
        },
        {
          text: "Physical comedy and slapstick",
          value: "physical_comedy",
          genrePoints: { comedy: 3 }
        },
        {
          text: "Dark/satirical comedy",
          value: "dark_comedy",
          genrePoints: { comedy: 2, drama: 1 }
        }
      ]
    },
    {
      id: 7,
      type: 'genre',
      text: "What romantic element do you enjoy most?",
      options: [
        {
          text: "Slow-burn emotional connection",
          value: "slow_burn",
          genrePoints: { romance: 3, drama: 2 }
        },
        {
          text: "Passionate, intense relationships",
          value: "passionate",
          genrePoints: { romance: 3, drama: 1 }
        },
        {
          text: "Light-hearted romantic comedy",
          value: "romcom",
          genrePoints: { romance: 2, comedy: 2 }
        }
      ]
    },
    {
      id: 8,
      type: 'genre',
      text: "What kind of action gets your heart racing?",
      options: [
        {
          text: "Epic battles and large-scale conflicts",
          value: "epic_battles",
          genrePoints: { action: 3, adventure: 2 }
        },
        {
          text: "Hand-to-hand combat and martial arts",
          value: "martial_arts",
          genrePoints: { action: 3 }
        },
        {
          text: "High-speed chases and stunts",
          value: "high_speed",
          genrePoints: { action: 3, thriller: 1 }
        }
      ]
    },
    {
      id: 9,
      type: 'genre',
      text: "What type of drama moves you most?",
      options: [
        {
          text: "Historical and period dramas",
          value: "historical_drama",
          genrePoints: { drama: 3, history: 2 }
        },
        {
          text: "Contemporary social issues",
          value: "social_issues",
          genrePoints: { drama: 3 }
        },
        {
          text: "Personal growth and transformation",
          value: "personal_growth",
          genrePoints: { drama: 3, romance: 1 }
        }
      ]
    },
    {
      id: 10,
      type: 'genre',
      text: "What romantic conflict interests you?",
      options: [
        {
          text: "Forbidden love across boundaries",
          value: "forbidden_love",
          genrePoints: { romance: 3, drama: 2 }
        },
        {
          text: "Second chance at love",
          value: "second_chance",
          genrePoints: { romance: 3, drama: 1 }
        },
        {
          text: "Friends turning into lovers",
          value: "friends_lovers",
          genrePoints: { romance: 2, comedy: 1 }
        }
      ]
    },
    {
      id: 11,
      type: 'genre',
      text: "What mystery element intrigues you most?",
      options: [
        {
          text: "Whodunit murder mysteries",
          value: "whodunit",
          genrePoints: { mystery: 3, crime: 2 }
        },
        {
          text: "Psychological mind games",
          value: "psychological",
          genrePoints: { thriller: 3, mystery: 2 }
        },
        {
          text: "Supernatural mysteries",
          value: "supernatural",
          genrePoints: { mystery: 2, horror: 2, fantasy: 1 }
        }
      ]
    },
    {
      id: 12,
      type: 'genre',
      text: "What adventure challenge excites you?",
      options: [
        {
          text: "Discovering lost treasures",
          value: "lost_treasures",
          genrePoints: { adventure: 3, action: 1 }
        },
        {
          text: "Surviving in wilderness",
          value: "wilderness_survival",
          genrePoints: { adventure: 3, drama: 1 }
        },
        {
          text: "Exploring ancient mysteries",
          value: "ancient_mysteries",
          genrePoints: { adventure: 3, mystery: 1 }
        }
      ]
    },
    {
      id: 13,
      type: 'genre',
      text: "What sci-fi concept fascinates you?",
      options: [
        {
          text: "Space exploration and aliens",
          value: "space_aliens",
          genrePoints: { scifi: 3, adventure: 1 }
        },
        {
          text: "Future technology and AI",
          value: "future_tech",
          genrePoints: { scifi: 3, thriller: 1 }
        },
        {
          text: "Time travel and alternate realities",
          value: "time_travel",
          genrePoints: { scifi: 3, mystery: 1 }
        }
      ]
    },
    {
      id: 14,
      type: 'genre',
      text: "What urban challenge interests you?",
      options: [
        {
          text: "Heists and criminal underworld",
          value: "heists",
          genrePoints: { action: 2, crime: 3, thriller: 1 }
        },
        {
          text: "Corporate espionage",
          value: "espionage",
          genrePoints: { thriller: 3, action: 1 }
        },
        {
          text: "Survival in dystopian cities",
          value: "dystopian",
          genrePoints: { action: 2, scifi: 2, thriller: 1 }
        }
      ]
    },
    {
      id: 15,
      type: 'genre',
      text: "What family dynamic appeals to you?",
      options: [
        {
          text: "Multi-generational stories",
          value: "multi_generational",
          genrePoints: { drama: 3, comedy: 1 }
        },
        {
          text: "Parent-child relationships",
          value: "parent_child",
          genrePoints: { drama: 3, comedy: 1 }
        },
        {
          text: "Found family and friendships",
          value: "found_family",
          genrePoints: { comedy: 2, drama: 2 }
        }
      ]
    },
    {
      id: 16,
      type: 'genre',
      text: "What romantic obstacle is most compelling?",
      options: [
        {
          text: "Cultural/social differences",
          value: "cultural_differences",
          genrePoints: { romance: 3, drama: 2 }
        },
        {
          text: "Personal insecurities and growth",
          value: "personal_insecurities",
          genrePoints: { romance: 3, drama: 1 }
        },
        {
          text: "External circumstances keeping them apart",
          value: "external_circumstances",
          genrePoints: { romance: 3, drama: 1 }
        }
      ]
    },
    {
      id: 17,
      type: 'genre',
      text: "What quirky element do you enjoy?",
      options: [
        {
          text: "Eccentric characters and communities",
          value: "eccentric_characters",
          genrePoints: { comedy: 2, drama: 1 }
        },
        {
          text: "Magical realism and whimsy",
          value: "magical_realism",
          genrePoints: { fantasy: 2, comedy: 1, drama: 1 }
        },
        {
          text: "Offbeat humor and situations",
          value: "offbeat_humor",
          genrePoints: { comedy: 3 }
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  selectOption(optionValue: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(opt => opt.value === optionValue);
    
    if (selectedOption) {
      this.answers[this.currentQuestionIndex] = optionValue;
      
      // Add animation delay
      setTimeout(() => {
        // Determine next question
        const nextQuestionId = selectedOption.nextQuestion || currentQuestion.nextQuestion;
        
        if (nextQuestionId) {
          // Find the index of the next question
          const nextIndex = this.questions.findIndex(q => q.id === nextQuestionId);
          if (nextIndex !== -1) {
            this.currentQuestionIndex = nextIndex;
          } else {
            // If no specific next question, calculate results
            this.calculateResult();
          }
        } else {
          // End of questionnaire
          this.calculateResult();
        }
      }, 400);
    }
  }

  calculateResult() {
    const genreScores: { [key: string]: number } = {
      action: 0, adventure: 0, comedy: 0, drama: 0, 
      romance: 0, thriller: 0, scifi: 0, horror: 0,
      mystery: 0, fantasy: 0, crime: 0, musical: 0,
      biography: 0, history: 0
    };

    // Calculate scores from all answers
    this.answers.forEach((answer, index) => {
      const question = this.questions.find(q => 
        this.questions.indexOf(q) === index
      );
      
      if (question) {
        const selectedOption = question.options.find(opt => opt.value === answer);
        if (selectedOption) {
          Object.keys(selectedOption.genrePoints).forEach(genre => {
            genreScores[genre] += selectedOption.genrePoints[genre];
          });
        }
      }
    });

    // Get top 3 genres
    const sortedGenres = Object.entries(genreScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);

    this.topGenres = sortedGenres;
    this.showResult = true;
    
    // Create user profile based on answers
    this.createUserProfile();
  }

  createUserProfile() {
    const profile: any = {
      mood: '',
      preferredSettings: [],
      favoriteElements: []
    };

    // Analyze answers to build profile
    this.answers.forEach((answer, index) => {
      const question = this.questions.find(q => 
        this.questions.indexOf(q) === index
      );
      
      if (question) {
        switch (question.type) {
          case 'mood':
            profile.mood = answer;
            break;
          case 'setting':
            profile.preferredSettings.push(answer);
            break;
          case 'character':
            profile.characterPreferences = answer;
            break;
          case 'style':
            profile.viewingStyle = answer;
            break;
        }
      }
    });

    this.userProfile = profile;
  }

  getGenreDescription(genre: string): string {
    const descriptions: { [key: string]: string } = {
      action: "High-energy films with thrilling sequences and physical feats",
      adventure: "Epic journeys to exotic locations and exciting quests",
      comedy: "Light-hearted entertainment that brings laughter and joy",
      drama: "Emotional stories with deep character development",
      romance: "Heartwarming tales of love and connection",
      thriller: "Edge-of-your-seat suspense and tension",
      scifi: "Futuristic worlds and technological imagination",
      horror: "Spooky tales that send chills down your spine",
      mystery: "Intriguing puzzles and mind-bending plots",
      fantasy: "Magical worlds and extraordinary possibilities",
      crime: "Gritty stories from the criminal underworld",
      musical: "Catchy tunes and spectacular performances"
    };
    
    return descriptions[genre] || "Great stories that match your taste";
  }

  goToSearchWithGenre(genre: string) {
    this.router.navigate(['/search'], { 
      queryParams: { genre: genre } 
    });
  }

  get progressPercentage(): number {
    const totalQuestions = 5; // Average path length
    return Math.min(100, ((this.currentQuestionIndex + 1) / totalQuestions) * 100);
  }

  getCurrentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }
}