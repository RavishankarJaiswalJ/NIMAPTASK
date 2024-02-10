import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Register } from '../shared/register';

@Injectable({
  providedIn: 'root',
})
export class RestApiService{
  indexArray!: Register[];
  index!: Register;
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000';
  private url = 'http://localhost:3000/profiles';


  GetAllProfile() {
    return this.http.get<Register[]>('http://localhost:3000/profiles');
  }



  getProfileById(code:any) {
    return this.http.get('http://localhost:3000/profiles/code');
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured ${err.error.message}`;
    } else {
      errorMessage = `Backend returned with code ${err.status} : ${err.body.error}`;
    }
    console.log(err);
    return throwError(errorMessage);
  }

  CreateProfile(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Register[]>(`${this.apiUrl}/profiles`, data, {
      headers,
    });
  }

  // createProfile(Createprofiles: Register) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.index = this.indexArray.pop() || this.initializeProduct();
  //   Createprofiles.firstname = this.index.firstname + 1;
  //   return this.http
  //     .post<Register[]>(this.apiUrl, Createprofiles, { headers })
  //     .pipe(
  //       tap((data) => console.log('Created Product: ' + JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }

  // updateProfile(register: Register) {
  //   const url = `${this.apiUrl}/${register.id}`;
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.patch<Register[]>(url, register, { headers }).pipe(
  //     tap(() => console.log(' Updated Product: ' + register.id)),
  //     map(() => register),
  //     catchError(this.handleError)
  //   );
  // }
  // EditProfile(id: any): Observable<Register> {
  //   return this.http.get<Register>(`http://localhost:3000/profiles`);
  // }

  // RemoveProfile(id: any) {
  //   return this.http.delete<Register>(`http://localhost:3000/profiles/${id}`);
  // }
  // UpdateProfile(id: any, profileData: any) {
  //   return this.http.post<Register>(this.url + '/' + id, profileData);
  // }

  // getProfilePic() {
  //   return this.http.get<Register[]>('http://localhost:3000/profiles').pipe(
  //     map((profiles: Register[]) => {
  //       const profileFieldOnly = profiles.map((profile) => profile.profileImg);
  //       return { profileFieldOnly };
  //     })
  //   );
  // }

  getProfile() {
    return this.http.get<Register[]>('http://localhost:3000/profiles').pipe(
      map((profiles: string | any[]) => {
        debugger;
        const lastProfile = profiles[profiles.length - 1];
        return { lastProfile };
      })
    );
  }



  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // url

  setProfilePic(data: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/profiles`, data);
  }
  
  // LAST WORKED CODE
  // setProfilePic(data: any) {
  //   return this.http.get<Register[]>('http://localhost:3000/profiles').pipe(
  //     map((profiles: Register[]) => {
  //       debugger;
  //       const { base64Img, email} = data;
  //       let actualProfile:any = profiles.filter(itm => itm.email === email)[0];
  //       actualProfile.profileImg = base64Img;
  //       return { actualProfile };
  //     })
  //   );
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const updateData = {
    //   email: 'nogmail@gmail.com',
    //   profileImg: data.profileImg // Assuming data contains the new profileImg value
    // };
    // return this.http.post<any>(`${this.apiUrl}/set-profile`, updateData, { headers });
  // }
  
  // REF
  // CreateProfile(data: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<Register[]>(`${this.apiUrl}/profiles`, data, {
  //     headers,
  //   });
  // }


  // private initializeProduct(): Register {
  //   return {
  //     id: 0,
  //     profileImg: '',
  //     firstname: '',
  //     lastname: '',
  //     email: '',
  //     contact: 0,
  //     age: 0,
  //     state: '',
  //     country: '',
  //     address: '',
  //     tag: '',
  //     subscribe: false,
  //   };
  // }
}
