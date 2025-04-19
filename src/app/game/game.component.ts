import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { wordList } from './word-list';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  settingsOpen = false;
  gameTitle = ["W",'O','R','D','L','E']

  wordList :string[] = [];
  targetWord: string = '';
  guesses: string[][] = [];
  boxColors: string[][] = [];
  keyColors: { [key: string]: string } = {};

  currentGuess: string = '';
  currentRowIndex = 0;
  maxAttempts = 6;
  message: string = '';

  showPopup = false;
  isWin = false;
  selectedWord = '';

  keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
  ];

  constructor(private router:Router){
  }

  ngOnInit(): void {
    this.wordList = wordList;
    this.targetWord = this.getRandomWord();
    this.guesses = Array.from({ length: this.maxAttempts }, () => Array(5).fill(''));
    this.boxColors = Array.from({ length: this.maxAttempts }, () => Array(5).fill(''));
    window.addEventListener('keydown', this.handlePhysicalKey);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handlePhysicalKey);
  }

  getRandomWord(): string {
    return this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
  }

  handleKey(key: string): void {
    if (this.message) return;

    if (key.toLowerCase() === 'backspace') {
      this.currentGuess = this.currentGuess.slice(0, -1);
    } else if (key.toLowerCase() === 'enter') {
      this.submitGuess();
    } else if (/^[a-zA-Z]$/.test(key) && this.currentGuess.length < 5) {
      this.currentGuess += key;
    }

    this.updateGuessBoxes();
  }

  handlePhysicalKey = (event: KeyboardEvent) => {
    const key = event.key.length === 1 ? event.key.toUpperCase() : event.key;
    
    switch (key) {
      case 'Enter':
      case 'ENTER':
        this.handleKey('Enter');
        break;
      case 'Backspace':
      case 'BACKSPACE':
        this.handleKey('Backspace');
        break;
      default:
        if (/^[A-Z]$/.test(key)) {
          this.handleKey(key);
        }
        break;
    }
  };

  updateGuessBoxes(): void {
    if (this.currentRowIndex < this.maxAttempts) {
      const padded = this.currentGuess.padEnd(5).split('');
      this.guesses[this.currentRowIndex] = padded;
    }
  }

  submitGuess(): void {
    if (this.currentGuess.length !== 5) {
      this.message = 'Word must be 5 letters';
      setTimeout(() => (this.message = ''), 1500);
      return;
    }

    if (!this.wordList.includes(this.currentGuess)) {
      this.message = 'Not a valid word';
      setTimeout(() => (this.message = ''), 1500);
      return;
    }

    const guessArray = this.currentGuess.split('');
    const targetArray = this.targetWord.split('');

    const colors = Array(5).fill('absent');

    // First pass for correct
    guessArray.forEach((char, i) => {
      if (char === targetArray[i]) {
        colors[i] = 'correct';
        targetArray[i] = ''; // Mark used
      }
    });

    // Second pass for present
    guessArray.forEach((char, i) => {
      if (colors[i] !== 'correct' && targetArray.includes(char)) {
        colors[i] = 'present';
        targetArray[targetArray.indexOf(char)] = ''; // Mark used
      }
    });

    this.boxColors[this.currentRowIndex] = colors;

    // Update keyboard color map
    guessArray.forEach((char, i) => {
      const existing = this.keyColors[char];
      if (
        colors[i] === 'correct' ||
        (colors[i] === 'present' && existing !== 'correct') ||
        (!existing && colors[i] === 'absent')
      ) {
        this.keyColors[char] = colors[i];
      }
    });

    if (this.currentGuess === this.targetWord) {
     this.showEndPopup(true);
      return;
    }

    this.currentGuess = '';
    this.currentRowIndex++;

    if (this.currentRowIndex === this.maxAttempts) {
      this.showEndPopup(false);
    }
  }

  getKeyClass(key: string): string {
    if (key === 'Enter') return 'enter-key';
    if (key === 'Backspace') return 'backspace-key';
    const color = this.keyColors[key];
    return color ? color : '';
  }

  showEndPopup(win: boolean) {
    this.isWin = win;
    this.selectedWord = this.targetWord;
    this.showPopup = true;
  
    // if (win) {
    //   this.confetti(); // optional celebration
    // }
  }

  resetGame() {
    this.currentRowIndex = 0;
    this.currentGuess = '';
    this.showPopup = false;
    this.isWin = false;
    this.message = '';
    this.targetWord = this.getRandomWord();
  
    this.guesses = Array.from({ length: this.maxAttempts }, () => Array(5).fill(''));
    this.boxColors = Array.from({ length: this.maxAttempts }, () => Array(5).fill(''));
    this.keyColors = {};
  }

  playAgain() {
    this.resetGame() // or your actual route
  }
  
  toggleSettings($event?:any) {
    this.settingsOpen = !this.settingsOpen;
  }

  goBack($event:any){
    this.router.navigate(['/']);
  }
}
