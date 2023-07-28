// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  addFavorite(movieId: string): void {
    this.fetchApiData.addFavorite(movieId).subscribe((resp: any) => {
      this.user = resp;
      localStorage.setItem("user", JSON.stringify(resp));
    });
  }

  deleteFavorite(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((resp: any) => {
      this.user = resp;
      localStorage.setItem("user", JSON.stringify(resp));
    });
  }

  genreDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: {
        title: movie.Genre.Title,
        description: movie.Genre.Description,
      }
    })
  }

  directorDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: {
        title: movie.Director.Name,
        description: movie.Director.Bio
      }
    })
  }

  synopsisDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: {
        title: movie.Title,
        description: movie.Description
      }
    })
  }
}
