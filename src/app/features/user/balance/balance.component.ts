import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '@app/features/user/services/user.service';
import { Titled } from '@app/shared/head/titled';
import { Message } from '@app/shared/head/message';
import { UserApiResponse, PaymentRequestToken, BaseResponse } from '@app/shared/api';
import { Subscription } from 'rxjs/Subscription';
import { BalanceService } from '@app/features/user/balance/balance.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html'
})
export class BalanceComponent implements OnInit, OnDestroy {
  titles: Titled[];
  messages: Message[];
  balance: number;
  moneyrequesttitle: string;
  moneyrequest: number;
  image: string;
  payment_request_token: string;
  canCashout: boolean;
  userInfoSub: Subscription;
  tokenSub: Subscription;
  paymentDone: boolean = false ; 

  constructor(
    private userService: UserService,
    private balanceService: BalanceService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.titles = [new Titled('QV', 'logo logo-medium logo-white', 'logo')];
    this.messages = [new Message('Tus ganancias', 'h4 white')];
    this.image = '';
    this.populateUserData();
    this.populatePaymentTokenData();
    window.FirebasePlugin.setScreenName("Balance");
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

  populatePaymentTokenData(): void {
    this.reqPaymentToken()
      .then((payment_request_token: string) => {
        this.payment_request_token = payment_request_token;
        this.canCashout = true;
      })
      .catch((error: Error) => {
        this.canCashout = false;
        console.error(error);
      });
  }

  populateUserData(): void {
    this.balance = this.userService.getBalance();
    this.moneyrequesttitle = this.balance.toFixed(2); // For subject title
    this.moneyrequest = parseFloat(this.balance.toFixed(2)) * 100;
  }

  clearSubscriptions(): void {
    if (this.userInfoSub) {
      this.userInfoSub.unsubscribe();
    }

    this.tokenSub.unsubscribe();
  }

  reqPaymentToken(): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      this.tokenSub = this.balanceService
        .reqPaymentToken()
        .subscribe((res: PaymentRequestToken) => {
          if (res.success === false) {
            reject({ errors: res.errors, message: res.message });
            return;
          }

          resolve(res.data.payment_request_token);
        });
    });

    return promise;
  }

  sendToken(event: Event): void {
    if (
      !this.payment_request_token ||
      typeof this.payment_request_token !== 'string'
    ) {
      throw new Error('Please provide valid token!');
    }

    if (this.balance <= 0) {
      event.preventDefault();
      return;
    }

    this.balanceService
      .sendToken(this.payment_request_token)
      .subscribe((res: BaseResponse) => {
        // Handle response.
        
      });
       
  }

  openLink(link:string): void {
    if(link=='in'){
      link = "https://wwkt.adj.st/request?amount="+this.moneyrequest+"&currency=EUR&to=700700089&message=Solicito el pago de"+ this.moneyrequesttitle+" EUR por mis juegos ganados en %23quizvideo. Mi código de ganador es"+this.payment_request_token+"&adjust_t=w51q7z_rpdfuh&adjust_deeplink=joinverse://request?amount%3D"+ this.moneyrequest +"%26currency%3DEUR%26to%3D700700089%26message%3D"+this.payment_request_token+"&adjust_fallback=https%3A%2F%2Fverse.me&adjust_campaign=QuizVideo"
      this.http.get(link);

      console.log("Result verse me") ; 
      //console.log(res);
      //window.open("http://www.quizvideo.com" , '_system' , "location=yes") ; 
       this.paymentDone=  true ; 
    }else{
      window.open(link , '_system' , 'location=yes') ;
    
    }
  }
}
