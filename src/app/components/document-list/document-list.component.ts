import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document.model';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})


export class DocumentListComponent implements OnInit {
  activeTab: 'jira' | 'confluence' = 'jira';
  searchTerm: string = '';
  documents: any[] = [];
  filteredDocuments: any[] = [];
  tabsVisible: boolean = false;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();
    // this.loadMockDocuments();
  }
  showTabs(): void {
    this.tabsVisible = true;
  }

  setTab(tab: 'jira' | 'confluence') {
    this.activeTab = tab;
    this.loadDocuments();
    // this.loadMockDocuments();
  }

  loadDocuments(): void {
    this.documentService.getDocuments(this.activeTab).subscribe(data => {
      this.documents = this.activeTab === 'jira' ? data.jira_tickets.tickets : data.confluence_pages.pages;
      this.filterDocuments();
    });
  }
  // loadMockDocuments(): void {
  //   const mockData = {
  //     jira: [
  //       { id: 'JIRA-101', summary: 'Fix login issue with Okta', created_at: '2024-02-10T09:15:00Z', icon: 'assets/icons/doc.png' },
  //       { id: 'JIRA-102', summary: 'Implement API for exporting logged hours', created_at: '2024-02-08T11:45:00Z', icon: 'assets/icons/doc.png' },
  //       { id: 'JIRA-103', summary: 'Optimize database queries for reports', created_at: '2024-01-25T08:30:00Z', icon: 'assets/icons/doc.png' }
  //     ],
  //     confluence: [
  //       { id: 'CONF-001', title: 'Jira Authentication Issues', created_at: '2024-01-20T13:00:00Z', icon: 'assets/icons/pdf.png' },
  //       { id: 'CONF-002', title: 'Guide to Exporting Logged Hours', created_at: '2024-02-05T10:30:00Z', icon: 'assets/icons/pdf.png' },
  //       { id: 'CONF-003', title: 'Optimizing Database Queries', created_at: '2024-01-18T15:00:00Z', icon: 'assets/icons/pdf.png' }
  //     ]
  //   };
    
  //   this.documents = this.activeTab === 'jira' ? mockData.jira : mockData.confluence;
  //   this.filterDocuments();
  // }


  filterDocuments(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredDocuments = this.documents.filter(doc =>
      doc.id?.toLowerCase().includes(term) || doc.summary?.toLowerCase().includes(term) || doc.title?.toLowerCase().includes(term)
    );
  }

  getDocumentLink(doc: any): string {
    return this.activeTab === 'jira' 
      ? `https://your-jira-instance.atlassian.net/browse/${doc.id}` 
      : `https://your-confluence-instance.atlassian.net/wiki/spaces/your-space-id/pages/${doc.id}`;
  }
}