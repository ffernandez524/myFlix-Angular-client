import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cinenotesmovieapp.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  // User login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies endpoint
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', { headers : new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Add movie to user's favorites
  public addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.Favorites.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(apiUrl + 'users/' + user.Username + '/favorites/' + movieId, {}, { headers : new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
      "Content-Type": "application/json"
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Update User's Profile
  public updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.put(apiUrl + 'users/' + user.Username, JSON.stringify(userDetails), { headers : new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
      "Content-Type": "application/json"
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete User's Account
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.delete(apiUrl + 'users/' + user.Username, { headers : new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete favorite from user's account
  public deleteFavorite(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.delete(apiUrl + 'users/' + user.Username + '/favorites/' + movieId, { headers : new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Error handler for fetch services
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
}
