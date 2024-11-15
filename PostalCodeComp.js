import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PostalCodeComp extends LightningElement {

    @track postalCode;
    @track mapMarkers = [];
    zoomLevel = 10;  
    listView = "visible"; 
    addressFound = false;

    handlePostalcode(event) {
        this.postalCode = event.target.value;
        console.log(`Postal/Zip code: ${this.postalCode}`);
    }

    getMapLocations() {
        this.addressFound = false;
        this.mapMarkers = [];
        
        if(this.postalCode) {
            fetch(`https://api.postalpincode.in/pincode/${this.postalCode}`, { method: "GET" })
            .then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch data');
                }
            })
            .then((data) => {
                console.log(`data: ${JSON.stringify(data)}`);
                
                if (data && data[0] && data[0].PostOffice) {
                    const arrData = data[0].PostOffice;

                    arrData.forEach(element => {
                        const loc = {
                            City: element.Division,
                            Country: element.Country,
                            PostalCode: element.Pincode,
                            State: element.State,
                            Street: element.Name
                        };
                        const res = {
                            location: loc,
                            title: element.Name,
                            description: `${element.Name} Area`,
                            icon: 'standard:location'
                        };
                        this.mapMarkers = [...this.mapMarkers, res];
                    });

                    this.addressFound = true;
                } else {
                    throw new Error('Postal code data not found');
                }
            })
            .catch(error => {
                console.error(`Error: ${error}`);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Postal code not found',
                        variant: 'error'
                    })
                );
            });
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Oops..',
                    message: 'Please specify Postal/Zip Code',
                    variant: 'warning'
                })
            );
        }
    }
}
