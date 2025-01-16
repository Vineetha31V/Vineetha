import { CommonModule } from '@angular/common';
import { Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LearningPathService } from '../../services/learning-path.service';

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss']
})
export class LearningPathComponent implements AfterViewInit {
  @ViewChild('carousel') carouselElement!: ElementRef;
  
  categories: string[] = [];
  filteredCards: any[] = [];
  selectedCategory: string = '';
  currentIndex = 0;
  itemsToShow = 3;
  slideWidth = 0;

  constructor(private learningPathsService: LearningPathService) {}

  ngOnInit(): void {
    this.learningPathsService.getCategories().subscribe(categories => {
      console.log('Category Cards:', categories);
      this.categories = categories;
      
  
      
      this.selectedCategory = this.categories[0];  
      this.updateFilteredCards();
      
    });
  }

  ngAfterViewInit() {
    this.calculateSlideWidthAndPosition();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateSlideWidthAndPosition();
  }

  calculateSlideWidthAndPosition() {
    if (!this.carouselElement) return;
    
    const carousel = this.carouselElement.nativeElement;
    const containerWidth = carousel.offsetWidth;
    
    // Calculate width based on number of items to show
    if (window.innerWidth >= 1200) {
      this.slideWidth = containerWidth / 3;
    } else if (window.innerWidth >= 768) {
      this.slideWidth = containerWidth / 2;
    } else {
      this.slideWidth = containerWidth;
    }

    this.slideWidth = containerWidth / this.itemsToShow;
    this.updateCarouselPosition();
  }


  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentIndex = 0;
    this.updateFilteredCards();
    this.updateCarouselPosition();
  }

  updateFilteredCards(): void {
   this.learningPathsService.getCardData(this.selectedCategory).subscribe((cards: any[]) => {
    console.log('Course Cards:', cards);
      this.filteredCards = cards.map(card => ({
        ...card,
        imageUrl: card.image?.fields?.file?.url ? `https:${card.image.fields.file.url}` : null,
        pdfUrl: card.pdfUrl
      }));
    });
    this.updateCarouselPosition();
  }
  downloadFile(pdfUrl: string): void {
    if (!pdfUrl) {
      console.error('Invalid URL:', pdfUrl);
      return; // Exit if the URL is invalid
    }
  
    const url = pdfUrl; // Backend URL to your file
    const fileName = pdfUrl.split('/').pop() || 'file.pdf'; // Extract the file name from the path
  
    fetch(url)
      .then(response => response.blob())  // Fetch the file as a Blob
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); // Create a URL for the Blob
        link.download = fileName; // Name of the downloaded file
        link.click();  // Trigger the download
        URL.revokeObjectURL(link.href);  // Clean up the URL
      })
      .catch(error => console.error('Download error:', error));
  }
  

  nextSlide() {
    const maxIndex = Math.ceil(this.filteredCards.length / this.itemsToShow) - 1;
    this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
    this.updateCarouselPosition();
  }

  prevSlide() {
    const maxIndex = Math.ceil(this.filteredCards.length / this.itemsToShow) - 1;
    this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
    this.updateCarouselPosition();
  }

  updateCarouselPosition() {
    if (!this.carouselElement) return;
    
    const carousel = this.carouselElement.nativeElement;
    const translateX = -(this.currentIndex * this.slideWidth);
    carousel.style.transform = `translateX(${translateX}px)`;
  }

  isHidden(index: number): boolean {
    const start = this.currentIndex * this.itemsToShow;
    const end = start + this.itemsToShow;
    return index < start || index >= end;
  }

 
}

