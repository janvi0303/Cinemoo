import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  id: number;
  text: string;
  type: 'mood' | 'setting' | 'genre' | 'style' | 'character';
  options: Option[];
  nextQuestion?: number;
}

interface Option {
  text: string;
  value: string;
  title?: string;
  description?: string;
  poster?: string;
  tags?: string[];
  genrePoints: { [key: string]: number };
  nextQuestion?: number;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  currentQuestionIndex = 0;
  answers: string[] = [];
  showResult = false;
  topGenres: string[] = [];
  userProfile: any = {};
  resultGenre: string = '';
  resultMessage: string = '';
  recommendedMovies: string[] = [];

  // Enhanced questions with movie data
  questions: Question[] = [
    {
      id: 1,
      type: 'mood',
      text: "How are you feeling right now?",
      options: [
        {
          text: "Happy and energetic",
          value: "happy_energetic",
          title: "Comedy & Adventure",
          description: "Fun-filled movies to match your upbeat mood",
          poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
          tags: ["Fun", "Upbeat", "Joyful"],
          genrePoints: { comedy: 3, adventure: 2, musical: 2 },
          nextQuestion: 2
        },
        {
          text: "Thoughtful and reflective",
          value: "thoughtful_reflective",
          title: "Drama & Romance",
          description: "Meaningful stories for deep thinking",
          poster: "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg",
          tags: ["Deep", "Emotional", "Meaningful"],
          genrePoints: { drama: 3, romance: 2, biography: 2 },
          nextQuestion: 3
        },
        {
          text: "Excited and adventurous",
          value: "excited_adventurous",
          title: "Action & Sci-Fi",
          description: "Thrilling adventures to fuel your excitement",
          poster: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
          tags: ["Thrilling", "Epic", "Exciting"],
          genrePoints: { adventure: 3, action: 2, scifi: 2 },
          nextQuestion: 4
        },
        {
          text: "Cozy and relaxed",
          value: "cozy_relaxed",
          title: "Romance & Comedy",
          description: "Comforting movies for a relaxing time",
          poster: "https://image.tmdb.org/t/p/w500/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
          tags: ["Comfort", "Warm", "Relaxing"],
          genrePoints: { romance: 3, comedy: 2, drama: 1 },
          nextQuestion: 5
        }
      ],
      nextQuestion: 2
    },
    {
      id: 2,
      type: 'setting',
      text: "What kind of happy ending do you prefer?",
      options: [
        {
          text: "Big celebration with friends",
          value: "celebration_friends",
          title: "Party Finales",
          description: "Movies ending with joyful celebrations",
          poster: "https://image.tmdb.org/t/p/w500/3nvGqfZEQ6nHNMqaqqh3UXdQxRb.jpg",
          tags: ["Friendship", "Celebration", "Joy"],
          genrePoints: { comedy: 3, musical: 2, romance: 1 },
          nextQuestion: 6
        },
        {
          text: "Romantic sunset moment",
          value: "romantic_sunset",
          title: "Romantic Endings",
          description: "Heartwarming romantic conclusions",
          poster: "https://image.tmdb.org/t/p/w500/kissL5eZxGkGcLOV4y0LqEmx4Sy.jpg",
          tags: ["Romance", "Heartwarming", "Love"],
          genrePoints: { romance: 3, drama: 2 },
          nextQuestion: 7
        },
        {
          text: "Heroic victory",
          value: "heroic_victory",
          title: "Triumphant Endings",
          description: "Epic victories and heroic achievements",
          poster: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
          tags: ["Victory", "Heroic", "Epic"],
          genrePoints: { action: 3, adventure: 2 },
          nextQuestion: 8
        }
      ],
      nextQuestion: 6
    },
    {
      id: 3,
      type: 'character',
      text: "Which character journey resonates with you?",
      options: [
        {
          text: "Someone finding their purpose",
          value: "finding_purpose",
          title: "Self-Discovery",
          description: "Stories about finding meaning and purpose",
          poster: "https://image.tmdb.org/t/p/w500/5UbampUkseYiLf4CHn1u4hE81nO.jpg",
          tags: ["Purpose", "Journey", "Meaning"],
          genrePoints: { drama: 3, biography: 2 },
          nextQuestion: 9
        },
        {
          text: "Overcoming personal struggles",
          value: "overcoming_struggles",
          title: "Personal Growth",
          description: "Inspiring stories of overcoming challenges",
          poster: "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg",
          tags: ["Struggle", "Growth", "Inspiration"],
          genrePoints: { drama: 3, romance: 2 },
          nextQuestion: 10
        },
        {
          text: "Solving a complex mystery",
          value: "solving_mystery",
          title: "Mystery Solvers",
          description: "Brilliant minds unraveling complex puzzles",
          poster: "https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
          tags: ["Mystery", "Puzzle", "Investigation"],
          genrePoints: { mystery: 3, thriller: 2 },
          nextQuestion: 11
        }
      ],
      nextQuestion: 9
    },
    {
      id: 4,
      type: 'setting',
      text: "What adventure setting excites you most?",
      options: [
        {
          text: "Ancient ruins and lost civilizations",
          value: "ancient_ruins",
          title: "Ancient Worlds",
          description: "Discovering forgotten civilizations and treasures",
          poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
          tags: ["Ancient", "Discovery", "Treasure"],
          genrePoints: { adventure: 3, fantasy: 2 },
          nextQuestion: 12
        },
        {
          text: "Futuristic space exploration",
          value: "space_exploration",
          title: "Space Odyssey",
          description: "Journeys through the cosmos and beyond",
          poster: "https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
          tags: ["Space", "Future", "Exploration"],
          genrePoints: { scifi: 3, adventure: 2 },
          nextQuestion: 13
        },
        {
          text: "Urban jungle and modern challenges",
          value: "urban_jungle",
          title: "Urban Adventures",
          description: "Thrilling stories in modern city landscapes",
          poster: "https://image.tmdb.org/t/p/w500/3nvGqfZEQ6nHNMqaqqh3UXdQxRb.jpg",
          tags: ["Urban", "Modern", "Thrilling"],
          genrePoints: { action: 3, thriller: 2 },
          nextQuestion: 14
        }
      ],
      nextQuestion: 12
    },
    {
      id: 5,
      type: 'style',
      text: "What's your ideal cozy movie style?",
      options: [
        {
          text: "Heartwarming family stories",
          value: "family_stories",
          title: "Family Comfort",
          description: "Warm stories about family bonds and relationships",
          poster: "https://image.tmdb.org/t/p/w500/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
          tags: ["Family", "Heartwarming", "Bonds"],
          genrePoints: { comedy: 2, drama: 2, romance: 1 },
          nextQuestion: 15
        },
        {
          text: "Slow-burn romantic dramas",
          value: "slow_burn_romance",
          title: "Slow Romance",
          description: "Beautiful, gradual love stories that develop over time",
          poster: "https://image.tmdb.org/t/p/w500/kissL5eZxGkGcLOV4y0LqEmx4Sy.jpg",
          tags: ["Romance", "Slow-burn", "Emotional"],
          genrePoints: { romance: 3, drama: 2 },
          nextQuestion: 16
        },
        {
          text: "Quirky character studies",
          value: "quirky_characters",
          title: "Quirky Tales",
          description: "Unique characters and their extraordinary lives",
          poster: "https://image.tmdb.org/t/p/w500/5UbampUkseYiLf4CHn1u4hE81nO.jpg",
          tags: ["Quirky", "Unique", "Character-driven"],
          genrePoints: { comedy: 2, drama: 2 },
          nextQuestion: 17
        }
      ],
      nextQuestion: 15
    },
    // Additional genre-specific questions...
    {
      id: 6,
      type: 'genre',
      text: "What comedy style makes you laugh most?",
      options: [
        {
          text: "Witty dialogue and clever humor",
          value: "witty_humor",
          title: "Witty Comedy",
          description: "Smart, dialogue-driven humor",
          poster: "https://image.tmdb.org/t/p/w500/3nvGqfZEQ6nHNMqaqqh3UXdQxRb.jpg",
          tags: ["Smart", "Witty", "Clever"],
          genrePoints: { comedy: 3, romance: 1 }
        },
        {
          text: "Physical comedy and slapstick",
          value: "physical_comedy",
          title: "Physical Comedy",
          description: "Funny situations and physical humor",
          poster: "https://image.tmdb.org/t/p/w500/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
          tags: ["Physical", "Slapstick", "Funny"],
          genrePoints: { comedy: 3 }
        },
        {
          text: "Dark/satirical comedy",
          value: "dark_comedy",
          title: "Dark Comedy",
          description: "Edgy, satirical humor with depth",
          poster: "https://image.tmdb.org/t/p/w500/5UbampUkseYiLf4CHn1u4hE81nO.jpg",
          tags: ["Dark", "Satire", "Edgy"],
          genrePoints: { comedy: 2, drama: 1 }
        }
      ]
    }
    // Add more questions as needed...
  ];

  constructor(private router: Router) {}

  selectOption(optionValue: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(opt => opt.value === optionValue);
    
    if (selectedOption) {
      this.answers[this.currentQuestionIndex] = optionValue;
      
      setTimeout(() => {
        const nextQuestionId = selectedOption.nextQuestion || currentQuestion.nextQuestion;
        
        if (nextQuestionId) {
          const nextIndex = this.questions.findIndex(q => q.id === nextQuestionId);
          if (nextIndex !== -1) {
            this.currentQuestionIndex = nextIndex;
          } else {
            this.calculateResult();
          }
        } else {
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

    const sortedGenres = Object.entries(genreScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);

    this.topGenres = sortedGenres;
    this.resultGenre = this.topGenres[0];
    this.resultMessage = this.getGenreDescription(this.resultGenre);
    this.recommendedMovies = this.getRecommendedMovies(this.topGenres);
    this.showResult = true;
    
    this.createUserProfile();
  }

  createUserProfile() {
    const profile: any = {
      mood: '',
      preferredSettings: [],
      favoriteElements: []
    };

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
      action: "You love high-energy films with thrilling sequences and physical feats that keep you on the edge of your seat!",
      adventure: "Epic journeys to exotic locations and exciting quests fuel your imagination and sense of wonder!",
      comedy: "Your upbeat personality shines through your love for light-hearted entertainment that brings laughter and joy!",
      drama: "You appreciate emotional stories with deep character development that touch the heart and mind!",
      romance: "Heartwarming tales of love and connection resonate deeply with your emotional and caring nature!",
      thriller: "Edge-of-your-seat suspense and tension keep you engaged and excited throughout the story!",
      scifi: "Your curious mind enjoys exploring futuristic worlds and technological imagination beyond our reality!",
      mystery: "You love intriguing puzzles and mind-bending plots that challenge your detective skills!",
      fantasy: "Magical worlds and extraordinary possibilities spark your creativity and sense of adventure!"
    };
    
    return descriptions[genre] || "Your unique taste in movies makes every viewing experience special!";
  }

  getRecommendedMovies(genres: string[]): string[] {
    const movieSuggestions: { [key: string]: string[] } = {
      action: ["Mad Max: Fury Road", "John Wick", "The Dark Knight", "Mission: Impossible"],
      adventure: ["Indiana Jones", "Jurassic Park", "Pirates of the Caribbean", "The Lord of the Rings"],
      comedy: ["Superbad", "The Hangover", "Step Brothers", "Bridesmaids"],
      drama: ["The Shawshank Redemption", "Forrest Gump", "The Godfather", "Schindler's List"],
      romance: ["The Notebook", "Pride & Prejudice", "La La Land", "Before Sunrise"],
      thriller: ["Se7en", "Gone Girl", "The Silence of the Lambs", "Shutter Island"],
      scifi: ["Blade Runner 2049", "Interstellar", "The Matrix", "Arrival"],
      mystery: ["Knives Out", "Gone Girl", "The Prestige", "Memento"]
    };

    const recommendations: string[] = [];
    genres.forEach(genre => {
      if (movieSuggestions[genre]) {
        recommendations.push(...movieSuggestions[genre].slice(0, 2));
      }
    });

    return recommendations.slice(0, 4);
  }

  goToSearch() {
    if (this.resultGenre) {
      this.router.navigate(['/search'], { 
        queryParams: { genre: this.resultGenre } 
      });
    } else {
      this.router.navigate(['/search']);
    }
  }

  get progressPercentage(): number {
    const totalQuestions = 5;
    return Math.min(100, ((this.currentQuestionIndex + 1) / totalQuestions) * 100);
  }

  getCurrentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }
}