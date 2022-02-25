import { Component } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
const BASE_URL = 'https://localhost:44350/api/Product/';

@Component({
    selector: 'addProductForm',
    templateUrl: './addProduct.component.html'
})

export class AddProductComponent {
    _productsArray: Array<any>;   
    _errorMessage:String = "";
    _singleProductName: string = "";
    _singleProductNumber : number = 0;
    _editableDescription:String="";
    _editId:Number = 0;
    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        console.log("------------------------------------------------");
        console.log("getAllProducts base url ==> [get<any>] " +  BASE_URL);

        let url = BASE_URL
        this.http.get<any>(url).subscribe(data => {
            // Get data and wait for result.            
            this._productsArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"]; 
        },
        error =>{
            // Let user know about the error.
            this._errorMessage = JSON.stringify(error);
        })
    }

    getAllProducts() {
        console.log
        ("------------------------------------------------");
        //https://localhost:44350/api/Product
        console.log("getAllProducts base url ==> [get<any>] " +  BASE_URL);

        let url = BASE_URL
        this.http.get<any>(url).subscribe(data => {
            // Get data and wait for result.            
            this._productsArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"]; 
        },
        error =>{
            // Let user know about the error.
            this._errorMessage = JSON.stringify(error);
        })
    }

    getProduct(id) {
        console.log("------------------------------------------------");
        console.log("getProduct base url ==> [get] " +  BASE_URL +  id);

        let url = BASE_URL + id;
        this.http.get<any>(url)
            // Get data and wait for result.
            .subscribe(result => {          
                this._singleProductName   = result.description;
                this._singleProductNumber = result.produceID;
        },
        error =>{
              // Let user know about the error.
                this._errorMessage = JSON.stringify(error);
        })
    }

    createProduct(data) {
        let url = BASE_URL
        console.log("------------------------------------------------");
        console.log("createProduct base url ==> [post] " +  BASE_URL);

        this.http.post('https://localhost:44350/api/Product', data)
        .subscribe( (data) => {
            // Data is received from the post request.           
            // Inspect the data to know how to parse it.
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
            this.getAllProducts();
                
        },             
        error => { // An error occurred. Data is not received.
            console.log(data + " ==> 3, error ==> " + JSON.stringify(error));
            //this._errorMessage = JSON.stringify(error);                
        });

        console.log(data);
    }

    deleteProduct(_id) {  //https://localhost:44371/api/Product/9
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
        };
        let url = BASE_URL +  _id;
        console.log("------------------------------------------------");
        console.log("deleteProduct base url ==> [delete] " +  BASE_URL + _id);

        this.http.delete(url , httpOptions).subscribe(
            // Data is received from the post request.
            (data) => {
                this._errorMessage = data["errorMessage"];
                this.getAllProducts(); 
        },
            // An error occurred. Data is not received. 
            error  => {
              this._errorMessage = JSON.stringify(error); 
        });
      }

      updateProduct() {
        // This free online service receives post submissions.
        this.http.put(BASE_URL + "MyEdit",
            {
                ProduceID:   this._editId,
                Description: this._editableDescription,
            })
        .subscribe(
            // Data is received from the post request.
            (data) => {
                // Inspect the data to know how to parse it.
                console.log("PUT call successful. Inspect response.", 
                            JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                this.getAllProducts();         
            },
            // An error occurred. Data is not received. 
            error => {
                this._errorMessage = JSON.stringify(error);                
            });
    }
}
