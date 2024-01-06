import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          style({
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], {optional: true}),

        // query(':enter', [           entering component fade-in
        //   style({opacity: 0})
        // ], {optional: true}),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }))
          ], {optional: true}),
  
          query(':enter', [
              style({
                transform: 'translateX(50px)',
                opacity: 0            //entering component fade-in NEW
              }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'              
            }))
          ], {optional: true})
        ])
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          style({
            // display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], {optional: true}),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ], {optional: true}),
  
          query(':enter', [
              style({
                transform: 'translateX(-50px)',
                opacity: 0            //entering component fade-in NEW
              }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'              
            }))
          ], {optional: true})
        ])
      ])
    ]),


    trigger('bgAnim', [
      transition(':leave', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ]),
    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0}),
        animate(250, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate(250, style({ opacity: 0}))
      ])
    ])
  ]
})
export class AppComponent {

  backgrounds: string [] = [
    'https://images.unsplash.com/photo-1702957954496-8bba5d73a390?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNDIxMzExOA&ixlib=rb-4.0.3&q=80&w=1920'
  ]

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      return outlet.activatedRouteData['tab']
    }
  }

  // async changeBGImage() {
  //   const result = await fetch('https://source.unsplash.com/random', {
  //     method: 'HEAD'
  //   })

  //   this.bg = result.url

  loadingBGImage!: boolean

   async changeBGImage(): Promise<any> {
    this.loadingBGImage = true

    const result = await fetch('https://source.unsplash.com/random/1920x1080', {
      method: 'HEAD'
    })

    const alreadyGot = this.backgrounds.includes(result.url)
    if (alreadyGot) {
      return this.changeBGImage()  //this is to double run the function if same wallpaper
    }

    this.backgrounds.push(result.url)
  }

  onBGImageLoad(imgEvent: Event) {
    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src
    this.backgrounds = this.backgrounds.filter(b => b === src)
    // this.backgrounds = [src] same thing as ^

    this.loadingBGImage = false;
  }
}
