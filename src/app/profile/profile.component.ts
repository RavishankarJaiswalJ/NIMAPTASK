import { AfterViewInit, Component, EventEmitter, Inject, OnChanges, OnInit, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';
import { Router } from '@angular/router';
import { Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { Register } from '../shared/register';
import { HomeComponent } from '../home/home.component';
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit{
  @ViewChildren(HomeComponent) addView: HomeComponent;
  @ViewChildren("Register") Forms: RegisterComponent;

  EditDatas:any;
  LastProfile:any;
  profilePic:any;
  profileData:any;
  Imageurl:any='';
  name: string;
  lname: string;
  email: string;
  phone:number;
  state:string;
  tag:string;
  age:number;
  fileInput: any;
  id:any;
  register: Register;
  editData:any
  editPhoto:any

  allData:any;

  
  constructor(private service:RestApiService, private dialog: MatDialog, private router: Router){}
  // ngOnChanges(): void {
  //   // throw new Error('Method not implemented.');
  // }
  ngAfterViewInit(): void {
    // this.onEditProfile(this.id)
    // this.onEditPhoto(this.editPhoto)
    // const data = this.addView.EditProfile()
    // console.log(data)
    this.getProfile();
  }
  
  ngOnInit():void{
    // this.loadProfile();
    // const myData=this.data
    // console.log(myData)
  //   if(this.data.id!='' && this.data.id != null)
  //   this.service.EditProfile(this.data.id).subscribe(res=>{
  //   this.editData=res;
  //   this.ProfileForm.setValue({id:this.editData,profileImg:this.editData,firstname:this.editData,lastname:this.editData,email:this.editData,})
  // });
    // this.GetAllProfile();
    // this.getProfile();
    this.getData();
    this.getProfile();
  }
  
  GetAllProfile(){
    this.service.GetAllProfile().subscribe(response=>{
      this.profileData = response;
      console.log(this.profileData)
    });
  }

  getProfile(){
    this.service.getProfile().subscribe(response =>{
      debugger;
      const data = this.LastProfile = response;
      console.log('Last Profile:',data);
      let dataImg = data.lastProfile.profileImg;
      this.name = data.lastProfile.firstname;
      this.lname = data.lastProfile.lastname;
      this.age = data.lastProfile.age;
      this.email = data.lastProfile.email;
      this.state = data.lastProfile.state;
      this.tag = data.lastProfile.tag;
      this.phone = data.lastProfile.contact;
      this.id = data.lastProfile.id;
      console.log("__Id",this.id)
      // console.log(dataImg)
      this.Imageurl=dataImg;
      
    })
  }
  // getProfileById(){
  //   this.service.getProfileById().subscribe(response=>{
  //      const data = this.profileData = response ;
  //      console.warn("Id",data)

  //   })
  // }
  // data:any;
  // Edit(e:any){
  //   this.service.EditProfile(e).subscribe(response=>{
  //     const Data = this.data = response
  //     console.log(Data)

  //   })
  // }
  profileForm:Register
  // uploadFile(event: any) {
  //   let reader = new FileReader();
  //   let file = event.target.files[0];
  //   if (event.target.files && event.target.files[0]) {
  //     reader.readAsDataURL(file);

  //     reader.onload = (e:any) => {
  //       this.imageUrl = reader.result;

  //       this.RegisterForm.patchValue({
  //         profileImg: this.imageUrl,
  //       });
  //       this.editFile = false;
  //       this.removeUpload = true;
  //     };
  //     this.cd.markForCheck();
  //   }
  // }

  getData(): void {
    this.service.getData().subscribe(data => { this.allData = data; });
  }

  onEditPhoto(event: any, id: any) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      debugger;
      reader.onload = (e: any) => {
        let base64Img_id = {
          base64Img: e.target.result,
          id
        }
        this.service.setProfilePic(base64Img_id).subscribe(response => {
          debugger;
          console.info(response);
          console.log('Image has been updated!');
        })
      }
    }
  }

  onEditProfile(id:any){
    debugger;
    this.openDialog()
    this.getData();
    this.setpopupdata(this.allData, id);
  }

  onEditProfileSubmit(dataWithID:any){
    this.service.editProfile(dataWithID).subscribe(res => {
      console.info('res', JSON.stringify(res, null, 2));
      console.log(`Profile has been updated!`)
    });
  }

  setpopupdata(allData:Register[], id:any) {
    const acutalData:any  = allData.filter(itm => itm.id === id);
      this.Forms.RegisterForm.setValue({
        id: acutalData.id,
        profileImg: acutalData.profileImg,
        firstname: acutalData.firstname,
        lastname: acutalData.lastname,
        email: acutalData.email,
        contact: acutalData.contact,
        age: acutalData.age,
        state: acutalData.state,
        country: acutalData.country,
        address: acutalData.address,
        tag: acutalData.tag,
        subscribe: acutalData.subscribe,
      });
  }

  openDialog(){
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      
    })
    this.service.getProfile().subscribe(res=>{
      const data = res;
      console.log(data)
      
    })
  }
  


}