import { trigger, transition, style, query, group, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage => GamePage', [
      query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease', style({ opacity: 0, transform: 'translateX(-50px)' }))
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(50px)' }),
          animate('300ms ease', style({ opacity: 1, transform: 'translateX(0)' }))
        ], { optional: true })
      ])
    ]),
    transition('GamePage => HomePage', [
      query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease', style({ opacity: 0, transform: 'translateX(50px)' }))
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-50px)' }),
          animate('300ms ease', style({ opacity: 1, transform: 'translateX(0)' }))
        ], { optional: true })
      ])
    ])
  ]);
