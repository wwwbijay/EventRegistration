import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  performanceType:any = '';
  eventPrice:number = 0;
  @Input() orderId!:number;


  constructor(
    public _activeModal: NgbActiveModal,
    private _checkout: CheckoutService
  ) { }

  ngOnInit(): void {
  }

  TypeChange(){
    if(this.performanceType =='solo'){
      this.eventPrice = 500;
    }else if(this.performanceType =='group'){
      this.eventPrice = 1000;
    }else{
      this.eventPrice = 0;
    }
  }

  checkout(){


    let data = {
      "Amount": this.eventPrice,
      "OrderId": this.orderId,
      "UserName": "testmerchant" ,
      "Password": "Tmerchant@123" ,
      "MerchantId": "MER29403933"
      }

      this._checkout.useMyPayPayment(data).subscribe({
        next:(x:any)=>{
          console.log(x);
        },
        error:(err:any)=>{
          console.log(err);
        },
      });

  }

}
