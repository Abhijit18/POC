import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, pipe} from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { TestScript } from '../models/testscript.model';
import { Repository } from '../models/repository.model';
import { Keywords } from '../models/keyword.model';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {
  public apiUrl:string = "http://ec2-13-232-44-184.ap-south-1.compute.amazonaws.com/api";
  
  
   constructor(private httpClient: HttpClient){
   }
   
   getKeywords(): Observable<Keywords[]>{
     return this.httpClient.get(this.apiUrl+'/Keywords/GetAllKeywords')
                .pipe(
                  map(res=>res as Keywords[]),
                  catchError(this.errorHandle)
                );
   }

   getKeyword(id:number):Observable<Keywords>{
    return this.httpClient.get(this.apiUrl+'/Keywords/GetKeywordById/'+id)
    .pipe(
      map(res=>res as Keywords),
      catchError(this.errorHandle)
    );
   }
    
   addKeyword(keyword:Keywords){
       return this.httpClient.post(this.apiUrl+'/Keywords/AddKeyword',keyword)
       .subscribe(
        data  => {
          console.log("POST Request is successful ", data);
          },
          error  => {
          console.log("Error", error);
          }
      );
    }

    updateKeyword(id:number,keyword:Keywords){
      return this.httpClient.put(this.apiUrl+'/Keywords/UpdateKeyword/'+id,keyword)
      .subscribe(
        data  => {
          console.log("PUT Request is successful ", data);
          },
          error  => {
          console.log("Error", error);
          }
      );
    }

    deleteKeyword(id:number){
      return this.httpClient.delete(this.apiUrl+'/Keywords/DeleteKeyword/'+id)
      .subscribe(
        data  => {
          console.log("DELETE Request is successful ", data);
          },
          error  => {
          console.log("Error", error);
          }
      );
    }

   errorHandle(error:Response){
     console.log(error);
     return throwError(error);
   }
}