import { Component, ElementRef, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layouts/header/header.component';
import { LearningPathComponent } from '../../layouts/learning-path/learning-path.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { SuccessComponent } from '../../layouts/success/success.component';

interface CourseCard {
  image: string;
  title: string;
  instructor: string;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    LearningPathComponent,
    FooterComponent,
    SuccessComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  // State for the first carousel (courses)
  currentSlideCourses = 0;
  slideOffsetCourses = 0;
  cardWidthCourses = 0;
  containerWidthCourses = 0;
  totalCardsCourses = 5;
  visibleCardsCourses = 3;

  // State for the second carousel (recommended)
  currentSlideRecommended = 0;
  slideOffsetRecommended = 0;
  cardWidthRecommended = 0;
  containerWidthRecommended = 0;
  totalCardsRecommended = 5;
  visibleCardsRecommended = 3;

  public courseCards: CourseCard[] = [
    {
      image: 'website.png',
      title: 'Foundations of Web Design: Building Effective and Engaging Websites',
      instructor: 'Sarah Blake'
    },
    {
      image: 'carft.png',
      title: 'Responsive Design Essentials: Crafting Seamless Experiences Across Devices',
      instructor: 'Tom Evans'
    },
    {
      image: 'html.png',
      title: 'Advanced HTML & CSS Techniques for Modern Web Aesthetics',
      instructor: 'Sarah Blake'
    },
    {
      image: 'website.png',
      title: 'Modern JavaScript: From Fundamentals to Advanced Concepts',
      instructor: 'Alex Johnson'
    },
    {
      image: 'html.png',
      title: 'Angular Development: Building Scalable Web Applications',
      instructor: 'Emma Wilson'
    }
  ];
  public recommmendedCards: CourseCard[] = [
    {
      image: 'recommend1.png',
      title: 'Foundations of Web Design: Building Effective and Engaging Websites',
      instructor: 'Sarah Blake'
    },
    {
      image: 'recommend2.png',
      title: 'Responsive Design Essentials: Crafting Seamless Experiences Across Devices',
      instructor: 'Tom Evans'
    },
    {
      image: 'recommend3.png',
      title: 'Advanced HTML & CSS Techniques for Modern Web Aesthetics',
      instructor: 'Sarah Blake'
    },
    {
      image: 'website.png',
      title: 'Modern JavaScript: From Fundamentals to Advanced Concepts',
      instructor: 'Alex Johnson'
    },
    {
      image: 'html.png',
      title: 'Angular Development: Building Scalable Web Applications',
      instructor: 'Emma Wilson'
    }
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Initialize component
    setTimeout(() => {
      this.updateDimensionsCourses();
      this.updateDimensionsRecommended();
    }, 0);
  }

  ngAfterViewInit() {
    this.updateDimensionsCourses();
    this.updateDimensionsRecommended();
    // Re-calculate after images load
    window.addEventListener('load', () => {
      this.updateDimensionsCourses();
      this.updateDimensionsRecommended();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.updateDimensionsCourses();
    this.updateDimensionsRecommended();
  }

  private updateDimensionsCourses() {
    const container = this.elementRef.nativeElement.querySelector('.courses-slider-container');
    const card = this.elementRef.nativeElement.querySelector('.course-card'); // Assuming same class for course cards

    if (container && card) {
      this.containerWidthCourses = container.offsetWidth - 80; 
      this.cardWidthCourses = card.offsetWidth;

      if (window.innerWidth <= 768) {
        this.visibleCardsCourses = 1;
      } else if (window.innerWidth <= 1024) {
        this.visibleCardsCourses = 2;
      } else {
        this.visibleCardsCourses = 3;
      }

    
      const maxSlideCourses = Math.max(0, this.totalCardsCourses - this.visibleCardsCourses);
      this.currentSlideCourses = Math.min(this.currentSlideCourses, maxSlideCourses);
      this.slideOffsetCourses = this.calculateSlideOffsetCourses();
    }
  }

  calculateSlideOffsetCourses(): number {
    return -(this.currentSlideCourses * this.cardWidthCourses);
  }

  get hasNextSlideCourses(): boolean {
    return this.currentSlideCourses < (this.totalCardsCourses - this.visibleCardsCourses);
  }

  prevSlideCourses() {
    if (this.currentSlideCourses > 0) {
      this.currentSlideCourses--;
      this.slideOffsetCourses = this.calculateSlideOffsetCourses();
    }
  }

  nextSlideCourses() {
    const maxSlideCourses = this.totalCardsCourses - this.visibleCardsCourses;
    if (this.currentSlideCourses < maxSlideCourses) {
      this.currentSlideCourses++;
      this.slideOffsetCourses = this.calculateSlideOffsetCourses();
    }
  }

  // Methods for the second carousel (recommended)
  private updateDimensionsRecommended() {
    const container = this.elementRef.nativeElement.querySelector('.recommended-slider-container');
    const card = this.elementRef.nativeElement.querySelector('.recommended-card'); // Assuming a different class for recommended cards
    const track = this.elementRef.nativeElement.querySelector('.recommended-track');

    if (container && card && track) {
      this.containerWidthRecommended = container.offsetWidth - 80; 
      this.cardWidthRecommended = card.offsetWidth;

      if (window.innerWidth <= 768) {
        this.visibleCardsRecommended = 1;
      } else if (window.innerWidth <= 1024) {
        this.visibleCardsRecommended = 2;
      } else {
        this.visibleCardsRecommended = 3;
      }

      const maxSlideRecommended = Math.max(0, this.totalCardsRecommended - this.visibleCardsRecommended);
      this.currentSlideRecommended = Math.min(this.currentSlideRecommended, maxSlideRecommended);
      this.slideOffsetRecommended = this.calculateSlideOffsetRecommended();
    }
  }

  calculateSlideOffsetRecommended(): number {
    return -(this.currentSlideRecommended * this.cardWidthRecommended);
  }

  get hasNextSlideRecommended(): boolean {
    return this.currentSlideRecommended < (this.totalCardsRecommended - this.visibleCardsRecommended);
  }

  prevSlideRecommended() {
    if (this.currentSlideRecommended > 0) {
      this.currentSlideRecommended--;
      this.slideOffsetRecommended = this.calculateSlideOffsetRecommended();
    }
  }

  nextSlideRecommended() {
    const maxSlideRecommended = this.totalCardsRecommended - this.visibleCardsRecommended;
    if (this.currentSlideRecommended < maxSlideRecommended) {
      this.currentSlideRecommended++;
      this.slideOffsetRecommended = this.calculateSlideOffsetRecommended();
    }
  }
  
 
}
