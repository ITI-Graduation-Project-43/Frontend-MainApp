import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent implements OnInit {
  funnySentence: string[];
  notFoundImages: string[];
  randomSentence: string = '';
  randomImage: string = '';
  constructor(private cdr: ChangeDetectorRef) {
    this.funnySentence = [
      'This page is as lost as a needle in a haystack. Maybe try searching for it with a metal detector?',
      'Oops, it looks like this page went on a vacation and forgot to leave a forwarding address.',
      'Sorry, this page has gone missing faster than socks in a washing machine.',
      "Looks like the page is taking a break, maybe it's sipping margaritas on a beach somewhere.",
      "The page you're looking for is on a coffee break. Please try again later.",
      "The page you are looking for has taken a sabbatical. It's trying to find itself and won't be back for a while.",
      'Oh no! This page seems to have run away from home. We hope it comes back soon.',
      'This page has gone missing like a hair tie lost in a black hole.',
      "Sorry, we couldn't find the page you were looking for. It's probably hiding from us like a ninja.",
      "We're sorry, this page seems to have flown the coop like a rebellious chicken.",
    ];
    this.notFoundImages = [
      '../../assets/svg/404 Error with a cute animal-amico.svg',
      '../../assets/svg/404 Error with a cute animal-bro.svg',
      '../../assets/svg/404 Error with a cute animal-cuate.svg',
      '../../assets/svg/404 Error with a cute animal-pana.svg',
      '../../assets/svg/404 Error-bro.svg',
      '../../assets/svg/404 Error-pana.svg',
    ];
  }

  ngOnInit() {
    this.randomSentence = this.getRandomSentence();
    this.randomImage = this.getRandomImage();
    this.cdr.detectChanges();
  }
  getRandomSentence() {
    return this.funnySentence[
      Math.floor(Math.random() * this.funnySentence.length)
    ];
  }

  getRandomImage() {
    return this.notFoundImages[
      Math.floor(Math.random() * this.notFoundImages.length)
    ];
  }

  shouldHighlightButton(): boolean {
    return (
      this.randomImage.includes('cuate') || this.randomImage.includes('bro')
    );
  }
}
